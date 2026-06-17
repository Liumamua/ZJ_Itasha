/* ============================================================
   Z.J. Itasha - Shared JS
   Common logic for all pages: navbar scroll, mobile menu,
   fade-up observer, logo fallback, confirmEnterPast.
   ============================================================

/* --- "Enter past" confirmation (used by retired cars link) --- */
function confirmEnterPast() {
    if (confirm('英灵殿内为已换版的过往作品或存在绝版人物的作品，请在家长陪同下谨慎观看。')) {
        // Caller page determines the target via onclick
    }
}

/* --- Fade-up entrance animation (IntersectionObserver) --- */
(function () {
    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
            if (e.isIntersecting) {
                setTimeout(function () { e.target.classList.add("visible"); }, 100);
                observer.unobserve(e.target);
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll(".fade-up").forEach(function (el) { observer.observe(el); });
    // Immediately reveal elements already in viewport
    setTimeout(function () {
        document.querySelectorAll(".fade-up").forEach(function (el) {
            if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add("visible");
        });
    }, 200);
})();

/* --- Logo onerror fallback --- */
document.addEventListener('DOMContentLoaded', function () {
    var zjLogo = document.getElementById('zjLogo');
    var zjLogoFallback = document.getElementById('zjLogoFallback');
    if (zjLogo) zjLogo.onerror = function () {
        this.style.display = 'none';
        if (zjLogoFallback) zjLogoFallback.style.display = 'inline-block';
    };

    var asoulLogo = document.getElementById('asoulLogo');
    var asoulLogoFallback = document.getElementById('asoulLogoFallback');
    if (asoulLogo) asoulLogo.onerror = function () {
        this.style.display = 'none';
        if (asoulLogoFallback) asoulLogoFallback.style.display = 'inline-block';
    };
});

/* --- Navbar shadow on scroll --- */
window.addEventListener('scroll', function () {
    var navbar = document.getElementById("navbar");
    if (!navbar) return;
    if (window.scrollY > 50) navbar.classList.add("shadow-lg", "shadow-black/30");
    else navbar.classList.remove("shadow-lg", "shadow-black/30");
});

/* --- Mobile menu toggle --- */
(function () {
    var menuBtn = document.getElementById("menuBtn");
    var mobileMenu = document.getElementById("mobileMenu");
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener("click", function () {
            mobileMenu.classList.toggle("hidden");
            var icon = menuBtn.querySelector("i");
            if (icon.classList.contains("fa-bars")) {
                icon.classList.remove("fa-bars");
                icon.classList.add("fa-times");
            } else {
                icon.classList.remove("fa-times");
                icon.classList.add("fa-bars");
            }
        });
    }
})();
