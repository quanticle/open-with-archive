document.addEventListener('DOMContentLoaded', async (_) => {
  let settings = (await browser.storage.local.get("settings")).settings;
  if (settings && settings["archive_host_name"]) {
    document.getElementById("archive_hostname").value = settings["archive_host_name"];
  }
  else {
    document.getElementById("archive_hostname").value = "archive.is";
  }
  if (settings && settings["open_search_page"]) {
    document.getElementById("open_search_page_true").checked = true;
  }
  else {
    document.getElementById("open_search_page_false").checked = true;
  }
  document.getElementById("archive_hostname_form").addEventListener('submit', (ev) => {
    ev.preventDefault();
    let newArchiveHostname = document.getElementById("archive_hostname").value;
    let openSearchPage = document.querySelector('input[name="open_search_page"]:checked').value
    browser.storage.local.set({"settings": 
                               {"archive_host_name": newArchiveHostname,
                                "open_search_page": openSearchPage}});
  });
});
