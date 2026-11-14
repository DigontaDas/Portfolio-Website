import { useEffect, useRef } from 'react';
import * as THREE from 'three';

// Generates a soft radial glow texture for Milky Way galactic dust clouds and core
function createNebulaGlowTexture(innerColor, midColor, outerColor) {
    const size = 256;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    const c = size / 2;

    const grad = ctx.createRadialGradient(c, c, 0, c, c, c);
    grad.addColorStop(0, innerColor);
    grad.addColorStop(0.32, midColor);
    grad.addColorStop(0.7, outerColor);
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);

    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
}

// Generates a circular soft star sprite texture so points look like glowing stars
function createStarSpriteTexture() {
    const size = 64;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    const c = size / 2;

    const grad = ctx.createRadialGradient(c, c, 0, c, c, c);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.28, 'rgba(225, 245, 255, 0.85)');
    grad.addColorStop(0.62, 'rgba(130, 190, 255, 0.22)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);

    return new THREE.CanvasTexture(canvas);
}

export default function EarthSpaceCanvas() {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        const isMobileViewport = () => window.innerWidth < 768;
        const isMobileInit = isMobileViewport() || window.matchMedia('(pointer: coarse)').matches;
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        // 1. Scene & Camera Setup (matches original Earth-orbit closeup -> pullback choreography)
        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x030614, 0.0026);

        const camera = new THREE.PerspectiveCamera(44, width / height, 0.1, 1000);
        camera.position.set(0, 0, isMobileViewport() ? 10.6 : 8.6);

        const renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: !isMobileInit,
            powerPreference: isMobileInit ? 'default' : 'high-performance',
        });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobileInit ? 1.25 : 1.75));
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.18;
        container.appendChild(renderer.domElement);

        const disposables = [];
        const track = (item) => {
            disposables.push(item);
            return item;
        };

        // 2. Texture Loader
        const textureLoader = new THREE.TextureLoader();
        const earthMap = track(textureLoader.load('/textures/space/earth.jpg'));
        earthMap.colorSpace = THREE.SRGBColorSpace;
        const earthNormal = track(textureLoader.load('/textures/space/earth_normal.jpg'));
        const earthClouds = track(textureLoader.load('/textures/space/earth_clouds.png'));
        const moonMap = track(textureLoader.load('/textures/space/moon.jpg'));
        moonMap.colorSpace = THREE.SRGBColorSpace;
        const starSprite = track(createStarSpriteTexture());

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

        // 4. Photorealistic Earth System (centered low initially, receding as you scroll)
        const earthSegments = isMobileInit ? 40 : 64;
        const earthGroup = new THREE.Group();
        earthGroup.position.set(0, -1.4, 0);
        scene.add(earthGroup);

        const earthTiltGroup = new THREE.Group();
        earthTiltGroup.rotation.z = THREE.MathUtils.degToRad(23.4);
        earthGroup.add(earthTiltGroup);

        const earthRadius = 3.25;
        const earthGeo = track(new THREE.SphereGeometry(earthRadius, earthSegments, earthSegments));
        const earthMat = track(
            new THREE.MeshPhongMaterial({
                map: earthMap,
                normalMap: earthNormal,
                normalScale: new THREE.Vector2(1.25, 1.25),
                specular: new THREE.Color(0x2e6f9e),
                shininess: 22,
            })
        );
        const earthMesh = new THREE.Mesh(earthGeo, earthMat);
        earthMesh.rotation.y = 3.7;
        earthTiltGroup.add(earthMesh);

        // Crisp Cloud Layer
        const cloudGeo = track(new THREE.SphereGeometry(earthRadius * 1.016, earthSegments, earthSegments));
        const cloudMat = track(
            new THREE.MeshStandardMaterial({
                map: earthClouds,
                transparent: true,
                opacity: 0.45,
                blending: THREE.AdditiveBlending,
                depthWrite: false,
                roughness: 1,
            })
        );
        const cloudMesh = new THREE.Mesh(cloudGeo, cloudMat);
        earthTiltGroup.add(cloudMesh);

        // Inner Atmospheric Limb Scattering (Cyan-Azure Rayleigh Glow)
        const innerAtmoGeo = track(
            new THREE.SphereGeometry(earthRadius * 1.028, isMobileInit ? 36 : 56, isMobileInit ? 36 : 56)
        );
        const innerAtmoMat = track(
            new THREE.ShaderMaterial({
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
            })
        );
        earthGroup.add(new THREE.Mesh(innerAtmoGeo, innerAtmoMat));

        // Outer Atmospheric Halo
        const outerAtmoGeo = track(
            new THREE.SphereGeometry(earthRadius * 1.08, isMobileInit ? 36 : 56, isMobileInit ? 36 : 56)
        );
        const outerAtmoMat = track(
            new THREE.ShaderMaterial({
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
            })
        );
        earthGroup.add(new THREE.Mesh(outerAtmoGeo, outerAtmoMat));

        // 5. Realistic Moon (Orbiting Earth)
        const moonSegments = isMobileInit ? 28 : 44;
        const moonGeo = track(new THREE.SphereGeometry(0.84, moonSegments, moonSegments));
        const moonMat = track(
            new THREE.MeshStandardMaterial({
                map: moonMap,
                roughness: 0.94,
                metalness: 0.02,
            })
        );
        const moonMesh = new THREE.Mesh(moonGeo, moonMat);
        moonMesh.position.set(8.5, 2.8, -5.5);
        scene.add(moonMesh);

        // 6. Deep-Space Milky Way Galaxy Band (Visible behind Earth & revealed wider as you pull away)
        const milkyWayGroup = new THREE.Group();
        milkyWayGroup.position.set(-3, 4, -68);
        milkyWayGroup.rotation.z = THREE.MathUtils.degToRad(-26);
        milkyWayGroup.rotation.x = THREE.MathUtils.degToRad(12);
        scene.add(milkyWayGroup);

        const coreGlowTex = track(
            createNebulaGlowTexture(
                'rgba(255, 224, 178, 0.36)',
                'rgba(167, 139, 250, 0.18)',
                'rgba(56, 189, 248, 0.04)'
            )
        );
        const cyanNebulaTex = track(
            createNebulaGlowTexture(
                'rgba(56, 189, 248, 0.24)',
                'rgba(99, 102, 241, 0.11)',
                'rgba(15, 23, 42, 0.02)'
            )
        );
        const violetNebulaTex = track(
            createNebulaGlowTexture(
                'rgba(168, 85, 247, 0.22)',
                'rgba(59, 130, 246, 0.09)',
                'rgba(3, 6, 20, 0.01)'
            )
        );

        const nebulaSpriteCount = isMobileInit ? 14 : 26;
        for (let i = 0; i < nebulaSpriteCount; i++) {
            const t = (i / (nebulaSpriteCount - 1)) * 2 - 1;
            const tex =
                Math.abs(t) < 0.28
                    ? coreGlowTex
                    : i % 2 === 0
                      ? cyanNebulaTex
                      : violetNebulaTex;

            const mat = track(
                new THREE.SpriteMaterial({
                    map: tex,
                    transparent: true,
                    opacity: Math.abs(t) < 0.28 ? 0.45 : 0.32,
                    blending: THREE.AdditiveBlending,
                    depthWrite: false,
                })
            );
            const sprite = new THREE.Sprite(mat);
            const x = t * 72 + (Math.random() - 0.5) * 8;
            const y = (Math.random() - 0.5) * (Math.abs(t) < 0.25 ? 7.5 : 5.5);
            const z = (Math.random() - 0.5) * 16 - Math.abs(t) * 8;
            sprite.position.set(x, y, z);

            const baseScale = Math.abs(t) < 0.25 ? 32 : 24 + Math.random() * 10;
            sprite.scale.set(baseScale * 1.5, baseScale * 0.72, 1);
            milkyWayGroup.add(sprite);
        }

        const galacticPalette = [
            new THREE.Color(0xfff4d6),
            new THREE.Color(0xe0f2fe),
            new THREE.Color(0xc4b5fd),
            new THREE.Color(0x7dd3fc),
            new THREE.Color(0xffffff),
        ];

        const mwStarCount = isMobileInit ? 900 : 2200;
        const mwPositions = new Float32Array(mwStarCount * 3);
        const mwColors = new Float32Array(mwStarCount * 3);

        for (let i = 0; i < mwStarCount; i++) {
            const i3 = i * 3;
            const along = (Math.random() - 0.5) * 150;
            const spreadY = ((Math.random() + Math.random() + Math.random()) / 3 - 0.5) * 22;
            const depthZ = (Math.random() - 0.5) * 32;

            mwPositions[i3] = along;
            mwPositions[i3 + 1] = spreadY + Math.sin(along * 0.05) * 2.8;
            mwPositions[i3 + 2] = depthZ;

            const nearCore = Math.abs(along) < 24;
            const col =
                nearCore && Math.random() > 0.35
                    ? galacticPalette[0]
                    : galacticPalette[Math.floor(Math.random() * galacticPalette.length)];
            const brightness = nearCore ? 0.96 : 0.62 + Math.random() * 0.38;
            mwColors[i3] = col.r * brightness;
            mwColors[i3 + 1] = col.g * brightness;
            mwColors[i3 + 2] = col.b * brightness;
        }

        const mwGeo = track(new THREE.BufferGeometry());
        mwGeo.setAttribute('position', new THREE.BufferAttribute(mwPositions, 3));
        mwGeo.setAttribute('color', new THREE.BufferAttribute(mwColors, 3));

        const mwMat = track(
            new THREE.PointsMaterial({
                size: isMobileInit ? 0.42 : 0.36,
                map: starSprite,
                vertexColors: true,
                transparent: true,
                opacity: 0.9,
                blending: THREE.AdditiveBlending,
                depthWrite: false,
            })
        );
        milkyWayGroup.add(new THREE.Points(mwGeo, mwMat));

        // 7. Crisp Deep-Space Starfield (Surrounding 3D Volume)
        const starCount = isMobileInit ? 480 : 1200;
        const starGeo = track(new THREE.BufferGeometry());
        const starPositions = new Float32Array(starCount * 3);
        const starColors = new Float32Array(starCount * 3);

        for (let i = 0; i < starCount; i++) {
            const radius = 55 + Math.random() * 145;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(Math.random() * 2 - 1);

            starPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
            starPositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            starPositions[i * 3 + 2] = radius * Math.cos(phi) - 25;

            const col = galacticPalette[Math.floor(Math.random() * galacticPalette.length)];
            starColors[i * 3] = col.r;
            starColors[i * 3 + 1] = col.g;
            starColors[i * 3 + 2] = col.b;
        }

        starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
        starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

        const starMat = track(
            new THREE.PointsMaterial({
                size: isMobileInit ? 0.62 : 0.56,
                map: starSprite,
                vertexColors: true,
                transparent: true,
                opacity: 0.86,
                blending: THREE.AdditiveBlending,
                depthWrite: false,
            })
        );
        const starField = new THREE.Points(starGeo, starMat);
        scene.add(starField);

        // 8. Scroll & Mouse Tracking
        let targetScroll = window.scrollY;
        let currentScroll = window.scrollY;
        let mouseX = 0;

        const onScroll = () => {
            targetScroll = window.scrollY;
        };
        window.addEventListener('scroll', onScroll, { passive: true });

        const onMouseMove = (e) => {
            mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        };
        if (!isMobileInit && !prefersReducedMotion) {
            window.addEventListener('mousemove', onMouseMove, { passive: true });
        }

        // 9. Animation Loop
        const clock = new THREE.Clock();
        let animId = null;
        let isTabVisible = !document.hidden;

        const onVisibilityChange = () => {
            isTabVisible = !document.hidden;
            if (isTabVisible) {
                clock.getDelta();
            }
        };
        document.addEventListener('visibilitychange', onVisibilityChange);

        const animate = () => {
            animId = requestAnimationFrame(animate);
            if (!isTabVisible) return;

            const elapsed = clock.getElapsedTime();
            const speed = prefersReducedMotion ? 0.15 : 1;

            currentScroll += (targetScroll - currentScroll) * 0.075;
            const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
            const progress = Math.min(1, Math.max(0, currentScroll / maxScroll));

            // Earth & Clouds rotation
            earthMesh.rotation.y = 3.7 + elapsed * 0.045 * speed + progress * 0.9;
            cloudMesh.rotation.y = 3.7 + elapsed * 0.062 * speed + progress * 1.05;

            // Moon orbit around Earth
            const moonAngle = elapsed * 0.08 * speed + progress * 1.6;
            const moonRadiusOrbit = isMobileViewport() ? 6.6 : 9.2;
            moonMesh.position.x = earthGroup.position.x + Math.cos(moonAngle) * moonRadiusOrbit;
            moonMesh.position.z = earthGroup.position.z + Math.sin(moonAngle) * 7.2;
            moonMesh.position.y = earthGroup.position.y + 2.4 + Math.sin(elapsed * 0.2 * speed) * 0.6;
            moonMesh.rotation.y += 0.004 * speed;

            // Subtle Milky Way & starfield motion
            milkyWayGroup.rotation.y = Math.sin(elapsed * 0.02 * speed) * 0.03 + progress * 0.1;
            starField.rotation.y = elapsed * 0.0035 * speed + progress * 0.18;

            // Exact Original Logic: Camera pulls far away from Earth into Deep Space on scroll
            const isMobileNow = isMobileViewport();
            const baseCamZ = isMobileNow ? 10.6 : 8.6;
            const targetCamZ = baseCamZ + progress * 23.0;
            const targetCamY = -progress * 4.5;
            const targetCamX =
                isMobileNow || prefersReducedMotion ? 0 : mouseX * 0.75;

            camera.position.z += (targetCamZ - camera.position.z) * 0.08;
            camera.position.y += (targetCamY - camera.position.y) * 0.08;
            camera.position.x += (targetCamX - camera.position.x) * 0.06;

            camera.lookAt(0, earthGroup.position.y * (1 - progress * 0.45), earthGroup.position.z);

            const earthScale = (isMobileNow ? 0.88 : 1.0) * (1.0 - progress * 0.44);
            earthGroup.scale.set(earthScale, earthScale, earthScale);
            earthGroup.position.y = -1.4 + progress * 0.9;

            renderer.render(scene, camera);
        };

        animate();

        const onResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            const mobileNow = isMobileViewport();
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobileNow ? 1.25 : 1.75));
        };
        window.addEventListener('resize', onResize);

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('resize', onResize);
            document.removeEventListener('visibilitychange', onVisibilityChange);

            disposables.forEach((d) => {
                if (d && typeof d.dispose === 'function') d.dispose();
            });
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
