document.addEventListener("DOMContentLoaded", () => {

    // ===============================================
    // 1. TYPEWRITER EFFECT (Perkataan demi Perkataan)
    // ===============================================
    const paragraphs = document.querySelectorAll(".typewriter-text");

    paragraphs.forEach((p, index) => {
        const fullText = p.getAttribute("data-text"); // Ambil teks dari HTML
        const words = fullText.split(" "); // Pecahkan ikut perkataan
        p.innerText = ""; // Kosongkan container
        
        let i = 0;
        // Kalau ada perenggan kedua, dia mula lambat sikit (lepas perenggan 1 siap)
        let delayStart = index * 2500; 

        setTimeout(() => {
            function typeWord() {
                if (i < words.length) {
                    p.innerHTML += words[i] + " ";
                    i++;
                    setTimeout(typeWord, 60); // Kelajuan menaip (ms)
                }
            }
            typeWord();
        }, delayStart);
    });

    // ===============================================
    // 2. SLIDER CONTROL (Manual & Auto)
    // ===============================================
    const track = document.getElementById("sliderTrack");
    const btnUp = document.getElementById("btnUp");
    const btnDown = document.getElementById("btnDown");

    // Fungsi untuk ubah kelajuan/arah bila tekan butang
    
    // --- TOMBOL ATAS (Lajukan ke atas) ---
    const speedUp = () => {
        track.style.animationDuration = "2s"; // Jadi laju (2 saat satu pusingan)
        track.style.animationDirection = "normal"; // Arah biasa (ke atas)
    };
    const slowDown = () => {
        track.style.animationDuration = "20s"; // Kembali perlahan
        track.style.animationDirection = "normal";
    };

    btnUp.addEventListener("mousedown", speedUp);
    btnUp.addEventListener("mouseup", slowDown);
    btnUp.addEventListener("mouseleave", slowDown); // Kalau mouse terkeluar button
    
    // Support Touchscreen (Mobile)
    btnUp.addEventListener("touchstart", (e) => { e.preventDefault(); speedUp(); });
    btnUp.addEventListener("touchend", slowDown);

    // --- TOMBOL BAWAH (Pusing arah ke bawah) ---
    const reverseDown = () => {
        track.style.animationDirection = "reverse"; // Pusing balik arah
        track.style.animationDuration = "2s"; // Laju
    };

    btnDown.addEventListener("mousedown", reverseDown);
    btnDown.addEventListener("mouseup", slowDown);
    btnDown.addEventListener("mouseleave", slowDown);

    // Support Touchscreen (Mobile)
    btnDown.addEventListener("touchstart", (e) => { e.preventDefault(); reverseDown(); });
    btnDown.addEventListener("touchend", slowDown);

});