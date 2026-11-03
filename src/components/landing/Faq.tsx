import { Plus } from "lucide-react";
import { focusRing, h2 } from "./Sections";

/*
 * 자주 묻는 질문. 화면 글과 FAQPage 구조화 데이터가 같은 목록을 쓴다.
 * AI 검색은 이 문장을 그대로 인용하므로 사실만, 한두 문장으로 쓴다.
 */
export const faqs = [
  {
    q: "이지리는 어떤 앱인가요?",
    a: "튜닝카 오너들이 실제로 단 부품을 사진 위 태그로 보여 주는 차종별 튜닝 레퍼런스 앱이에요. 카페 등업 없이 바로 구경할 수 있어요.",
  },
  {
    q: "가입해야 볼 수 있나요?",
    a: "아니요. 가입하지 않아도 차종별 피드와 게시물을 볼 수 있어요. 부품을 담거나 게시물을 올릴 때만 카카오, Google, 이메일로 가입하면 돼요.",
  },
  { q: "돈이 드나요?", a: "무료예요." },
  {
    q: "어디서 받을 수 있나요?",
    a: "Android(Google Play, 원스토어)부터 먼저 나오고, iPhone(App Store)은 그 뒤에 나와요.",
  },
  {
    q: "부품 태그가 뭔가요?",
    a: "오너가 사진 위 부품 자리에 직접 단 이름표예요. 익스테리어, 인테리어, 파워트레인, 하체 네 가지로 나뉘고, 누르면 어떤 부품인지 바로 보여요.",
  },
  {
    q: "내 차 사진을 올려도 번호판이나 위치가 드러나지 않나요?",
    a: "번호판은 폰 안에서 자동으로 찾아 가리고, 사진의 위치 정보(EXIF GPS)도 올리기 전에 폰에서 지워요. 번호판이 보이는 원본은 서버로 보내지 않아요.",
  },
  {
    q: "탈퇴하면 내 데이터는 어떻게 되나요?",
    a: "탈퇴하면 바로 비공개로 바뀌고, 30일 뒤 계정과 게시물이 모두 지워져요.",
  },
];

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="scroll-mt-6 bg-bg-deep lg:snap-start">
      <div className="grid gap-10 px-5 pt-4 pb-20 md:px-12 lg:grid-cols-[1fr_1.618fr] lg:gap-20 lg:px-[72px] lg:pt-8 lg:pb-32">
        <h2 id="faq-title" className={`${h2} reveal lg:sticky lg:top-24 lg:self-start`}>
          자주 묻는 질문
        </h2>
        <div className="reveal flex flex-col gap-2">
          {faqs.map((f) => (
            <details key={f.q} className="group rounded-[20px] bg-surface-1 px-5 transition-colors open:bg-surface-2 md:px-7">
              <summary
                className={`flex cursor-pointer list-none items-center justify-between gap-6 rounded py-6 text-[17px] font-semibold md:text-[19px] [&::-webkit-details-marker]:hidden ${focusRing}`}
              >
                {f.q}
                <Plus aria-hidden className="size-5 shrink-0 text-text-3 transition-transform duration-200 group-open:rotate-45" strokeWidth={1.75} />
              </summary>
              <p className="max-w-[60ch] pb-6 text-[16px] leading-[1.7] text-text-2 md:text-[17px]">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
