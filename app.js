// Daftarkan Service Worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/service-worker.js")
    .then(() => console.log("Service Worker terdaftar"))
    .catch(err => console.error("SW gagal:", err));
}

// Menangani event install PWA
let deferredPrompt;
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  const btnInstall = document.getElementById("installBtn");
  if (btnInstall) {
    btnInstall.style.display = "block";
    btnInstall.addEventListener("click", () => {
      btnInstall.style.display = "none";
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(choice => {
        console.log("User choice:", choice.outcome);
        deferredPrompt = null;
      });
    });
  }
});
