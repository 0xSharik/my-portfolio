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
  const [hoverIntensity, setHoverIntensity] = React.useState(0);
  const originalColors = useRef({ wire: 0x00f2ff, solid: 0x000000 });

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

  // Mouse and touch tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const windowHalfX = window.innerWidth / 2;
      const windowHalfY = window.innerHeight / 2;
      
      const mouseX = (e.clientX - windowHalfX);
      const mouseY = (e.clientY - windowHalfY);
      
      setMousePos({ x: mouseX, y: mouseY });
    };

    // Touch move handler for mobile slide interactions
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const windowHalfX = window.innerWidth / 2;
        const windowHalfY = window.innerHeight / 2;
        
        const touch = e.touches[0];
        const touchX = (touch.clientX - windowHalfX);
        const touchY = (touch.clientY - windowHalfY);
        
        setMousePos({ x: touchX, y: touchY });
      }
    };

    const handleClick = (e: MouseEvent) => {
      const windowHalfX = window.innerWidth / 2;
      const windowHalfY = window.innerHeight / 2;
      
      const mouseX = (e.clientX - windowHalfX);
      const mouseY = (e.clientY - windowHalfY);
      
      // Check if click is near the model
      const distance = Math.sqrt(mouseX * mouseX + mouseY * mouseY);
      if (distance < 200 && knotMeshRef.current) {
        // Create explosion effect
        const explosion = () => {
          if (coreGroupRef.current) {
            coreGroupRef.current.scale.set(1.5, 1.5, 1.5);
            setTimeout(() => {
              if (coreGroupRef.current) {
                coreGroupRef.current.scale.set(1, 1, 1);
              }
            }, 200);
          }
          
          // Color burst
          matWire.color.setHSL(Math.random(), 1, 0.7);
          setTimeout(() => {
            matWire.color.setHSL(0.5, 1, 0.5);
          }, 300);
          
          // Particle explosion
          if (particlesRef.current) {
            const material = particlesRef.current.material as THREE.PointsMaterial;
            material.size = 0.5;
            material.opacity = 1;
            setTimeout(() => {
              if (particlesRef.current) {
                const material = particlesRef.current.material as THREE.PointsMaterial;
                material.size = 0.15;
                material.opacity = 0.8;
              }
            }, 500);
          }
        };
        
        explosion();
      }
    };

    // Touch start/end handlers for mobile tap interactions
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const windowHalfX = window.innerWidth / 2;
        const windowHalfY = window.innerHeight / 2;
        
        const touch = e.touches[0];
        const touchX = (touch.clientX - windowHalfX);
        const touchY = (touch.clientY - windowHalfY);
        
        // Check if touch is near the model
        const distance = Math.sqrt(touchX * touchX + touchY * touchY);
        if (distance < 200 && knotMeshRef.current) {
          // Create explosion effect on touch
          const explosion = () => {
            if (coreGroupRef.current) {
              coreGroupRef.current.scale.set(1.5, 1.5, 1.5);
              setTimeout(() => {
                if (coreGroupRef.current) {
                  coreGroupRef.current.scale.set(1, 1, 1);
                }
              }, 200);
            }
            
            // Color burst
            matWire.color.setHSL(Math.random(), 1, 0.7);
            setTimeout(() => {
              matWire.color.setHSL(0.5, 1, 0.5);
            }, 300);
            
            // Particle explosion
            if (particlesRef.current) {
              const material = particlesRef.current.material as THREE.PointsMaterial;
              material.size = 0.5;
              material.opacity = 1;
              setTimeout(() => {
                if (particlesRef.current) {
                  const material = particlesRef.current.material as THREE.PointsMaterial;
                  material.size = 0.15;
                  material.opacity = 0.8;
                }
              }, 500);
            }
          };
          
          explosion();
        }
      }
    };

    // Add both mouse and touch event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchstart', handleTouchStart);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchStart);
    };
  }, [matWire]);

  // Animation loop
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    // 1. Smooth Scene Rotation
    const targetX = mousePos.x * 0.0002;
    const targetY = mousePos.y * 0.0002;

    if (coreGroupRef.current) {
      // Base rotation
      coreGroupRef.current.rotation.y += 0.003;
      coreGroupRef.current.rotation.x += 0.001;
      
      // Subtle mouse influence (not position-based)
      coreGroupRef.current.rotation.y += targetX;
      coreGroupRef.current.rotation.x += targetY;
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
          setHoverIntensity(1);
        }
        
        // Smooth intensity ramp up
        setHoverIntensity(prev => Math.min(prev + 0.1, 1));
        
        // Enhanced color transition
        const hue = 0.95 + hoverIntensity * 0.05; // Cyan to purple transition
        const saturation = 1;
        const lightness = 0.5 + hoverIntensity * 0.2;
        matWire.color.setHSL(hue, saturation, lightness);
        
        // Dynamic scale with pulse effect
        const baseScale = 1.05;
        const pulse = Math.sin(time * 3) * 0.02 * hoverIntensity;
        const targetScale = baseScale + pulse;
        
        if (coreGroupRef.current) {
          const currentScale = coreGroupRef.current.scale.x;
          const newScale = currentScale + (targetScale - currentScale) * 0.15;
          coreGroupRef.current.scale.set(newScale, newScale, newScale);
        }
        
        // Enhanced rotation on hover
        if (coreGroupRef.current) {
          coreGroupRef.current.rotation.z += 0.01 * hoverIntensity;
        }
        
        // Particle burst effect
        if (particlesRef.current && Math.random() < 0.1 * hoverIntensity) {
          const material = particlesRef.current.material as THREE.PointsMaterial;
          material.opacity = 0.3 + Math.random() * 0.5;
          material.size = 0.15 + Math.random() * 0.1;
        }
        
      } else {
        if (isHovering) {
          setIsHovering(false);
        }
        
        // Smooth intensity ramp down
        setHoverIntensity(prev => Math.max(prev - 0.05, 0));
        
        // Reset colors smoothly
        if (hoverIntensity < 0.1) {
          matWire.color.setHSL(0.5, 1, 0.5); // Reset to cyan
          if (coreGroupRef.current) {
            coreGroupRef.current.scale.set(1, 1, 1);
          }
          // Reset particles
          if (particlesRef.current) {
            const material = particlesRef.current.material as THREE.PointsMaterial;
            material.opacity = 0.8;
            material.size = 0.15;
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
      <group ref={coreGroupRef} position={[0, 0, 0]}>
        <mesh ref={knotMeshRef} geometry={geometryKnot} material={matSolid} position={[0, 0, 0]} />
        <mesh geometry={geometryKnot} material={matWire} position={[0, 0, 0]} />
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
