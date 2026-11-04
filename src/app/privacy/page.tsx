import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { LegalPage, type LegalSection } from "@/components/legal/LegalPage";
import { legal } from "@/lib/legal";
import { contact } from "@/lib/stores";

export const metadata: Metadata = pageMetadata({
  path: "/privacy",
  title: "개인정보처리방침",
  description: "이지리가 수집하는 개인정보, 이용 목적, 보관 기간, 위탁, 이용자 권리와 행사 방법을 안내합니다.",
});

/** 인증 메일 발송 업체 (src/lib/legal.ts의 mailVendor) */
const mail =
  legal.mailVendor === "gmail"
    ? { company: "Google LLC", service: "Gmail", overseas: true }
    : { company: "주식회사 카카오", service: "다음 스마트워크", overseas: false };

const sections: LegalSection[] = [
  {
    id: "items",
    title: "1. 수집하는 개인정보",
    body: (
      <table>
        <thead>
          <tr>
            <th scope="col">수집 시점</th>
            <th scope="col">항목</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>회원가입 시</td>
            <td>이메일, 비밀번호(암호화하여 저장), 닉네임, 카카오·Google 계정 식별값(소셜 가입 시)</td>
          </tr>
          <tr>
            <td>서비스 이용 시</td>
            <td>프로필 사진, 게시물과 사진, 보유 차량 정보, 관심 차종, 위시리스트(담은 부품), 좋아요, 신고·차단 기록</td>
          </tr>
          <tr>
            <td>자동 수집</td>
            <td>기기 정보(기기 종류, 운영체제, 앱 버전), 접속 기록(IP 주소, 접속 일시), 푸시 알림 토큰</td>
          </tr>
        </tbody>
      </table>
    ),
  },
  {
    id: "not-collected",
    title: "2. 수집하지 않는 정보",
    body: (
      <>
        <p>
          <strong>사진의 위치 정보(EXIF GPS)는 수집하지 않습니다.</strong> 사진을 업로드하기 전에 기기 안에서 삭제하며, 위치 정보가 없는 사진만 서버로
          전송됩니다.
        </p>
        <p>
          <strong>번호판은 기기 안에서 가립니다.</strong> 번호판이 보이는 원본 사진은 서버로 전송하지 않습니다.
        </p>
        <p>이지리는 현재 이용자의 위치 정보를 수집하지 않습니다. 위치 정보를 이용하는 기능을 도입하는 경우 이 방침과 별도 약관으로 사전에 고지합니다.</p>
      </>
    ),
  },
  {
    id: "purpose",
    title: "3. 이용 목적",
    body: (
      <ol>
        <li>회원 관리: 가입, 로그인, 본인 확인, 탈퇴 처리</li>
        <li>서비스 제공: 게시물 등록과 노출, 차종별 피드, 검색, 위시리스트, 알림</li>
        <li>부정 이용 방지: 신고 처리, 이용 제한, 탈퇴 후 재가입 제한</li>
        <li>공지 발송: 약관과 방침 변경, 서비스 운영에 관한 안내</li>
      </ol>
    ),
  },
  {
    id: "retention",
    title: "4. 보관 기간과 파기",
    body: (
      <>
        <p>
          회원 정보와 게시물은 탈퇴할 때까지 보관합니다. 탈퇴 즉시 비공개로 전환하고, <strong>30일 후 완전히 삭제합니다.</strong>
        </p>
        <table>
          <thead>
            <tr>
              <th scope="col">항목</th>
              <th scope="col">보관 이유와 기간</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>재가입 제한에 필요한 최소 정보 (가입 수단과 계정 식별값)</td>
              <td>탈퇴 후 30일간 같은 계정의 재가입 제한, 30일</td>
            </tr>
            <tr>
              <td>접속 기록 (IP 주소, 접속 일시)</td>
              <td>통신비밀보호법, 3개월</td>
            </tr>
            <tr>
              <td>백업에 남은 회원 정보</td>
              <td>장애 복구, 백업 생성일로부터 30일. 탈퇴 후 최대 60일 이내에 백업에서도 삭제됩니다.</td>
            </tr>
          </tbody>
        </table>
        <p>
          보관 기간이 끝난 정보는 복구할 수 없는 방법으로 파기합니다. 자세한 내용은 <a href="/account-deletion">계정 삭제 안내</a>를 참고하시기 바랍니다.
        </p>
      </>
    ),
  },
  {
    id: "third-party",
    title: "5. 제3자 제공",
    body: <p>이용자의 개인정보를 제3자에게 제공하지 않습니다. 다만 법령에 따라 수사기관 등이 정해진 절차로 요구하는 경우는 예외로 합니다.</p>,
  },
  {
    id: "outsourcing",
    title: "6. 처리 위탁",
    body: (
      <>
        <p>서비스 운영을 위해 아래 업체에 개인정보 처리를 위탁합니다. 위탁 계약을 통해 개인정보가 안전하게 처리되도록 관리합니다.</p>
        <table>
          <thead>
            <tr>
              <th scope="col">업체</th>
              <th scope="col">위탁 업무</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Cloudflare, Inc.</td>
              <td>사진 저장 (Cloudflare R2), 앱과 서버 사이 접속 경로 제공 (Cloudflare Tunnel)</td>
            </tr>
            <tr>
              <td>650 Industries, Inc. (Expo)</td>
              <td>푸시 알림 발송</td>
            </tr>
            <tr>
              <td>{mail.company}</td>
              <td>인증 메일 발송 ({mail.service})</td>
            </tr>
          </tbody>
        </table>
      </>
    ),
  },
  {
    id: "overseas",
    title: "7. 국외 이전",
    body: (
      <>
        <p>아래 업체는 해외 서버를 이용하므로 개인정보가 국외로 이전됩니다.</p>
        <table>
          <thead>
            <tr>
              <th scope="col">이전받는 자</th>
              <th scope="col">국가, 항목, 목적, 기간</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Cloudflare, Inc.</td>
              <td>
                국가: {legal.r2Region}
                <br />
                항목: 게시물 사진, 프로필 사진
                <br />
                목적: 사진 저장과 전송
                <br />
                기간: 게시물 삭제 또는 탈퇴 후 30일까지
              </td>
            </tr>
            <tr>
              <td>Cloudflare, Inc. (Tunnel)</td>
              <td>
                국가: 이용자와 가까운 Cloudflare 데이터센터가 있는 국가
                <br />
                항목: 앱과 서버가 주고받는 데이터(이메일, 게시물, 접속 IP 주소 등)
                <br />
                목적: 앱과 서버 사이 접속 경로 제공
                <br />
                기간: 전달하는 동안. Cloudflare가 남기는 보안 기록은 Cloudflare의 정책을 따릅니다.
              </td>
            </tr>
            <tr>
              <td>650 Industries, Inc. (Expo)</td>
              <td>
                국가: 미국
                <br />
                항목: 푸시 알림 토큰, 알림 내용
                <br />
                목적: 푸시 알림 발송
                <br />
                기간: 알림 해제 또는 탈퇴 시까지
              </td>
            </tr>
            {mail.overseas && (
              <tr>
                <td>{mail.company}</td>
                <td>
                  국가: 미국
                  <br />
                  항목: 이메일, 메일 내용(인증 번호)
                  <br />
                  목적: 가입 인증, 비밀번호 재설정 메일 발송
                  <br />
                  기간: 메일 서비스의 보관 기간까지
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <p>
          이전 시기와 방법: 서비스를 이용할 때마다 네트워크를 통해 전송합니다. 국외 이전을 원하지 않는 경우 탈퇴로 거부할 수 있으나, 이 경우 서비스를 이용할 수
          없습니다.
        </p>
      </>
    ),
  },
  {
    id: "children",
    title: "8. 만 14세 미만",
    body: <p>만 14세 미만은 이지리에 가입할 수 없습니다. 가입 시 만 14세 이상인지 확인합니다.</p>,
  },
  {
    id: "rights",
    title: "9. 이용자의 권리와 행사 방법",
    body: (
      <>
        <p>이용자는 언제든지 본인의 개인정보에 대한 열람, 정정, 삭제, 처리 정지를 요구할 수 있습니다.</p>
        <ol>
          <li>열람과 정정: 앱의 마이 메뉴에서 프로필과 닉네임을 확인하고 수정할 수 있습니다.</li>
          <li>삭제: 게시물은 각 게시물에서, 계정은 마이, 설정, 회원 탈퇴 메뉴에서 삭제할 수 있습니다.</li>
          <li>처리 정지: 알림은 앱 설정에서 종류별로 해제할 수 있습니다.</li>
          <li>그 밖의 요구: {contact.email}로 요청하시면 지체 없이 처리하고 결과를 알려 드립니다.</li>
        </ol>
      </>
    ),
  },
  {
    id: "cookies",
    title: "10. 웹사이트의 쿠키",
    body: <p>ijiri.net 웹사이트는 광고나 행동 분석 목적의 쿠키를 사용하지 않습니다.</p>,
  },
  {
    id: "safety",
    title: "11. 개인정보의 안전성 확보 조치",
    body: (
      <ol>
        <li>비밀번호는 복호화할 수 없도록 암호화하여 저장합니다.</li>
        <li>모든 통신은 HTTPS로 암호화합니다.</li>
        <li>회원 정보는 운영자가 직접 관리하는 국내 서버에 저장하며, 외부에서 서버에 직접 접속할 수 없도록 차단합니다.</li>
        <li>백업은 암호화된 연결을 통해 별도 서버에 보관하며, 생성일로부터 30일이 지나면 삭제합니다.</li>
        <li>개인정보에 접근할 수 있는 인원을 최소한으로 제한합니다.</li>
      </ol>
    ),
  },
  {
    id: "contact",
    title: "12. 개인정보 보호책임자",
    body: (
      <>
        <ol>
          <li>보호책임자: 운영자 {legal.operator}</li>
          <li>
            연락처: <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </li>
        </ol>
        <p>개인정보침해신고센터(국번 없이 118), 개인정보분쟁조정위원회(1833-6972)에도 도움을 요청할 수 있습니다.</p>
      </>
    ),
  },
  {
    id: "history",
    title: "13. 시행일과 변경 이력",
    body: (
      <>
        <p>
          이 방침은 {legal.effective}부터 시행합니다. 내용이 변경되는 경우 시행 7일 전부터, 이용자에게 불리한 변경은 시행 30일 전부터 앱과 웹사이트에
          공지합니다.
        </p>
        <table>
          <thead>
            <tr>
              <th scope="col">시행일</th>
              <th scope="col">내용</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{legal.effective}</td>
              <td>최초 제정</td>
            </tr>
          </tbody>
        </table>
      </>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      current="/privacy"
      title="개인정보처리방침"
      effective={legal.effective}
      intro={
        <p className="!text-text-1">
          운영자 {legal.operator}(이하 이지리)은 이지리 앱과 ijiri.net에서 필요한 개인정보만 수집하고, 수집한 목적으로만 이용합니다. 사진의 위치 정보는 기기에서
          삭제한 뒤 업로드하며, 번호판은 기기 안에서 가립니다.
        </p>
      }
      sections={sections}
    />
  );
}
