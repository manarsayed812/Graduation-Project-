// scroll nav
const navbar = document.getElementById("navbar");
window.onscroll = function () {
    if (window.scrollY > 0) {
        navbar.classList.add("scrolled");
        navbar.classList.remove("not-scroll");
    } else {
        navbar.classList.add("not-scroll");
        navbar.classList.remove("scrolled");
    }
};

// dark mode
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    // حفظ الوضع في localStorage ليبقى بعد إعادة تحميل الصفحة
    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("darkMode", "enabled");
    } else {
        localStorage.setItem("darkMode", "disabled");
    }
}
// التأكد من استرجاع الوضع المحفوظ عند تحميل الصفحة
window.onload = function () {
    if (localStorage.getItem("darkMode") === "enabled") {
        document.body.classList.add("dark-mode");
    }
};








// city card
document.addEventListener("DOMContentLoaded", function () {
    let cards = document.querySelectorAll(".card-body");

    cards.forEach((card) => {
        let arrow = card.querySelector('img[alt="img"]');
        card.addEventListener("click", function () {
            document.querySelectorAll('.card-body img[alt="img"]').forEach((img) => {
                img.style.transform = "rotate(0deg)";
            });

            if (!card.classList.contains("open")) {
                arrow.style.transform = "rotate(180deg)";
                card.classList.add("open");
            } else {
                arrow.style.transform = "rotate(0deg)";
                card.classList.remove("open");
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".toggle-card").forEach((card) => {
        card.addEventListener("click", function () {
            this.classList.toggle("expanded");
        });
    });
});

// emergency call
function makeCall(number) {
    window.location.href = "tel:" + number;
}







function openModal() {
    document.getElementById("signupModal").style.display = "flex";
}

function closeModal() {
    document.getElementById("signupModal").style.display = "none";
}



































