document.addEventListener("DOMContentLoaded", () => {

    // === 1. HERO BANNER SLIDER (AUTO SLIDE RIGHT & FADE) ===
    const heroSlides = document.querySelectorAll('.hero-img');
    let currentHeroIndex = 0;

    function nextHeroSlide() {
        // Buang class 'active' dari gambar sekarang
        heroSlides[currentHeroIndex].classList.remove('active');
        
        // Pindah ke index seterusnya
        currentHeroIndex = (currentHeroIndex + 1) % heroSlides.length;
        
        // Tambah class 'active' ke gambar baru
        heroSlides[currentHeroIndex].classList.add('active');
    }

    // Tukar gambar setiap 4 saat
    setInterval(nextHeroSlide, 4000);


    // === 2. TYPEWRITER EFFECT (HURUF DEMI HURUF) ===
    const textJournal = "Australia U18 Boys made short work of NZ Fiji Boys in the opening game, claiming a 34-7 win. The team showed immense discipline.";
    const textThoughts = "Rugby isn't just a sport; it's a journey of brotherhood, pain, and glory. Every tackle tells a story.";

    function typeWriter(elementId, text, speed) {
        let i = 0;
        const element = document.getElementById(elementId);
        element.innerHTML = ""; // Kosongkan
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Mula menaip (Journal dulu)
    setTimeout(() => {
        typeWriter("typeText1", textJournal, 30); // 30ms kelajuan
    }, 500);

    // Thoughts mula lepas Journal siap sikit
    setTimeout(() => {
        typeWriter("typeText2", textThoughts, 30);
    }, 4000);

});