'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Html, OrbitControls, RoundedBox, Sky, Sparkles } from '@react-three/drei';
import { Suspense, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { agents, statusCopy, type GardenAgent } from '@/lib/gardenData';
import { useGardenStore } from '@/lib/store';

const WALK_SPEED = 0.36;

function vec([x, y, z]: [number, number, number]) {
  return new THREE.Vector3(x, y, z);
}

function GardenBed({ position, rotation = 0, crop = 'greens' }: { position: [number, number, number]; rotation?: number; crop?: 'tomatoes' | 'corn' | 'flowers' | 'greens' | 'carrots' | 'peppers' }) {
  const cropColors: Record<string, string[]> = {
    tomatoes: ['#3f9b42', '#e94338'],
    corn: ['#4a8b35', '#f0ca4d'],
    flowers: ['#4ea84e', '#ff8fcb'],
    greens: ['#65c95d', '#4fbd4d'],
    carrots: ['#489b3f', '#f28730'],
    peppers: ['#48a64a', '#ffcf5a'],
  };
  const colors = cropColors[crop];

  return (
    <group position={position} rotation={[0, rotation, 0]}>
      <RoundedBox args={[2.15, 0.28, 1.08]} radius={0.12} smoothness={3} position={[0, 0.05, 0]} castShadow receiveShadow>
        <meshStandardMaterial color="#9a6032" roughness={0.82} />
      </RoundedBox>
      <RoundedBox args={[1.82, 0.16, 0.78]} radius={0.08} smoothness={2} position={[0, 0.22, 0]} castShadow receiveShadow>
        <meshStandardMaterial color="#4b2b18" roughness={0.95} />
      </RoundedBox>
      {Array.from({ length: 10 }).map((_, i) => {
        const x = -0.74 + (i % 5) * 0.37;
        const z = -0.22 + Math.floor(i / 5) * 0.42;
        return (
          <group key={i} position={[x, 0.38, z]}>
            <mesh castShadow position={[0, 0.11, 0]}>
              <coneGeometry args={[0.09, crop === 'corn' ? 0.54 : 0.26, crop === 'flowers' ? 8 : 5]} />
              <meshStandardMaterial color={colors[0]} roughness={0.72} />
            </mesh>
            {crop !== 'greens' && (
              <mesh castShadow position={[0.04, crop === 'corn' ? 0.36 : 0.26, 0.03]}>
                <sphereGeometry args={[crop === 'corn' ? 0.06 : 0.08, 10, 8]} />
                <meshStandardMaterial color={colors[1]} roughness={0.65} />
              </mesh>
            )}
          </group>
        );
      })}
    </group>
  );
}

function CornField() {
  return (
    <group position={[3.4, 0.12, -3.1]} rotation={[0, -0.22, 0]}>
      {Array.from({ length: 36 }).map((_, i) => {
        const x = -1.05 + (i % 6) * 0.42;
        const z = -0.92 + Math.floor(i / 6) * 0.36;
        return (
          <group key={i} position={[x, 0, z]}>
            <mesh castShadow position={[0, 0.45, 0]} rotation={[0.08 * Math.sin(i), 0, 0.08 * Math.cos(i)]}>
              <coneGeometry args={[0.11, 0.9, 5]} />
              <meshStandardMaterial color={i % 4 === 0 ? '#d5b748' : '#4e8f35'} roughness={0.78} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

function FarmHouse() {
  return (
    <group position={[-5.55, 0.08, 2.75]} rotation={[0, 0.22, 0]}>
      <RoundedBox args={[3.2, 1.55, 2.05]} radius={0.08} smoothness={3} position={[0, 0.78, 0]} castShadow receiveShadow>
        <meshStandardMaterial color="#fff8e7" roughness={0.56} />
      </RoundedBox>
      <mesh castShadow position={[0, 1.8, 0]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[2.25, 1.0, 4]} />
        <meshStandardMaterial color="#3b3e39" roughness={0.72} />
      </mesh>
      <RoundedBox args={[3.75, 0.18, 1.0]} radius={0.06} smoothness={2} position={[0.35, 0.28, -1.55]} receiveShadow>
        <meshStandardMaterial color="#d5c2a0" roughness={0.8} />
      </RoundedBox>
      {[-1.1, 0, 1.1].map((x) => (
        <mesh key={x} castShadow position={[x, 0.82, -1.95]}>
          <cylinderGeometry args={[0.055, 0.055, 0.9, 8]} />
          <meshStandardMaterial color="#efe3c7" />
        </mesh>
      ))}
      <mesh position={[-0.72, 0.95, -1.04]} castShadow>
        <boxGeometry args={[0.48, 0.42, 0.04]} />
        <meshStandardMaterial color="#9ed7ff" emissive="#214861" emissiveIntensity={0.16} />
      </mesh>
      <mesh position={[0.72, 0.95, -1.04]} castShadow>
        <boxGeometry args={[0.48, 0.42, 0.04]} />
        <meshStandardMaterial color="#9ed7ff" emissive="#214861" emissiveIntensity={0.16} />
      </mesh>
      <mesh position={[0, 0.55, -1.06]} castShadow>
        <boxGeometry args={[0.44, 0.82, 0.06]} />
        <meshStandardMaterial color="#65391f" roughness={0.65} />
      </mesh>
    </group>
  );
}

function Shed() {
  return (
    <group position={[-4.95, 0.1, -1.55]} rotation={[0, -0.38, 0]}>
      <RoundedBox args={[1.35, 1.0, 1.05]} radius={0.06} smoothness={2} position={[0, 0.5, 0]} castShadow receiveShadow>
        <meshStandardMaterial color="#8c5731" roughness={0.86} />
      </RoundedBox>
      <mesh castShadow position={[0, 1.18, 0]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[1.02, 0.52, 4]} />
        <meshStandardMaterial color="#9b4e2d" roughness={0.74} />
      </mesh>
      <mesh position={[0.02, 0.4, -0.54]} castShadow>
        <boxGeometry args={[0.38, 0.62, 0.05]} />
        <meshStandardMaterial color="#432513" />
      </mesh>
      <mesh position={[0.74, 0.62, -0.28]} rotation={[0, 0, -0.38]} castShadow>
        <cylinderGeometry args={[0.035, 0.035, 1.15, 7]} />
        <meshStandardMaterial color="#d3b06e" />
      </mesh>
    </group>
  );
}

function OakTree({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh castShadow position={[0, 0.6, 0]}>
        <cylinderGeometry args={[0.18, 0.3, 1.2, 9]} />
        <meshStandardMaterial color="#70451f" roughness={0.88} />
      </mesh>
      {[[0, 1.45, 0], [-0.45, 1.25, 0.05], [0.38, 1.24, 0.12], [0.05, 1.72, -0.24]].map((p, i) => (
        <mesh key={i} castShadow position={p as [number, number, number]}>
          <sphereGeometry args={[i === 0 ? 0.78 : 0.58, 13, 9]} />
          <meshStandardMaterial color={i % 2 ? '#4f8c33' : '#6aa342'} roughness={0.8} />
        </mesh>
      ))}
    </group>
  );
}

function Scarecrow() {
  return (
    <group position={[2.05, 0.14, -3.0]} rotation={[0, -0.22, 0]}>
      <mesh castShadow position={[0, 0.6, 0]}><cylinderGeometry args={[0.04, 0.04, 1.2, 7]} /><meshStandardMaterial color="#76512c" /></mesh>
      <mesh castShadow position={[0, 0.94, 0]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.04, 0.04, 1.05, 7]} /><meshStandardMaterial color="#76512c" /></mesh>
      <mesh castShadow position={[0, 0.88, 0]}><boxGeometry args={[0.42, 0.45, 0.16]} /><meshStandardMaterial color="#3f7141" /></mesh>
      <mesh castShadow position={[0, 1.25, 0]}><sphereGeometry args={[0.18, 12, 8]} /><meshStandardMaterial color="#d5a35f" /></mesh>
      <mesh castShadow position={[0, 1.46, 0]}><coneGeometry args={[0.28, 0.26, 4]} /><meshStandardMaterial color="#d7bd65" /></mesh>
    </group>
  );
}

function RedTruck() {
  return (
    <group position={[4.9, 0.18, 4.05]} rotation={[0, -0.52, 0]}>
      <RoundedBox args={[1.35, 0.45, 0.72]} radius={0.08} smoothness={2} position={[-0.24, 0.35, 0]} castShadow>
        <meshStandardMaterial color="#a51f1f" roughness={0.58} />
      </RoundedBox>
      <RoundedBox args={[0.75, 0.68, 0.7]} radius={0.08} smoothness={2} position={[0.72, 0.5, 0]} castShadow>
        <meshStandardMaterial color="#c52b28" roughness={0.58} />
      </RoundedBox>
      <mesh position={[0.82, 0.62, -0.36]} castShadow><boxGeometry args={[0.34, 0.22, 0.04]} /><meshStandardMaterial color="#9ed7ff" /></mesh>
      {[-0.72, 0.64].map((x) => [-0.42, 0.42].map((z) => (
        <mesh key={`${x}-${z}`} castShadow position={[x, 0.14, z]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.18, 0.18, 0.12, 16]} />
          <meshStandardMaterial color="#181818" roughness={0.5} />
        </mesh>
      )))}
      <mesh position={[-0.45, 0.62, 0]} castShadow><boxGeometry args={[0.45, 0.22, 0.48]} /><meshStandardMaterial color="#d2aa62" /></mesh>
    </group>
  );
}

function Tractor() {
  const ref = useRef<THREE.Group>(null);
  const path = useMemo(() => [new THREE.Vector3(4.6, 0.22, 1.7), new THREE.Vector3(5.4, 0.22, -0.25), new THREE.Vector3(4.2, 0.22, -1.8), new THREE.Vector3(3.2, 0.22, 0.25)], []);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = (clock.elapsedTime * 0.14) % path.length;
    const i = Math.floor(t);
    const a = path[i];
    const b = path[(i + 1) % path.length];
    const localT = t - i;
    ref.current.position.lerpVectors(a, b, localT);
    ref.current.rotation.y = Math.atan2(b.x - a.x, b.z - a.z);
  });
  return (
    <group ref={ref}>
      <RoundedBox args={[0.76, 0.42, 0.56]} radius={0.07} smoothness={2} position={[0, 0.35, 0]} castShadow><meshStandardMaterial color="#c8352d" /></RoundedBox>
      <RoundedBox args={[0.32, 0.48, 0.42]} radius={0.06} smoothness={2} position={[0.32, 0.63, 0]} castShadow><meshStandardMaterial color="#2a2a28" /></RoundedBox>
      <RoundedBox args={[0.92, 0.32, 0.62]} radius={0.06} smoothness={2} position={[-0.83, 0.3, 0]} castShadow><meshStandardMaterial color="#8f5a32" /></RoundedBox>
      {[-1.03, -0.63].map((x) => <mesh key={x} position={[x, 0.54, 0]} castShadow><boxGeometry args={[0.18, 0.28, 0.46]} /><meshStandardMaterial color="#e6c86d" /></mesh>)}
      {[-0.22, 0.35].map((x) => [-0.34, 0.34].map((z) => <mesh key={`${x}-${z}`} position={[x, 0.12, z]} rotation={[Math.PI / 2, 0, 0]} castShadow><cylinderGeometry args={[x > 0 ? 0.2 : 0.15, x > 0 ? 0.2 : 0.15, 0.11, 18]} /><meshStandardMaterial color="#111" /></mesh>))}
    </group>
  );
}

function Bird({ offset = 0, z = -1.2 }: { offset?: number; z?: number }) {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = ((clock.elapsedTime * 0.13 + offset) % 1);
    ref.current.position.set(-6.5 + t * 13, 4.2 + Math.sin(t * Math.PI * 2) * 0.25, z + Math.sin(t * 5) * 0.9);
    ref.current.rotation.z = Math.sin(clock.elapsedTime * 8) * 0.18;
  });
  return <group ref={ref}><mesh castShadow><coneGeometry args={[0.08, 0.32, 5]} /><meshStandardMaterial color="#101010" /></mesh><mesh position={[-0.18, 0, 0]} rotation={[0, 0, 0.8]}><boxGeometry args={[0.28, 0.025, 0.08]} /><meshStandardMaterial color="#101010" /></mesh><mesh position={[0.18, 0, 0]} rotation={[0, 0, -0.8]}><boxGeometry args={[0.28, 0.025, 0.08]} /><meshStandardMaterial color="#101010" /></mesh></group>;
}

function Gnome({ agent, index }: { agent: GardenAgent; index: number }) {
  const ref = useRef<THREE.Group>(null);
  const leftLeg = useRef<THREE.Mesh>(null);
  const rightLeg = useRef<THREE.Mesh>(null);
  const action = useRef<THREE.Group>(null);
  const selectedAgent = useGardenStore((s) => s.selectedAgent);
  const setSelectedAgent = useGardenStore((s) => s.setSelectedAgent);
  const path = useMemo(() => agent.patrol.map(vec), [agent]);
  const scale = agent.id === 'fat-man' ? 1.22 : agent.id === 'little-boy' ? 0.72 : 0.9;

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const speed = agent.id === 'little-boy' ? WALK_SPEED * 2.0 : agent.id === 'chronic' || agent.id === 'homie' || agent.id === 'big' ? WALK_SPEED * 0.25 : WALK_SPEED;
    const t = (clock.elapsedTime * speed + index * 0.42) % path.length;
    const i = Math.floor(t);
    const a = path[i];
    const b = path[(i + 1) % path.length];
    const f = t - i;
    ref.current.position.lerpVectors(a, b, f);
    ref.current.position.y = 0.16 + Math.sin(clock.elapsedTime * (agent.id === 'little-boy' ? 9 : 5) + index) * 0.035;
    ref.current.rotation.y = Math.atan2(b.x - a.x, b.z - a.z);
    const walk = Math.sin(clock.elapsedTime * (agent.id === 'little-boy' ? 11 : 7) + index);
    if (leftLeg.current) leftLeg.current.rotation.x = walk * 0.35;
    if (rightLeg.current) rightLeg.current.rotation.x = -walk * 0.35;
    if (action.current) action.current.rotation.y += 0.018;
  });

  const selected = selectedAgent.id === agent.id;

  return (
    <group ref={ref} scale={scale} onClick={(e) => { e.stopPropagation(); setSelectedAgent(agent); }}>
      <mesh receiveShadow position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.42, 24]} />
        <meshBasicMaterial color="#000000" transparent opacity={selected ? 0.34 : 0.18} />
      </mesh>
      <mesh ref={leftLeg} castShadow position={[-0.12, 0.27, 0]}><capsuleGeometry args={[0.055, 0.24, 4, 8]} /><meshStandardMaterial color="#244c75" /></mesh>
      <mesh ref={rightLeg} castShadow position={[0.12, 0.27, 0]}><capsuleGeometry args={[0.055, 0.24, 4, 8]} /><meshStandardMaterial color="#244c75" /></mesh>
      <mesh castShadow position={[0, 0.62, 0]}><capsuleGeometry args={[0.22, 0.38, 7, 12]} /><meshStandardMaterial color={agent.outfit} roughness={0.62} /></mesh>
      <mesh castShadow position={[0, 1.02, 0]}><sphereGeometry args={[0.22, 18, 12]} /><meshStandardMaterial color={agent.skinTone} roughness={0.55} /></mesh>
      <mesh castShadow position={[0, 1.33, 0]} rotation={[0, 0, 0.05]}><coneGeometry args={[0.25, 0.62, 18]} /><meshStandardMaterial color={agent.id === 'gardiner' || agent.id === 'fat-man' ? '#d7bd65' : agent.color} roughness={0.58} /></mesh>
      <mesh castShadow position={[0, 0.88, 0.19]}><sphereGeometry args={[0.07, 12, 8]} /><meshStandardMaterial color={agent.skinTone} /></mesh>
      <mesh castShadow position={[0, 0.84, 0.15]}><coneGeometry args={[agent.id === 'chronic' || agent.id === 'big' ? 0.18 : 0.12, 0.2, 12]} /><meshStandardMaterial color={agent.hair} /></mesh>
      <mesh castShadow position={[-0.24, 0.65, 0.03]} rotation={[0, 0, 0.35]}><capsuleGeometry args={[0.045, 0.35, 4, 8]} /><meshStandardMaterial color={agent.skinTone} /></mesh>
      <mesh castShadow position={[0.24, 0.65, 0.03]} rotation={[0, 0, -0.35]}><capsuleGeometry args={[0.045, 0.35, 4, 8]} /><meshStandardMaterial color={agent.skinTone} /></mesh>
      <AgentProp agent={agent} />
      <group ref={action} position={[0.38, 1.1, 0.05]}>
        {agent.id === 'chronic' && <Smoke />}
        {agent.id === 'ganja' && <SeedFx />}
        {agent.id === 'cyph3r' && <ScanFx />}
        {agent.id === 'homie' && <MusicNotes />}
      </group>
      <Html position={[0, 1.82, 0]} center distanceFactor={10} occlude={false} className="gnome-label-wrap">
        <button className={`gnome-label ${selected ? 'selected' : ''}`} onClick={(e) => { e.stopPropagation(); setSelectedAgent(agent); }}>
          {agent.name}
        </button>
      </Html>
    </group>
  );
}

