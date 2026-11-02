"use client";

import { Suspense, useEffect, useMemo, useRef, useState, type RefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer, useGLTF } from "@react-three/drei";
import { Box3, Color, Mesh, MeshStandardMaterial, Vector3, type Group, type Object3D } from "three";

export const SCREEN_W = 360;
export const SCREEN_H = 760;
const MODEL_URL = "/models/iphone16.glb";
/** 화면 가장자리 검은 베젤 두께(px, 360×760 기준) */
const BEZEL = 10;

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

/** Screen 메시의 앞면 네 꼭짓점(메시 로컬 좌표). 가장 얇은 축이 화면의 법선이다 */
function screenCorners(mesh: Mesh) {
  mesh.geometry.computeBoundingBox();
  const bb = mesh.geometry.boundingBox as Box3;
  const size = bb.getSize(new Vector3());
  const axes = ["x", "y", "z"] as const;
  const thin = axes.reduce((a, c) => (size[c] < size[a] ? c : a));
  const [u, v] = axes.filter((a) => a !== thin);
  const make = (t: number) =>
    [
      [bb.min[u], bb.min[v]],
      [bb.max[u], bb.min[v]],
      [bb.max[u], bb.max[v]],
      [bb.min[u], bb.max[v]],
    ].map(([a, c]) => {
      const p = new Vector3();
      p[thin] = t;
      p[u] = a;
      p[v] = c;
      return p;
    });
  return { front: make(bb.max[thin]), back: make(bb.min[thin]) };
}

type Props = {
  children: React.ReactNode;
  baseYaw?: number;
  reducedMotion: boolean;
};

function Model({ baseYaw = -0.22, reducedMotion, screenRef }: Omit<Props, "children"> & { screenRef: RefObject<HTMLDivElement | null> }) {
  const { scene } = useGLTF(MODEL_URL, false, true);
  const model = useMemo(() => scene.clone(true), [scene]);
  const group = useRef<Group>(null);

  // 화면 메시는 HTML이 덮으므로 검게, 꼭짓점은 미리 계산
  const screen = useMemo(() => {
    let found: Mesh | null = null;
    model.traverse((o: Object3D) => {
      if ((o as Mesh).isMesh && o.name === "Screen") found = o as Mesh;
    });
    if (!found) return null;
    const mesh = found as Mesh;
    mesh.material = new MeshStandardMaterial({ color: new Color("#000000"), roughness: 0.2 });
    return { mesh, ...screenCorners(mesh) };
  }, [model]);

  const tmp = useMemo(() => new Vector3(), []);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    if (reducedMotion) {
      g.rotation.set(0.06, baseYaw, 0);
    } else {
      const k = 1 - Math.exp(-delta * 4);
      g.rotation.y += (baseYaw + state.pointer.x * 0.25 - g.rotation.y) * k;
      g.rotation.x += (0.06 - state.pointer.y * 0.12 - g.rotation.x) * k;
      g.position.y = Math.sin(performance.now() / 1250) * 0.06;
    }
    g.updateMatrixWorld(true);

    const el = screenRef.current;
    if (!el || !screen) return;
    const { width, height } = state.size;
    const project = (pts: Vector3[]) =>
      pts.map((p) => {
        tmp.copy(p).applyMatrix4(screen.mesh.matrixWorld);
        const z = tmp.z;
        tmp.project(state.camera);
        return { x: ((tmp.x + 1) / 2) * width, y: ((1 - tmp.y) / 2) * height, z };
      });
    // 카메라 쪽(월드 z가 큰 쪽) 면을 화면으로 쓴다
    const f = project(screen.front);
    const b = project(screen.back);
    const pts = f.reduce((s, p) => s + p.z, 0) >= b.reduce((s, p) => s + p.z, 0) ? f : b;
    // 화면 좌표 기준으로 좌상, 우상, 우하, 좌하 순서로 정렬
    const byY = [...pts].sort((p, q) => p.y - q.y);
    const top = byY.slice(0, 2).sort((p, q) => p.x - q.x);
    const bottom = byY.slice(2).sort((p, q) => p.x - q.x);
    const quad: [number, number][] = [
      [top[0].x, top[0].y],
      [top[1].x, top[1].y],
      [bottom[1].x, bottom[1].y],
      [bottom[0].x, bottom[0].y],
    ];
    el.style.transform = rectToQuad(SCREEN_W, SCREEN_H, quad);
    el.style.visibility = "visible";
  });

  // 모델은 누운 상태(화면 +Y)로 들어 있어 세우고, 높이를 약 7.3 단위로 맞춘다
  return (
    <group ref={group}>
      <primitive object={model} rotation={[Math.PI / 2, 0, 0]} scale={50} />
    </group>
  );
}

export default function IPhone3D({ children, ...props }: Props) {
  const wrap = useRef<HTMLDivElement>(null);
  const screen = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: "100px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} className="relative size-full">
      <Canvas
        camera={{ position: [0, 0, 19], fov: 26 }}
        dpr={[1, 2]}
        frameloop={visible ? "always" : "demand"}
        gl={{ antialias: true, alpha: true }}
        style={{ touchAction: "pan-y" }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 6, 8]} intensity={1.6} />
        <Environment resolution={256}>
          <Lightformer form="rect" intensity={4} position={[0, 5, 6]} scale={[10, 2, 1]} />
          <Lightformer form="rect" intensity={2.5} color="#5b8bff" position={[-6, 0, 3]} scale={[2, 9, 1]} />
          <Lightformer form="rect" intensity={2} position={[6, -1, 3]} scale={[2, 8, 1]} />
        </Environment>
        <Suspense fallback={null}>
          <Model {...props} screenRef={screen} />
        </Suspense>
        <ContactShadows position={[0, -4.3, 0]} opacity={0.5} scale={10} blur={2.6} far={4} frames={1} color="#000814" />
      </Canvas>

      {/* 앱 화면(HTML). 매 프레임 모델의 Screen 메시 꼭짓점에 맞춰 원근 변환으로 붙인다 */}
      <div
        ref={screen}
        data-ui
        className="absolute top-0 left-0 origin-top-left overflow-hidden rounded-[52px] bg-black"
        style={{ width: SCREEN_W, height: SCREEN_H, visibility: "hidden" }}
      >
        {/* 화면 둘레의 검은 베젤. 앱 화면(360×760)은 베젤 안쪽에 맞춰 줄여 넣는다 */}
        <div className="absolute overflow-hidden bg-bg" style={{ inset: BEZEL, borderRadius: 52 - BEZEL }}>
          <div
            style={{
              width: SCREEN_W,
              height: SCREEN_H,
              transform: `scale(${(SCREEN_W - BEZEL * 2) / SCREEN_W}, ${(SCREEN_H - BEZEL * 2) / SCREEN_H})`,
              transformOrigin: "0 0",
            }}
          >
            {children}
          </div>
        </div>
        <span aria-hidden className="pointer-events-none absolute top-[19px] left-1/2 h-[30px] w-[100px] -translate-x-1/2 rounded-full bg-black" />
      </div>
    </div>
  );
}

useGLTF.preload(MODEL_URL, false, true);
