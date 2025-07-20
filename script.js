document.addEventListener('DOMContentLoaded', function() {
    // Section hover effects
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        section.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Title animation
    const title = document.querySelector('.title');
    title.addEventListener('mouseenter', function() {
        this.style.animation = 'neonGlow 1.5s infinite';
    });
    title.addEventListener('mouseleave', function() {
        this.style.animation = '';
    });
    
    // Section title color effects
    const sectionTitles = document.querySelectorAll('.section-title');
    const neonColors = ['var(--neon-pink)', 'var(--neon-blue)', 'var(--neon-purple)', 'var(--neon-green)'];
    
    sectionTitles.forEach(title => {
        title.addEventListener('mouseenter', function() {
            const randomColor = neonColors[Math.floor(Math.random() * neonColors.length)];
            this.style.color = randomColor;
            this.style.textShadow = `0 0 10px ${randomColor}`;
        });
        title.addEventListener('mouseleave', function() {
            this.style.color = 'var(--neon-green)';
            this.style.textShadow = '0 0 8px rgba(0, 255, 157, 0.3)';
        });
    });
    
    // Initialize GitHub cards
    initGitHubCards();
});

// GitHub Card Functionality
function initGitHubCards() {
    const cards = document.querySelectorAll('.github-card');
    
    // Set initial heights
    cards.forEach(card => {
        const frontHeight = card.querySelector('.card-front').scrollHeight;
        const backHeight = card.querySelector('.card-back').scrollHeight;
        card.dataset.frontHeight = frontHeight;
        card.dataset.backHeight = backHeight;
        card.style.height = `${frontHeight}px`;
    });
    
    // Start auto-rotation
    startAutoRotate();
    
    // Pause auto-rotate when tab is inactive
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            clearInterval(window.autoRotateInterval);
        } else {
            startAutoRotate();
        }
    });
}

function rotateCard(card) {
    const isFlipped = card.classList.contains('flipped');
    const targetHeight = isFlipped ? card.dataset.frontHeight : card.dataset.backHeight;
    
    card.classList.toggle('flipped');
    card.style.height = `${targetHeight}px`;
    
    // Reset auto-rotate timer
    clearInterval(window.autoRotateInterval);
    startAutoRotate();
}

function startAutoRotate() {
    window.autoRotateInterval = setInterval(() => {
        const cards = document.querySelectorAll('.github-card:not(:hover)');
        cards.forEach((card, index) => {
            setTimeout(() => {
                const isFlipped = card.classList.contains('flipped');
                const targetHeight = isFlipped ? card.dataset.frontHeight : card.dataset.backHeight;
                
                card.classList.toggle('flipped');
                card.style.height = `${targetHeight}px`;
            }, index * 800);
        });
    }, 12000);
}