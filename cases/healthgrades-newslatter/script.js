document.addEventListener('DOMContentLoaded', function() {
    // How it works toggle on telehealth page
    const howItWorksBtn = document.querySelector('.how-it-works-btn');
    if (howItWorksBtn) {
        howItWorksBtn.addEventListener('click', function() {
            const content = document.querySelector('.how-it-works-content');
            const isHidden = content.style.display === 'none' || !content.style.display;
            
            content.style.display = isHidden ? 'block' : 'none';
            
            // Change the icon
            const icon = this.querySelector('i');
            icon.className = isHidden ? 'fas fa-chevron-up' : 'fas fa-chevron-down';
        });
    }
    
    // Location input clear button
    const clearLocationBtn = document.querySelector('.clear-location');
    if (clearLocationBtn) {
        clearLocationBtn.addEventListener('click', function() {
            const input = document.getElementById('search-where');
            input.value = '';
            input.focus();
        });
    }
    
    // Telehealth location search input
    const locationSearch = document.querySelector('.location-search');
    if (locationSearch) {
        locationSearch.addEventListener('input', function() {
            // This would typically trigger an API call to get providers based on location
            // For this demo, we'll just update the message
            const providersSection = document.querySelector('.telehealth-providers');
            
            if (this.value.length > 3) {
                providersSection.innerHTML = `
                    <p>Searching for providers in "${this.value}"...</p>
                `;
            } else {
                providersSection.innerHTML = `
                    <p class="no-providers">Please enter your location to see available providers</p>
                `;
            }
        });
    }
    
    // Treatment area dropdown change
    const treatmentSelect = document.getElementById('treatment-area');
    if (treatmentSelect) {
        treatmentSelect.addEventListener('change', function() {
            // This would typically trigger an API call to get providers based on treatment area
            console.log(`Selected treatment area: ${this.value}`);
        });
    }
    
    // Newsletter form submission
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = document.getElementById('email');
            const email = emailInput.value.trim();
            
            if (!email) {
                alert('Please enter your email address');
                return;
            }
            
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Hide form and show confirmation
            newsletterForm.style.display = 'none';
            document.querySelector('.newsletter-confirmation').style.display = 'block';
            
            // In a real application, you would submit the form data to a server here
            console.log(`Newsletter signup: ${email}`);
            
            // Get selected preferences
            const preferences = [];
            document.querySelectorAll('.preference-options input:checked').forEach(function(checkbox) {
                preferences.push(checkbox.parentElement.textContent.trim());
            });
            
            // Get selected frequency
            let frequency = '';
            document.querySelectorAll('.radio-options input:checked').forEach(function(radio) {
                frequency = radio.parentElement.textContent.trim();
            });
            
            console.log('Preferences:', preferences);
            console.log('Frequency:', frequency);
        });
    }
    
    // Homepage newsletter form
    const homepageNewsletterForm = document.querySelector('.newsletter-form');
    if (homepageNewsletterForm) {
        homepageNewsletterForm.addEventListener('submit', function(e) {
            // Note: We're not preventing default here because we want the form to navigate to the signup page
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (!email) {
                e.preventDefault();
                alert('Please enter your email address');
                return;
            }
            
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                e.preventDefault();
                alert('Please enter a valid email address');
                return;
            }
            
            // In a real application, you might store this email in local storage
            // to pre-fill the form on the next page
            localStorage.setItem('newsletterEmail', email);
        });
    }
    
    // Pre-fill newsletter email from localStorage if available
    const signupEmailInput = document.getElementById('email');
    if (signupEmailInput) {
        const savedEmail = localStorage.getItem('newsletterEmail');
        if (savedEmail) {
            signupEmailInput.value = savedEmail;
            localStorage.removeItem('newsletterEmail'); // Clean up
        }
    }
});