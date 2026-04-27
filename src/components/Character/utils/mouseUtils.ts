import * as THREE from "three";

export const handleMouseMove = (
  event: MouseEvent,
  setMousePosition: (x: number, y: number) => void
) => {
  const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
  const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
  setMousePosition(mouseX, mouseY);
};

export const handleTouchMove = (
  event: TouchEvent,
  setMousePosition: (x: number, y: number) => void
) => {
  const mouseX = (event.touches[0].clientX / window.innerWidth) * 2 - 1;
  const mouseY = -(event.touches[0].clientY / window.innerHeight) * 2 + 1;
  setMousePosition(mouseX, mouseY);
};

export const handleTouchEnd = (
  setMousePosition: (
    x: number,
    y: number,
    interpolationX: number,
    interpolationY: number
  ) => void
) => {
  setTimeout(() => {
    setMousePosition(0, 0, 0.03, 0.03);
    setTimeout(() => {
      setMousePosition(0, 0, 0.1, 0.2);
    }, 1000);
  }, 2000);
};

export const handleHeadRotation = (
  headBone: THREE.Object3D,
  mouseX: number,
  mouseY: number,
  _interpolationX: number,
  _interpolationY: number,
  lerp: (x: number, y: number, t: number) => number
) => {
  if (!headBone) return;
  
  if (window.scrollY < 200) {
    // Smoother interpolation for buttery tracking
    const smoothFactor = 0.05;
    
    // Calculate target rotations with sensible clamping
    const maxRotY = Math.PI / 5; // Look left/right limit
    const maxRotX = Math.PI / 6; // Look up/down limit
    
    const targetY = mouseX * maxRotY;
    
    // clamp mouseY for realistic up/down limits
    const clampedMouseY = Math.max(-0.8, Math.min(0.8, mouseY));
    const targetX = -clampedMouseY * maxRotX - 0.2; // slight natural downward tilt

    headBone.rotation.y = lerp(headBone.rotation.y, targetY, smoothFactor);
    headBone.rotation.x = lerp(headBone.rotation.x, targetX, smoothFactor);
    
  } else {
    // When scrolled down, return to a neutral pose or look at content
    const smoothFactor = 0.04;
    if (window.innerWidth > 1024) {
      headBone.rotation.x = lerp(headBone.rotation.x, -0.2, smoothFactor);
      headBone.rotation.y = lerp(headBone.rotation.y, -0.2, smoothFactor);
    } else {
      headBone.rotation.x = lerp(headBone.rotation.x, 0, smoothFactor);
      headBone.rotation.y = lerp(headBone.rotation.y, 0, smoothFactor);
    }
  }
};
