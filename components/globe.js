import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const Globe = () => {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100)
    camera.position.z = 3.4

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    const initialRect = mount.getBoundingClientRect()
    renderer.setSize(initialRect.width || 200, initialRect.height || 200, false)
    mount.appendChild(renderer.domElement)
    renderer.domElement.style.width = '100%'
    renderer.domElement.style.height = '100%'
    renderer.domElement.style.display = 'block'
    renderer.domElement.style.touchAction = 'none'

    // Outer group = physics-driven displacement (springs back to rest)
    const physicsGroup = new THREE.Group()
    scene.add(physicsGroup)

    // Inner group = ambient "alive" spin
    const spinGroup = new THREE.Group()
    physicsGroup.add(spinGroup)

    const innerGeo = new THREE.SphereGeometry(1, 48, 48)
    const innerMat = new THREE.ShaderMaterial({
      uniforms: {
        uColorA: { value: new THREE.Color('#0891b2') },
        uColorB: { value: new THREE.Color('#7c3aed') }
      },
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        uniform vec3 uColorA;
        uniform vec3 uColorB;
        void main() {
          float fresnel = pow(1.0 - max(dot(vNormal, vec3(0.0, 0.0, 1.0)), 0.0), 2.2);
          vec3 base = mix(uColorA, uColorB, vNormal.y * 0.5 + 0.5);
          vec3 color = base * (0.25 + fresnel * 1.6);
          gl_FragColor = vec4(color, 0.95);
        }
      `,
      transparent: true
    })
    const innerSphere = new THREE.Mesh(innerGeo, innerMat)
    spinGroup.add(innerSphere)

    const wireGeo = new THREE.IcosahedronGeometry(1.14, 3)
    const wireMat = new THREE.LineBasicMaterial({
      color: 0x7dd3fc,
      transparent: true,
      opacity: 0.35
    })
    const wireframe = new THREE.LineSegments(
      new THREE.WireframeGeometry(wireGeo),
      wireMat
    )
    spinGroup.add(wireframe)

    const dotsGeo = new THREE.IcosahedronGeometry(1.22, 4)
    const dotsMat = new THREE.PointsMaterial({
      color: 0xff63c3,
      size: 0.018,
      transparent: true,
      opacity: 0.85
    })
    const dots = new THREE.Points(dotsGeo, dotsMat)
    spinGroup.add(dots)

    const ringGeo = new THREE.RingGeometry(1.45, 1.47, 96)
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x22d3ee,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.4
    })
    const ring = new THREE.Mesh(ringGeo, ringMat)
    ring.rotation.x = Math.PI * 0.5
    scene.add(ring)

    // Spring-damped physics for the outer group.
    // Force = -k * displacement - c * velocity  →  always pulls back to rest.
    const K = 14 // spring stiffness (higher = snappier)
    const C = 3.2 // damping (higher = less oscillation)
    const DRAG_SENSITIVITY = 0.008
    const MAX_DT = 0.032 // clamp to prevent spring explosions after tab-switches

    const physics = {
      x: 0,
      y: 0,
      vx: 0,
      vy: 0
    }

    const drag = {
      active: false,
      pointerId: null,
      lastX: 0,
      lastY: 0,
      lastT: 0
    }

    const onPointerDown = e => {
      drag.active = true
      drag.pointerId = e.pointerId
      drag.lastX = e.clientX
      drag.lastY = e.clientY
      drag.lastT = performance.now()
      physics.vx = 0
      physics.vy = 0
      renderer.domElement.setPointerCapture?.(e.pointerId)
      renderer.domElement.style.cursor = 'grabbing'
    }

    const onPointerMove = e => {
      if (!drag.active || e.pointerId !== drag.pointerId) return
      const dx = e.clientX - drag.lastX
      const dy = e.clientY - drag.lastY
      const now = performance.now()
      const dt = Math.max((now - drag.lastT) / 1000, 0.001)

      const rotYDelta = dx * DRAG_SENSITIVITY
      const rotXDelta = dy * DRAG_SENSITIVITY

      physics.y += rotYDelta
      physics.x += rotXDelta

      // Momentum carried into release
      physics.vy = rotYDelta / dt
      physics.vx = rotXDelta / dt

      drag.lastX = e.clientX
      drag.lastY = e.clientY
      drag.lastT = now
    }

    const endDrag = e => {
      if (e && e.pointerId !== drag.pointerId) return
      drag.active = false
      drag.pointerId = null
      renderer.domElement.releasePointerCapture?.(e?.pointerId)
      renderer.domElement.style.cursor = 'grab'
    }

    renderer.domElement.addEventListener('pointerdown', onPointerDown)
    renderer.domElement.addEventListener('pointermove', onPointerMove)
    renderer.domElement.addEventListener('pointerup', endDrag)
    renderer.domElement.addEventListener('pointercancel', endDrag)
    renderer.domElement.addEventListener('pointerleave', endDrag)

    let reduced = false
    if (typeof window !== 'undefined' && window.matchMedia) {
      reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    }

    const ro = new ResizeObserver(entries => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect
        if (width > 0 && height > 0) {
          renderer.setSize(width, height, false)
          camera.aspect = 1
          camera.updateProjectionMatrix()
        }
      }
    })
    ro.observe(mount)

    renderer.domElement.style.cursor = 'grab'

    let frame = 0
    let last = performance.now()
    const tick = now => {
      const dt = Math.min((now - last) / 1000, MAX_DT)
      last = now

      if (!reduced) {
        innerSphere.rotation.y += dt * 0.35
        wireframe.rotation.y += dt * 0.5
        wireframe.rotation.x += dt * 0.08
        dots.rotation.y -= dt * 0.3
      }

      if (!drag.active) {
        // Spring pulling rotation back to (0, 0) with damping.
        const ax = -K * physics.x - C * physics.vx
        const ay = -K * physics.y - C * physics.vy
        physics.vx += ax * dt
        physics.vy += ay * dt
        physics.x += physics.vx * dt
        physics.y += physics.vy * dt

        // Snap to rest when the oscillation is imperceptible.
        if (
          Math.abs(physics.x) < 1e-4 &&
          Math.abs(physics.y) < 1e-4 &&
          Math.abs(physics.vx) < 1e-3 &&
          Math.abs(physics.vy) < 1e-3
        ) {
          physics.x = 0
          physics.y = 0
          physics.vx = 0
          physics.vy = 0
        }
      }

      physicsGroup.rotation.x = physics.x
      physicsGroup.rotation.y = physics.y

      ring.rotation.z += dt * 0.15

      renderer.render(scene, camera)
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(frame)
      renderer.domElement.removeEventListener('pointerdown', onPointerDown)
      renderer.domElement.removeEventListener('pointermove', onPointerMove)
      renderer.domElement.removeEventListener('pointerup', endDrag)
      renderer.domElement.removeEventListener('pointercancel', endDrag)
      renderer.domElement.removeEventListener('pointerleave', endDrag)
      ro.disconnect()
      innerGeo.dispose()
      innerMat.dispose()
      wireGeo.dispose()
      wireMat.dispose()
      dotsGeo.dispose()
      dotsMat.dispose()
      ringGeo.dispose()
      ringMat.dispose()
      renderer.dispose()
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      style={{ width: '100%', height: '100%' }}
    />
  )
}

export default Globe