function AgentProp({ agent }: { agent: GardenAgent }) {
  if (agent.id === 'ganja') return <mesh castShadow position={[0.34, 0.55, 0.2]} rotation={[0.3, 0.3, 0.2]}><boxGeometry args={[0.14, 0.22, 0.08]} /><meshStandardMaterial color="#b97835" /></mesh>;
  if (agent.id === 'bak3r') return <mesh castShadow position={[0.34, 0.48, 0.08]}><torusGeometry args={[0.16, 0.035, 8, 16]} /><meshStandardMaterial color="#c7954d" /></mesh>;
  if (agent.id === 'cyph3r') return <mesh castShadow position={[0.34, 0.72, 0.14]}><boxGeometry args={[0.22, 0.16, 0.03]} /><meshStandardMaterial color="#50fa7b" emissive="#1c7f39" emissiveIntensity={0.4} /></mesh>;
  if (agent.id === 'gardiner') return <mesh castShadow position={[-0.36, 0.56, 0.14]} rotation={[0, 0, -0.5]}><cylinderGeometry args={[0.025, 0.025, 0.52, 8]} /><meshStandardMaterial color="#c8a15c" /></mesh>;
  if (agent.id === 'fat-man') return <mesh castShadow position={[0.32, 1.05, 0.22]} rotation={[1.2, 0, 0.35]}><cylinderGeometry args={[0.018, 0.018, 0.32, 6]} /><meshStandardMaterial color="#e0c261" /></mesh>;
  if (agent.id === 'little-boy') return <mesh castShadow position={[0.42, 1.0, 0.16]} rotation={[0.2, 0, -0.4]}><coneGeometry args={[0.08, 0.3, 3]} /><meshStandardMaterial color="#ffffff" /></mesh>;
  if (agent.id === 'big') return <mesh castShadow position={[0, 1.45, 0]}><cylinderGeometry args={[0.28, 0.28, 0.06, 18]} /><meshStandardMaterial color="#151515" /></mesh>;
  return null;
}

