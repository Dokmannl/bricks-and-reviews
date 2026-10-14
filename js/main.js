document.addEventListener("DOMContentLoaded", function () {
  var grid = document.getElementById("review-grid");
  if (grid) {
    var search = document.getElementById("set-search");
    var form = document.getElementById("search-form");
    var chips = Array.prototype.slice.call(document.querySelectorAll("#theme-chips .chip"));
    var empty = document.getElementById("empty");
    var count = document.getElementById("result-count");
    var cards = Array.prototype.slice.call(grid.querySelectorAll(".card"));
    var theme = "alle";

    function apply() {
      var q = search ? search.value.trim().toLowerCase() : "";
      var shown = 0;
      cards.forEach(function (card) {
        var themeOk = theme === "alle" || card.dataset.theme === theme;
        var textOk = !q || card.dataset.search.indexOf(q) !== -1;
        var ok = themeOk && textOk;
        card.classList.toggle("is-hidden", !ok);
        if (ok) shown++;
      });
      if (empty) empty.hidden = shown !== 0;
      if (count) count.textContent = shown + (shown === 1 ? " set" : " sets");
    }

    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        theme = chip.dataset.theme;
        chips.forEach(function (c) {
          var on = c === chip;
          c.classList.toggle("active", on);
          c.setAttribute("aria-pressed", on ? "true" : "false");
        });
        apply();
      });
    });

    if (search) {
      search.addEventListener("input", apply);
      var q = new URLSearchParams(window.location.search).get("q");
      if (q) search.value = q;
    }
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        apply();
        var target = document.getElementById("sets");
        if (target) target.scrollIntoView({ behavior: "smooth" });
      });
    }
    apply();
  }
});

function showTab(btn, id) {
  var wrap = btn.closest(".thumb-tabs");
  wrap.querySelectorAll(".tab-buttons button").forEach(function (b) { b.classList.remove("active"); });
  wrap.querySelectorAll(".tab-panel").forEach(function (p) { p.classList.remove("active"); });
  btn.classList.add("active");
  wrap.querySelector("#" + id).classList.add("active");
}
