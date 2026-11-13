import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Procedural metallic solar cell grid texture for the 3D satellite wings.
 */
function createSolarPanelTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');

  const grad = ctx.createLinearGradient(0, 0, 256, 128);
  grad.addColorStop(0, '#091f4d');
  grad.addColorStop(0.5, '#0e3478');
  grad.addColorStop(1, '#07173a');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 256, 128);

  // Silver frame
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 8;
  ctx.strokeRect(4, 4, 248, 120);

  // Photovoltaic grid lines
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.55)';
  ctx.lineWidth = 2;
  for (let x = 32; x < 256; x += 32) {
    ctx.beginPath();
    ctx.moveTo(x, 8);
    ctx.lineTo(x, 120);
    ctx.stroke();
  }
  for (let y = 32; y < 128; y += 32) {
    ctx.beginPath();
    ctx.moveTo(8, y);
    ctx.lineTo(248, y);
    ctx.stroke();
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function AvatarHologramPlane() {
  const avatarTexture = useTexture('/assets/digonta-full-avatar.png');
  avatarTexture.colorSpace = THREE.SRGBColorSpace;
  avatarTexture.magFilter = THREE.NearestFilter;
  avatarTexture.minFilter = THREE.LinearMipmapLinearFilter;

  return (
    <mesh position={[0, 0.04, 0.44]}>
      <planeGeometry args={[0.92, 1.92]} />
      <meshBasicMaterial
        map={avatarTexture}
        transparent
        alphaTest={0.12}
        side={THREE.DoubleSide}
        toneMapped={false}
      />
    </mesh>
  );
}

function SatelliteModel({ isHovered, pingKey }) {
  const rootRef = useRef();
  const leftWingRef = useRef();
  const rightWingRef = useRef();
  const beaconRef = useRef();
  const spinBoostRef = useRef(0);
  const lastPingRef = useRef(pingKey);

  const solarTex = useMemo(() => createSolarPanelTexture(), []);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    if (lastPingRef.current !== pingKey) {
      lastPingRef.current = pingKey;
      spinBoostRef.current = Math.PI * 2;
    }

    if (spinBoostRef.current > 0.01) {
      spinBoostRef.current = THREE.MathUtils.lerp(spinBoostRef.current, 0, Math.min(1, delta * 5.5));
    } else {
      spinBoostRef.current = 0;
    }

    if (rootRef.current) {
      // Zero-G bobbing + gentle banking toward waypoint rail on the right
      const targetHop = spinBoostRef.current > 0.4 ? Math.sin(spinBoostRef.current * 0.5) * 0.25 : 0;
      rootRef.current.position.y = Math.sin(t * 2.2) * 0.09 + targetHop;

      const baseYaw = isHovered ? 0.34 : 0.14;
      rootRef.current.rotation.y =
        baseYaw + Math.sin(t * 1.15) * 0.24 + (Math.PI * 2 - spinBoostRef.current);
      rootRef.current.rotation.z = Math.cos(t * 1.5) * 0.055 - (isHovered ? 0.06 : 0);
      rootRef.current.rotation.x = Math.sin(t * 1.3) * 0.04;
    }

    if (leftWingRef.current && rightWingRef.current) {
      const wingTilt = Math.sin(t * 1.4) * 0.16;
      leftWingRef.current.rotation.x = wingTilt;
      rightWingRef.current.rotation.x = -wingTilt;
    }

    if (beaconRef.current) {
      const pulse = 1 + Math.sin(t * 5) * 0.28;
      beaconRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <group ref={rootRef} scale={0.84}>
      {/* Main Metallic Satellite Chassis behind Hologram */}
      <mesh position={[0, -0.04, -0.18]}>
        <cylinderGeometry args={[0.42, 0.46, 1.35, 8]} />
        <meshStandardMaterial color="#162244" metalness={0.82} roughness={0.28} />
      </mesh>

      {/* Top & Bottom Titanium Caps */}
      <mesh position={[0, 0.66, -0.18]}>
        <cylinderGeometry args={[0.32, 0.43, 0.12, 8]} />
        <meshStandardMaterial color="#64748b" metalness={0.88} roughness={0.22} />
      </mesh>
      <mesh position={[0, -0.74, -0.18]}>
        <cylinderGeometry args={[0.46, 0.3, 0.14, 8]} />
        <meshStandardMaterial color="#475569" metalness={0.85} roughness={0.25} />
      </mesh>

      {/* Glowing Cyan & Purple Orbital Rings */}
      <mesh position={[0, 0.32, -0.14]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.48, 0.032, 12, 32]} />
        <meshStandardMaterial
          color="#00dcf0"
          emissive="#00dcf0"
          emissiveIntensity={1.6}
          roughness={0.2}
        />
      </mesh>
      <mesh position={[0, -0.38, -0.14]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.49, 0.03, 12, 32]} />
        <meshStandardMaterial
          color="#a855f7"
          emissive="#a855f7"
          emissiveIntensity={1.4}
          roughness={0.2}
        />
      </mesh>

      {/* Holographic Backplate Glow */}
      <mesh position={[0, 0.04, 0.34]}>
        <planeGeometry args={[1.04, 2.02]} />
        <meshBasicMaterial color="#00dcf0" transparent opacity={0.1} side={THREE.DoubleSide} />
      </mesh>

      {/* Full-Body Pixel Character Avatar Mounted on Satellite Front */}
      <Suspense fallback={null}>
        <AvatarHologramPlane />
      </Suspense>

      {/* Left Solar Panel Wing */}
      <group ref={leftWingRef} position={[-0.65, 0.05, -0.18]}>
        <mesh position={[0.14, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.035, 0.035, 0.42, 8]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[-0.45, 0, 0]}>
          <boxGeometry args={[0.88, 0.46, 0.04]} />
          <meshStandardMaterial map={solarTex} metalness={0.45} roughness={0.25} />
        </mesh>
      </group>

      {/* Right Solar Panel Wing */}
      <group ref={rightWingRef} position={[0.65, 0.05, -0.18]}>
        <mesh position={[-0.14, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.035, 0.035, 0.42, 8]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[0.45, 0, 0]}>
          <boxGeometry args={[0.88, 0.46, 0.04]} />
          <meshStandardMaterial map={solarTex} metalness={0.45} roughness={0.25} />
        </mesh>
      </group>

      {/* Top Parabolic Comms Dish & Mast */}
      <group position={[0, 0.84, -0.18]}>
        <mesh position={[0, 0.08, 0]}>
          <cylinderGeometry args={[0.03, 0.04, 0.34, 8]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.85} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0.22, 0.06]} rotation={[0.45, 0, 0]}>
          <sphereGeometry args={[0.26, 20, 12, 0, Math.PI * 2, 0, 1.05]} />
          <meshStandardMaterial
            color="#e2e8f0"
            metalness={0.75}
            roughness={0.22}
            side={THREE.DoubleSide}
          />
        </mesh>
        {/* Blinking Telemetry Beacon */}
        <mesh ref={beaconRef} position={[0, 0.42, 0.14]}>
          <sphereGeometry args={[0.065, 16, 16]} />
          <meshBasicMaterial color="#00dcf0" />
        </mesh>
      </group>

      {/* Bottom Ion Thruster Cone + Plasma Core */}
      <group position={[0, -0.92, -0.18]}>
        <mesh>
          <cylinderGeometry args={[0.14, 0.24, 0.22, 12]} />
          <meshStandardMaterial color="#334155" metalness={0.85} roughness={0.3} />
        </mesh>
        <mesh position={[0, -0.16, 0]}>
          <coneGeometry args={[0.14, 0.28, 12]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.72} />
        </mesh>
      </group>
    </group>
  );
}

export default function SatelliteAvatar3D({ isHovered = false, pingKey = 0, className = '' }) {
  return (
    <div className={className}>
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0.05, 4.4], fov: 42 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={1.35} />
        <directionalLight position={[4, 5, 5]} intensity={2.1} color="#ffffff" />
        <pointLight position={[-4, 2, 3]} intensity={1.6} color="#00dcf0" />
        <pointLight position={[3, -3, 2]} intensity={1.3} color="#a855f7" />
        <SatelliteModel isHovered={isHovered} pingKey={pingKey} />
      </Canvas>
    </div>
  );
}
