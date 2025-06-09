

const menuToggler = document.querySelector('.menu-toggler');
const sideBar = document.querySelector('.side-bar');
const navItemLinks = document.querySelectorAll('.nav li a');
const pages = document.querySelectorAll('.page');
const filterBtn = document.querySelectorAll('.filter-item');
const itemCategory = document.querySelectorAll('.item-category');

/* Slidebar Toggle */ 
menuToggler.addEventListener('click', function(){
    sideBar.classList.toggle('active');
});

/* Page Navigation Functionality */
navItemLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Remove active class from all links and pages
        navItemLinks.forEach(l => l.classList.remove('active'));
        pages.forEach(p => p.classList.remove('active'));
        
        // Add active class to clicked link
        this.classList.add('active');
        
        // Get the page name from link text
        const pageName = this.textContent.toLowerCase();
        
        // Find and activate the corresponding page
        pages.forEach(page => {
            if (page.classList.contains(pageName)) {
                page.classList.add('active');
            }
        });
    });
});

/* Portfolio Filter Functionality */
filterBtn.forEach((btn, index) => {
    btn.addEventListener('click', function() {
        // Remove active class from all filter buttons
        filterBtn.forEach(b => b.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');

        // Filter portfolio items
        itemCategory.forEach(item => {
            const categoryText = item.textContent;
            const portfolioItem = item.parentElement;
            
            if (this.textContent === 'All' || this.textContent === categoryText) {
                portfolioItem.classList.add('active');
            } else {
                portfolioItem.classList.remove('active');
            }
        });
    });
});

// Add this to your existing script.js
document.addEventListener('DOMContentLoaded', function() {
    // Create modal container
    const modal = document.createElement('div');
    modal.className = 'certificate-modal';
    document.body.appendChild(modal);

    // Add click event to certificate previews
    document.querySelectorAll('.certificate-preview').forEach(preview => {
        preview.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').src;
            modal.innerHTML = `<img src="${imgSrc}" alt="Certificate Full View">`;
            modal.style.display = 'block';
        });
    });

    // Close modal when clicked
    modal.addEventListener('click', function() {
        this.style.display = 'none';
    });
});
