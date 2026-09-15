/* =========================================================
   Site navigation — single source of truth.
   Edit PAGES / labels / CTA below and every page updates,
   since each HTML file only contains <div id="site-nav-root"
   data-page="..." data-lang="en"></div> and loads this file.
   ========================================================= */

(function () {
  "use strict";

  // ---- 1. Page map: add/remove/reorder pages here ----
  var PAGES = [
    { id: "home",     en: { href: "/en/index.html",    label: "Home" },            es: { href: "/es/index.html",    label: "Inicio" } },
    { id: "services", en: { href: "/en/services.html", label: "Services" },        es: { href: "/es/services.html", label: "Servicios" } },
    { id: "process",  en: { href: "/en/process.html",  label: "How It Works" },    es: { href: "/es/process.html",  label: "Cómo Trabajo" } },
    { id: "work",     en: { href: "/en/work.html",     label: "Work" },            es: { href: "/es/work.html",     label: "Resultados" } },
    { id: "about",    en: { href: "/en/about.html",    label: "About" },           es: { href: "/es/about.html",    label: "Sobre Mí" } },
    { id: "pricing",  en: { href: "/en/pricing.html",  label: "Pricing" },         es: { href: "/es/pricing.html",  label: "Precios" } },
    { id: "contact",  en: { href: "/en/contact.html",  label: "Contact" },         es: { href: "/es/contact.html",  label: "Contacto" } }
  ];

  var BRAND = { en: "[Your Name]", es: "[Tu Nombre]" };
  var TAGLINE = { en: "CRO & Web Consulting", es: "Consultoría CRO y Web" };
  var CTA = { en: "Get a free website audit", es: "Solicita una auditoría gratis" };

  // ---- 2. Build markup ----
  function buildNav(root) {
    var page = root.getAttribute("data-page") || "";
    var lang = (document.documentElement.getAttribute("lang") || "en").slice(0, 2);
    var otherLang = lang === "es" ? "en" : "es";

    var current = PAGES.find(function (p) { return p.id === page; });
    var ctaHref = (current ? current[lang].href : PAGES[0][lang].href).replace(/[^/]+$/, "contact.html");

    var linksHtml = PAGES.map(function (p) {
      var isActive = p.id === page;
      return '<li><a href="' + p[lang].href + '"' + (isActive ? ' class="active" aria-current="page"' : "") + ">" + p[lang].label + "</a></li>";
    }).join("");

    var otherPageHref = current ? current[otherLang].href : PAGES[0][otherLang].href;

    root.innerHTML =
      '<button class="nav-toggle" id="navToggle" aria-label="Menu" aria-expanded="false">' +
        "<span></span>" +
      "</button>" +
      '<div class="nav-scrim" id="navScrim"></div>' +
      '<nav id="siteNav" aria-label="Primary">' +
        '<div class="nav-inner">' +
          '<a class="nav-brand" href="' + PAGES[0][lang].href + '">' + BRAND[lang] + "</a>" +
          '<div class="nav-tagline">' + TAGLINE[lang] + "</div>" +
          '<a class="nav-cta" href="' + ctaHref + '">' + CTA[lang] + "</a>" +
          '<ul class="nav-links">' + linksHtml + "</ul>" +
          '<div class="lang-switch">' +
            '<a href="' + (lang === "en" ? ctaHrefSelf(current, "en") : otherPageHref) + '" class="' + (lang === "en" ? "active" : "") + '">EN</a>' +
            '<a href="' + (lang === "es" ? ctaHrefSelf(current, "es") : otherPageHref) + '" class="' + (lang === "es" ? "active" : "") + '">ES</a>' +
          "</div>" +
        "</div>" +
      "</nav>";

    function ctaHrefSelf(p, l) { return p ? p[l].href : PAGES[0][l].href; }

    // Mobile toggle behavior
    var toggle = root.querySelector("#navToggle");
    var nav = root.querySelector("#siteNav");
    var scrim = root.querySelector("#navScrim");
    function closeNav() {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }
    function openNav() {
      nav.classList.add("open");
      toggle.setAttribute("aria-expanded", "true");
    }
    toggle.addEventListener("click", function () {
      nav.classList.contains("open") ? closeNav() : openNav();
    });
    scrim.addEventListener("click", closeNav);
  }

  document.addEventListener("DOMContentLoaded", function () {
    var root = document.getElementById("site-nav");
    if (root) buildNav(root);

    // Footer year, if present
    var yearEl = document.getElementById("footYear");
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  });
})();
