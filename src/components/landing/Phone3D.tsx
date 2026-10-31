"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer, RoundedBox } from "@react-three/drei";
import { Vector3, type Group } from "three";
import { SCREEN_H, SCREEN_W } from "./FeedScreen";

/* 폰 치수(three.js 단위). 화면 비율은 FeedScreen(360×760)에 맞춘다. */
const BODY_W = 3.72;
const BODY_H = 7.72;
const BODY_D = 0.34;
const SCREEN_UW = 3.44;
const SCREEN_UH = SCREEN_UW * (SCREEN_H / SCREEN_W);
const SCREEN_Z = BODY_D / 2 + 0.012;

/** 사각형 (0,0)-(w,h)를 사각형 quad(좌상, 우상, 우하, 좌하)로 옮기는 CSS matrix3d */
function rectToQuad(w: number, h: number, quad: [number, number][]) {
  const src: [number, number][] = [
    [0, 0],
    [w, 0],
    [w, h],
    [0, h],
  ];
  const A: number[][] = [];
  const b: number[] = [];
  for (let i = 0; i < 4; i++) {
    const [x, y] = src[i];
    const [u, v] = quad[i];
    A.push([x, y, 1, 0, 0, 0, -x * u, -y * u]);
    b.push(u);
    A.push([0, 0, 0, x, y, 1, -x * v, -y * v]);
    b.push(v);
  }
  // 가우스 소거
  for (let c = 0; c < 8; c++) {
    let p = c;
    for (let r = c + 1; r < 8; r++) if (Math.abs(A[r][c]) > Math.abs(A[p][c])) p = r;
    [A[c], A[p]] = [A[p], A[c]];
    [b[c], b[p]] = [b[p], b[c]];
    for (let r = 0; r < 8; r++) {
      if (r === c) continue;
      const f = A[r][c] / A[c][c];
      for (let k = c; k < 8; k++) A[r][k] -= f * A[c][k];
      b[r] -= f * b[c];
    }
  }
  const m = b.map((v, i) => v / A[i][i]);
  return `matrix3d(${m[0]},${m[3]},0,${m[6]},${m[1]},${m[4]},0,${m[7]},0,0,1,0,${m[2]},${m[5]},0,1)`;
}

type Props = {
  children: React.ReactNode;
  /** 기본 각도(라디안). 좌우로 살짝 돌려 둔다 */
  baseYaw?: number;
  reducedMotion: boolean;
};

type ModelProps = Omit<Props, "children"> & { screenRef: RefObject<HTMLDivElement | null> };

const corners = [
  new Vector3(-SCREEN_UW / 2, SCREEN_UH / 2, SCREEN_Z),
  new Vector3(SCREEN_UW / 2, SCREEN_UH / 2, SCREEN_Z),
  new Vector3(SCREEN_UW / 2, -SCREEN_UH / 2, SCREEN_Z),
  new Vector3(-SCREEN_UW / 2, -SCREEN_UH / 2, SCREEN_Z),
];
const tmp = new Vector3();

function PhoneModel({ baseYaw = -0.32, reducedMotion, screenRef }: ModelProps) {
  const group = useRef<Group>(null);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;

    // 포인터를 따라 살짝 기울고, 가만히 있을 때는 천천히 떠 있는다
    if (reducedMotion) {
      g.rotation.set(0.08, baseYaw, 0);
    } else {
      const t = performance.now() / 1000;
      const k = 1 - Math.exp(-delta * 4);
      g.rotation.y += (baseYaw + state.pointer.x * 0.28 - g.rotation.y) * k;
      g.rotation.x += (0.08 - state.pointer.y * 0.16 - g.rotation.x) * k;
      g.position.y = Math.sin(t * 0.8) * 0.08;
    }
    g.updateMatrixWorld();

    // 화면 네 꼭짓점을 같은 카메라로 투영해 HTML 화면을 정확히 그 자리에 붙인다
    const el = screenRef.current;
    if (!el) return;
    const { width, height } = state.size;
    const quad = corners.map((c) => {
      tmp.copy(c).applyMatrix4(g.matrixWorld).project(state.camera);
      return [((tmp.x + 1) / 2) * width, ((1 - tmp.y) / 2) * height] as [number, number];
    });
    el.style.transform = rectToQuad(SCREEN_W, SCREEN_H, quad);
    el.style.visibility = "visible";
  });

  const button = (x: number, y: number, h: number) => (
    <mesh position={[x, y, 0]}>
      <boxGeometry args={[0.05, h, 0.12]} />
      <meshStandardMaterial color="#3a404c" metalness={0.9} roughness={0.3} />
    </mesh>
  );

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
      {button(-BODY_W / 2 - 0.02, 1.9, 0.5)}
      {button(-BODY_W / 2 - 0.02, 1.15, 0.5)}
      {button(BODY_W / 2 + 0.02, 1.5, 0.85)}

      {/* 후면 카메라 섬 */}
      <RoundedBox args={[1.5, 1.5, 0.08]} radius={0.3} smoothness={6} position={[-0.9, 2.9, -BODY_D / 2 - 0.03]}>
        <meshPhysicalMaterial color="#1b1f26" metalness={0.6} roughness={0.25} clearcoat={1} />
      </RoundedBox>
    </group>
  );
}

export default function Phone3D({ children, ...props }: Props) {
  const wrap = useRef<HTMLDivElement>(null);
  const screen = useRef<HTMLDivElement>(null);

  // 화면 밖에 있을 때는 그리지 않는다
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: "100px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} className="relative size-full">
      <Canvas
        camera={{ position: [0, 0, 21], fov: 28 }}
        dpr={[1, 2]}
        frameloop={visible ? "always" : "demand"}
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
        <PhoneModel {...props} screenRef={screen} />
        <ContactShadows position={[0, -4.4, 0]} opacity={0.5} scale={10} blur={2.6} far={4} frames={1} color="#000814" />
      </Canvas>

      {/* 화면: 실제 HTML 피드. 위치와 원근은 매 프레임 3D 화면 꼭짓점에 맞춘다 */}
      <div
        ref={screen}
        className="absolute top-0 left-0 origin-top-left"
        style={{ width: SCREEN_W, height: SCREEN_H, visibility: "hidden" }}
      >
        {children}
        {/* 다이내믹 아일랜드 */}
        <span
          aria-hidden
          className="pointer-events-none absolute top-3 left-1/2 h-[30px] w-[104px] -translate-x-1/2 rounded-full bg-black"
        />
      </div>
    </div>
  );
}
