const saveOptions = () => {
  const birthdayTime = document.getElementById("birthdaytime").value;
  chrome.storage.sync.set({ birthday: birthdayTime }, () => {
    // Update status to let user know options were saved.
    const status = document.getElementById("status");
    status.textContent = "Options saved.";
    setTimeout(() => {
      status.textContent = "";
    }, 750);
  });
};

const restoreOptions = () => {
  chrome.storage.sync.get({ birthday: "" }, (items) => {
    document.getElementById("birthdaytime").value = items.birthday;
  });
};

document.addEventListener("DOMContentLoaded", restoreOptions);
document.getElementById("save").addEventListener("click", saveOptions);
