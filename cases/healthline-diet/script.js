document.addEventListener('DOMContentLoaded', function() {
    // Dropdown menu functionality
    const navItems = document.querySelectorAll('.nav-item');
    const dropdowns = document.querySelectorAll('.dropdown-container');
    const closeButtons = document.querySelectorAll('.close-dropdown');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const dropdownId = this.dataset.dropdown;
            
            if (dropdownId === 'tools') {
                const toolsDropdown = document.getElementById('tools-dropdown');
                if (toolsDropdown) {
                    toolsDropdown.classList.toggle('show');
                }
            }
        });
    });
    
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('show');
            });
        });
    });
    
    // Click outside to close dropdown
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.nav-item') && !event.target.closest('.dropdown-container')) {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('show');
            });
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
    
    // Diet page functionality
    const dietButtons = document.querySelectorAll('.diet-button');
    
    if (dietButtons.length > 0) {
        dietButtons.forEach(button => {
            button.addEventListener('click', function() {
                dietButtons.forEach(btn => {
                    btn.style.backgroundColor = 'white';
                    btn.style.color = '#3a7d8c';
                });
                
                this.style.backgroundColor = '#3a7d8c';
                this.style.color = 'white';
            });
        });
    }
    
    // Diet results page functionality
    const urlParams = new URLSearchParams(window.location.search);
    const goalParam = urlParams.get('goal');
    const goalTag = document.getElementById('goal-tag');
    const goalText = document.getElementById('goal-text');
    
    if (goalParam && goalText) {
        let goalDisplay = 'Other';
        
        switch(goalParam) {
            case 'healthier':
                goalDisplay = 'Eat healthier';
                break;
            case 'lose':
                goalDisplay = 'Lose weight';
                break;
            case 'gain':
                goalDisplay = 'Gain weight';
                break;
        }
        
        goalText.textContent = goalDisplay;
    }
    
    // Remove tag functionality
    const removeTag = document.querySelector('.remove-tag');
    
    if (removeTag && goalTag) {
        removeTag.addEventListener('click', function() {
            goalTag.style.display = 'none';
        });
    }
    
    // Toggle send results section
    const toggleButton = document.getElementById('toggleResults');
    const sendResultsContent = document.getElementById('sendResultsContent');
    
    if (toggleButton && sendResultsContent) {
        toggleButton.addEventListener('click', function() {
            if (sendResultsContent.style.display === 'none') {
                sendResultsContent.style.display = 'block';
                toggleButton.textContent = '−';
            } else {
                sendResultsContent.style.display = 'none';
                toggleButton.textContent = '+';
            }
        });
    }
    
    // Send results email form
    const sendResultsButton = document.querySelector('.send-results-button');
    const resultsEmailInput = document.querySelector('.results-email-input');
    
    if (sendResultsButton && resultsEmailInput) {
        sendResultsButton.addEventListener('click', function() {
            const email = resultsEmailInput.value;
            
            if (email) {
                alert(`Your diet results will be sent to: ${email}`);
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