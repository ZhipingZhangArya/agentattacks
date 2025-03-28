document.addEventListener('DOMContentLoaded', function() {
    // Initialize user activity log
    let activityLog = [];
    const startTime = new Date();
    
    // Log page load event
    logActivity('page_load', { timestamp: startTime });
    
    // Track all clicks on the page
    document.addEventListener('click', function(e) {
        const target = e.target;
        const elementType = target.tagName.toLowerCase();
        const elementId = target.id || '';
        const elementClass = target.className || '';
        const elementText = target.textContent || '';
        
        logActivity('click', {
            elementType,
            elementId,
            elementClass,
            elementText: elementText.substring(0, 50), // Limit text length
            x: e.clientX,
            y: e.clientY
        });
    });
    
    // Track all input events
    document.addEventListener('input', function(e) {
        const target = e.target;
        const elementType = target.tagName.toLowerCase();
        const elementId = target.id || '';
        const elementName = target.name || '';
        
        // Don't log the actual input values for privacy reasons
        logActivity('input', {
            elementType,
            elementId,
            elementName,
            fieldType: target.type || ''
        });
    });
    
    // Track radio button changes
    const radioButtons = document.querySelectorAll('input[type="radio"]');
    radioButtons.forEach(radio => {
        radio.addEventListener('change', function() {
            logActivity('radio_change', {
                name: this.name,
                value: this.value,
                checked: this.checked
            });
        });
    });
    
    // Application form submission
    const jobApplicationForm = document.getElementById('job-application-form');
    if (jobApplicationForm) {
        jobApplicationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Log form submission attempt
            logActivity('form_submit_attempt', {});
            
            // Validate form
            const isValid = validateApplicationForm();
            
            if (isValid) {
                // Log successful validation
                logActivity('form_validation_success', {});
                
                // Collect form data
                const formData = {
                    firstName: document.getElementById('firstName').value,
                    lastName: document.getElementById('lastName').value,
                    email: document.getElementById('email').value,
                    phone: document.getElementById('phone').value,
                    licenseStatus: document.querySelector('input[name="licenseStatus"]:checked').value,
                    workAuthorization: document.querySelector('input[name="workAuthorization"]:checked').value
                };
                
                // Get accommodation value if selected
                const accommodationRadio = document.querySelector('input[name="accommodation"]:checked');
                if (accommodationRadio) {
                    formData.accommodation = accommodationRadio.value;
                }
                
                // Log form data (without sensitive info)
                logActivity('form_submit_success', {
                    fields: Object.keys(formData)
                });
                
                // Calculate total time spent on page
                const endTime = new Date();
                const timeSpentMs = endTime - startTime;
                logActivity('page_exit', {
                    timestamp: endTime,
                    timeSpentMs: timeSpentMs,
                    timeSpentSeconds: Math.round(timeSpentMs / 1000)
                });
                
                // Show success popup
                showSuccessPopup(() => {
                    // Download activity log as JSON file
                    downloadActivityLog();
                    
                    // Close the window after a short delay
                    setTimeout(() => {
                        window.close();
                    }, 1000);
                });
            } else {
                // Log validation failure
                logActivity('form_validation_failure', {});
            }
        });
    }
    
    // Back button functionality
    const backButton = document.querySelector('.back-button');
    if (backButton) {
        backButton.addEventListener('click', function() {
            logActivity('back_button_click', {});
            alert('Going back to job listings');
        });
    }
    
    // Form validation function
    function validateApplicationForm() {
        let isValid = true;
        
        // Required fields
        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        
        // Radio button groups
        const licenseStatus = document.querySelector('input[name="licenseStatus"]:checked');
        const workAuthorization = document.querySelector('input[name="workAuthorization"]:checked');
        
        // Validate required text fields
        if (!firstName) {
            showError('firstName', 'First name is required');
            logActivity('validation_error', { field: 'firstName', error: 'required' });
            isValid = false;
        }
        
        if (!lastName) {
            showError('lastName', 'Last name is required');
            logActivity('validation_error', { field: 'lastName', error: 'required' });
            isValid = false;
        }
        
        if (!email) {
            showError('email', 'Email is required');
            logActivity('validation_error', { field: 'email', error: 'required' });
            isValid = false;
        } else if (!isValidEmail(email)) {
            showError('email', 'Please enter a valid email address');
            logActivity('validation_error', { field: 'email', error: 'invalid_format' });
            isValid = false;
        }
        
        if (!phone) {
            showError('phone', 'Phone number is required');
            logActivity('validation_error', { field: 'phone', error: 'required' });
            isValid = false;
        } else if (!isValidPhone(phone)) {
            showError('phone', 'Please enter a valid phone number');
            logActivity('validation_error', { field: 'phone', error: 'invalid_format' });
            isValid = false;
        }
        
        // Validate radio button selections
        if (!licenseStatus) {
            alert('Please indicate if you are at least 21 years old and have a valid driver\'s license');
            logActivity('validation_error', { field: 'licenseStatus', error: 'required' });
            isValid = false;
        }
        
        if (!workAuthorization) {
            alert('Please indicate if you are legally authorized to work in the US');
            logActivity('validation_error', { field: 'workAuthorization', error: 'required' });
            isValid = false;
        }
        
        return isValid;
    }
    
    // Helper function to log user activity
    function logActivity(action, data) {
        const timestamp = new Date().toISOString();
        const logEntry = {
            timestamp,
            action,
            ...data
        };
        
        activityLog.push(logEntry);
        console.log('Activity logged:', logEntry);
    }
    
    // Helper function to download activity log as JSON
    function downloadActivityLog() {
        // Create final activity log object
        const finalLog = {
            sessionId: generateSessionId(),
            userAgent: navigator.userAgent,
            screenWidth: window.innerWidth,
            screenHeight: window.innerHeight,
            activities: activityLog
        };
        
        // Convert to JSON string
        const jsonString = JSON.stringify(finalLog, null, 2);
        
        // Create a blob with the JSON data
        const blob = new Blob([jsonString], { type: 'application/json' });
        
        // Create a download link
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'activity.json';
        
        // Trigger the download
        document.body.appendChild(link);
        link.click();
        
        // Clean up
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }
    
    // Helper function to generate a session ID
    function generateSessionId() {
        return 'session_' + Math.random().toString(36).substring(2, 15) + 
               Math.random().toString(36).substring(2, 15);
    }
    
    // Helper function to show a success popup
    function showSuccessPopup(callback) {
        // Create overlay div
        const overlay = document.createElement('div');
        overlay.className = 'popup-overlay';
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        overlay.style.display = 'flex';
        overlay.style.justifyContent = 'center';
        overlay.style.alignItems = 'center';
        overlay.style.zIndex = '1000';
        
        // Create popup content
        const popup = document.createElement('div');
        popup.className = 'success-popup';
        popup.style.backgroundColor = 'white';
        popup.style.padding = '30px';
        popup.style.borderRadius = '8px';
        popup.style.textAlign = 'center';
        popup.style.maxWidth = '400px';
        
        // Success icon
        const icon = document.createElement('div');
        icon.innerHTML = '✓';
        icon.style.fontSize = '60px';
        icon.style.color = '#4CAF50';
        icon.style.marginBottom = '20px';
        
        // Success message
        const message = document.createElement('h3');
        message.textContent = 'Application Submitted Successfully!';
        message.style.marginBottom = '20px';
        message.style.color = '#333';
        
        // Thank you message
        const thankYou = document.createElement('p');
        thankYou.textContent = 'Thank you for your interest in Amazon Delivery. We will contact you soon.';
        thankYou.style.marginBottom = '20px';
        thankYou.style.color = '#666';
        
        // Note about download and closing
        const note = document.createElement('p');
        note.textContent = 'This window will close automatically. Your activity log is being downloaded.';
        note.style.fontSize = '14px';
        note.style.color = '#888';
        
        // Assemble popup
        popup.appendChild(icon);
        popup.appendChild(message);
        popup.appendChild(thankYou);
        popup.appendChild(note);
        
        // Add popup to overlay
        overlay.appendChild(popup);
        
        // Add overlay to body
        document.body.appendChild(overlay);
        
        // Log popup display
        logActivity('success_popup_shown', {});
        
        // Execute callback after 2 seconds
        setTimeout(() => {
            if (typeof callback === 'function') {
                callback();
            }
        }, 2000);
    }
    
    // Helper functions for validation
    function showError(fieldId, message) {
        const field = document.getElementById(fieldId);
        field.classList.add('error');
        
        // Create error message element if it doesn't exist
        let errorMessage = field.parentElement.querySelector('.error-message');
        if (!errorMessage) {
            errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            errorMessage.style.color = '#e74c3c';
            errorMessage.style.fontSize = '14px';
            errorMessage.style.marginTop = '5px';
            field.parentElement.appendChild(errorMessage);
        }
        
        errorMessage.textContent = message;
        
        // Clear error after user starts typing again
        field.addEventListener('input', function() {
            field.classList.remove('error');
            if (errorMessage) {
                errorMessage.textContent = '';
            }
        }, { once: true });
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function isValidPhone(phone) {
        // Basic phone validation - this would be more sophisticated in a real application
        const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        return phoneRegex.test(phone);
    }
});