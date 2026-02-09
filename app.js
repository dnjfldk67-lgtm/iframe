(() => {
  const TITLE = "123";
  const TEXT = "234";
  const URL = "https://www.naver.com";

  const btn = document.getElementById("shareBtn");

  async function fallbackShare() {
    // Web Share API
    if (navigator.share) {
      try {
        await navigator.share({ title: TITLE, text: TEXT, url: URL });
        return;
      } catch (_) {}
    }

    // Clipboard fallback
    try {
      await navigator.clipboard.writeText(URL);
      alert("링크가 복사되었습니다.");
    } catch (_) {
      window.prompt("아래 링크를 복사하세요:", URL);
    }
  }

  btn.addEventListener("click", async () => {
    // 1) 플렉스튜디오 브릿지 우선
    try {
      if (window.f && window.f.Native && typeof window.f.Native.share === "function") {
        window.f.Native.share(TITLE, TEXT, URL);
        return;
      }
    } catch (_) {
      // 브릿지 호출 실패 시 fallback
    }

    // 2) 브릿지 없으면 fallback
    await fallbackShare();
  });
})();
