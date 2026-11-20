/* StackNarrative site interactions (menu, animations, pain checker, tabs, trail, contact form).
   Ported from the reference design. Every block checks that its elements exist on the page. */
(function () {
  "use strict";
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); };
  var reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.documentElement.classList.add("js");

  // Logo draw
  var mark = $(".brand .mark"); if (mark) mark.classList.add("draw");

  // Mobile menu
  var menuBtn = $("#menuBtn"), navLinks = $("#navLinks");
  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", function () {
      var open = navLinks.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", open);
    });
    navLinks.addEventListener("click", function (e) {
      if (e.target.tagName === "A") { navLinks.classList.remove("open"); menuBtn.setAttribute("aria-expanded", "false"); }
    });
  }

  // Dropdown menus
  var dds = $$(".dd");
  function closeDDs() { dds.forEach(function (o) { o.classList.remove("open"); $(".dd-btn", o).setAttribute("aria-expanded", "false"); }); }
  dds.forEach(function (dd) {
    var btn = $(".dd-btn", dd);
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      var open = !dd.classList.contains("open");
      closeDDs();
      dd.classList.toggle("open", open);
      btn.setAttribute("aria-expanded", open);
    });
  });
  document.addEventListener("click", function (e) { if (!e.target.closest(".dd")) closeDDs(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeDDs(); });

  // Highlight the current page in the menu
  var here = location.pathname.replace(/\/$/, "") || "/";
  $$(".nav-links a").forEach(function (a) {
    var p = a.getAttribute("href") || "";
    if (p.charAt(0) === "/" && p.indexOf("#") < 0 && p !== "/" && (here === p || here.indexOf(p + "/") === 0)) {
      a.classList.add("active");
      var dd = a.closest(".dd"); if (dd) dd.classList.add("active");
    }
  });

  // Nav border on scroll
  var nav = $("header.nav");
  if (nav) addEventListener("scroll", function () { nav.classList.toggle("scrolled", scrollY > 8); }, { passive: true });

  // Pain checker
  var painCards = $$(".pain");
  var painMsgs = [
    ["Tick any card above.", "Each one maps to something we fix. Pick what sounds familiar."],
    ["One is enough to start.", "That one problem usually has a positioning root. We'd start there."],
    ["Two of six. You're not alone.", "These usually come together: unclear positioning shows up as weak content."],
    ["Three of six. We hear this a lot.", "This is exactly the gap a content engine closes. Let's talk about where to start."],
    ["Four of six. That's a system problem.", "More writers won't fix it. Positioning plus AI content ops will."],
    ["Five of six. We should talk.", "You need strategy and execution working as one engine, without adding headcount."],
    ["All six. You've just described why we exist.", "B2B tech specialists in travel and hotel tech. Positioning first, AI-powered ops. Let's talk."]
  ];
  var meterBars = $$("#painMeter i");
  painCards.forEach(function (c) {
    c.addEventListener("click", function () {
      c.setAttribute("aria-pressed", c.getAttribute("aria-pressed") !== "true");
      var n = painCards.filter(function (x) { return x.getAttribute("aria-pressed") === "true"; }).length;
      $("#painTitle").textContent = painMsgs[n][0];
      $("#painText").textContent = painMsgs[n][1];
      meterBars.forEach(function (b, i) { b.classList.toggle("on", i < n); });
    });
  });

  // Service tabs
  var tabs = $$('[role="tab"]');
  function selectTab(i) {
    tabs.forEach(function (t, j) {
      t.setAttribute("aria-selected", i === j);
      t.tabIndex = i === j ? 0 : -1;
      var panel = document.getElementById(t.getAttribute("aria-controls"));
      if (panel) panel.classList.toggle("on", i === j);
    });
  }
  tabs.forEach(function (t, i) {
    t.addEventListener("click", function () { selectTab(i); });
    t.addEventListener("keydown", function (e) {
      var n = tabs.length;
      if (e.key === "ArrowRight") { selectTab((i + 1) % n); tabs[(i + 1) % n].focus(); }
      if (e.key === "ArrowLeft") { selectTab((i + n - 1) % n); tabs[(i + n - 1) % n].focus(); }
    });
  });

  // Toolbook phases light up in sequence
  var phaseGrid = $("#phaseGrid");
  if (phaseGrid && !reduced) {
    var phs = $$(".ph", phaseGrid), lit = 0;
    if (phs.length) setInterval(function () { phs.forEach(function (p) { p.classList.remove("lit"); }); phs[lit % phs.length].classList.add("lit"); lit++; }, 900);
  }

  // Blog category filters
  var filters = $("#blogFilters");
  if (filters) {
    filters.addEventListener("click", function (e) {
      var b = e.target.closest("button"); if (!b) return;
      var cat = b.getAttribute("data-c");
      $$("button", filters).forEach(function (x) { x.setAttribute("aria-pressed", x === b); });
      $$(".post[data-cat]").forEach(function (p) { p.hidden = !(cat === "All" || p.getAttribute("data-cat") === cat); });
    });
  }

  // Contact form
  var form = $("#cform");
  if (form) {
    var FORM_ENDPOINT = form.getAttribute("data-endpoint") || "";
    var CONTACT_EMAIL = form.getAttribute("data-email") || "nutan@stacknarrative.com";
    var err = $("#cf-err"), done = $("#cf-done"), btn = $("#cf-submit"), side = $(".cform-side");
    var val = function (id) { var el = document.getElementById(id); return el ? el.value.trim() : ""; };
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      $$(".bad", form).forEach(function (x) { x.classList.remove("bad"); });
      var data = {
        name: val("cf-name"), email: val("cf-email"), company: val("cf-company"),
        problems: $$('input[name="problems"]:checked', form).map(function (x) { return x.value; }),
        service: val("cf-service"), more: val("cf-more"), page: location.href, website: val("cf-website")
      };
      if (data.website) return;
      var missing = [];
      if (!data.name) missing.push(["cf-name", "your name"]);
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) missing.push(["cf-email", "a valid email"]);
      if (!data.company) missing.push(["cf-company", "your company name"]);
      if (!data.problems.length) missing.push(["cf-problems", "at least one problem"]);
      if (!data.service) missing.push(["cf-service", "a service"]);
      if (missing.length) {
        missing.forEach(function (m) { document.getElementById(m[0]).classList.add("bad"); });
        err.textContent = "Please add " + missing.map(function (m) { return m[1]; }).join(", ") + ".";
        var first = document.getElementById(missing[0][0]);
        var focusable = first.matches("input,select,textarea") ? first : $("input", first);
        if (focusable) focusable.focus();
        return;
      }
      err.textContent = "";
      var summary = "Name: " + data.name + "\nEmail: " + data.email + "\nCompany: " + data.company +
        "\nProblems: " + data.problems.join("; ") + "\nService: " + data.service + "\n\n" + (data.more || "(no extra details)");

      function show(sent) {
        form.hidden = true; side.hidden = true; done.hidden = false;
        if (sent) {
          done.innerHTML = '<span class="eyebrow">Message sent</span><h3>Thanks, ' + esc(data.name.split(" ")[0]) + ". We've got it.</h3>" +
            "<p>Your message is on its way to " + CONTACT_EMAIL + ". We'll reply to " + esc(data.email) + ' soon.</p><a class="btn btn-ghost" href="/">Back to home</a>';
        } else {
          var mail = "mailto:" + CONTACT_EMAIL + "?subject=" + encodeURIComponent("Enquiry from " + data.name + " (" + data.company + ")") + "&body=" + encodeURIComponent(summary);
          done.innerHTML = '<span class="eyebrow">One more step</span><h3>Your message isn\'t sent yet.</h3>' +
            "<p>We couldn't send it automatically. Open it in your email app to send it to " + CONTACT_EMAIL + ", or copy it and paste it into any email.</p>" +
            '<div class="acts"><a class="btn btn-primary" id="cf-mail">Open in email app <span class="arr">&rarr;</span></a><button class="btn btn-ghost" type="button" id="cf-copy">Copy message</button><button class="btn btn-ghost" type="button" id="cf-edit">Edit</button></div>' +
            "<pre>" + esc(summary) + "</pre>";
          $("#cf-mail").href = mail;
          $("#cf-copy").onclick = function (ev) {
            navigator.clipboard.writeText("To: " + CONTACT_EMAIL + "\n\n" + summary).then(
              function () { ev.target.textContent = "Copied"; },
              function () { ev.target.textContent = "Select the text below to copy"; });
          };
          $("#cf-edit").onclick = function () { done.hidden = true; form.hidden = false; side.hidden = false; };
        }
        done.scrollIntoView({ behavior: "smooth", block: "center" });
      }

      if (!FORM_ENDPOINT) { show(false); return; }
      btn.disabled = true; btn.firstChild.textContent = "Sending… ";
      fetch(FORM_ENDPOINT, { method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(data) })
        .then(function (r) { return r.ok ? r.json().catch(function () { return null; }) : null; })
        .then(function (j) { return !!(j && j.ok === true); }, function () { return false; })
        .then(function (sent) { btn.disabled = false; btn.firstChild.textContent = "Send message "; show(sent); });
    });
  }

  // Blog: copy post link
  $$("[data-copy-link]").forEach(function (b) {
    b.addEventListener("click", function () {
      var tip = b.querySelector(".share-copied");
      var done = function (msg) {
        if (!tip) return;
        tip.textContent = msg; tip.classList.add("show");
        setTimeout(function () { tip.classList.remove("show"); }, 1600);
      };
      if (navigator.clipboard) navigator.clipboard.writeText(b.getAttribute("data-copy-link")).then(function () { done("Link copied"); }, function () { done("Copy failed"); });
      else done("Copy failed");
    });
  });

  // Blog: highlight the section being read in the sidebar contents
  var tocLinks = $$(".toc-side a[data-toc]");
  if (tocLinks.length) {
    var heads = tocLinks.map(function (a) { return document.getElementById(a.getAttribute("data-toc")); }).filter(Boolean);
    var updateToc = function () {
      var current = null;
      heads.forEach(function (h) { if (h.getBoundingClientRect().top < 140) current = h.id; });
      tocLinks.forEach(function (a) { a.classList.toggle("active", a.getAttribute("data-toc") === current); });
    };
    addEventListener("scroll", updateToc, { passive: true });
    updateToc();
  }

  // Copy email
  var copyBtn = $("#copyEmail");
  if (copyBtn) copyBtn.addEventListener("click", function (e) {
    navigator.clipboard.writeText("nutan@stacknarrative.com").then(
      function () { e.target.textContent = "Copied"; }, function () { e.target.textContent = "Select & copy"; });
    setTimeout(function () { e.target.textContent = "Copy"; }, 2000);
  });

  // Reveal on scroll (elements below the fold slide in; a timer guarantees visibility)
  var rvs = $$(".rv");
  var io = "IntersectionObserver" in window ? new IntersectionObserver(function (es) {
    es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.remove("pre"); io.unobserve(en.target); } });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }) : null;
  if (io && !reduced) rvs.forEach(function (el) {
    if (el.getBoundingClientRect().top > innerHeight) { el.classList.add("pre"); io.observe(el); }
  });
  setTimeout(function () { rvs.forEach(function (el) { el.classList.remove("pre"); }); }, 6000);

  // Process line
  var steps = $("#steps");
  if (steps) {
    if (io) new IntersectionObserver(function (es, o) { es.forEach(function (en) { if (en.isIntersecting) { steps.classList.add("in"); o.disconnect(); } }); }, { threshold: 0.4 }).observe(steps);
    else steps.classList.add("in");
  }

  // Founder trail draws as you scroll
  var trail = $("#trail");
  if (trail) {
    var path = $(".trail-draw", trail), L = path.getTotalLength(), hiker = $(".hiker", trail);
    var dots = $$(".wps circle", trail), drops = $$(".drops line", trail), labels = $$(".trail-labels li", trail);
    var flag = $(".flag", trail), clipR = $("#tclipr", trail), surge = $(".surge", trail);
    var fr = [60, 230, 400, 560, 740, 930].map(function (x) {
      var lo = 0, hi = L; for (var i = 0; i < 24; i++) { var m = (lo + hi) / 2; if (path.getPointAtLength(m).x < x) lo = m; else hi = m; } return hi / L;
    });
    path.style.strokeDasharray = L;
    var update = function () {
      var r = trail.getBoundingClientRect();
      var p = reduced ? 1 : Math.min(1, Math.max(0, (innerHeight * 0.82 - r.top) / (r.height * 0.95)));
      path.style.strokeDashoffset = L * (1 - p);
      var pt = path.getPointAtLength(L * p);
      hiker.setAttribute("cx", pt.x); hiker.setAttribute("cy", pt.y);
      fr.forEach(function (f, i) { var on = p >= f - 0.002; dots[i].classList.toggle("on", on); drops[i].classList.toggle("on", on); labels[i].classList.toggle("on", on); });
      flag.classList.toggle("on", p >= fr[2] - 0.002);
      clipR.setAttribute("width", pt.x);
      surge.classList.toggle("on", p >= fr[4] - 0.002);
    };
    addEventListener("scroll", update, { passive: true });
    addEventListener("resize", update);
    update();
  }
  var venn = $("#venn");
  if (venn) {
    if ("IntersectionObserver" in window && !reduced) new IntersectionObserver(function (es, o) { es.forEach(function (e) { if (e.isIntersecting) { venn.classList.add("in"); o.disconnect(); } }); }, { threshold: 0.5 }).observe(venn);
    else venn.classList.add("in");
  }
})();
