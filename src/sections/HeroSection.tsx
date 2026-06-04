import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ChevronDown } from 'lucide-react';
import * as THREE from 'three';
import ConfettiButton from '../components/ConfettiButton';

/* ─── Floating Particles ─── */
function FloatingParticles({ scrollProgress }: { scrollProgress: number }) {
  const pointsRef = useRef<THREE.Points>(null!);
  const count = 200;

  const positions = useRef<Float32Array | null>(null);
  const velocities = useRef<Float32Array | null>(null);

  useEffect(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
      vel[i] = 0.005 + Math.random() * 0.01;
    }
    positions.current = pos;
    velocities.current = vel;

    if (pointsRef.current) {
      pointsRef.current.geometry.setAttribute(
        'position',
        new THREE.BufferAttribute(pos, 3)
      );
    }
  }, []);

  useFrame(() => {
    if (!pointsRef.current || !positions.current || !velocities.current) return;
    const posArray = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const speed = 1 + scrollProgress * 2;
    for (let i = 0; i < count; i++) {
      posArray[i * 3 + 1] += velocities.current[i] * speed;
      if (posArray[i * 3 + 1] > 6) {
        posArray[i * 3 + 1] = -5;
        posArray[i * 3] = (Math.random() - 0.5) * 12;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  const initPos = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    initPos[i * 3] = (Math.random() - 0.5) * 12;
    initPos[i * 3 + 1] = (Math.random() - 0.5) * 10;
    initPos[i * 3 + 2] = (Math.random() - 0.5) * 8;
  }

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[initPos, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#C8A84E"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

/* ─── Procedural Trophy ─── */
function Trophy({ scrollProgress }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null!);
  const baseScale = 1.5;

  useFrame((_, delta: number) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.3;
    const targetScale = baseScale + scrollProgress * 0.5;
    groupRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.05
    );
  });

  const goldMat = new THREE.MeshStandardMaterial({
    color: '#C8A84E',
    metalness: 0.9,
    roughness: 0.1,
    emissive: '#C8A84E',
    emissiveIntensity: 0.05,
  });

  const greenMat = new THREE.MeshStandardMaterial({
    color: '#1B5E20',
    metalness: 0.4,
    roughness: 0.4,
  });

  return (
    <group ref={groupRef} position={[0, -0.5, 0]} scale={baseScale}>
      {/* Base - Marble slab */}
      <mesh position={[0, -1.2, 0]} castShadow receiveShadow material={greenMat}>
        <boxGeometry args={[1.2, 0.15, 0.8]} />
      </mesh>
      {/* Base - Middle tier */}
      <mesh position={[0, -1.05, 0]} castShadow material={goldMat}>
        <boxGeometry args={[1.0, 0.15, 0.65]} />
      </mesh>
      {/* Base - Top tier */}
      <mesh position={[0, -0.9, 0]} castShadow material={greenMat}>
        <boxGeometry args={[0.85, 0.15, 0.5]} />
      </mesh>
      {/* Central Stem */}
      <mesh position={[0, -0.4, 0]} castShadow material={goldMat}>
        <cylinderGeometry args={[0.1, 0.15, 0.7, 16]} />
      </mesh>
      {/* Left Figure Body */}
      <mesh position={[-0.35, 0.3, 0]} rotation={[0, 0, 0.15]} castShadow material={goldMat}>
        <cylinderGeometry args={[0.12, 0.08, 0.9, 12]} />
      </mesh>
      {/* Right Figure Body */}
      <mesh position={[0.35, 0.3, 0]} rotation={[0, 0, -0.15]} castShadow material={goldMat}>
        <cylinderGeometry args={[0.12, 0.08, 0.9, 12]} />
      </mesh>
      {/* Left Arm (raised) */}
      <mesh position={[-0.2, 0.65, 0]} rotation={[0, 0, -0.5]} castShadow material={goldMat}>
        <cylinderGeometry args={[0.06, 0.05, 0.5, 8]} />
      </mesh>
      {/* Right Arm (raised) */}
      <mesh position={[0.2, 0.65, 0]} rotation={[0, 0, 0.5]} castShadow material={goldMat}>
        <cylinderGeometry args={[0.06, 0.05, 0.5, 8]} />
      </mesh>
      {/* Globe / Earth Sphere */}
      <mesh position={[0, 1.05, 0]} castShadow material={goldMat}>
        <sphereGeometry args={[0.35, 32, 32]} />
      </mesh>
      {/* Globe Latitude Lines */}
      <mesh position={[0, 1.05, 0]} castShadow material={goldMat}>
        <torusGeometry args={[0.35, 0.008, 8, 64]} />
      </mesh>
      <mesh position={[0, 1.05, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow material={goldMat}>
        <torusGeometry args={[0.35, 0.008, 8, 64]} />
      </mesh>
    </group>
  );
}

/* ─── Ground Plane ─── */
function Ground() {
  const mat = new THREE.MeshStandardMaterial({
    color: '#1A1A1A',
    metalness: 0.5,
    roughness: 0.3,
  });

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.3, 0]} receiveShadow material={mat}>
      <planeGeometry args={[30, 30]} />
    </mesh>
  );
}

