import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function OceanCanvas() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    // Scene & Camera
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x040714, 0.016);

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 1, 11);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    // Color definitions
    const cyanColor = new THREE.Color('#00dcf0');
    const blueColor = new THREE.Color('#0ea5e9');
    const purpleColor = new THREE.Color('#a855f7');
    const deepViolet = new THREE.Color('#4c1d95');

    // ----------------------------------------------------
    // 1. OCEAN DEPTH UNDULATING WAVE GRID
    // ----------------------------------------------------
    const GRID_W = 55;
    const GRID_H = 55;
    const oceanGeo = new THREE.PlaneGeometry(70, 70, GRID_W, GRID_H);
    oceanGeo.rotateX(-Math.PI / 2);

    const oceanMat = new THREE.MeshBasicMaterial({
      color: 0x0099ff,
      wireframe: true,
      transparent: true,
      opacity: 0.11,
    });

    const oceanMesh = new THREE.Mesh(oceanGeo, oceanMat);
    oceanMesh.position.y = -5;
    scene.add(oceanMesh);

    // ----------------------------------------------------
    // 2. SCROLL-REACTIVE FLOATING OBJECTS (Sonar Rings & Crystals)
    // ----------------------------------------------------
    const objectsGroup = new THREE.Group();
    scene.add(objectsGroup);

    // Concentric Sonar / Oceanic Ripple Rings
    const rings = [];
    const ringGeo = new THREE.TorusGeometry(3.2, 0.028, 16, 100);
    for (let i = 0; i < 5; i++) {
      const ringMat = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? cyanColor : purpleColor,
        transparent: true,
        opacity: 0.22 - i * 0.03,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.set(0, -2, -2 - i * 2.8);
      ring.rotation.x = Math.PI / 2;
      ring.scale.setScalar(1 + i * 0.55);
      objectsGroup.add(ring);
      rings.push(ring);
    }

    // Bioluminescent Floating Polyhedral Crystals
    const crystals = [];
    const crystalGeos = [
      new THREE.IcosahedronGeometry(0.8, 0),
      new THREE.OctahedronGeometry(0.95, 0),
      new THREE.DodecahedronGeometry(0.75, 0),
      new THREE.IcosahedronGeometry(1.0, 0),
      new THREE.OctahedronGeometry(0.8, 0),
    ];

    const crystalPositions = [
      [-7.0, 2.0, -3],
      [7.5, -1.2, -4],
      [-5.5, -4.0, -2],
      [6.8, 4.0, -5],
      [-2.5, 5.0, -6],
    ];

    crystalPositions.forEach((pos, idx) => {
      const cGeo = crystalGeos[idx % crystalGeos.length];
      const edges = new THREE.EdgesGeometry(cGeo);
      const isCyan = idx % 2 === 0;

      const innerMat = new THREE.MeshBasicMaterial({
        color: isCyan ? 0x00dcf0 : 0xa855f7,
        transparent: true,
        opacity: 0.12,
      });
      const edgeMat = new THREE.LineBasicMaterial({
        color: isCyan ? 0x00ffff : 0xc084fc,
        transparent: true,
        opacity: 0.45,
      });

      const mesh = new THREE.Mesh(cGeo, innerMat);
      const wire = new THREE.LineSegments(edges, edgeMat);
      mesh.add(wire);
      mesh.position.set(pos[0], pos[1], pos[2]);

      objectsGroup.add(mesh);
      crystals.push({
        mesh,
        baseX: pos[0],
        baseY: pos[1],
        baseZ: pos[2],
        rotSpeedX: 0.004 + Math.random() * 0.006,
        rotSpeedY: 0.007 + Math.random() * 0.007,
      });
    });

    // ----------------------------------------------------
    // 3. BIOLUMINESCENT PLANKTON / FLOATING OCEAN PARTICLES
    // ----------------------------------------------------
    const PLANKTON_COUNT = 450;
    const planktonGeo = new THREE.BufferGeometry();
    const planktonPos = new Float32Array(PLANKTON_COUNT * 3);
    const planktonColors = new Float32Array(PLANKTON_COUNT * 3);
    const planktonBasePos = new Float32Array(PLANKTON_COUNT * 3);

    for (let i = 0; i < PLANKTON_COUNT; i++) {
      const x = (Math.random() - 0.5) * 32;
      const y = (Math.random() - 0.5) * 26;
      const z = (Math.random() - 0.5) * 24;

      planktonPos[i * 3] = x;
      planktonPos[i * 3 + 1] = y;
      planktonPos[i * 3 + 2] = z;

      planktonBasePos[i * 3] = x;
      planktonBasePos[i * 3 + 1] = y;
      planktonBasePos[i * 3 + 2] = z;

      const mix = Math.random();
      const col = cyanColor.clone().lerp(purpleColor, mix);
      planktonColors[i * 3] = col.r;
      planktonColors[i * 3 + 1] = col.g;
      planktonColors[i * 3 + 2] = col.b;
    }

    planktonGeo.setAttribute('position', new THREE.BufferAttribute(planktonPos, 3));
    planktonGeo.setAttribute('color', new THREE.BufferAttribute(planktonColors, 3));

    const planktonMat = new THREE.PointsMaterial({
      size: 0.16,
      transparent: true,
      vertexColors: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
    });

    const plankton = new THREE.Points(planktonGeo, planktonMat);
    scene.add(plankton);

    // ----------------------------------------------------
    // SCROLL LISTENER & VELOCITY DYNAMICS
    // ----------------------------------------------------
    let currentScroll = window.scrollY;
    let targetScroll = window.scrollY;
    let scrollVelocity = 0;
    let lastScrollTime = performance.now();

    const onScroll = () => {
      targetScroll = window.scrollY;
      const now = performance.now();
      const dt = Math.max(1, now - lastScrollTime);
      scrollVelocity = (targetScroll - currentScroll) / dt;
      lastScrollTime = now;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // Mouse parallax
    let mouseX = 0;
    let mouseY = 0;
    const onMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // ----------------------------------------------------
    // ANIMATION LOOP
    // ----------------------------------------------------
    let clock = new THREE.Clock();
    let animId;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth scroll interpolation
      currentScroll += (targetScroll - currentScroll) * 0.085;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = currentScroll / maxScroll;

      // Friction on velocity
      scrollVelocity *= 0.91;

      // 1. Camera maneuvers with scroll progress (glides down into the abyssal ocean)
      camera.position.y = 1.0 - progress * 6.5;
      camera.position.z = 11 - progress * 2.5;
      camera.position.x += (mouseX * 0.7 - camera.position.x) * 0.04;
      camera.rotation.x = -0.04 + progress * 0.1 - mouseY * 0.02;

      // 2. Undulate the Ocean Grid
      const oceanPositions = oceanGeo.attributes.position.array;
      const velWave = Math.abs(scrollVelocity) * 0.4;
      for (let i = 0; i <= GRID_W; i++) {
        for (let j = 0; j <= GRID_H; j++) {
          const index = (i * (GRID_H + 1) + j) * 3;
          const u = i / GRID_W;
          const v = j / GRID_H;
          oceanPositions[index + 1] =
            Math.sin(u * 5 + elapsed * 1.3) * (0.4 + velWave) +
            Math.cos(v * 6 + elapsed * 1.1) * (0.4 + velWave) +
            Math.sin((u + v) * 4.5 + progress * 7) * 0.35;
        }
      }
      oceanGeo.attributes.position.needsUpdate = true;
      oceanMesh.position.y = -6 - progress * 3;

      // 3. Sonar Rings expand and react when scrolling
      rings.forEach((ring, idx) => {
        ring.rotation.z = elapsed * 0.12 * (idx % 2 === 0 ? 1 : -1) + progress * Math.PI * 1.5;
        const wave = 1 + Math.sin(elapsed * 1.6 + idx * 0.8) * 0.12 + Math.abs(scrollVelocity) * 0.2;
        ring.scale.set(wave * (1 + idx * 0.55), wave * (1 + idx * 0.55), 1);
        ring.position.y = -2 - progress * 3.5 + Math.sin(elapsed + idx) * 0.3;
      });

      // 4. Crystals spin faster during active scroll and travel vertically
      crystals.forEach((c, idx) => {
        const speedBoost = 1 + Math.abs(scrollVelocity) * 4.0;
        c.mesh.rotation.x += c.rotSpeedX * speedBoost;
        c.mesh.rotation.y += c.rotSpeedY * speedBoost;

        const bob = Math.sin(elapsed * 1.3 + idx * 1.4) * 0.4;
        c.mesh.position.y = c.baseY + bob - progress * 4.5;
        c.mesh.position.x = c.baseX + Math.sin(elapsed * 0.7 + idx) * 0.25;
      });

      // 5. Plankton particles swirl with scroll momentum
      const pPos = planktonGeo.attributes.position.array;
      for (let i = 0; i < PLANKTON_COUNT; i++) {
        pPos[i * 3 + 1] = planktonBasePos[i * 3 + 1] - progress * 4 + Math.sin(elapsed * 0.8 + i) * 0.3;
        pPos[i * 3] = planktonBasePos[i * 3] + Math.sin(elapsed * 0.5 + i) * 0.2 + scrollVelocity * 0.05;
      }
      planktonGeo.attributes.position.needsUpdate = true;
      plankton.rotation.y = elapsed * 0.02 + progress * 0.6;

      renderer.render(scene, camera);
    };

    animate();

    // Resize
    const onResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);

      oceanGeo.dispose();
      oceanMat.dispose();
      ringGeo.dispose();
      crystalGeos.forEach((g) => g.dispose());
      planktonGeo.dispose();
      planktonMat.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ opacity: 0.95 }}
      aria-hidden="true"
    />
  );
}
