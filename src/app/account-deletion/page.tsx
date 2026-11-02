import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/legal/LegalPage";
import { legal } from "@/lib/legal";
import { contact } from "@/lib/stores";

export const metadata: Metadata = {
  title: "계정 삭제 안내",
  description: "이지리 계정과 데이터를 삭제하는 방법, 삭제되는 데이터와 보관 기간(30일)을 안내합니다.",
  alternates: { canonical: "/account-deletion" },
};

const sections: LegalSection[] = [
  {
    id: "in-app",
    title: "앱에서 삭제하기",
    body: (
      <>
        <ol>
          <li>이지리 앱을 열고 로그인해요.</li>
          <li>
            아래 탭의 <strong>마이</strong>로 가요.
          </li>
          <li>
            <strong>설정</strong>에서 <strong>회원 탈퇴</strong>를 눌러요.
          </li>
          <li>안내를 확인하고 탈퇴를 마쳐요.</li>
        </ol>
        <p>탈퇴하면 바로 로그인이 막히고, 내 프로필과 게시물, 담은 부품이 다른 사람에게 보이지 않아요.</p>
      </>
    ),
  },
  {
    id: "by-email",
    title: "앱 없이 삭제 요청하기",
    body: (
      <>
        <p>앱을 지웠거나 로그인할 수 없다면 메일로 삭제를 요청할 수 있어요.</p>
        <ol>
          <li>
            받는 곳: <a href={`mailto:${contact.email}?subject=${encodeURIComponent("[계정 삭제 요청]")}`}>{contact.email}</a>
          </li>
          <li>제목: [계정 삭제 요청]</li>
          <li>내용: 가입 이메일, 가입할 때 쓴 방법(카카오, Google, 이메일), 닉네임</li>
        </ol>
        <p>본인 확인을 위해 가입한 이메일로 답장을 드릴 수 있어요. 확인되면 앱에서 탈퇴한 것과 똑같이 처리하고 결과를 메일로 알려 드려요.</p>
      </>
    ),
  },
  {
    id: "deleted",
    title: "삭제되는 데이터",
    body: (
      <table>
        <thead>
          <tr>
            <th scope="col">데이터</th>
            <th scope="col">처리</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>계정 정보 (이메일, 닉네임, 로그인 연결)</td>
            <td>탈퇴 즉시 로그인 차단, 카카오 연결 끊기. 30일 뒤 완전 삭제</td>
          </tr>
          <tr>
            <td>게시물과 사진, 프로필 사진</td>
            <td>탈퇴 즉시 비공개. 30일 뒤 전부 삭제</td>
          </tr>
          <tr>
            <td>보유 차량, 관심 차종, 위시리스트, 좋아요</td>
            <td>탈퇴 즉시 비공개. 30일 뒤 삭제</td>
          </tr>
        </tbody>
      </table>
    ),
  },
  {
    id: "retention",
    title: "30일 동안 보관하는 이유",
    body: (
      <>
        <p>
          탈퇴한 뒤 <strong>30일</strong> 동안은 다른 사람에게 보이지 않는 상태로 보관해요. 신고 처리나 부정 이용 확인처럼 꼭 필요한 경우에만 쓰고, 30일이
          지나면 매일 새벽 정해진 시간에 자동으로 지워요.
        </p>
        <p>재가입을 막는 데 필요한 최소 정보(가입 수단과 계정 식별값)는 30일 동안만 보관해요.</p>
        <p>법령에 따로 보관 의무가 있는 기록(접속 기록, 통신비밀보호법상 3개월)은 그 기간 동안만 분리해서 보관한 뒤 지워요.</p>
      </>
    ),
  },
  {
    id: "notes",
    title: "꼭 알아 두세요",
    body: (
      <ol>
        <li>탈퇴는 취소할 수 없어요. 30일 안이라도 계정과 게시물을 되살리지 않아요.</li>
        <li>탈퇴 후 30일 동안은 같은 계정으로 다시 가입할 수 없어요. 30일 뒤 다시 가입해도 이전 게시물은 이어지지 않아요.</li>
        <li>다른 사람이 내 게시물을 캡처하거나 공유한 것은 이지리가 지울 수 없어요.</li>
      </ol>
    ),
  },
];

export default function AccountDeletionPage() {
  return (
    <LegalPage
      current="/account-deletion"
      title="계정 삭제 안내"
      effective={legal.effective}
      intro={
        <p className="!text-text-1">
          이지리(개발자: {legal.playDeveloper}) 계정은 앱 안에서 바로 삭제하거나, 앱 없이 메일로 삭제를 요청할 수 있어요. 탈퇴하면 바로 비공개로 바뀌고,{" "}
          <strong>30일 뒤 모든 데이터가 완전히 지워져요.</strong>
        </p>
      }
      sections={sections}
    />
  );
}
