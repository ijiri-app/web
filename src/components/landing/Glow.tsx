/**
 * Figma `01 Landing`의 파란 글로우(Glow 1~5, plus-lighter 블렌드 + 그레인)를 CSS로 옮긴 배경.
 * 원본 SVG 에셋은 내려받지 못해 같은 위치·회전·색감으로 그라디언트를 다시 구성했다.
 */
export function Glow({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <div className="absolute -top-[10%] left-[55%] h-[70%] w-[45%] rotate-[32deg] rounded-full bg-[radial-gradient(closest-side,#4f86ff_0%,#2d62ff_45%,transparent_100%)] opacity-90 mix-blend-plus-lighter blur-3xl" />
      <div className="absolute -top-[18%] -left-[12%] h-[75%] w-[50%] -rotate-[29deg] rounded-full bg-[radial-gradient(closest-side,#3d74ff_0%,#1c45f8_50%,transparent_100%)] opacity-80 mix-blend-plus-lighter blur-3xl" />
      <div className="absolute -top-[20%] left-[25%] h-[55%] w-[40%] -rotate-[29deg] rounded-full bg-[radial-gradient(closest-side,#a9c4ff_0%,#5b8bff_40%,transparent_100%)] opacity-70 mix-blend-plus-lighter blur-3xl" />
      <div className="absolute top-[5%] left-[10%] h-[18%] w-[80%] rotate-[-47deg] rounded-full bg-[radial-gradient(closest-side,#6b97ff_0%,transparent_100%)] opacity-60 mix-blend-plus-lighter blur-2xl" />
      <div className="absolute -top-[6%] right-[2%] h-[22%] w-[18%] rounded-full bg-[radial-gradient(closest-side,#9fbcff_0%,transparent_100%)] opacity-70 mix-blend-plus-lighter blur-2xl" />
      {/* 그레인 */}
      <svg className="absolute inset-0 size-full opacity-[0.18] mix-blend-overlay">
        <filter id="ijiri-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#ijiri-grain)" />
      </svg>
      {/* 아래쪽을 배경색으로 자연스럽게 덮음 */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-transparent to-bg" />
    </div>
  );
}
