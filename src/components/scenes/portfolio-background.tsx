"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const CONFIG = {
  colorA: 0x00f2ff, // Cyan
  colorB: 0x7000ff, // Purple
  colorC: 0xff0055, // Red (Glitch)
  bgColor: 0x050505,
};

interface PortfolioBackgroundProps {
  onEnterPortfolio?: () => void;
}

export const PortfolioBackground: React.FC<PortfolioBackgroundProps> = ({ 
  onEnterPortfolio 
}) => {
  const coreGroupRef = useRef<THREE.Group>(null);
  const terrainRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const knotMeshRef = useRef<THREE.Mesh>(null);
  const { camera } = useThree();
  
  const [isHovering, setIsHovering] = React.useState(false);
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });

  // 1. The Core (Torus Knot)
  const geometryKnot = useMemo(() => {
    return new THREE.TorusKnotGeometry(6, 1.8, 150, 20);
  }, []);

  // Material 1: Wireframe Glow
  const matWire = useMemo(() => {
    return new THREE.MeshBasicMaterial({ 
      color: CONFIG.colorA, 
      wireframe: true, 
      transparent: true, 
      opacity: 0.15,
      blending: THREE.AdditiveBlending
    });
  }, []);

  // Material 2: The Dark Glass Interior
  const matSolid = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: 0x000000,
      metalness: 0.9,
      roughness: 0.2,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      emissive: CONFIG.colorB,
      emissiveIntensity: 0.2
    });
  }, []);

  // 2. Digital Terrain
  const planeGeometry = useMemo(() => {
    return new THREE.PlaneGeometry(200, 200, 40, 40);
  }, []);

  const planeMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: CONFIG.colorB,
      wireframe: true,
      transparent: true,
      opacity: 0.1
    });
  }, []);

  // 3. Particles
  const particlesGeometry = useMemo(() => {
    const particlesCount = 1000;
    const posArray = new Float32Array(particlesCount * 3);
    const randomArray = new Float32Array(particlesCount);

    for (let i = 0; i < particlesCount; i++) {
      posArray[i * 3 + 0] = (Math.random() - 0.5) * 100;
      posArray[i * 3 + 1] = (Math.random() - 0.5) * 100;
      posArray[i * 3 + 2] = (Math.random() - 0.5) * 100;
      randomArray[i] = Math.random();
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    geometry.setAttribute('aRandom', new THREE.BufferAttribute(randomArray, 1));
    return geometry;
  }, []);

  const particlesMaterial = useMemo(() => {
    return new THREE.PointsMaterial({
      size: 0.15,
      color: CONFIG.colorA,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });
  }, []);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const windowHalfX = window.innerWidth / 2;
      const windowHalfY = window.innerHeight / 2;
      
      const mouseX = (e.clientX - windowHalfX);
      const mouseY = (e.clientY - windowHalfY);
      
      setMousePos({ x: mouseX, y: mouseY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animation loop
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    // 1. Smooth Scene Rotation
    const targetX = mousePos.x * 0.0005;
    const targetY = mousePos.y * 0.0005;

    if (coreGroupRef.current) {
      coreGroupRef.current.rotation.y += 0.005;
      coreGroupRef.current.rotation.x += 0.002;
      
      coreGroupRef.current.rotation.y += 0.05 * (targetX - coreGroupRef.current.rotation.y);
      coreGroupRef.current.rotation.x += 0.05 * (targetY - coreGroupRef.current.rotation.x);
    }

    // 2. Terrain Movement
    if (terrainRef.current) {
      const positionAttribute = terrainRef.current.geometry.attributes.position;
      for (let i = 0; i < positionAttribute.count; i++) {
        const z = positionAttribute.getY(i);
        const wave = Math.sin(time * 2 + positionAttribute.getX(i) * 0.5) * 2;
        positionAttribute.setZ(i, wave);
      }
      positionAttribute.needsUpdate = true;
      
      terrainRef.current.position.z = (time * 10) % 20;
    }

    // 3. Raycasting & Glitch Effect
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2(
      (mousePos.x / (window.innerWidth / 2)) * 2 - 1,
      -(mousePos.y / (window.innerHeight / 2)) * 2 + 1
    );
    raycaster.setFromCamera(pointer, camera);

    if (knotMeshRef.current) {
      const intersects = raycaster.intersectObject(knotMeshRef.current);

      if (intersects.length > 0) {
        if (!isHovering) {
          setIsHovering(true);
          // Glitch color effect
          matWire.color.setRGB(1, 0, 0.3);
        }
        // Jitter effect
        const jitter = 1 + Math.random() * 0.1;
        if (coreGroupRef.current) {
          coreGroupRef.current.scale.set(jitter, jitter, jitter);
        }
      } else {
        if (isHovering) {
          setIsHovering(false);
          // Reset color
          matWire.color.setRGB(0, 0.9, 1);
          if (coreGroupRef.current) {
            coreGroupRef.current.scale.set(1, 1, 1);
          }
        }
      }
    }

    // 4. Particle Float
    if (particlesRef.current) {
      particlesRef.current.rotation.y = time * 0.05;
    }
  });

  return (
    <>
      <color attach="background" args={[`#${CONFIG.bgColor.toString(16).padStart(6, '0')}`]} />
      <fog attach="fog" args={[`#${CONFIG.bgColor.toString(16).padStart(6, '0')}`, 0.003, 100]} />
      
      {/* Lighting */}
      <ambientLight intensity={2} />
      <pointLight position={[10, 10, 20]} intensity={2} color={CONFIG.colorA} distance={50} />
      <pointLight position={[-10, -10, 20]} intensity={2} color={CONFIG.colorB} distance={50} />

      {/* Core Group */}
      <group ref={coreGroupRef}>
        <mesh ref={knotMeshRef} geometry={geometryKnot} material={matSolid} />
        <mesh geometry={geometryKnot} material={matWire} />
      </group>

      {/* Digital Terrain */}
      <mesh 
        ref={terrainRef} 
        geometry={planeGeometry} 
        material={planeMaterial} 
        rotation-x={-Math.PI / 2} 
        position={[0, -15, 0]} 
      />

      {/* Particles */}
      <points ref={particlesRef} geometry={particlesGeometry} material={particlesMaterial} />
    </>
  );
};
