import { Environment, Float, Image, OrbitControls, Sparkles, Stars, Text } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { useNexusStore, type Location } from './store'

const marble = new THREE.MeshStandardMaterial({ color: '#aaa79f', roughness: .78, metalness: .02 })
const bronze = new THREE.MeshStandardMaterial({ color: '#725638', roughness: .38, metalness: .65 })

function Column({ x, z, height = 8 }: { x: number; z: number; height?: number }) {
  return <group position={[x, height / 2 - 2.4, z]}>
    <mesh material={marble}><cylinderGeometry args={[.34, .48, height, 12]} /></mesh>
    <mesh position={[0, height / 2, 0]} material={bronze}><cylinderGeometry args={[.72, .6, .22, 12]} /></mesh>
    <mesh position={[0, -height / 2, 0]} material={marble}><cylinderGeometry args={[.7, .75, .32, 12]} /></mesh>
  </group>
}

function Angel() {
  const group = useRef<THREE.Group>(null!)
  const [hovered, setHovered] = useState(false)
  const dragX = useRef<number | null>(null)
  useFrame((_, delta) => { if (dragX.current === null) group.current.rotation.y += delta * .045 })
  return <group ref={group} position={[0, -1.65, 0]} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}
    onPointerDown={(event) => { event.stopPropagation(); dragX.current = event.clientX; (event.target as HTMLElement).setPointerCapture?.(event.pointerId) }}
    onPointerMove={(event) => { if (dragX.current !== null) { group.current.rotation.y += (event.clientX - dragX.current) * .012; dragX.current = event.clientX } }}
    onPointerUp={() => { dragX.current = null }}>
    <mesh castShadow material={marble}><cylinderGeometry args={[.58, .78, 3.8, 10]} /></mesh>
    <mesh position={[0, 2.2, 0]} material={marble}><sphereGeometry args={[.68, 24, 20]} /></mesh>
    <mesh position={[0, 3.03, 0]} material={bronze}><torusGeometry args={[.86, .055, 8, 32]} /></mesh>
    {[-1, 1].map((side) => <group key={side} position={[side * .72, 1.35, .05]} rotation={[0, 0, side * -.13]}>
      {[0, .27, .54, .81, 1.08, 1.35].map((y, i) => <mesh key={y} position={[side * (.52 + y * .33), y, -i * .025]} rotation={[0, .11 * side, side * (-.52 + i * .035)]} material={hovered ? bronze : marble}><sphereGeometry args={[.73 - y * .15, 14, 10]} /></mesh>)}
    </group>)}
    <mesh position={[0, .2, .68]} rotation={[Math.PI / 2, 0, 0]} material={bronze}><torusGeometry args={[.22, .055, 8, 20]} /></mesh>
  </group>
}

function Portal({ side, target, label }: { side: -1 | 1; target: Location; label: string }) {
  const ref = useRef<THREE.Group>(null!)
  const [hovered, setHovered] = useState(false)
  const setPortal = useNexusStore((s) => s.setPortal)
  const setLocation = useNexusStore((s) => s.setLocation)
  useFrame(({ clock }) => { ref.current.position.y = Math.sin(clock.elapsedTime * 1.3 + side) * .18; ref.current.rotation.y += .003 })
  return <group ref={ref} position={[side * 5.2, 1.25, -.5]} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)} onClick={() => { setPortal(target); window.setTimeout(() => setLocation(target), 420) }}>
    <mesh><sphereGeometry args={[.9, 32, 20]} /><meshPhysicalMaterial color={hovered ? '#e8c476' : '#7c9ab2'} transmission={.55} thickness={1.2} roughness={.18} metalness={.48} emissive={hovered ? '#c08b32' : '#172c3a'} emissiveIntensity={hovered ? 1.8 : .55} /></mesh>
    <mesh scale={1.22} material={bronze}><torusGeometry args={[.9, .045, 8, 36]} /></mesh>
    {hovered && <Text position={[0, -1.45, 0]} color="#f4e6c8" fontSize={.26} letterSpacing={.12}>{label.toUpperCase()}</Text>}
  </group>
}

function CameraRig() {
  const { camera } = useThree(); const location = useNexusStore((s) => s.location)
  useFrame(() => { const point = location === 'home' ? new THREE.Vector3(0, 1, 12) : new THREE.Vector3(0, 1, 8); camera.position.lerp(point, .028) })
  return null
}

function Temple() {
  const quality = useNexusStore((s) => s.quality)
  const fragments = useMemo(() => Array.from({ length: quality === 'lite' ? 8 : 18 }, (_, i) => [Math.sin(i * 23) * 15, 3 + (i % 5) * .7, -7 - (i % 4) * 2] as const), [quality])
  return <>
    <color attach="background" args={['#1c1e21']} /><fog attach="fog" args={['#1c1e21', 11, 32]} />
    <ambientLight intensity={.4} /><directionalLight position={[4, 8, 5]} intensity={3.2} color="#f2c675" castShadow />
    <pointLight position={[0, 3, 2]} intensity={7} color="#b1d2e8" distance={8} />
    <Stars radius={80} depth={22} count={quality === 'lite' ? 400 : 1200} factor={2} fade speed={.35} />
    <Sparkles count={quality === 'lite' ? 40 : 170} scale={[22, 10, 14]} size={2} speed={.25} color="#f1d39c" />
    <Image url="/images/angel-ruins-reference.png" position={[0, 2.3, -7.5]} scale={[10.4, 10.4]} transparent opacity={.17} toneMapped={false} />
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.42, 0]} receiveShadow material={marble}><circleGeometry args={[18, 48]} /></mesh>
    {Array.from({ length: 13 }, (_, i) => <mesh key={`rubble-${i}`} position={[Math.sin(i * 2.42) * (1.3 + (i % 3) * .55), -2.12 + (i % 2) * .14, Math.cos(i * 3.1) * (1.4 + (i % 4) * .25)]} rotation={[i, i * .8, 0]} material={marble}><dodecahedronGeometry args={[.24 + (i % 4) * .13, 0]} /></mesh>)}
    {[-7, 7].flatMap((x) => [-4, 2, 8].map((z) => <Column key={`${x}${z}`} x={x} z={z} height={z === 8 ? 10 : 7} />))}
    {fragments.map(([x,y,z], i) => <Float key={i} speed={.7} rotationIntensity={.3}><mesh position={[x,y,z]} rotation={[i, i*.6, 0]} material={marble}><boxGeometry args={[1.4, .4, 2.5]} /></mesh></Float>)}
    <Angel /><Portal side={-1} target="identity" label="Identity Sanctuary" /><Portal side={1} target="archives" label="Project Archives" />
    <Environment preset="night" /><CameraRig />
  </>
}

export function NexusScene() { return <Canvas shadows dpr={[1, 1.75]} camera={{ position: [0, 1, 12], fov: 42 }}><Temple /><OrbitControls enablePan={false} minDistance={6} maxDistance={16} minPolarAngle={.8} maxPolarAngle={2.15} autoRotate={false} /></Canvas> }
