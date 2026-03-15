let currentSection = 0;

function showSection(sectionIndex) {
    // Hide all sections
    const sections = document.querySelectorAll('.story-section');
    sections.forEach(section => {
        section.classList.remove('active');
        section.style.opacity = '0';
    });
    
    // Remove active class from all tabs and dots
    const tabs = document.querySelectorAll('.tab-btn');
    const dots = document.querySelectorAll('.dot');
    tabs.forEach(tab => tab.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Show selected section with fade-in
    setTimeout(() => {
        sections[sectionIndex].classList.add('active');
        sections[sectionIndex].style.opacity = '1';
        tabs[sectionIndex].classList.add('active');
        dots[sectionIndex].classList.add('active');
        currentSection = sectionIndex;
    }, 300);
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' && currentSection > 0) {
        showSection(currentSection - 1);
    } else if (e.key === 'ArrowRight' && currentSection < 4) {
        showSection(currentSection + 1);
    }
});

// Initialize first section
document.addEventListener('DOMContentLoaded', () => {
    showSection(0);
});