function Smoke() {
  return <><mesh position={[0, 0, 0]}><sphereGeometry args={[0.06, 10, 8]} /><meshBasicMaterial color="#dfffd9" transparent opacity={0.35} /></mesh><mesh position={[0.12, 0.18, 0.02]}><sphereGeometry args={[0.09, 10, 8]} /><meshBasicMaterial color="#dfffd9" transparent opacity={0.2} /></mesh></>;
}
function SeedFx() { return <Sparkles count={12} scale={[0.8, 0.35, 0.8]} size={3} speed={0.35} color="#fbe38a" />; }
function ScanFx() { return <mesh rotation={[Math.PI / 2, 0, 0]}><ringGeometry args={[0.25, 0.32, 28]} /><meshBasicMaterial color="#bd93f9" transparent opacity={0.55} /></mesh>; }
function MusicNotes() { return <Html center distanceFactor={7} className="music-note">♪</Html>; }

function Ground() {
  return (
    <group>
      <RoundedBox args={[12.7, 0.34, 9.4]} radius={0.35} smoothness={5} position={[0, -0.2, 0]} receiveShadow>
        <meshStandardMaterial color="#5f983f" roughness={0.92} />
      </RoundedBox>
      <mesh position={[4.3, 0.005, 3.45]} rotation={[-Math.PI / 2, 0, -0.18]} receiveShadow>
        <planeGeometry args={[4.8, 1.35]} />
        <meshStandardMaterial color="#b5a17d" roughness={0.96} />
      </mesh>
      <mesh position={[-1.1, 0.01, 0.6]} rotation={[-Math.PI / 2, 0, 0.16]} receiveShadow>
        <planeGeometry args={[6.5, 0.52]} />
        <meshStandardMaterial color="#c4ad80" roughness={0.95} />
      </mesh>
      <mesh position={[0.45, 0.012, -0.55]} rotation={[-Math.PI / 2, 0, 1.35]} receiveShadow>
        <planeGeometry args={[4.9, 0.48]} />
        <meshStandardMaterial color="#d0bd8b" roughness={0.94} />
      </mesh>
    </group>
  );
}

