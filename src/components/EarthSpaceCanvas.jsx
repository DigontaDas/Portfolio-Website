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

// Generates a circular soft star sprite texture so points look like glowing stars instead of hard squares
function createStarSpriteTexture() {
    const size = 64;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    const c = size / 2;

    const grad = ctx.createRadialGradient(c, c, 0, c, c, c);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.25, 'rgba(225, 245, 255, 0.85)');
    grad.addColorStop(0.6, 'rgba(130, 190, 255, 0.22)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);

    return new THREE.CanvasTexture(canvas);
}

const EarthSpaceCanvas = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        const container = mountRef.current;
        if (!container) return;

        const isMobile = window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches;
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        // Scene & Camera
        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x030614, 0.0085);

        const camera = new THREE.PerspectiveCamera(
            45,
            window.innerWidth / window.innerHeight,
            0.1,
            300
        );
        camera.position.set(0, 0, 14);

        // Renderer optimized for mobile + desktop smoothness
        const renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: !isMobile,
            powerPreference: isMobile ? 'default' : 'high-performance',
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.25 : 1.75));
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.15;
        container.appendChild(renderer.domElement);

        // Track disposables cleanly
        const disposables = [];
        const track = (item) => {
            disposables.push(item);
            return item;
        };

        // --- Textures ---
        const textureLoader = new THREE.TextureLoader();
        const earthMap = track(textureLoader.load('/textures/space/earth.jpg'));
        earthMap.colorSpace = THREE.SRGBColorSpace;
        const earthNormal = track(textureLoader.load('/textures/space/earth_normal.jpg'));
        const earthCloudsMap = track(textureLoader.load('/textures/space/earth_clouds.png'));
        const moonMap = track(textureLoader.load('/textures/space/moon.jpg'));
        moonMap.colorSpace = THREE.SRGBColorSpace;

        const starSprite = track(createStarSpriteTexture());

        // --- Lighting ---
        const ambientLight = new THREE.AmbientLight(0x28385a, 0.85);
        scene.add(ambientLight);

        const sunLight = new THREE.DirectionalLight(0xfff5e4, 2.8);
        sunLight.position.set(16, 8, 12);
        scene.add(sunLight);

        const earthRimLight = new THREE.DirectionalLight(0x38bdf8, 0.9);
        earthRimLight.position.set(-14, -6, -8);
        scene.add(earthRimLight);

        const violetFill = new THREE.PointLight(0x8b5cf6, 1.4, 55);
        violetFill.position.set(-12, 10, 4);
        scene.add(violetFill);

        // --- Milky Way Galaxy Band (Tilted Galactic Plane + Luminous Core) ---
        const milkyWayGroup = new THREE.Group();
        milkyWayGroup.position.set(-4, 2, -48);
        milkyWayGroup.rotation.z = THREE.MathUtils.degToRad(-28);
        milkyWayGroup.rotation.x = THREE.MathUtils.degToRad(14);
        scene.add(milkyWayGroup);

        // Galactic nebula cloud textures
        const coreGlowTex = track(
            createNebulaGlowTexture(
                'rgba(255, 224, 178, 0.34)',
                'rgba(167, 139, 250, 0.16)',
                'rgba(56, 189, 248, 0.04)'
            )
        );
        const cyanNebulaTex = track(
            createNebulaGlowTexture(
                'rgba(56, 189, 248, 0.22)',
                'rgba(99, 102, 241, 0.1)',
                'rgba(15, 23, 42, 0.02)'
            )
        );
        const violetNebulaTex = track(
            createNebulaGlowTexture(
                'rgba(168, 85, 247, 0.2)',
                'rgba(59, 130, 246, 0.08)',
                'rgba(3, 6, 20, 0.01)'
            )
        );

        const nebulaSpriteCount = isMobile ? 14 : 26;
        for (let i = 0; i < nebulaSpriteCount; i++) {
            const t = (i / (nebulaSpriteCount - 1)) * 2 - 1; // -1 to 1 along galactic ridge
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
                    opacity: Math.abs(t) < 0.28 ? 0.42 : 0.3,
                    blending: THREE.AdditiveBlending,
                    depthWrite: false,
                })
            );
            const sprite = new THREE.Sprite(mat);
            const x = t * 56 + (Math.random() - 0.5) * 6;
            const y = (Math.random() - 0.5) * (Math.abs(t) < 0.25 ? 5.5 : 4.2);
            const z = (Math.random() - 0.5) * 14 - Math.abs(t) * 6;
            sprite.position.set(x, y, z);

            const baseScale = Math.abs(t) < 0.25 ? 24 : 18 + Math.random() * 8;
            sprite.scale.set(baseScale * 1.45, baseScale * 0.72, 1);
            milkyWayGroup.add(sprite);
        }

        // Dense Milky Way star ribbon along the galactic plane
        const milkyWayStarCount = isMobile ? 950 : 2400;
        const mwPositions = new Float32Array(milkyWayStarCount * 3);
        const mwColors = new Float32Array(milkyWayStarCount * 3);

        const galacticPalette = [
            new THREE.Color(0xfff4d6), // warm core star
            new THREE.Color(0xe0f2fe), // blue-white giant
            new THREE.Color(0xc4b5fd), // soft lavender star
            new THREE.Color(0x7dd3fc), // cyan star
            new THREE.Color(0xffffff), // bright white
        ];

        for (let i = 0; i < milkyWayStarCount; i++) {
            const i3 = i * 3;
            // Concentrate near center while stretching diagonally across view
            const along = (Math.random() - 0.5) * 115;
            // Gaussian-like vertical spread around galactic equator
            const spreadY = ((Math.random() + Math.random() + Math.random()) / 3 - 0.5) * 18;
            const depthZ = (Math.random() - 0.5) * 28;

            mwPositions[i3] = along;
            mwPositions[i3 + 1] = spreadY + Math.sin(along * 0.06) * 2.2;
            mwPositions[i3 + 2] = depthZ;

            const nearCore = Math.abs(along) < 18;
            const color = nearCore && Math.random() > 0.35
                ? galacticPalette[0]
                : galacticPalette[Math.floor(Math.random() * galacticPalette.length)];
            const brightness = nearCore ? 0.95 : 0.6 + Math.random() * 0.4;
            mwColors[i3] = color.r * brightness;
            mwColors[i3 + 1] = color.g * brightness;
            mwColors[i3 + 2] = color.b * brightness;
        }

        const mwGeo = track(new THREE.BufferGeometry());
        mwGeo.setAttribute('position', new THREE.BufferAttribute(mwPositions, 3));
        mwGeo.setAttribute('color', new THREE.BufferAttribute(mwColors, 3));

        const mwMat = track(
            new THREE.PointsMaterial({
                size: isMobile ? 0.32 : 0.28,
                map: starSprite,
                vertexColors: true,
                transparent: true,
                opacity: 0.88,
                blending: THREE.AdditiveBlending,
                depthWrite: false,
            })
        );
        const milkyWayStars = new THREE.Points(mwGeo, mwMat);
        milkyWayGroup.add(milkyWayStars);

        // --- Deep Outer Starfield ---
        const starCount = isMobile ? 450 : 1100;
        const starPositions = new Float32Array(starCount * 3);
        const starColors = new Float32Array(starCount * 3);

        for (let i = 0; i < starCount; i++) {
            const i3 = i * 3;
            const r = 38 + Math.random() * 68;
            const theta = 2 * Math.PI * Math.random();
            const phi = Math.acos(2 * Math.random() - 1);

            starPositions[i3] = r * Math.sin(phi) * Math.cos(theta);
            starPositions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            starPositions[i3 + 2] = r * Math.cos(phi) - 18;

            const c = galacticPalette[Math.floor(Math.random() * galacticPalette.length)];
            starColors[i3] = c.r;
            starColors[i3 + 1] = c.g;
            starColors[i3 + 2] = c.b;
        }

        const starGeo = track(new THREE.BufferGeometry());
        starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
        starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

        const starMat = track(
            new THREE.PointsMaterial({
                size: isMobile ? 0.22 : 0.18,
                map: starSprite,
                vertexColors: true,
                transparent: true,
                opacity: 0.78,
                blending: THREE.AdditiveBlending,
                depthWrite: false,
            })
        );
        const deepStars = new THREE.Points(starGeo, starMat);
        scene.add(deepStars);

        // --- Primary Object: High-Detail Earth ---
        const earthSegments = isMobile ? 36 : 64;
        const earthGroup = new THREE.Group();
        earthGroup.position.set(isMobile ? 1.8 : 4.2, isMobile ? -0.4 : -0.6, 0);
        earthGroup.rotation.z = THREE.MathUtils.degToRad(23.4);
        scene.add(earthGroup);

        const earthGeo = track(new THREE.SphereGeometry(2.6, earthSegments, earthSegments));
        const earthMat = track(
            new THREE.MeshPhongMaterial({
                map: earthMap,
                normalMap: earthNormal,
                normalScale: new THREE.Vector2(1.45, 1.45),
                specular: new THREE.Color(0x285a8e),
                shininess: 20,
            })
        );
        const earthMesh = new THREE.Mesh(earthGeo, earthMat);
        earthGroup.add(earthMesh);

        // Earth clouds layer
        const cloudGeo = track(new THREE.SphereGeometry(2.645, earthSegments, earthSegments));
        const cloudMat = track(
            new THREE.MeshPhongMaterial({
                map: earthCloudsMap,
                transparent: true,
                opacity: 0.48,
                blending: THREE.AdditiveBlending,
                depthWrite: false,
            })
        );
        const cloudMesh = new THREE.Mesh(cloudGeo, cloudMat);
        earthGroup.add(cloudMesh);

        // Inner Fresnel Atmosphere Glow
        const atmosGeo = track(new THREE.SphereGeometry(2.74, isMobile ? 32 : 48, isMobile ? 32 : 48));
        const atmosMat = track(
            new THREE.ShaderMaterial({
                transparent: true,
                side: THREE.BackSide,
                blending: THREE.AdditiveBlending,
                depthWrite: false,
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
                        float intensity = pow(0.66 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.2);
                        gl_FragColor = vec4(0.22, 0.72, 0.98, 1.0) * intensity * 1.15;
                    }
                `,
            })
        );
        earthGroup.add(new THREE.Mesh(atmosGeo, atmosMat));

        // Outer subtle halo
        const outerHaloGeo = track(new THREE.SphereGeometry(2.96, isMobile ? 28 : 48, isMobile ? 28 : 48));
        const outerHaloMat = track(
            new THREE.ShaderMaterial({
                transparent: true,
                side: THREE.BackSide,
                blending: THREE.AdditiveBlending,
                depthWrite: false,
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
                        float intensity = pow(0.54 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 4.2);
                        gl_FragColor = vec4(0.45, 0.36, 0.96, 1.0) * intensity * 0.55;
                    }
                `,
            })
        );
        earthGroup.add(new THREE.Mesh(outerHaloGeo, outerHaloMat));

        // --- Earth's Moon ---
        const moonSegments = isMobile ? 24 : 36;
        const moonOrbitPivot = new THREE.Group();
        moonOrbitPivot.position.copy(earthGroup.position);
        scene.add(moonOrbitPivot);

        const moonGeo = track(new THREE.SphereGeometry(0.62, moonSegments, moonSegments));
        const moonMat = track(
            new THREE.MeshStandardMaterial({
                map: moonMap,
                roughness: 0.92,
                metalness: 0.04,
            })
        );
        const moonMesh = new THREE.Mesh(moonGeo, moonMat);
        moonMesh.position.set(isMobile ? -3.4 : -5.1, isMobile ? 2.1 : 2.3, 1.6);
        moonOrbitPivot.add(moonMesh);

        // --- Resize Listener ---
        const handleResize = () => {
            const mobileNow = window.innerWidth < 768;
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(
                Math.min(window.devicePixelRatio || 1, mobileNow ? 1.25 : 1.75)
            );
        };
        window.addEventListener('resize', handleResize);

        // --- Scroll Tracking ---
        let scrollY = window.scrollY;
        const handleScroll = () => {
            scrollY = window.scrollY;
        };
        window.addEventListener('scroll', handleScroll, { passive: true });

        // --- Subtle Mouse Parallax (Desktop only) ---
        let mouseX = 0;
        let mouseY = 0;
        const handleMouseMove = (e) => {
            mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
            mouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
        };
        if (!isMobile && !prefersReducedMotion) {
            window.addEventListener('mousemove', handleMouseMove, { passive: true });
        }

        // --- Animation Loop ---
        const clock = new THREE.Clock();
        let animationFrameId = null;
        let isTabVisible = !document.hidden;

        const handleVisibilityChange = () => {
            isTabVisible = !document.hidden;
            if (isTabVisible) {
                clock.getDelta();
            }
        };
        document.addEventListener('visibilitychange', handleVisibilityChange);

        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);
            if (!isTabVisible) return;

            const delta = Math.min(clock.getDelta(), 0.05);
            const elapsed = clock.getElapsedTime();

            const maxScroll = Math.max(
                1,
                document.documentElement.scrollHeight - window.innerHeight
            );
            const scrollNorm = Math.min(1, Math.max(0, scrollY / maxScroll));

            // Earth continuous rotation + clouds + Moon orbit
            const speedFactor = prefersReducedMotion ? 0.15 : 1;
            earthMesh.rotation.y += delta * 0.085 * speedFactor;
            cloudMesh.rotation.y += delta * 0.115 * speedFactor;
            moonMesh.rotation.y += delta * 0.18 * speedFactor;

            // Gentle Moon orbit around Earth
            const moonAngle = elapsed * 0.11 * speedFactor + scrollNorm * Math.PI * 0.6;
            const orbitRadius = isMobile ? 3.8 : 5.4;
            moonMesh.position.x = Math.cos(moonAngle + 2.35) * orbitRadius;
            moonMesh.position.z = Math.sin(moonAngle + 2.35) * (orbitRadius * 0.62);
            moonMesh.position.y = Math.sin(moonAngle * 0.7) * 1.1 + 1.4;

            // Scroll choreography for Earth & Moon pivot
            const targetEarthX = isMobile
                ? 1.5 - scrollNorm * 3.0
                : 4.3 - scrollNorm * 9.0;
            const targetEarthY = isMobile
                ? -0.4 - scrollNorm * 1.6
                : -0.6 - scrollNorm * 2.2;
            const targetEarthZ = 0 - scrollNorm * 5.2;

            earthGroup.position.x += (targetEarthX - earthGroup.position.x) * 0.05;
            earthGroup.position.y += (targetEarthY - earthGroup.position.y) * 0.05;
            earthGroup.position.z += (targetEarthZ - earthGroup.position.z) * 0.05;
            moonOrbitPivot.position.copy(earthGroup.position);

            // Milky Way slow majestic drift & scroll depth shift
            milkyWayGroup.rotation.y = Math.sin(elapsed * 0.025) * 0.03 + scrollNorm * 0.08;
            milkyWayGroup.position.y = 2 + scrollNorm * 4.5;

            // Deep stars subtle rotation
            deepStars.rotation.y += delta * 0.01 * speedFactor;

            // Subtle camera parallax
            const camTargetX = (isMobile ? 0 : mouseX * 0.42);
            const camTargetY = (isMobile ? 0 : mouseY * 0.28) - scrollNorm * 2.1;
            const camTargetZ = 14 - scrollNorm * 2.2;

            camera.position.x += (camTargetX - camera.position.x) * 0.04;
            camera.position.y += (camTargetY - camera.position.y) * 0.04;
            camera.position.z += (camTargetZ - camera.position.z) * 0.04;
            camera.lookAt(0, -scrollNorm * 1.2, -10);

            renderer.render(scene, camera);
        };

        animate();

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('visibilitychange', handleVisibilityChange);

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
            ref={mountRef}
            className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
            aria-hidden="true"
        />
    );
};

export default EarthSpaceCanvas;
