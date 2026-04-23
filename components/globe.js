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

    const group = new THREE.Group()
    scene.add(group)

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
    group.add(innerSphere)

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
    group.add(wireframe)

    const dotsGeo = new THREE.IcosahedronGeometry(1.22, 4)
    const dotsMat = new THREE.PointsMaterial({
      color: 0xff63c3,
      size: 0.018,
      transparent: true,
      opacity: 0.85
    })
    const dots = new THREE.Points(dotsGeo, dotsMat)
    group.add(dots)

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

    const pointer = { x: 0, y: 0, tx: 0, ty: 0 }
    const onMove = e => {
      const rect = mount.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      pointer.tx = (e.clientX - cx) / window.innerWidth
      pointer.ty = (e.clientY - cy) / window.innerHeight
    }
    window.addEventListener('pointermove', onMove, { passive: true })

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

    let frame = 0
    let last = performance.now()
    const tick = now => {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now

      if (!reduced) {
        innerSphere.rotation.y += dt * 0.35
        wireframe.rotation.y += dt * 0.5
        wireframe.rotation.x += dt * 0.08
        dots.rotation.y -= dt * 0.3
      }

      pointer.x += (pointer.tx - pointer.x) * 0.05
      pointer.y += (pointer.ty - pointer.y) * 0.05
      group.rotation.y = pointer.x * 0.6
      group.rotation.x = -pointer.y * 0.4

      ring.rotation.z += dt * 0.15

      renderer.render(scene, camera)
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onMove)
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
      style={{ width: '100%', height: '100%', cursor: 'grab' }}
    />
  )
}

export default Globe
