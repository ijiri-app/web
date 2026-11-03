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

const sections: LegalSection[] = [
  {
    id: "items",
    title: "1. 수집하는 개인정보",
    body: (
      <table>
        <thead>
          <tr>
            <th scope="col">언제</th>
            <th scope="col">항목</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>가입할 때</td>
            <td>이메일, 비밀번호(암호화해서 저장), 닉네임, 카카오·Google 계정 식별값(소셜 가입 시)</td>
          </tr>
          <tr>
            <td>서비스를 쓸 때</td>
            <td>프로필 사진, 게시물과 사진, 보유 차량 정보, 관심 차종, 위시리스트(담은 부품), 좋아요, 신고·차단 기록</td>
          </tr>
          <tr>
            <td>자동으로 수집</td>
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
          <strong>사진의 위치 정보(EXIF GPS)는 받지 않아요.</strong> 사진을 올리기 전에 폰 안에서 지우고, 위치 정보가 없는 사진만 서버로 올라와요.
        </p>
        <p>
          <strong>번호판은 폰 안에서 가려요.</strong> 번호판이 보이는 원본 사진은 서버로 보내지 않아요.
        </p>
        <p>지금 이지리는 이용자의 현재 위치를 받지 않아요. 위치를 쓰는 기능이 생기면 이 방침과 별도 약관으로 먼저 알려요.</p>
      </>
    ),
  },
  {
    id: "purpose",
    title: "3. 이용 목적",
    body: (
      <ol>
        <li>회원 관리: 가입, 로그인, 본인 확인, 탈퇴 처리</li>
        <li>서비스 제공: 게시물 올리기와 보여 주기, 차종별 피드, 검색, 위시리스트, 알림</li>
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
          회원 정보와 게시물은 탈퇴할 때까지 보관해요. 탈퇴하면 바로 비공개로 바꾸고, <strong>30일 뒤 완전히 지워요.</strong>
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
              <td>탈퇴 후 30일간 같은 계정의 재가입을 막기 위해, 30일</td>
            </tr>
            <tr>
              <td>접속 기록 (IP 주소, 접속 일시)</td>
              <td>통신비밀보호법, 3개월</td>
            </tr>
          </tbody>
        </table>
        <p>
          보관 기간이 끝난 정보는 되살릴 수 없는 방법으로 지워요. 자세한 내용은 <a href="/account-deletion">계정 삭제 안내</a>에 있어요.
        </p>
      </>
    ),
  },
  {
    id: "third-party",
    title: "5. 제3자 제공",
    body: <p>이용자의 개인정보를 다른 곳에 제공하지 않아요. 법령에 따라 수사기관 등이 정해진 절차로 요구하는 경우만 예외예요.</p>,
  },
  {
    id: "outsourcing",
    title: "6. 처리 위탁",
    body: (
      <>
        <p>서비스 운영을 위해 아래 업체에 처리를 맡겨요. 위탁 계약으로 개인정보를 안전하게 다루도록 관리해요.</p>
        <table>
          <thead>
            <tr>
              <th scope="col">업체</th>
              <th scope="col">맡기는 일</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Cloudflare, Inc.</td>
              <td>사진 저장 (Cloudflare R2)</td>
            </tr>
            <tr>
              <td>650 Industries, Inc. (Expo)</td>
              <td>푸시 알림 발송</td>
            </tr>
            <tr>
              <td>Amazon Web Services, Inc.</td>
              <td>인증 메일 발송 (Amazon SES)</td>
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
        <p>아래 업체는 해외 서버를 쓰기 때문에 개인정보가 국외로 이전돼요.</p>
        <table>
          <thead>
            <tr>
              <th scope="col">이전받는 곳</th>
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
              <td>650 Industries, Inc. (Expo)</td>
              <td>
                국가: 미국
                <br />
                항목: 푸시 알림 토큰, 알림 내용
                <br />
                목적: 푸시 알림 발송
                <br />
                기간: 알림을 끄거나 탈퇴할 때까지
              </td>
            </tr>
            <tr>
              <td>Amazon Web Services, Inc.</td>
              <td>
                국가: {legal.sesRegion}
                <br />
                항목: 이메일
                <br />
                목적: 가입 인증, 비밀번호 재설정 메일 발송
                <br />
                기간: 발송 후 {legal.sesRetention}
              </td>
            </tr>
          </tbody>
        </table>
        <p>
          이전 시기와 방법: 서비스를 이용할 때마다 네트워크로 전송해요. 국외 이전을 원하지 않으면 탈퇴로 거부할 수 있지만, 이 경우 서비스를 이용할 수 없어요.
        </p>
      </>
    ),
  },
  {
    id: "children",
    title: "8. 만 14세 미만",
    body: <p>만 14세 미만은 이지리에 가입할 수 없어요. 가입할 때 만 14세 이상인지 확인해요.</p>,
  },
  {
    id: "rights",
    title: "9. 이용자의 권리와 행사 방법",
    body: (
      <>
        <p>언제든 내 개인정보의 열람, 정정, 삭제, 처리 정지를 요구할 수 있어요.</p>
        <ol>
          <li>열람과 정정: 앱의 마이에서 프로필과 닉네임을 바로 확인하고 고칠 수 있어요.</li>
          <li>삭제: 게시물은 각 게시물에서, 계정은 마이, 설정, 회원 탈퇴에서 지울 수 있어요.</li>

          <li>처리 정지: 알림은 앱 설정에서 종류별로 끌 수 있어요.</li>
          <li>그 밖의 요구: {contact.email}로 메일을 보내면 지체 없이 처리하고 결과를 알려 드려요.</li>
        </ol>
      </>
    ),
  },
  {
    id: "cookies",
    title: "10. 웹사이트의 쿠키",
    body: <p>ijiri.net 웹사이트는 광고나 행동 분석용 쿠키를 쓰지 않아요.</p>,
  },
  {
    id: "safety",
    title: "11. 안전하게 지키는 방법",
    body: (
      <ol>
        <li>비밀번호는 되돌릴 수 없게 암호화해서 저장해요.</li>
        <li>모든 통신은 암호화(HTTPS)해요.</li>
        <li>개인정보에 접근할 수 있는 사람을 최소로 제한해요.</li>
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
        <p>개인정보침해신고센터(국번 없이 118), 개인정보분쟁조정위원회(1833-6972)에도 도움을 요청할 수 있어요.</p>
      </>
    ),
  },
  {
    id: "history",
    title: "13. 시행일과 변경 이력",
    body: (
      <>
        <p>이 방침은 {legal.effective}부터 시행해요. 내용이 바뀌면 시행 7일 전부터, 이용자에게 불리한 변경은 30일 전부터 앱과 웹사이트에 알려요.</p>
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
          운영자 {legal.operator}(이하 이지리)은 이지리 앱과 ijiri.net에서 필요한 개인정보만 받고, 받은 목적에만 써요. 사진의 위치 정보는 폰에서 지우고 올리고,
          번호판은 폰 안에서 가려요.
        </p>
      }
      sections={sections}
    />
  );
}
