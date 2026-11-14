import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeCanvasProps {
  className?: string;
}

export const ThreeCanvas: React.FC<ThreeCanvasProps> = ({ className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 24;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 2. Geometry - Neural Constellation / Connected Particle Cloud
    const particleCount = 140;
    const positions = new Float32Array(particleCount * 3);
    const velocities: { x: number; y: number; z: number }[] = [];

    const radius = 16;
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * radius * 2.2;
      positions[i * 3 + 1] = (Math.random() - 0.5) * radius * 1.5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * radius * 1.5;

      velocities.push({
        x: (Math.random() - 0.5) * 0.015,
        y: (Math.random() - 0.5) * 0.015,
        z: (Math.random() - 0.5) * 0.015,
      });
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Particle Material with Cobalt Glow
    const particleMaterial = new THREE.PointsMaterial({
      color: 0x589efc,
      size: 0.35,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particleMaterial);
    scene.add(particlesMesh);

    // Dynamic Connections Line Geometry
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x0047ab,
      transparent: true,
      opacity: 0.28,
      blending: THREE.AdditiveBlending,
    });

    const maxLineSegments = 300;
    const linePositions = new Float32Array(maxLineSegments * 6);
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    const linesMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(linesMesh);

    // Central Floating 3D Geometric Shape - Wireframe Icosahedron & Torus (AI Geometry)
    const icosahedronGeo = new THREE.IcosahedronGeometry(4.2, 1);
    const icosahedronMat = new THREE.MeshBasicMaterial({
      color: 0x0047ab,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const icosahedron = new THREE.Mesh(icosahedronGeo, icosahedronMat);
    icosahedron.position.set(6, 1, -2);
    scene.add(icosahedron);

    const innerCoreGeo = new THREE.OctahedronGeometry(2.2, 0);
    const innerCoreMat = new THREE.MeshBasicMaterial({
      color: 0x8dc0fe,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
    });
    const innerCore = new THREE.Mesh(innerCoreGeo, innerCoreMat);
    innerCore.position.set(6, 1, -2);
    scene.add(innerCore);

    // 3. Mouse Interaction Tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const windowHalfX = window.innerWidth / 2;
      const windowHalfY = window.innerHeight / 2;
      mouseX = (e.clientX - windowHalfX) * 0.0015;
      mouseY = (e.clientY - windowHalfY) * 0.0015;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 4. Resize Handling
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // 5. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth camera interpolation based on mouse
      targetX += (mouseX - targetX) * 0.04;
      targetY += (mouseY - targetY) * 0.04;

      camera.position.x = targetX * 10;
      camera.position.y = -targetY * 10;
      camera.lookAt(0, 0, 0);

      // Rotate geometric elements
      icosahedron.rotation.x = elapsedTime * 0.18;
      icosahedron.rotation.y = elapsedTime * 0.25;
      innerCore.rotation.x = -elapsedTime * 0.3;
      innerCore.rotation.z = elapsedTime * 0.22;

      // Update particles
      const posAttr = particlesGeometry.attributes.position as THREE.BufferAttribute;
      const posArray = posAttr.array as Float32Array;

      let lineIndex = 0;
      const linePosAttr = lineGeometry.attributes.position as THREE.BufferAttribute;
      const linePosArray = linePosAttr.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        // Move particle
        posArray[i * 3] += velocities[i].x;
        posArray[i * 3 + 1] += velocities[i].y;
        posArray[i * 3 + 2] += velocities[i].z;

        // Boundary bounce
        if (Math.abs(posArray[i * 3]) > radius * 1.2) velocities[i].x *= -1;
        if (Math.abs(posArray[i * 3 + 1]) > radius * 0.9) velocities[i].y *= -1;
        if (Math.abs(posArray[i * 3 + 2]) > radius * 0.9) velocities[i].z *= -1;

        // Build connection lines to nearby points
        for (let j = i + 1; j < particleCount; j++) {
          const dx = posArray[i * 3] - posArray[j * 3];
          const dy = posArray[i * 3 + 1] - posArray[j * 3 + 1];
          const dz = posArray[i * 3 + 2] - posArray[j * 3 + 2];
          const distSq = dx * dx + dy * dy + dz * dz;

          if (distSq < 14 && lineIndex < maxLineSegments * 6 - 6) {
            linePosArray[lineIndex++] = posArray[i * 3];
            linePosArray[lineIndex++] = posArray[i * 3 + 1];
            linePosArray[lineIndex++] = posArray[i * 3 + 2];
            linePosArray[lineIndex++] = posArray[j * 3];
            linePosArray[lineIndex++] = posArray[j * 3 + 1];
            linePosArray[lineIndex++] = posArray[j * 3 + 2];
          }
        }
      }

      // Clear remaining line coordinates
      for (let k = lineIndex; k < maxLineSegments * 6; k++) {
        linePosArray[k] = 0;
      }

      posAttr.needsUpdate = true;
      linePosAttr.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      particlesGeometry.dispose();
      particleMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      icosahedronGeo.dispose();
      icosahedronMat.dispose();
      innerCoreGeo.dispose();
      innerCoreMat.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      style={{ zIndex: 0 }}
    />
  );
};
