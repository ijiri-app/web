"use client";

import { useRef, type RefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, Html, Lightformer, RoundedBox } from "@react-three/drei";
import type { Group } from "three";
import { SCREEN_H, SCREEN_W } from "./FeedScreen";

/* 폰 치수(three.js 단위). 화면 비율은 FeedScreen(360×760)에 맞춘다. */
const BODY_W = 3.72;
const BODY_H = 7.72;
const BODY_D = 0.34;
const SCREEN_UNITS_W = 3.44;
const PX = SCREEN_UNITS_W / SCREEN_W; // 화면 1px이 차지하는 3D 길이

type Props = {
  children: React.ReactNode;
  /** 기본 각도(라디안). 좌우로 살짝 돌려 둔다 */
  baseYaw?: number;
  reducedMotion: boolean;
};

type ModelProps = Props & { portal: RefObject<HTMLDivElement | null> };

function PhoneModel({ children, baseYaw = -0.32, reducedMotion, portal }: ModelProps) {
  const group = useRef<Group>(null);

  // 포인터를 따라 살짝 기울고, 가만히 있을 때는 천천히 떠 있는다
  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    if (reducedMotion) {
      g.rotation.set(0.08, baseYaw, 0);
      return;
    }
    const t = performance.now() / 1000;
    const targetY = baseYaw + state.pointer.x * 0.28;
    const targetX = 0.08 - state.pointer.y * 0.16;
    const k = 1 - Math.exp(-delta * 4);
    g.rotation.y += (targetY - g.rotation.y) * k;
    g.rotation.x += (targetX - g.rotation.x) * k;
    g.position.y = Math.sin(t * 0.8) * 0.08;
  });

  return (
    <group ref={group} rotation={[0.08, baseYaw, 0]}>
      {/* 본체: 티타늄 프레임 */}
      <RoundedBox args={[BODY_W, BODY_H, BODY_D]} radius={0.5} smoothness={8}>
        <meshPhysicalMaterial color="#5a616e" metalness={0.9} roughness={0.28} clearcoat={0.6} />
      </RoundedBox>

      {/* 전면 유리(검은 베젤) */}
      <RoundedBox args={[BODY_W - 0.08, BODY_H - 0.08, 0.02]} radius={0.44} smoothness={8} position={[0, 0, BODY_D / 2]}>
        <meshPhysicalMaterial color="#05060a" roughness={0.08} metalness={0.2} clearcoat={1} />
      </RoundedBox>

      {/* 측면 버튼 */}
      <mesh position={[-BODY_W / 2 - 0.02, 1.9, 0]}>
        <boxGeometry args={[0.05, 0.5, 0.12]} />
        <meshStandardMaterial color="#3a404c" metalness={0.9} roughness={0.3} />
      </mesh>
      <mesh position={[-BODY_W / 2 - 0.02, 1.15, 0]}>
        <boxGeometry args={[0.05, 0.5, 0.12]} />
        <meshStandardMaterial color="#3a404c" metalness={0.9} roughness={0.3} />
      </mesh>
      <mesh position={[BODY_W / 2 + 0.02, 1.5, 0]}>
        <boxGeometry args={[0.05, 0.85, 0.12]} />
        <meshStandardMaterial color="#3a404c" metalness={0.9} roughness={0.3} />
      </mesh>

      {/* 후면 카메라 섬 */}
      <RoundedBox args={[1.5, 1.5, 0.08]} radius={0.3} smoothness={6} position={[-0.9, 2.9, -BODY_D / 2 - 0.03]}>
        <meshPhysicalMaterial color="#1b1f26" metalness={0.6} roughness={0.25} clearcoat={1} />
      </RoundedBox>

      {/* 다이내믹 아일랜드 */}
      <RoundedBox args={[1.0, 0.3, 0.01]} radius={0.15} smoothness={4} position={[0, BODY_H / 2 - 0.42, BODY_D / 2 + 0.02]}>
        <meshBasicMaterial color="#000000" />
      </RoundedBox>

      {/* 화면: 실제 HTML 피드를 유리 위에 붙인다 */}
      <Html
        transform
        portal={portal as RefObject<HTMLElement>}
        position={[0, 0, BODY_D / 2 + 0.012]}
        scale={PX * 40}
        zIndexRange={[10, 0]}
        style={{ width: SCREEN_W, height: SCREEN_H }}
      >
        {children}
      </Html>
    </group>
  );
}

export default function Phone3D(props: Props) {
  // 화면 HTML을 이 폰의 컨테이너에 붙인다(지정하지 않으면 다른 캔버스에 붙는 경우가 있다)
  const portal = useRef<HTMLDivElement>(null);
  return (
    <div ref={portal} className="relative size-full">
    <Canvas
      camera={{ position: [0, 0, 21], fov: 28 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ touchAction: "pan-y" }}
    >
      <ambientLight intensity={0.8} />
      <directionalLight position={[4, 6, 8]} intensity={1.4} />
      <pointLight position={[-6, -2, 4]} intensity={30} color="#2d62ff" />
      <Environment resolution={128}>
        <Lightformer form="rect" intensity={3} position={[0, 4, 6]} scale={[8, 2, 1]} />
        <Lightformer form="rect" intensity={2} color="#5b8bff" position={[-6, 0, 2]} scale={[2, 8, 1]} />
        <Lightformer form="rect" intensity={1.5} position={[6, -2, 2]} scale={[2, 6, 1]} />
      </Environment>
      <PhoneModel {...props} portal={portal} />
      <ContactShadows position={[0, -4.4, 0]} opacity={0.5} scale={10} blur={2.6} far={4} color="#000814" />
    </Canvas>
    </div>
  );
}
