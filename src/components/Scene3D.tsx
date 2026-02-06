import { useRef, useMemo, forwardRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface GeometryProps {
  position: [number, number, number];
  color?: string;
  speed?: number;
  distort?: number;
}

const FloatingGeometry = forwardRef<THREE.Group, GeometryProps>(function FloatingGeometry(
  { position, color = '#00d9ff', speed = 1, distort = 0.3 },
  ref
) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1 * speed;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15 * speed;
    }
  });

  return (
    <group ref={ref} position={position}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[1, 1]} />
          <MeshDistortMaterial
            color={color}
            attach="material"
            distort={distort}
            speed={2}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
      </Float>
    </group>
  );
});

const TorusKnot = forwardRef<THREE.Group, { position: [number, number, number] }>(function TorusKnot(
  { position },
  ref
) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.05;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.08;
    }
  });

  return (
    <group ref={ref} position={position}>
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
        <mesh ref={meshRef}>
          <torusKnotGeometry args={[0.8, 0.25, 100, 16]} />
          <meshStandardMaterial
            color="#00d9ff"
            emissive="#00d9ff"
            emissiveIntensity={0.3}
            roughness={0.3}
            metalness={0.9}
          />
        </mesh>
      </Float>
    </group>
  );
});

const Octahedron = forwardRef<THREE.Group, { position: [number, number, number] }>(function Octahedron(
  { position },
  ref
) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <group ref={ref} position={position}>
      <Float speed={1} rotationIntensity={0.4} floatIntensity={0.8}>
        <mesh ref={meshRef}>
          <octahedronGeometry args={[0.7, 0]} />
          <meshStandardMaterial
            color="#8b5cf6"
            emissive="#8b5cf6"
            emissiveIntensity={0.2}
            roughness={0.2}
            metalness={0.9}
            wireframe
          />
        </mesh>
      </Float>
    </group>
  );
});

function ParticleField() {
  const particlesRef = useRef<THREE.Points>(null);
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(500 * 3);
    for (let i = 0; i < 500; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      particlesRef.current.rotation.x = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={500}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#00d9ff"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

export default function Scene3D() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#0a0a1a']} />
        
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00d9ff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
        <spotLight
          position={[0, 10, 0]}
          angle={0.3}
          penumbra={1}
          intensity={0.5}
          color="#00d9ff"
        />
        
        <FloatingGeometry position={[-4, 2, -5]} color="#00d9ff" speed={0.8} distort={0.4} />
        <FloatingGeometry position={[4, -2, -3]} color="#8b5cf6" speed={1.2} distort={0.3} />
        <TorusKnot position={[5, 3, -6]} />
        <Octahedron position={[-5, -3, -4]} />
        
        <ParticleField />
        
        <Stars
          radius={50}
          depth={50}
          count={1000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />
      </Canvas>
    </div>
  );
}
