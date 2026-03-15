let currentSection = 0;
let currentPathTab = 0;
let currentFoundationTab = 0;
let currentPerspectiveTab = 0;
let currentAviationTab = 0;

function showSection(sectionIndex) {
    // Hide all sections
    const sections = document.querySelectorAll('.story-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Remove active class from all tabs and dots
    const tabs = document.querySelectorAll('.tab-btn');
    const dots = document.querySelectorAll('.dot');
    tabs.forEach(tab => tab.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Show selected section with fade-in
    setTimeout(() => {
        sections[sectionIndex].classList.add('active');
        tabs[sectionIndex].classList.add('active');
        dots[sectionIndex].classList.add('active');
        currentSection = sectionIndex;
    }, 50);
}

function showPathTab(tabIndex) {
    // Hide all path tabs
    const tabs = document.querySelectorAll('.tab-content');
    const navItems = document.querySelectorAll('.tab-nav-item');
    
    tabs.forEach(tab => tab.classList.remove('active'));
    navItems.forEach(item => item.classList.remove('active'));
    
    // Show selected tab
    document.getElementById(`path-tab-${tabIndex}`).classList.add('active');
    navItems[tabIndex].classList.add('active');
    currentPathTab = tabIndex;
}

function showFoundationTab(tabIndex) {
    // Hide all foundation tabs
    const tabs = document.querySelectorAll('.tab-content');
    const navItems = document.querySelectorAll('.tab-nav-item');
    
    tabs.forEach(tab => tab.classList.remove('active'));
    navItems.forEach(item => item.classList.remove('active'));
    
    // Show selected tab
    document.getElementById(`foundation-tab-${tabIndex}`).classList.add('active');
    navItems[tabIndex].classList.add('active');
    currentFoundationTab = tabIndex;
}

function showPerspectiveTab(tabIndex) {
    // Hide all perspective tabs
    const tabs = document.querySelectorAll('.tab-content');
    const navItems = document.querySelectorAll('.tab-nav-item');
    
    tabs.forEach(tab => tab.classList.remove('active'));
    navItems.forEach(item => item.classList.remove('active'));
    
    // Show selected tab
    document.getElementById(`perspective-tab-${tabIndex}`).classList.add('active');
    navItems[tabIndex].classList.add('active');
    currentPerspectiveTab = tabIndex;
}

function showAviationTab(tabIndex) {
    // Hide all aviation tabs
    const tabs = document.querySelectorAll('.tab-content');
    const navItems = document.querySelectorAll('.tab-nav-item');
    
    tabs.forEach(tab => tab.classList.remove('active'));
    navItems.forEach(item => item.classList.remove('active'));
    
    // Show selected tab
    document.getElementById(`aviation-tab-${tabIndex}`).classList.add('active');
    navItems[tabIndex].classList.add('active');
    currentAviationTab = tabIndex;
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' && currentSection > 0) {
        showSection(currentSection - 1);
    } else if (e.key === 'ArrowRight' && currentSection < 4) {
        showSection(currentSection + 1);
    } else if (e.key === 'ArrowUp') {
        if (currentSection === 0 && currentPathTab > 0) {
            showPathTab(currentPathTab - 1);
        } else if (currentSection === 1 && currentFoundationTab > 0) {
            showFoundationTab(currentFoundationTab - 1);
        } else if (currentSection === 3 && currentPerspectiveTab > 0) {
            showPerspectiveTab(currentPerspectiveTab - 1);
        } else if (currentSection === 4 && currentAviationTab > 0) {
            showAviationTab(currentAviationTab - 1);
        }
    } else if (e.key === 'ArrowDown') {
        if (currentSection === 0 && currentPathTab < 3) {
            showPathTab(currentPathTab + 1);
        } else if (currentSection === 1 && currentFoundationTab < 3) {
            showFoundationTab(currentFoundationTab + 1);
        } else if (currentSection === 3 && currentPerspectiveTab < 3) {
            showPerspectiveTab(currentPerspectiveTab + 1);
        } else if (currentSection === 4 && currentAviationTab < 3) {
            showAviationTab(currentAviationTab + 1);
        }
    }
});

// Initialize first section
document.addEventListener('DOMContentLoaded', () => {
    showSection(0);
    showPathTab(0);
    showFoundationTab(0);
    showPerspectiveTab(0);
    showAviationTab(0);
});
