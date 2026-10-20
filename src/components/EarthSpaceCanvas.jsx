import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function EarthSpaceCanvas() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030614, 0.008);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 8.5);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // 2. Texture Loader
    const textureLoader = new THREE.TextureLoader();

    // Actual photorealistic textures from public folder
    const earthMap = textureLoader.load('/textures/space/earth.jpg');
    const earthNormal = textureLoader.load('/textures/space/earth_normal.jpg');
    const earthClouds = textureLoader.load('/textures/space/earth_clouds.png');
    const moonMap = textureLoader.load('/textures/space/moon.jpg');

    // 3. Lighting Setup (Realistic Sunlight + Cosmic ambient + Blue/Purple Rim)
    const sunLight = new THREE.DirectionalLight(0xffffff, 2.6);
    sunLight.position.set(12, 6, 10);
    scene.add(sunLight);

    const cosmicAmbient = new THREE.AmbientLight(0x080f26, 0.7);
    scene.add(cosmicAmbient);

    // Rim lights for oceanic-blue and mystical dark purple accent
    const blueRimLight = new THREE.PointLight(0x00dcf0, 1.8, 60);
    blueRimLight.position.set(-15, -8, 5);
    scene.add(blueRimLight);

    const purpleRimLight = new THREE.PointLight(0xa855f7, 1.5, 60);
    purpleRimLight.position.set(8, 12, -5);
    scene.add(purpleRimLight);

    // 4. Photorealistic Earth System - Centered directly with the middle hero title
    const earthGroup = new THREE.Group();
    earthGroup.position.set(0, -1.5, 0);
    scene.add(earthGroup);

    // Earth Sphere
    const earthRadius = 3.2;
    const earthGeo = new THREE.SphereGeometry(earthRadius, 64, 64);
    const earthMat = new THREE.MeshStandardMaterial({
      map: earthMap,
      normalMap: earthNormal,
      roughness: 0.6,
      metalness: 0.12,
    });
    const earthMesh = new THREE.Mesh(earthGeo, earthMat);
    earthMesh.rotation.y = 3.8; // Face landmass toward camera
    earthGroup.add(earthMesh);

    // Earth Cloud Layer
    const cloudGeo = new THREE.SphereGeometry(earthRadius * 1.018, 64, 64);
    const cloudMat = new THREE.MeshStandardMaterial({
      map: earthClouds,
      transparent: true,
      opacity: 0.52,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const cloudMesh = new THREE.Mesh(cloudGeo, cloudMat);
    earthGroup.add(cloudMesh);

    // Atmospheric Glow Shell (Fresnel Halo)
    const glowGeo = new THREE.SphereGeometry(earthRadius * 1.045, 64, 64);
    const glowMat = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.7 - dot(vNormal, vec3(0, 0, 1.0)), 2.2);
          gl_FragColor = vec4(0.0, 0.86, 0.94, 1.0) * intensity * 0.9;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
      depthWrite: false,
    });
    const glowMesh = new THREE.Mesh(glowGeo, glowMat);
    earthGroup.add(glowMesh);

    // 5. Realistic Moon
    const moonRadius = 0.88;
    const moonGeo = new THREE.SphereGeometry(moonRadius, 48, 48);
    const moonMat = new THREE.MeshStandardMaterial({
      map: moonMap,
      roughness: 0.92,
      metalness: 0.05,
    });
    const moonMesh = new THREE.Mesh(moonGeo, moonMat);
    moonMesh.position.set(9.5, 3.2, -6);
    scene.add(moonMesh);

    // 6. Realistic 3D Asteroids in Space (Deformed natural rock geometry)
    const asteroids = [];
    const asteroidCount = 14;

    for (let i = 0; i < asteroidCount; i++) {
      const aSize = 0.35 + Math.random() * 0.65;
      const aGeo = new THREE.DodecahedronGeometry(aSize, 1);

      // Deform vertices for realistic rugged rock shape
      const pos = aGeo.attributes.position;
      for (let j = 0; j < pos.count; j++) {
        const u = 1 + (Math.random() - 0.5) * 0.28;
        pos.setXYZ(j, pos.getX(j) * u, pos.getY(j) * u, pos.getZ(j) * u);
      }
      aGeo.computeVertexNormals();

      const aMat = new THREE.MeshStandardMaterial({
        color: Math.random() > 0.5 ? 0x6e788c : 0x544e6b,
        roughness: 0.88,
        metalness: 0.15,
      });

      const aMesh = new THREE.Mesh(aGeo, aMat);

      // Distribute deeper along Z and around the cosmos
      const dist = 10 + Math.random() * 35;
      const angle = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 22;

      aMesh.position.set(Math.cos(angle) * dist, y, -Math.random() * 30 - 2);

      scene.add(aMesh);
      asteroids.push({
        mesh: aMesh,
        rotSpeedX: (Math.random() - 0.5) * 0.015,
        rotSpeedY: (Math.random() - 0.5) * 0.02,
        baseZ: aMesh.position.z,
      });
    }

    // 7. Deep Space Starfield (Natural stellar magnitudes & spectral classes)
    const STAR_COUNT = 2400;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(STAR_COUNT * 3);
    const starColors = new Float32Array(STAR_COUNT * 3);

    const cyanStar = new THREE.Color('#7dd3fc');
    const whiteStar = new THREE.Color('#ffffff');
    const purpleStar = new THREE.Color('#c084fc');
    const goldStar = new THREE.Color('#fde047');

    for (let i = 0; i < STAR_COUNT; i++) {
      const dist = 50 + Math.random() * 180;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      starPositions[i * 3] = dist * Math.sin(phi) * Math.cos(theta);
      starPositions[i * 3 + 1] = dist * Math.sin(phi) * Math.sin(theta);
      starPositions[i * 3 + 2] = dist * Math.cos(phi);

      const dice = Math.random();
      let col = whiteStar;
      if (dice < 0.25) col = cyanStar;
      else if (dice < 0.45) col = purpleStar;
      else if (dice < 0.6) col = goldStar;

      starColors[i * 3] = col.r;
      starColors[i * 3 + 1] = col.g;
      starColors[i * 3 + 2] = col.b;
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const starMat = new THREE.PointsMaterial({
      size: 0.8,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
    });

    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // 8. Scroll & Mouse Tracking
    let targetScroll = window.scrollY;
    let currentScroll = window.scrollY;
    let mouseX = 0;
    let mouseY = 0;

    const onScroll = () => {
      targetScroll = window.scrollY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    const onMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // 9. Animation Loop
    let clock = new THREE.Clock();
    let animId;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth scroll interpolation
      currentScroll += (targetScroll - currentScroll) * 0.075;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, currentScroll / maxScroll));

      // --- EARTH ROTATION ---
      earthMesh.rotation.y = 3.8 + elapsed * 0.05 + progress * 0.8;
      cloudMesh.rotation.y = 3.8 + elapsed * 0.068 + progress * 0.9;
      cloudMesh.rotation.x = Math.sin(elapsed * 0.03) * 0.02;

      // --- MOON ORBIT ---
      const moonOrbitAngle = elapsed * 0.08 + progress * 1.5;
      moonMesh.position.x = earthGroup.position.x + Math.cos(moonOrbitAngle) * 9.5;
      moonMesh.position.z = earthGroup.position.z + Math.sin(moonOrbitAngle) * 7.5;
      moonMesh.position.y = earthGroup.position.y + 2.5 + Math.sin(elapsed * 0.2) * 0.8;
      moonMesh.rotation.y += 0.005;

      // --- ASTEROIDS ROTATION & DRIFT ---
      asteroids.forEach((a, idx) => {
        a.mesh.rotation.x += a.rotSpeedX;
        a.mesh.rotation.y += a.rotSpeedY;
        // As you scroll down, asteroids drift past the camera
        a.mesh.position.z = a.baseZ + progress * 15 + Math.sin(elapsed * 0.5 + idx) * 0.5;
      });

      // --- STARFIELD SLOW DRIFT ---
      starField.rotation.y = elapsed * 0.004 + progress * 0.2;

      // --- ZOOMING OUT FROM EARTH INTO DEEP SPACE ON SCROLL ---
      // At top (Hero): Camera is close (Z ~ 8.5), Earth is centered and majestic
      // As user scrolls down: Camera pulls smoothly back into deep space (Z ~ 32)
      const targetCamZ = 8.5 + progress * 24.0;
      const targetCamY = -progress * 5.0;
      const targetCamX = mouseX * 0.8;

      camera.position.z += (targetCamZ - camera.position.z) * 0.08;
      camera.position.y += (targetCamY - camera.position.y) * 0.08;
      camera.position.x += (targetCamX - camera.position.x) * 0.06;

      // Parallax lookAt Earth while pulling away
      camera.lookAt(
        0,
        earthGroup.position.y * (1 - progress * 0.5),
        earthGroup.position.z
      );

      // Earth slight scale recession as we zoom out into cosmos
      const earthScale = 1.0 - progress * 0.45;
      earthGroup.scale.set(earthScale, earthScale, earthScale);
      earthGroup.position.x = 0;
      earthGroup.position.y = -1.5 + progress * 1.0;

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

      earthGeo.dispose();
      earthMat.dispose();
      cloudGeo.dispose();
      cloudMat.dispose();
      glowGeo.dispose();
      glowMat.dispose();
      moonGeo.dispose();
      moonMat.dispose();
      asteroids.forEach((a) => {
        a.mesh.geometry.dispose();
        a.mesh.material.dispose();
      });
      starGeo.dispose();
      starMat.dispose();
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
      style={{ opacity: 0.98 }}
      aria-hidden="true"
    />
  );
}
