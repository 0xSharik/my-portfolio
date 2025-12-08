"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import { useRouteTransition } from "@/hooks/use-route-transition";

interface CameraState {
  position: [number, number, number];
  target: [number, number, number];
  fov: number;
}

const CAMERA_STATES: Record<string, CameraState> = {
  "/": { position: [0, 2, 10], target: [0, 0, 0], fov: 55 },
  "/about": { position: [6, 3, 12], target: [0, 1, 0], fov: 50 },
  "/projects": { position: [0, 5, 18], target: [0, 0, -2], fov: 60 },
  "/contact": { position: [-6, 2, 10], target: [0, 0, 0], fov: 48 },
};

function cubicSpline(t: number, p0: THREE.Vector3, p1: THREE.Vector3, p2: THREE.Vector3, p3: THREE.Vector3): THREE.Vector3 {
  const t2 = t * t;
  const t3 = t2 * t;
  
  return new THREE.Vector3(
    0.5 * ((2 * p1.x) + (-p0.x + p2.x) * t + (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 + (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3),
    0.5 * ((2 * p1.y) + (-p0.y + p2.y) * t + (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t2 + (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t3),
    0.5 * ((2 * p1.z) + (-p0.z + p2.z) * t + (2 * p0.z - 5 * p1.z + 4 * p2.z - p3.z) * t2 + (-p0.z + 3 * p1.z - 3 * p2.z + p3.z) * t3)
  );
}

export function CameraRig() {
  const { camera } = useThree();
  const { toRoute, isTransitioning } = useRouteTransition();
  
  const currentState = useMemo(() => CAMERA_STATES[toRoute] || CAMERA_STATES["/"], [toRoute]);
  const previousState = useRef<CameraState>(CAMERA_STATES["/"]);
  const transitionProgress = useRef(0);
  const transitionVelocity = useRef(0);
  const isTransitioningRef = useRef(false);

  // Convert positions to Vector3 for interpolation
  const currentPos = useMemo(() => new THREE.Vector3(...currentState.position), [currentState.position]);
  const currentTarget = useMemo(() => new THREE.Vector3(...currentState.target), [currentState.target]);
  const previousPos = useRef(new THREE.Vector3(...previousState.current.position));
  const previousTarget = useRef(new THREE.Vector3(...previousState.current.target));

  // Generate control points for spline
  const generateControlPoints = (start: THREE.Vector3, end: THREE.Vector3) => {
    const mid = start.clone().lerp(end, 0.5);
    const offset = new THREE.Vector3(0, 2, 0); // Add arc height
    
    const p1 = start.clone().add(mid).multiplyScalar(0.5).add(offset);
    const p2 = end.clone().add(mid).multiplyScalar(0.5).add(offset);
    
    return [start, p1, p2, end];
  };

  const positionSpline = useRef(generateControlPoints(previousPos.current, currentPos));
  const targetSpline = useRef(generateControlPoints(previousTarget.current, currentTarget));

  // Update transition when route changes
  if (toRoute !== previousState.current.position.toString() && !isTransitioningRef.current) {
    previousState.current = currentState;
    previousPos.current = currentPos.clone();
    previousTarget.current = currentTarget.clone();
    transitionProgress.current = 0;
    transitionVelocity.current = 0;
    isTransitioningRef.current = true;
    
    positionSpline.current = generateControlPoints(previousPos.current, currentPos);
    targetSpline.current = generateControlPoints(previousTarget.current, currentTarget);
  }

  useFrame((state, delta) => {
    if (isTransitioningRef.current) {
      // Jerk-limited acceleration with overshoot damping
      const targetProgress = 1;
      const error = targetProgress - transitionProgress.current;
      const acceleration = error * 3.0 - transitionVelocity.current * 2.0; // Damping
      
      transitionVelocity.current += acceleration * delta;
      transitionVelocity.current = Math.max(Math.min(transitionVelocity.current, 2.0), -2.0); // Clamp velocity
      transitionProgress.current += transitionVelocity.current * delta;
      
      if (transitionProgress.current >= 0.98) {
        transitionProgress.current = 1;
        transitionVelocity.current = 0;
        isTransitioningRef.current = false;
      }

      // Cubic spline interpolation
      const t = transitionProgress.current;
      const smoothT = t * t * (3.0 - 2.0 * t); // Smoothstep
      
      const newPosition = cubicSpline(smoothT, 
        positionSpline.current[0], 
        positionSpline.current[1], 
        positionSpline.current[2], 
        positionSpline.current[3]
      );
      
      const newTarget = cubicSpline(smoothT,
        targetSpline.current[0],
        targetSpline.current[1], 
        targetSpline.current[2],
        targetSpline.current[3]
      );

      camera.position.copy(newPosition);
      camera.lookAt(newTarget);
    } else {
      // Smooth follow when not transitioning
      camera.position.lerp(currentPos, delta * 2.0);
      const lookTarget = new THREE.Vector3(...currentState.target);
      camera.lookAt(lookTarget);
    }

    // Smooth FOV transition (only for PerspectiveCamera)
    if (camera instanceof THREE.PerspectiveCamera) {
      const targetFOV = currentState.fov;
      camera.fov = THREE.MathUtils.lerp(camera.fov, targetFOV, delta * 2.0);
      camera.updateProjectionMatrix();
    }
  });

  return null;
}
