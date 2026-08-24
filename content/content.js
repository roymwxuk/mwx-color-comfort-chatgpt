async function applyColors() {
  const colors = await browser.storage.local.get();

  const root = document.documentElement;

  if (colors.mainBgColor)
    root.style.setProperty("--mainBgColor", colors.mainBgColor);

  if (colors.userMsgBgColor)
    root.style.setProperty("--userMsgBgColor", colors.userMsgBgColor);

  if (colors.codeBlockBg)
    root.style.setProperty("--codeBlockBg", colors.codeBlockBg);

  if (colors.inputBlockBgColor)
    root.style.setProperty("--inputBlockBgColor", colors.inputBlockBgColor);
}

applyColors();

browser.runtime.onMessage.addListener((msg) => {
  if (msg.type === "updateColors") {
    applyColors();
  }
});