function Scene() {
  return (
    <>
      <color attach="background" args={['#bfe8ff']} />
      <fog attach="fog" args={['#bfe8ff', 13, 24]} />
      <Sky sunPosition={[6, 7, 4]} turbidity={5} rayleigh={1.2} mieCoefficient={0.02} mieDirectionalG={0.65} />
      <ambientLight intensity={0.72} />
      <directionalLight position={[4, 8, 4]} intensity={2.1} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
      <hemisphereLight args={['#f7ffe7', '#315733', 1.15]} />
      <Ground />
      <FarmHouse />
      <Shed />
      <OakTree position={[-4.15, 0, 2.52]} />
      <OakTree position={[-5.2, 0, 4.12]} />
      <GardenBed position={[-1.6, 0.04, -0.85]} rotation={0.15} crop="tomatoes" />
      <GardenBed position={[0.7, 0.04, -0.92]} rotation={-0.08} crop="carrots" />
      <GardenBed position={[2.55, 0.04, -0.55]} rotation={0.16} crop="flowers" />
      <GardenBed position={[-1.05, 0.04, 1.05]} rotation={-0.16} crop="greens" />
      <GardenBed position={[1.45, 0.04, 1.14]} rotation={0.12} crop="peppers" />
      <CornField />
      <Scarecrow />
      <RedTruck />
      <Tractor />
      <Bird offset={0.1} z={-1.4} />
      <Bird offset={0.55} z={1.5} />
      <Sparkles count={42} scale={[10, 2, 7]} position={[0, 1.2, 0]} speed={0.16} size={1.4} color="#f9e7a1" />
      {agents.map((agent, index) => <Gnome key={agent.id} agent={agent} index={index} />)}
      <OrbitControls enablePan={false} enableZoom={false} enableRotate={false} />
    </>
  );
}

export function GardenWorld() {
  return (
    <section className="world-shell real-3d" aria-label="Three.js animated low-poly gnome garden dashboard">
      <Canvas shadows dpr={[1, 1.35]} orthographic camera={{ position: [7.8, 7.2, 8.6], zoom: 64, near: 0.1, far: 100 }} gl={{ antialias: true, powerPreference: 'high-performance' }}>
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
      <div className="world-caption">real Three.js garden • walking gnome agents • Vercel-safe low-poly scene</div>
    </section>
  );
}
