import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Deterministic pseudo-random helper for consistent procedural planet maps.
 */
function seededNoise(seed) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

/**
 * Generates an accurate Mars equirectangular texture:
 * iron-oxide rust terrain, dark basaltic regions (Valles Marineris / Syrtis),
 * impact craters, and crisp white north/south polar ice caps.
 */
function createMarsTexture() {
  const w = 1024;
  const h = 512;
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  const rand = seededNoise(4021);

  const grad = ctx.createLinearGradient(0, 0, 0, h);
  grad.addColorStop(0, '#eef2f6');
  grad.addColorStop(0.08, '#c95e33');
  grad.addColorStop(0.35, '#b8461d');
  grad.addColorStop(0.55, '#a83c17');
  grad.addColorStop(0.92, '#c86035');
  grad.addColorStop(1, '#eef2f6');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // Dark basaltic regions (Syrtis Major, Mare Erythraeum)
  for (let i = 0; i < 42; i++) {
    const x = rand() * w;
    const y = h * (0.18 + rand() * 0.64);
    const rx = 25 + rand() * 90;
    const ry = 12 + rand() * 45;
    const g = ctx.createRadialGradient(x, y, 2, x, y, rx);
    g.addColorStop(0, 'rgba(72, 26, 16, 0.45)');
    g.addColorStop(1, 'rgba(72, 26, 16, 0)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.ellipse(x, y, rx, ry, rand() * Math.PI, 0, Math.PI * 2);
    ctx.fill();
  }

  // Ochre dust plains
  for (let i = 0; i < 55; i++) {
    const x = rand() * w;
    const y = h * (0.14 + rand() * 0.72);
    const r = 15 + rand() * 65;
    const g = ctx.createRadialGradient(x, y, 1, x, y, r);
    g.addColorStop(0, 'rgba(227, 133, 82, 0.35)');
    g.addColorStop(1, 'rgba(227, 133, 82, 0)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // Valles Marineris canyon scar
  ctx.strokeStyle = 'rgba(65, 22, 14, 0.55)';
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(w * 0.34, h * 0.52);
  ctx.bezierCurveTo(w * 0.42, h * 0.5, w * 0.5, h * 0.55, w * 0.58, h * 0.53);
  ctx.stroke();

  // Impact craters
  for (let i = 0; i < 90; i++) {
    const x = rand() * w;
    const y = h * (0.12 + rand() * 0.76);
    const r = 2 + rand() * 8;
    ctx.strokeStyle = 'rgba(65, 24, 15, 0.35)';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Polar ice caps
  const capTop = ctx.createLinearGradient(0, 0, 0, h * 0.11);
  capTop.addColorStop(0, '#f8fafc');
  capTop.addColorStop(0.65, 'rgba(241,245,249,0.8)');
  capTop.addColorStop(1, 'rgba(241,245,249,0)');
  ctx.fillStyle = capTop;
  ctx.fillRect(0, 0, w, h * 0.11);

  const capBot = ctx.createLinearGradient(0, h * 0.9, 0, h);
  capBot.addColorStop(0, 'rgba(241,245,249,0)');
  capBot.addColorStop(0.4, 'rgba(241,245,249,0.75)');
  capBot.addColorStop(1, '#f8fafc');
  ctx.fillStyle = capBot;
  ctx.fillRect(0, h * 0.9, w, h * 0.1);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/**
 * Generates an accurate Jupiter equirectangular texture:
 * cream/tan cloud zones, terracotta/brown equatorial belts,
 * wavy turbulent eddies, and the iconic Great Red Spot.
 */
function createJupiterTexture() {
  const w = 1024;
  const h = 512;
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  const rand = seededNoise(7781);

  const bands = [
    [0.0, '#8d7b6b'],
    [0.08, '#b8a089'],
    [0.16, '#dfd0bc'],
    [0.24, '#b8764f'],
    [0.31, '#eadcc8'],
    [0.37, '#a85f3c'],
    [0.44, '#efe4d4'],
    [0.5, '#d6b692'],
    [0.57, '#9e5435'],
    [0.64, '#eadac4'],
    [0.72, '#bf7d56'],
    [0.8, '#dfd0bc'],
    [0.9, '#9f8b79'],
    [1.0, '#7c6a5c'],
  ];

  const grad = ctx.createLinearGradient(0, 0, 0, h);
  bands.forEach(([stop, color]) => grad.addColorStop(stop, color));
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // Fine atmospheric streaks & eddies
  for (let i = 0; i < 180; i++) {
    const y = rand() * h;
    const thickness = 1 + rand() * 5;
    const isLight = rand() > 0.5;
    ctx.strokeStyle = isLight ? 'rgba(248, 236, 220, 0.22)' : 'rgba(122, 62, 38, 0.22)';
    ctx.lineWidth = thickness;
    ctx.beginPath();
    ctx.moveTo(0, y);
    for (let x = 0; x <= w; x += 64) {
      ctx.lineTo(x, y + Math.sin(x * 0.02 + i) * (2 + rand() * 3));
    }
    ctx.stroke();
  }

  // Great Red Spot in southern equatorial belt
  const spotX = w * 0.62;
  const spotY = h * 0.63;
  const spotGrad = ctx.createRadialGradient(spotX, spotY, 6, spotX, spotY, 54);
  spotGrad.addColorStop(0, '#c84b2c');
  spotGrad.addColorStop(0.55, '#b84226');
  spotGrad.addColorStop(0.85, 'rgba(232, 188, 150, 0.55)');
  spotGrad.addColorStop(1, 'rgba(232, 188, 150, 0)');
  ctx.fillStyle = spotGrad;
  ctx.beginPath();
  ctx.ellipse(spotX, spotY, 54, 30, 0, 0, Math.PI * 2);
  ctx.fill();

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/**
 * Generates an accurate Saturn equirectangular texture:
 * subtle pale-gold and butterscotch atmospheric banding.
 */
function createSaturnTexture() {
  const w = 1024;
  const h = 512;
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');

  const grad = ctx.createLinearGradient(0, 0, 0, h);
  grad.addColorStop(0, '#9e977b');
  grad.addColorStop(0.14, '#cfc096');
  grad.addColorStop(0.28, '#e5d4a6');
  grad.addColorStop(0.42, '#cbb682');
  grad.addColorStop(0.5, '#ebdcb2');
  grad.addColorStop(0.6, '#d3be8b');
  grad.addColorStop(0.76, '#e2cf9f');
  grad.addColorStop(0.88, '#bcae84');
  grad.addColorStop(1, '#8c856d');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/**
 * Generates Saturn's exact multi-band radial ring texture (C ring, B ring,
 * dark Cassini Division gap, and outer A ring).
 */
function createSaturnRingTexture() {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  const cx = size / 2;
  const cy = size / 2;
  const maxR = size / 2;

  ctx.clearRect(0, 0, size, size);

  // Draw concentric radial bands from inner radius (0.42) to outer (0.98)
  for (let r = maxR * 0.44; r < maxR * 0.98; r += 1) {
    const t = (r - maxR * 0.44) / (maxR * 0.54);
    let alpha = 0;
    let col = '226, 208, 172';

    if (t < 0.16) {
      // Inner C Ring (translucent smoky)
      alpha = 0.18 + t * 0.8;
      col = '175, 162, 138';
    } else if (t < 0.58) {
      // Bright dense B Ring
      alpha = 0.72 + Math.sin(t * 70) * 0.14;
      col = '235, 218, 182';
    } else if (t < 0.65) {
      // Cassini Division (dark gap)
      alpha = 0.06;
      col = '110, 100, 88';
    } else if (t < 0.96) {
      // Outer A Ring + Encke gap hint
      alpha = Math.abs(t - 0.84) < 0.012 ? 0.12 : 0.52 + Math.cos(t * 95) * 0.1;
      col = '214, 198, 166';
    } else {
      // Faint F ring fade
      alpha = Math.max(0, (1 - t) * 8);
    }

    ctx.strokeStyle = `rgba(${col}, ${Math.max(0, Math.min(0.9, alpha))})`;
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/**
 * Generates an accurate Neptune equirectangular texture:
 * rich deep cobalt-cerulean atmosphere with subtle white methane cirrus streaks.
 */
function createNeptuneTexture() {
  const w = 1024;
  const h = 512;
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  const rand = seededNoise(9912);

  const grad = ctx.createLinearGradient(0, 0, 0, h);
  grad.addColorStop(0, '#1e3a8a');
  grad.addColorStop(0.25, '#2563eb');
  grad.addColorStop(0.5, '#1d4ed8');
  grad.addColorStop(0.75, '#2b5ce0');
  grad.addColorStop(1, '#172554');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // Subtle high-altitude methane cirrus streaks
  for (let i = 0; i < 36; i++) {
    const x = rand() * w;
    const y = h * (0.2 + rand() * 0.6);
    const len = 40 + rand() * 140;
    ctx.strokeStyle = 'rgba(191, 219, 254, 0.24)';
    ctx.lineWidth = 1.5 + rand() * 2;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + len, y + (rand() - 0.5) * 4);
    ctx.stroke();
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export default function EarthSpaceCanvas() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    const isMobileViewport = () => window.innerWidth < 768;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030614, 0.0045);

    const camera = new THREE.PerspectiveCamera(44, width / height, 0.1, 1000);
    camera.position.set(0, 0, isMobileViewport() ? 10.6 : 8.6);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.18;
    container.appendChild(renderer.domElement);

    // 2. Texture Loader
    const textureLoader = new THREE.TextureLoader();
    const earthMap = textureLoader.load('/textures/space/earth.jpg');
    earthMap.colorSpace = THREE.SRGBColorSpace;
    const earthNormal = textureLoader.load('/textures/space/earth_normal.jpg');
    const earthClouds = textureLoader.load('/textures/space/earth_clouds.png');
    const moonMap = textureLoader.load('/textures/space/moon.jpg');
    moonMap.colorSpace = THREE.SRGBColorSpace;

    // Procedural exact solar-system planet textures
    const marsMap = createMarsTexture();
    const jupiterMap = createJupiterTexture();
    const saturnMap = createSaturnTexture();
    const saturnRingMap = createSaturnRingTexture();
    const neptuneMap = createNeptuneTexture();

    // 3. Realistic Sunlight & Cosmic Lighting
    const sunLight = new THREE.DirectionalLight(0xfff8ee, 2.85);
    sunLight.position.set(14, 6, 12);
    scene.add(sunLight);

    const earthFillLight = new THREE.HemisphereLight(0x38bdf8, 0x0b0f29, 0.55);
    scene.add(earthFillLight);

    const blueRimLight = new THREE.PointLight(0x00dcf0, 1.5, 90);
    blueRimLight.position.set(-16, -6, 6);
    scene.add(blueRimLight);

    const purpleRimLight = new THREE.PointLight(0xa855f7, 1.2, 110);
    purpleRimLight.position.set(10, 14, -18);
    scene.add(purpleRimLight);

    // 4. Upgraded Photorealistic Earth System (23.4° axial tilt, ocean specular, crisp clouds, dual atmosphere)
    const earthGroup = new THREE.Group();
    earthGroup.position.set(0, -1.4, 0);
    scene.add(earthGroup);

    const earthTiltGroup = new THREE.Group();
    earthTiltGroup.rotation.z = THREE.MathUtils.degToRad(23.4);
    earthGroup.add(earthTiltGroup);

    const earthRadius = 3.25;
    const earthGeo = new THREE.SphereGeometry(earthRadius, 72, 72);
    const earthMat = new THREE.MeshPhongMaterial({
      map: earthMap,
      normalMap: earthNormal,
      normalScale: new THREE.Vector2(1.25, 1.25),
      specular: new THREE.Color(0x2e6f9e),
      shininess: 22,
    });
    const earthMesh = new THREE.Mesh(earthGeo, earthMat);
    earthMesh.rotation.y = 3.7;
    earthTiltGroup.add(earthMesh);

    // Crisp Cloud Layer
    const cloudGeo = new THREE.SphereGeometry(earthRadius * 1.016, 72, 72);
    const cloudMat = new THREE.MeshStandardMaterial({
      map: earthClouds,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      roughness: 1,
    });
    const cloudMesh = new THREE.Mesh(cloudGeo, cloudMat);
    earthTiltGroup.add(cloudMesh);

    // Inner Atmospheric Limb Scattering (Cyan-Azure Rayleigh Glow)
    const innerAtmoGeo = new THREE.SphereGeometry(earthRadius * 1.028, 64, 64);
    const innerAtmoMat = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vViewPos;
        void main() {
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          vViewPos = -mvPosition.xyz;
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        varying vec3 vViewPos;
        void main() {
          vec3 viewDir = normalize(vViewPos);
          float rim = 1.0 - max(0.0, dot(viewDir, vNormal));
          float intensity = pow(rim, 3.2);
          vec3 col = mix(vec3(0.18, 0.72, 1.0), vec3(0.0, 0.92, 1.0), rim);
          gl_FragColor = vec4(col, intensity * 0.72);
        }
      `,
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false,
    });
    const innerAtmoMesh = new THREE.Mesh(innerAtmoGeo, innerAtmoMat);
    earthGroup.add(innerAtmoMesh);

    // Outer Atmospheric Halo
    const outerAtmoGeo = new THREE.SphereGeometry(earthRadius * 1.08, 64, 64);
    const outerAtmoMat = new THREE.ShaderMaterial({
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
          float intensity = pow(0.64 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.8);
          gl_FragColor = vec4(0.12, 0.68, 0.98, 1.0) * max(0.0, intensity) * 0.65;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
      depthWrite: false,
    });
    const outerAtmoMesh = new THREE.Mesh(outerAtmoGeo, outerAtmoMat);
    earthGroup.add(outerAtmoMesh);

    // 5. Realistic Moon (Orbiting Earth)
    const moonGeo = new THREE.SphereGeometry(0.84, 48, 48);
    const moonMat = new THREE.MeshStandardMaterial({
      map: moonMap,
      roughness: 0.94,
      metalness: 0.02,
    });
    const moonMesh = new THREE.Mesh(moonGeo, moonMat);
    moonMesh.position.set(8.5, 2.8, -5.5);
    scene.add(moonMesh);

    // 6. Exact Solar System Planets in Deep Space (NO asteroids!)
    const disposableGeos = [earthGeo, cloudGeo, innerAtmoGeo, outerAtmoGeo, moonGeo];
    const disposableMats = [earthMat, cloudMat, innerAtmoMat, outerAtmoMat, moonMat];
    const disposableTexs = [marsMap, jupiterMap, saturnMap, saturnRingMap, neptuneMap];

    // Mars
    const marsGeo = new THREE.SphereGeometry(1.18, 48, 48);
    const marsMat = new THREE.MeshStandardMaterial({
      map: marsMap,
      roughness: 0.86,
      metalness: 0.04,
    });
    const marsMesh = new THREE.Mesh(marsGeo, marsMat);
    marsMesh.rotation.z = THREE.MathUtils.degToRad(25.2);
    marsMesh.position.set(-10.5, 4.2, -16);
    scene.add(marsMesh);
    disposableGeos.push(marsGeo);
    disposableMats.push(marsMat);

    // Saturn with Exact Multi-Band Rings (26.7° axial tilt)
    const saturnGroup = new THREE.Group();
    saturnGroup.position.set(13.5, -3.4, -24);
    saturnGroup.rotation.z = THREE.MathUtils.degToRad(26.7);
    saturnGroup.rotation.x = THREE.MathUtils.degToRad(14);
    scene.add(saturnGroup);

    const saturnGeo = new THREE.SphereGeometry(2.05, 56, 56);
    const saturnMat = new THREE.MeshStandardMaterial({
      map: saturnMap,
      roughness: 0.72,
      metalness: 0.05,
    });
    const saturnMesh = new THREE.Mesh(saturnGeo, saturnMat);
    saturnGroup.add(saturnMesh);

    const saturnRingGeo = new THREE.RingGeometry(2.45, 4.75, 96);
    // Remap UVs so ring texture maps planarly across the circle
    const ringPos = saturnRingGeo.attributes.position;
    const ringUv = saturnRingGeo.attributes.uv;
    for (let i = 0; i < ringPos.count; i++) {
      const vx = ringPos.getX(i);
      const vy = ringPos.getY(i);
      ringUv.setXY(i, (vx / 4.75 + 1) * 0.5, (vy / 4.75 + 1) * 0.5);
    }
    const saturnRingMat = new THREE.MeshStandardMaterial({
      map: saturnRingMap,
      transparent: true,
      side: THREE.DoubleSide,
      roughness: 0.8,
      depthWrite: false,
    });
    const saturnRingMesh = new THREE.Mesh(saturnRingGeo, saturnRingMat);
    saturnRingMesh.rotation.x = Math.PI / 2;
    saturnGroup.add(saturnRingMesh);
    disposableGeos.push(saturnGeo, saturnRingGeo);
    disposableMats.push(saturnMat, saturnRingMat);

    // Jupiter with Great Red Spot
    const jupiterGeo = new THREE.SphereGeometry(2.85, 56, 56);
    const jupiterMat = new THREE.MeshStandardMaterial({
      map: jupiterMap,
      roughness: 0.68,
      metalness: 0.04,
    });
    const jupiterMesh = new THREE.Mesh(jupiterGeo, jupiterMat);
    jupiterMesh.rotation.z = THREE.MathUtils.degToRad(3.1);
    jupiterMesh.position.set(-15.5, -5.5, -36);
    scene.add(jupiterMesh);
    disposableGeos.push(jupiterGeo);
    disposableMats.push(jupiterMat);

    // Neptune (Deep Space Ice Giant)
    const neptuneGeo = new THREE.SphereGeometry(1.55, 48, 48);
    const neptuneMat = new THREE.MeshStandardMaterial({
      map: neptuneMap,
      roughness: 0.6,
      metalness: 0.08,
    });
    const neptuneMesh = new THREE.Mesh(neptuneGeo, neptuneMat);
    neptuneMesh.rotation.z = THREE.MathUtils.degToRad(28.3);
    neptuneMesh.position.set(11.5, 7.5, -44);
    scene.add(neptuneMesh);
    disposableGeos.push(neptuneGeo);
    disposableMats.push(neptuneMat);

    // 7. Deep Space Starfield
    const STAR_COUNT = 2600;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(STAR_COUNT * 3);
    const starColors = new Float32Array(STAR_COUNT * 3);

    const cyanStar = new THREE.Color('#7dd3fc');
    const whiteStar = new THREE.Color('#ffffff');
    const purpleStar = new THREE.Color('#c084fc');
    const goldStar = new THREE.Color('#fde68a');

    for (let i = 0; i < STAR_COUNT; i++) {
      const dist = 55 + Math.random() * 190;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      starPositions[i * 3] = dist * Math.sin(phi) * Math.cos(theta);
      starPositions[i * 3 + 1] = dist * Math.sin(phi) * Math.sin(theta);
      starPositions[i * 3 + 2] = dist * Math.cos(phi);

      const dice = Math.random();
      let col = whiteStar;
      if (dice < 0.25) col = cyanStar;
      else if (dice < 0.42) col = purpleStar;
      else if (dice < 0.56) col = goldStar;

      starColors[i * 3] = col.r;
      starColors[i * 3 + 1] = col.g;
      starColors[i * 3 + 2] = col.b;
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const starMat = new THREE.PointsMaterial({
      size: 0.72,
      vertexColors: true,
      transparent: true,
      opacity: 0.88,
    });
    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);
    disposableGeos.push(starGeo);
    disposableMats.push(starMat);

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
    const clock = new THREE.Clock();
    let animId;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      currentScroll += (targetScroll - currentScroll) * 0.075;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, currentScroll / maxScroll));

      // Earth & Clouds rotation
      earthMesh.rotation.y = 3.7 + elapsed * 0.045 + progress * 0.9;
      cloudMesh.rotation.y = 3.7 + elapsed * 0.062 + progress * 1.05;

      // Moon orbit around Earth
      const moonAngle = elapsed * 0.08 + progress * 1.6;
      const moonRadiusOrbit = isMobileViewport() ? 6.6 : 9.2;
      moonMesh.position.x = earthGroup.position.x + Math.cos(moonAngle) * moonRadiusOrbit;
      moonMesh.position.z = earthGroup.position.z + Math.sin(moonAngle) * 7.2;
      moonMesh.position.y = earthGroup.position.y + 2.4 + Math.sin(elapsed * 0.2) * 0.6;
      moonMesh.rotation.y += 0.004;

      // Exact Planet Rotations & Subtle Parallax Drift
      const xScale = isMobileViewport() ? 0.52 : 1.0;

      marsMesh.rotation.y = elapsed * 0.06;
      marsMesh.position.x = -10.5 * xScale;
      marsMesh.position.z = -16 + progress * 14;

      saturnMesh.rotation.y = elapsed * 0.08;
      saturnGroup.position.x = 13.5 * xScale;
      saturnGroup.position.z = -24 + progress * 18;

      jupiterMesh.rotation.y = elapsed * 0.095;
      jupiterMesh.position.x = -15.5 * xScale;
      jupiterMesh.position.z = -36 + progress * 22;

      neptuneMesh.rotation.y = elapsed * 0.07;
      neptuneMesh.position.x = 11.5 * xScale;
      neptuneMesh.position.z = -44 + progress * 24;

      // Starfield drift
      starField.rotation.y = elapsed * 0.0035 + progress * 0.18;

      // Smooth Camera Pullback from Earth Orbit to Solar System Space
      const baseCamZ = isMobileViewport() ? 10.6 : 8.6;
      const targetCamZ = baseCamZ + progress * 23.0;
      const targetCamY = -progress * 4.5;
      const targetCamX = mouseX * (isMobileViewport() ? 0.25 : 0.75);

      camera.position.z += (targetCamZ - camera.position.z) * 0.08;
      camera.position.y += (targetCamY - camera.position.y) * 0.08;
      camera.position.x += (targetCamX - camera.position.x) * 0.06;

      camera.lookAt(0, earthGroup.position.y * (1 - progress * 0.45), earthGroup.position.z);

      const earthScale = (isMobileViewport() ? 0.88 : 1.0) * (1.0 - progress * 0.44);
      earthGroup.scale.set(earthScale, earthScale, earthScale);
      earthGroup.position.y = -1.4 + progress * 0.9;

      renderer.render(scene, camera);
    };

    animate();

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

      disposableGeos.forEach((g) => g.dispose());
      disposableMats.forEach((m) => m.dispose());
      disposableTexs.forEach((t) => t.dispose());
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
