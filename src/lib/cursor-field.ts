import * as THREE from "three";

export interface CursorFieldData {
  worldPosition: THREE.Vector3;
  worldDirection: THREE.Vector3;
  screenPosition: THREE.Vector2;
  isPressed: boolean;
  velocity: THREE.Vector2;
  timestamp: number;
}

export interface ForceField {
  position: THREE.Vector3;
  strength: number;
  radius: number;
  type: "attract" | "repel" | "shear";
}

export class CursorFieldEngine {
  private camera: THREE.Camera;
  private raycaster: THREE.Raycaster;
  private mouse: THREE.Vector2;
  private previousMouse: THREE.Vector2;
  private lastUpdateTime: number;
  public currentField: CursorFieldData;

  constructor(camera: THREE.Camera) {
    this.camera = camera;
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.previousMouse = new THREE.Vector2();
    this.lastUpdateTime = 0;
    
    this.currentField = {
      worldPosition: new THREE.Vector3(),
      worldDirection: new THREE.Vector3(),
      screenPosition: new THREE.Vector2(),
      isPressed: false,
      velocity: new THREE.Vector2(),
      timestamp: 0,
    };
  }

  update(clientX: number, clientY: number, isPressed: boolean, canvas: HTMLCanvasElement): void {
    const currentTime = performance.now();
    const deltaTime = (currentTime - this.lastUpdateTime) / 1000;
    this.lastUpdateTime = currentTime;

    // Convert to normalized device coordinates
    const rect = canvas.getBoundingClientRect();
    this.mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((clientY - rect.top) / rect.height) * 2 + 1;

    // Calculate velocity
    if (deltaTime > 0) {
      this.currentField.velocity.x = (this.mouse.x - this.previousMouse.x) / deltaTime;
      this.currentField.velocity.y = (this.mouse.y - this.previousMouse.y) / deltaTime;
    }

    // Update raycaster
    this.raycaster.setFromCamera(this.mouse, this.camera);
    
    // Store field data
    this.currentField.screenPosition.set(this.mouse.x, this.mouse.y);
    this.currentField.worldPosition.copy(this.raycaster.ray.origin);
    this.currentField.worldDirection.copy(this.raycaster.ray.direction);
    this.currentField.isPressed = isPressed;
    this.currentField.timestamp = currentTime;

    this.previousMouse.copy(this.mouse);
  }

  calculateForceField(surfacePoint: THREE.Vector3, interactionCoefficient: number): ForceField {
    const distance = this.currentField.worldPosition.distanceTo(surfacePoint);
    const maxDistance = 10.0; // Maximum influence radius
    
    if (distance > maxDistance) {
      return {
        position: new THREE.Vector3(),
        strength: 0,
        radius: 0,
        type: "attract"
      };
    }

    // F = (1 / d²) * interactionCoefficient
    const strength = (1.0 / (distance * distance + 0.1)) * interactionCoefficient;
    
    // Calculate force direction
    const forceDirection = new THREE.Vector3()
      .subVectors(surfacePoint, this.currentField.worldPosition)
      .normalize();

    // Add velocity influence
    const velocityInfluence = this.currentField.velocity.length() * 0.1;
    forceDirection.add(new THREE.Vector3(
      this.currentField.velocity.x * velocityInfluence,
      this.currentField.velocity.y * velocityInfluence,
      0
    ));

    return {
      position: forceDirection.clone(),
      strength: Math.min(strength, 5.0), // Clamp maximum force
      radius: Math.max(1.0, distance),
      type: this.currentField.isPressed ? "repel" : "attract"
    };
  }

  getRayIntersection(objects: THREE.Object3D[]): THREE.Intersection | null {
    const intersects = this.raycaster.intersectObjects(objects, true);
    return intersects.length > 0 ? intersects[0] : null;
  }

  // System-specific interaction coefficients
  static readonly INTERACTION_COEFFICIENTS = {
    CODE_LATTICE: 0.2,    // LOW (resists motion)
    NEURAL_STREAM: 1.0,  // HIGH (fluid response)
    PACKET_RAILS: 0.5,    // MEDIUM (flow bias only)
  };
}
