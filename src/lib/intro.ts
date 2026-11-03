/** 첫 진입 로고 모션을 세션당 한 번만 보이게 기억하는 키 */
export const INTRO_KEY = "ijiri-intro";

/**
 * 첫 그리기 전에 로고 막을 켤지 정한다. 막이 늦게 켜지면 페이지가 먼저 번쩍 보이기 때문.
 * 주소에 #이 있는 진입(다른 페이지의 메뉴 링크)과 움직임 줄이기 설정에서는 켜지 않는다.
 */
export const introBootScript = `try{var d=document.documentElement;if(!location.hash&&!sessionStorage.getItem("${INTRO_KEY}")&&!matchMedia("(prefers-reduced-motion: reduce)").matches)d.dataset.intro="1"}catch(e){}`;
