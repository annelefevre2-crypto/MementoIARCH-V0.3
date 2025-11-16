// ======================================================
// Mémento opérationnel IA – RCH
// app.js — Version 0.3.4
// ------------------------------------------------------
// - Instance unique Html5Qrcode (caméra + fichiers)
// - Lecture de QR JSON → génération des champs variables
// - Concatenation du prompt + infos complémentaires
// - Création du JSON de fiche + QR code (avec gestion
//   d'erreur "code length overflow")
// ======================================================

let html5QrCode = null;
let isCameraRunning = false;
let currentFiche = null;
let currentVariablesValues = {};

// =============================
// Initialisation
// =============================

document.addEventListener("DOMContentLoaded", () => {
  initTabs();
  initScanView();
  initCreateView();
});

// Helper : vérifie la présence de la lib Html5Qrcode
function ensureHtml5QrCodeInstance() {
  if (typeof Html5Qrcode === "undefined") {
    throw new Error(
      "Html5Qrcode n'est pas chargé (vérifier le chargement du script)."
    );
  }
  if (!html5QrCode) {
    html5QrCode = new Html5Qrcode("camera");
  }
  return html5QrCode;
}

// =============================
// Onglets
// =============================

function initTabs() {
  const tabButtons = document.querySelectorAll(".tab-button");
  const tabPanels = document.querySelectorAll(".tab-panel");

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-tab");

      tabButtons.forEach((b) => b.classList.remove("tab-button--active"));
      btn.classList.add("tab-button--active");

      tabPanels.forEach((panel) => {
        if (panel.id === `tab-${target}`) {
          panel.classList.add("tab-panel--active");
        } else {
