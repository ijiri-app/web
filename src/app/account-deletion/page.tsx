import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { LegalPage, type LegalSection } from "@/components/legal/LegalPage";
import { legal } from "@/lib/legal";
import { contact } from "@/lib/stores";

export const metadata: Metadata = pageMetadata({
  path: "/account-deletion",
  title: "계정 삭제 안내",
  description: "이지리 계정과 데이터를 삭제하는 방법, 삭제되는 데이터와 보관 기간(30일)을 안내합니다.",
});

const sections: LegalSection[] = [
  {
    id: "in-app",
    title: "앱에서 삭제하는 방법",
    body: (
      <>
        <ol>
          <li>이지리 앱을 실행하고 로그인합니다.</li>
          <li>
            하단 탭의 <strong>마이</strong>로 이동합니다.
          </li>
          <li>
            <strong>설정</strong>에서 <strong>회원 탈퇴</strong>를 선택합니다.
          </li>
          <li>안내를 확인하고 탈퇴를 완료합니다.</li>
        </ol>
        <p>탈퇴 즉시 로그인이 차단되며, 프로필과 게시물, 담은 부품이 다른 이용자에게 노출되지 않습니다.</p>
      </>
    ),
  },
  {
    id: "by-email",
    title: "앱 없이 삭제를 요청하는 방법",
    body: (
      <>
        <p>앱을 삭제했거나 로그인할 수 없는 경우 이메일로 삭제를 요청할 수 있습니다.</p>
        <ol>
          <li>
            수신: <a href={`mailto:${contact.email}?subject=${encodeURIComponent("[계정 삭제 요청]")}`}>{contact.email}</a>
          </li>
          <li>제목: [계정 삭제 요청]</li>
          <li>내용: 가입 이메일, 가입 수단(카카오, Google, 이메일), 닉네임</li>
        </ol>
        <p>본인 확인을 위해 가입한 이메일로 회신할 수 있습니다. 확인이 완료되면 앱에서 탈퇴한 경우와 동일하게 처리하고 결과를 이메일로 알려 드립니다.</p>
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
            <td>탈퇴 즉시 로그인 차단, 카카오 연결 해제. 30일 후 완전 삭제</td>
          </tr>
          <tr>
            <td>게시물과 사진, 프로필 사진</td>
            <td>탈퇴 즉시 비공개. 30일 후 전부 삭제</td>
          </tr>
          <tr>
            <td>보유 차량, 관심 차종, 위시리스트, 좋아요</td>
            <td>탈퇴 즉시 비공개. 30일 후 삭제</td>
          </tr>
          <tr>
            <td>알림 기기 토큰</td>
            <td>탈퇴 즉시 삭제</td>
          </tr>
        </tbody>
      </table>
    ),
  },
  {
    id: "retention",
    title: "30일간 보관하는 이유",
    body: (
      <>
        <p>
          탈퇴 후 <strong>30일</strong> 동안은 다른 이용자에게 노출되지 않는 상태로 보관합니다. 신고 처리나 부정 이용 확인 등 꼭 필요한 경우에만 이용하며,
          30일이 지나면 매일 새벽 정해진 시간에 자동으로 삭제합니다.
        </p>
        <p>재가입 제한에 필요한 최소 정보(가입 수단과 계정 식별값)는 30일 동안만 보관합니다.</p>
        <p>
          장애 복구용 백업에는 삭제 후에도 회원 정보가 남아 있을 수 있습니다. 백업은 생성일로부터 30일이 지나면 삭제되므로, 탈퇴 후 최대 60일 이내에 백업에서도
          삭제됩니다.
        </p>
        <p>법령에 따라 보관 의무가 있는 기록(접속 기록, 통신비밀보호법상 3개월)은 해당 기간 동안만 분리하여 보관한 후 삭제합니다.</p>
      </>
    ),
  },
  {
    id: "notes",
    title: "유의 사항",
    body: (
      <ol>
        <li>탈퇴는 취소할 수 없습니다. 30일 이내라도 계정과 게시물을 복구하지 않습니다.</li>
        <li>탈퇴 후 30일 동안은 같은 계정으로 다시 가입할 수 없습니다. 30일 후 다시 가입하더라도 이전 게시물은 복구되지 않습니다.</li>
        <li>다른 이용자가 캡처하거나 공유한 게시물은 이지리가 삭제할 수 없습니다.</li>
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
          이지리(개발자: {legal.playDeveloper}) 계정은 앱 안에서 직접 삭제하거나, 앱 없이 이메일로 삭제를 요청할 수 있습니다. 탈퇴 즉시 비공개로 전환되며,{" "}
          <strong>30일 후 서비스의 모든 데이터가 삭제되고, 백업에서도 최대 60일 이내에 삭제됩니다.</strong>
        </p>
      }
      sections={sections}
    />
  );
}
