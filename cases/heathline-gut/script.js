document.addEventListener('DOMContentLoaded', function() {
    // Plan dropdown functionality
    const planButton = document.getElementById('planButton');
    const planDropdown = document.getElementById('planDropdown');
    const closeDropdown = document.querySelector('.close-dropdown');
    
    // Plan button click handler
    if (planButton && planDropdown) {
        planButton.addEventListener('click', function(e) {
            e.preventDefault();
            planDropdown.style.display = 'block';
            console.log('Plan button clicked, dropdown should be visible');
        });
    } else {
        console.error("Plan button or dropdown not found", {
            planButton: !!planButton,
            planDropdown: !!planDropdown
        });
    }
    
    // Close button click handler
    if (closeDropdown) {
        closeDropdown.addEventListener('click', function() {
            planDropdown.style.display = 'none';
        });
    }
    
    // Click outside to close dropdown
    document.addEventListener('click', function(event) {
        if (planDropdown && planDropdown.style.display === 'block' && 
            !event.target.closest('#planButton') && 
            !event.target.closest('#planDropdown')) {
            planDropdown.style.display = 'none';
        }
    });
    
    // Subscribe button functionality - show modal
    const subscribeBtn = document.querySelector('.subscribe-btn');
    const subscribeModal = document.getElementById('subscribeModal');
    const closeModalBtn = document.querySelector('.close-btn');
    
    if (subscribeBtn && subscribeModal) {
        subscribeBtn.addEventListener('click', function() {
            subscribeModal.style.display = 'flex';
        });
    }
    
    if (closeModalBtn && subscribeModal) {
        closeModalBtn.addEventListener('click', function() {
            subscribeModal.style.display = 'none';
        });
    }
    
    // Click outside to close modal
    window.addEventListener('click', function(event) {
        if (subscribeModal && event.target == subscribeModal) {
            subscribeModal.style.display = 'none';
        }
    });
    
    // Modal subscribe button functionality
    const subscribeModalBtn = document.querySelector('.subscribe-btn-modal');
    const emailInput = document.querySelector('.email-input');
    const nutritionCheckbox = document.getElementById('nutritionNewsletter');
    
    if (subscribeModalBtn && emailInput && nutritionCheckbox) {
        subscribeModalBtn.addEventListener('click', function() {
            const email = emailInput.value;
            const isNutrition = nutritionCheckbox.checked;
            
            if (email) {
                alert(`Subscribed with email: ${email}${isNutrition ? ' to Nutrition Edition' : ''}`);
                subscribeModal.style.display = 'none';
            } else {
                alert('Please enter an email address');
            }
        });
    }
    
    // Gut Challenge subscription
    const challengeSubscribeBtn = document.querySelector('.challenge-subscribe-btn');
    const challengeEmailInput = document.querySelector('.challenge-email-input');
    
    if (challengeSubscribeBtn && challengeEmailInput) {
        challengeSubscribeBtn.addEventListener('click', function() {
            const email = challengeEmailInput.value;
            
            if (email) {
                alert(`You've been subscribed to the Gut Check Challenge with email: ${email}`);
                challengeEmailInput.value = '';
            } else {
                alert('Please enter an email address');
            }
        });
    }
    
    // Article click functionality
    const articleCards = document.querySelectorAll('.article-card');
    
    articleCards.forEach(card => {
        card.addEventListener('click', function() {
            // Here you would redirect to the article page
            console.log('Article clicked');
        });
    });
});