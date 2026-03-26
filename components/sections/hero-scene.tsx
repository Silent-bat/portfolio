"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function Particles({ count = 400 }) {
  const mesh = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const radius = 3 + Math.random() * 5;
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
      
      // Gold to white gradient
      const t = Math.random();
      colors[i * 3] = 0.85 + t * 0.15;
      colors[i * 3 + 1] = 0.65 + t * 0.35;
      colors[i * 3 + 2] = 0.2 + t * 0.8;
    }
    
    return { positions, colors };
  }, [count]);

  const startTime = useRef<number>(Date.now());

  useFrame(() => {
    if (mesh.current) {
      const elapsed = (Date.now() - startTime.current) / 1000;
      mesh.current.rotation.y = elapsed * 0.05;
      mesh.current.rotation.x = Math.sin(elapsed * 0.03) * 0.1;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles.positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[particles.colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

function TorusKnot() {
  const meshRef = useRef<THREE.Mesh>(null);
  const startTime = useRef<number>(Date.now());

  useFrame(() => {
    if (meshRef.current) {
      const elapsed = (Date.now() - startTime.current) / 1000;
      meshRef.current.rotation.x = elapsed * 0.1;
      meshRef.current.rotation.y = elapsed * 0.15;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} scale={1.2}>
        <torusKnotGeometry args={[1, 0.3, 128, 32]} />
        <MeshDistortMaterial
          color="#d4a855"
          wireframe
          distort={0.2}
          speed={2}
          roughness={0.4}
        />
      </mesh>
    </Float>
  );
}

function OrbitalRing({ radius = 2.5, speed = 1, tilt = 0 }: { radius?: number; speed?: number; tilt?: number }) {
  const ringRef = useRef<THREE.Group>(null);
  const dotRef = useRef<THREE.Mesh>(null);
  const startTime = useRef<number>(Date.now());
  
  const geometry = useMemo(() => {
    const points = [];
    for (let i = 0; i <= 64; i++) {
      const angle = (i / 64) * Math.PI * 2;
      points.push(new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius));
    }
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    return geo;
  }, [radius]);

  useFrame(() => {
    const elapsed = (Date.now() - startTime.current) / 1000;
    if (ringRef.current) {
      ringRef.current.rotation.x = tilt;
      ringRef.current.rotation.y = elapsed * 0.2;
    }
    if (dotRef.current) {
      const angle = elapsed * speed;
      dotRef.current.position.x = Math.cos(angle) * radius;
      dotRef.current.position.z = Math.sin(angle) * radius;
    }
  });

  return (
    <group ref={ringRef}>
      <line geometry={geometry}>
        <lineBasicMaterial color="#d4a855" transparent opacity={0.3} />
      </line>
      <mesh ref={dotRef}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshBasicMaterial color="#d4a855" />
      </mesh>
    </group>
  );
}

function MouseParallax() {
  const { camera } = useThree();
  
  useFrame(({ pointer }) => {
    const x = pointer.x * 0.3;
    const y = pointer.y * 0.3;
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, x, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, y, 0.05);
    camera.lookAt(0, 0, 0);
  });
  
  return null;
}

function Scene() {
  return (
    <>
      <color attach="background" args={["#0a0a0a"]} />
      <fog attach="fog" args={["#0a0a0a", 5, 15]} />
      
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#d4a855" />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#ffffff" />
      
      <TorusKnot />
      <Particles count={300} />
      <OrbitalRing radius={2.5} speed={0.5} tilt={Math.PI / 4} />
      <OrbitalRing radius={3} speed={0.3} tilt={-Math.PI / 3} />
      
      <MouseParallax />
    </>
  );
}

export function HeroScene() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  if (prefersReducedMotion) {
    // Show a simple static gradient for reduced-motion users
    return (
      <div className="!absolute inset-0 bg-gradient-to-br from-[#d4a855]/10 via-transparent to-[#d4a855]/5" />
    );
  }

  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 60 }}
      className="!absolute inset-0"
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: false }}
    >
      <Scene />
    </Canvas>
  );
}