/* ─── Main Scene ─── */
function Scene({ scrollProgress }: { scrollProgress: number }) {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight
        color="#fff5e0"
        intensity={1.2}
        position={[5, 8, 5]}
        castShadow
      />
      <pointLight color="#C8A84E" intensity={0.5} position={[-3, 2, 3]} />
      <spotLight
        color="#ffffff"
        intensity={0.8}
        position={[0, 5, -5]}
        angle={0.5}
        penumbra={0.5}
      />
      <Trophy scrollProgress={scrollProgress} />
      <Ground />
      <FloatingParticles scrollProgress={scrollProgress} />
    </>
  );
}

/* ─── Hero Section ─── */
function HeroSection() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScroll, setShowScroll] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const halfVh = window.innerHeight * 0.5;
      const progress = Math.min(scrollY / halfVh, 1);
      setScrollProgress(progress);
      setShowScroll(scrollY < 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cameraZ = 8 - scrollProgress * 4;

  return (
    <section
      id="home"
      className="relative min-h-[700px] h-screen w-full overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/assets/hero-bg.jpg)' }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.85) 100%)',
          }}
        />
      </div>

      {/* 3D Canvas */}
      <div className="absolute inset-0 z-[1]">
        <Canvas
          shadows
          camera={{ position: [0, 2, cameraZ], fov: 45 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
        >
          <Scene scrollProgress={scrollProgress} />
        </Canvas>
      </div>

      {/* Text Content */}
      <div className="relative z-[2] flex flex-col justify-end h-full pb-24 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
        <div data-aos="fade-up" data-aos-delay="200">
          <p
            className="font-['Montserrat'] font-semibold text-xs uppercase tracking-[0.15em] mb-4"
            style={{ color: 'var(--gold)' }}
          >
            ICAD FIFA WORLD CUP 2026
          </p>
          <h1
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4"
            style={{ color: 'var(--white)', fontFamily: "'Oswald', sans-serif" }}
          >
            PREDICTION
            <br />
            CONTEST
          </h1>
          <p
            className="font-['Montserrat'] text-lg md:text-xl italic mb-2"
            style={{ color: 'var(--muted-white)' }}
          >
            Predict. Compete. Win.
          </p>
          <p
            className="text-sm mb-8"
            style={{ color: 'var(--football-white)' }}
          >
            Registration Now Open — 15 SR Entry Fee
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <ConfettiButton
              href="https://strawpoll.com/jVyG2aRKzZ7"
              variant="primary"
              className="!px-10 !py-4"
            >
              Register Now
            </ConfettiButton>
            <ConfettiButton
              variant="secondary"
              onClick={() => {
                document.getElementById('rules')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="!px-10 !py-4"
            >
              View Rules
            </ConfettiButton>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      {showScroll && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[2] bounce-down">
          <ChevronDown className="w-6 h-6" style={{ color: 'var(--gold)' }} />
        </div>
      )}
    </section>
  );
}

export default HeroSection;
