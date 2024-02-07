document.addEventListener('DOMContentLoaded', async (_) => {
  let settings = (await browser.storage.local.get("settings")).settings;
  if (settings && settings["archive_host_name"]) {
    document.getElementById("archive_hostname").value = settings["archive_host_name"];
  }
  else {
    document.getElementById("archive_hostname").value = "archive.is";
  }
  document.getElementById("archive_hostname_form").addEventListener('submit', (ev) => {
    ev.preventDefault();
    let new_archive_hostname = document.getElementById("archive_hostname").value;
    browser.storage.local.set({"settings": 
                               {"archive_host_name": new_archive_hostname}});
  });
});
