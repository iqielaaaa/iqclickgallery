document.addEventListener("DOMContentLoaded", () => {
    
    const spinner = document.getElementById("spinner");
    const items = document.querySelectorAll(".carousel-item");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    let currentAngle = 0;
    const totalItems = items.length;
    const anglePerItem = 360 / totalItems; // 360 bahagi 5 item = 72 darjah
    
    // Jejari bulatan (Jarak item dari tengah)
    // Semakin besar nombor ni, semakin jauh jarak antara video (kurang rapat)
    // Saya set supaya rapat dan nampak padat.
    const radius = 350; 

    // === 1. SUSUN VIDEO DALAM BENTUK BULATAN (3D) ===
    items.forEach((item, index) => {
        // Kira sudut untuk setiap item
        const angle = index * anglePerItem;
        // Susun guna CSS Transform
        // rotateY: Pusingkan item mengadap tengah
        // translateZ: Tolak item ke luar supaya jadi bulatan
        item.style.transform = `rotateY(${angle}deg) translateZ(${radius}px)`;
    });

    // === 2. AUTO ROTATE FUNCTION ===
    let autoRotate;

    function startRotation() {
        autoRotate = setInterval(() => {
            currentAngle -= 0.2; // Kelajuan perlahan. Tukar nombor ni kalau nak laju/perlahan
            spinner.style.transform = `rotateY(${currentAngle}deg)`;
        }, 20); // Update setiap 20ms
    }

    function stopRotation() {
        clearInterval(autoRotate);
    }

    // Mula pusing masa page load
    startRotation();

    // === 3. INTERACTION (BERHENTI BILA HOVER) ===
    const carouselSection = document.querySelector('.carousel-section');
    
    carouselSection.addEventListener('mouseenter', stopRotation);
    carouselSection.addEventListener('mouseleave', startRotation);


    // === 4. MANUAL BUTTON CONTROL (OPTIONAL) ===
    // Kalau user nak tekan arrow, kita pusingkan 72 darjah terus
    nextBtn.addEventListener("click", () => {
        currentAngle -= anglePerItem;
        spinner.style.transform = `rotateY(${currentAngle}deg)`;
    });

    prevBtn.addEventListener("click", () => {
        currentAngle += anglePerItem;
        spinner.style.transform = `rotateY(${currentAngle}deg)`;
    });

});