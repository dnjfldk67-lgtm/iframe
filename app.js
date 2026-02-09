function canRunNativeShare() {
  const pp = document.permissionsPolicy || document.featurePolicy;
  if (!pp || typeof pp.allowsFeature !== "function") return false;

  return pp.allowsFeature("web-share") === true;
}

// 사용
if (canRunNativeShare()) {
  window.f?.Native?.share?.("123", "234", "www.naver.com");
}
