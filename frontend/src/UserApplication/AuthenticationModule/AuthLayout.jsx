import React, { useRef, useMemo } from 'react';
import { Outlet } from 'react-router-dom';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Float, Environment } from '@react-three/drei';
import * as THREE from 'three';
import './AuthLayout.css';

// Using a high-quality dog image from Unsplash
const DOG_IMAGE_URL = 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80';

const FloatingDogPlanes = () => {
  const texture = useLoader(THREE.TextureLoader, DOG_IMAGE_URL);
  
  // Create an array of random positions for the floating planes
  const planes = useMemo(() => {
    return Array.from({ length: 5 }).map(() => ({
      position: [
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10 - 5
      ],
      rotation: [
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        0
      ],
      scale: 1.5 + Math.random() * 2
    }));
  }, []);

  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle rotation of the entire group based on mouse position
      const mouseX = (state.pointer.x * Math.PI) / 10;
      const mouseY = (state.pointer.y * Math.PI) / 10;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouseX, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -mouseY, 0.05);
    }
  });

  return (
    <group ref={groupRef}>
      {planes.map((props, i) => (
        <Float key={i} speed={1.5 + Math.random()} rotationIntensity={0.5} floatIntensity={2}>
          <mesh position={props.position} rotation={props.rotation} scale={props.scale}>
            <planeGeometry args={[1, 1]} />
            <meshStandardMaterial 
              map={texture} 
              transparent 
              opacity={0.8} 
              side={THREE.DoubleSide} 
              roughness={0.2}
              metalness={0.1}
            />
          </mesh>
        </Float>
      ))}
      
      {/* Floating abstract spheres for depth */}
      {Array.from({ length: 8 }).map((_, i) => (
        <Float key={`sphere-${i}`} speed={2} rotationIntensity={1} floatIntensity={3}>
          <mesh 
            position={[
              (Math.random() - 0.5) * 20, 
              (Math.random() - 0.5) * 20, 
              (Math.random() - 0.5) * 10 - 10
            ]}
          >
            <sphereGeometry args={[Math.random() * 0.8 + 0.2, 32, 32]} />
            <meshStandardMaterial color="#12828b" roughness={0.1} metalness={0.8} />
          </mesh>
        </Float>
      ))}
    </group>
  );
};

const AuthLayout = () => {
  return (
    <div className="auth-layout-container">
      {/* 3D Background */}
      <div className="auth-canvas-container">
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 5]} intensity={1} color="#d4eaed" />
          <pointLight position={[-10, -10, -5]} intensity={0.5} color="#fff4f4" />
          <Environment preset="city" />
          <FloatingDogPlanes />
        </Canvas>
      </div>

      {/* Foreground Form Container */}
      <div className="auth-content-wrapper">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
