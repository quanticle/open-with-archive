browser.contextMenus.create({
  id: "archive_context_menu",
  title: "Open archive.today version",
  contexts: ["link"]
})

async function getArchiveHostname() {
  let archiveHostname = "archive.is";
  let settings = (await browser.storage.local.get("settings")).settings;
  if (settings && settings["archive_host_name"]) {
    archiveHostname = settings["archive_host_name"];
  }
  return archiveHostname;
}

browser.contextMenus.onClicked.addListener(async (info, tab) => {
  let linkUrl = new URL(info.linkUrl);
  let strippedUrl = new URL(`${linkUrl.protocol}//${linkUrl.hostname}${linkUrl.pathname}`);
  let archiveHostname = await getArchiveHostname();
  let archiveUrl = `https://${archiveHostname}/timegate/${strippedUrl}`;
  if(info.menuItemId === "archive_context_menu") {
    browser.tabs.create({url: archiveUrl,
                         openerTabId: tab.id});
  }
});
