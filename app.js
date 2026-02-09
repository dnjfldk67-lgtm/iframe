(() => {
  // 공유할 URL을 고정값으로 쓰는 게 embed/iframe 환경에서 가장 안정적입니다.
  // 필요하면 여기 값을 교체하세요.
  const SHARE_URL = "https://flexstudio.io/share/xxxx";
  const SHARE_TITLE = "플렉스튜디오 콘텐츠";
  const SHARE_TEXT = "이 링크를 확인해보세요";

  const shareBtn = document.getElementById("shareBtn");
  const hint = document.getElementById("hint");

  function setHint(msg) {
    if (hint) hint.textContent = msg || "";
  }

  async function shareLink() {
    // Web Share API는 HTTPS + 사용자 제스처(클릭) 필요
    if (navigator.share) {
      try {
        await navigator.share({
          title: SHARE_TITLE,
          text: SHARE_TEXT,
          url: SHARE_URL
        });
        setHint("");
        return;
      } catch (e) {
        // 사용자가 취소한 경우도 예외로 떨어질 수 있어 조용히 처리
        setHint("");
        return;
      }
    }

    // Fallback: 클립보드 복사
    try {
      await navigator.clipboard.writeText(SHARE_URL);
      setHint("링크가 복사되었습니다.");
      setTimeout(() => setHint(""), 1500);
    } catch (e) {
      // 최후 fallback: 프롬프트
      window.prompt("아래 링크를 복사하세요:", SHARE_URL);
    }
  }

  shareBtn.addEventListener("click", shareLink);
})();
