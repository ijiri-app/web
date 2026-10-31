import QRCode from "qrcode";
import { INSTALL_URL } from "./stores";

/** /install 주소를 담은 QR 코드 SVG (빌드할 때 서버에서 만든다) */
export function installQrSvg() {
  return QRCode.toString(INSTALL_URL, {
    type: "svg",
    margin: 0,
    errorCorrectionLevel: "M",
    color: { dark: "#111418", light: "#ffffff" },
  });
}
