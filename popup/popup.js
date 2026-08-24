const ids = [
  "mainBgColor",
  "userMsgBgColor",
  "codeBlockBg",
  "inputBlockBgColor",
];

// Load saved values
(async () => {
  const data = await browser.storage.local.get(ids);

  ids.forEach((id) => {
    document.getElementById(id).value = data[id] || "#444444";
  });
})();

// Save on change
ids.forEach((id) => {
  document.getElementById(id).addEventListener("input", async (e) => {
    let value = e.target.value;
    if (!value.startsWith("#")) {
      value = "#" + value;
    }

    await browser.storage.local.set({
      [id]: value,
    });

    const tabs = await browser.tabs.query({
      active: true,
      currentWindow: true,
    });

    browser.tabs.sendMessage(tabs[0].id, {
      type: "updateColors",
    });
  });
});
