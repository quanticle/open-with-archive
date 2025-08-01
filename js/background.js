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

async function getArchiveUrl(url) {
  if (/archive\.../.test(url.hostname)){
    let originalUrl = url.pathname.split("/").slice(5).join("/");
    return getArchiveUrl(new URL(`https://${originalUrl}`));
  }
  let openSearchPage = await getOpenSearchPageOption();
  let archiveHostname = await getArchiveHostname();
  let strippedUrl = new URL(`${url.protocol}//${url.hostname}${url.pathname}`);
  let archiveUrl = "";
  if (openSearchPage) {
    archiveUrl = `https://${archiveHostname}/${strippedUrl}`;
  }
  else {
    archiveUrl = `https://${archiveHostname}/timegate/${strippedUrl}`;
  }
  return archiveUrl;
}

browser.contextMenus.onClicked.addListener(async (info, tab) => {
  let linkUrl = new URL(info.linkUrl);
  let archiveUrl = await getArchiveUrl(linkUrl);
  if(info.menuItemId === "archive_context_menu") {
    browser.tabs.create({url: archiveUrl,
                         openerTabId: tab.id});
  }
});
