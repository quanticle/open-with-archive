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

async function getOpenSearchPageOption() {
  let settings = (await browser.storage.local.get("settings")).settings;
  if (settings && settings["open_search_page"]) {
    return true;
  }
  return false;
}

browser.contextMenus.onClicked.addListener(async (info, tab) => {
  let linkUrl = new URL(info.linkUrl);
  let strippedUrl = new URL(`${linkUrl.protocol}//${linkUrl.hostname}${linkUrl.pathname}`);
  let archiveHostname = await getArchiveHostname();
  let openSearchPage = await getOpenSearchPageOption();
  let archiveUrl = "";
  if (openSearchPage){
    archiveUrl = `https://${archiveHostname}/${strippedUrl}`;
  }
  else {
    archiveUrl = `https://${archiveHostname}/timegate/${strippedUrl}`;
  }
  if(info.menuItemId === "archive_context_menu") {
    browser.tabs.create({url: archiveUrl,
                         openerTabId: tab.id});
  }
});
