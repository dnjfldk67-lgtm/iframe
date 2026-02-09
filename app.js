(() => {
  const TITLE = "123";
  const TEXT = "234";
  const URL = "https://https://www.google.com/";

  const btn = document.getElementById("shareBtn");

  function copyByExecCommand(text) {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.left = "-9999px";
    ta.style.top = "-9999px";
    document.body.appendChild(ta);

    ta.focus();
    ta.select();
    const ok = document.execCommand("copy");

    document.body.removeChild(ta);
    return ok;
  }

  async function fallbackShare() {
    // 1) 모바일 웹 공유
    if (navigator.share) {
      try {
        await navigator.share({ title: TITLE, text: TEXT, url: URL });
        return;
      } catch (_) {}
    }

    // 2) Clipboard API
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(URL);
        alert("링크가 복사되었습니다.");
        return;
      }
    } catch (_) {}

    // 3) execCommand copy
    try {
      const ok = copyByExecCommand(URL);
      if (ok) {
        alert("링크가 복사되었습니다.");
        return;
      }
    } catch (_) {}

    // 4) 최후: 사용자 수동 복사
    window.prompt("아래 링크를 복사하세요:", URL);
  }

  btn.addEventListener("click", () => {
    // 플렉스튜디오 런타임 브릿지 우선
    try {
      if (window.f?.Native?.share) {
        window.f.Native.share(TITLE, TEXT, URL);
        return;
      }
    } catch (_) {}

    fallbackShare();
  });
})();
