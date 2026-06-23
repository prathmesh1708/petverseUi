// Basic morphing orb (placeholder before custom shaders)
const geometry = new THREE.SphereGeometry(10, 64, 64);
const material = new THREE.MeshStandardMaterial({ 
  color: 0xFF6B35, // Primary orange
  wireframe: true,
  transparent: true,
  opacity: 0.3
});
const orb = new THREE.Mesh(geometry, material);

scene.add(orb);

// Add to the animation loop defined in scene.js
const originalAnimate = animate;
animate = function() {
  // Rotate the orb
  orb.rotation.x += 0.005;
  orb.rotation.y += 0.005;
  
  // Create a slight breathing effect
  const scale = 1 + Math.sin(Date.now() * 0.002) * 0.05;
  orb.scale.set(scale, scale, scale);

  originalAnimate();
};

// Start the loop
animate();
