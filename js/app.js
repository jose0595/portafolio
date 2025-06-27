const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
    }
});

// Toggle sidebar en mobile
document.getElementById('menuToggle').addEventListener('click', function() {
    document.querySelector('.sidebar').classList.toggle('active');
});

// Cerrar sidebar al hacer clic en un enlace (en mobile)
document.querySelectorAll('.sidebar-nav a').forEach(link => {
    link.addEventListener('click', function() {
        if (window.innerWidth < 992) {
            document.querySelector('.sidebar').classList.remove('active');
        }
    });
});

// Smooth scrolling para anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Cambiar clase active en navbar
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.sidebar-nav a');

window.addEventListener('scroll', function() {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= (sectionTop - 300)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// Inicializa con tu PUBLIC KEY
(function () {
    emailjs.init("5Tl0hLZvKaKiEGyQG"); // ← Reemplaza con tu public key
})();


document.getElementById("contact-form").addEventListener("submit", function (e) {
    e.preventDefault(); // Evita el comportamiento por defecto (recargar)

    const now = new Date();
    const formatted = now.toLocaleString(); // Ejemplo: 26/06/2025, 17:45:30
    document.getElementById("time").value = formatted;

    emailjs.sendForm("service_5l6vuct", "template_z8pdetl", "#contact-form").then(
        function (response) {
            Toast.fire({
                icon: "success",
                title: "Email enviado"
            });
            document.getElementById("contact-form").reset();
        },
        function (error) {
            Toast.fire({
                icon: "error",
                title: "Email no enviado"
            });
        }
    );
});