

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
        
        // Get the target section ID from the href attribute
        const targetId = this.getAttribute('href').substring(1); // Remove the '#'
        
        // Find and activate the corresponding page
        const targetPage = document.getElementById(targetId);
        if (targetPage) {
            targetPage.classList.add('active');
            
            // Close sidebar if it's open (for mobile view)
            sideBar.classList.remove('active');
        }
    });
});

// Update active link based on current section when scrolling
window.addEventListener('scroll', function() {
    let current = '';
    
    pages.forEach(page => {
        if (page.classList.contains('active')) {
            current = page.id;
        }
    });
    
    navItemLinks.forEach(link => {
        link.classList.remove('active');
        
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
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
            
            // Hide Figma Designs and Documentation from "All" section
            if (this.textContent === 'All') {
                if (categoryText === 'Figma Designs' || categoryText === 'Documentation') {
                    portfolioItem.classList.remove('active');
                } else {
                    portfolioItem.classList.add('active');
                }
            } else if (this.textContent === categoryText) {
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
document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.contact-form form');
    if (form) {
        form.addEventListener('submit', async function (e) {
            e.preventDefault(); // Prevent default form submission

            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            try {
                const response = await fetch(form.action, {
                    method: form.method,
                    headers: {
                        'Accept': 'application/json'
                    },
                    body: formData
                });

                if (response.ok) {
                    // Show a custom thank you message or clear the form
                    form.reset();
                    // You can show a message like this:
                    let msg = document.createElement('p');
                    msg.className = 'form-success';
                    msg.textContent = 'Thank you! Your message has been sent.';
                    form.appendChild(msg);
                    setTimeout(() => {
                        msg.remove();
                    }, 3000);
                } else {
                    // Handle error
                    alert('There was a problem submitting your form. Please try again.');
                }
            } catch (error) {
                alert('There was a problem submitting your form. Please try again.');
            }
        });
    }
});

