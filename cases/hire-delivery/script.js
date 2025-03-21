document.addEventListener('DOMContentLoaded', function() {
    // Job search location input
    const locationInput = document.getElementById('location');
    if (locationInput) {
        // Set the default location
        setTimeout(() => {
            locationInput.value = 'Grand Rapids, MI, USA';
        }, 500);
        
        // Location input event listener
        locationInput.addEventListener('input', function() {
            // This would typically implement Google Places autocomplete
            console.log('Location input:', this.value);
        });
    }
    
    // Form filters (radius, state, pay, additional info)
    const filterSelects = document.querySelectorAll('#radius, #state, #pay, #additional-info');
    filterSelects.forEach(select => {
        select.addEventListener('change', function() {
            console.log(`${this.id} changed to:`, this.value);
            // This would typically trigger a search with the new filters
            updateJobListings();
        });
    });
    
    // Job search form submission
    const jobSearchForm = document.getElementById('job-search-form');
    if (jobSearchForm) {
        jobSearchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            performSearch();
        });
    }
    
    // Function to update job listings based on filters
    function updateJobListings() {
        // This would fetch data from the server with the current filters
        console.log('Updating job listings...');
        
        // For this demo, we'll just update the job count
        const jobCount = document.getElementById('job-count');
        if (jobCount) {
            // Simulating different result counts based on filters
            const counts = ['1-8 of 8', '1-6 of 6', '1-10 of 15', '1-25 of 377'];
            const randomIndex = Math.floor(Math.random() * counts.length);
            jobCount.textContent = counts[randomIndex];
        }
    }
    
    // Function to perform search when form is submitted
    function performSearch() {
        const location = document.getElementById('location').value;
        const radius = document.getElementById('radius').value;
        const state = document.getElementById('state').value;
        const pay = document.getElementById('pay').value;
        const additionalInfo = document.getElementById('additional-info').value;
        
        console.log('Performing search with:', {
            location,
            radius,
            state,
            pay,
            additionalInfo
        });
        
        // This would typically fetch results from the server
        // For this demo, we'll just simulate a delay
        setTimeout(() => {
            console.log('Search completed');
            updateJobListings();
        }, 500);
    }
    
    // Application form file upload
    const resumeInput = document.getElementById('resume');
    if (resumeInput) {
        resumeInput.addEventListener('change', function() {
            const fileInfo = document.querySelector('.file-info');
            if (fileInfo) {
                if (this.files.length > 0) {
                    const fileName = this.files[0].name;
                    fileInfo.textContent = fileName;
                    
                    // Check file size (max 5MB)
                    const fileSize = this.files[0].size;
                    const maxSize = 5 * 1024 * 1024; // 5MB
                    
                    if (fileSize > maxSize) {
                        alert('File size exceeds the 5MB limit. Please choose a smaller file.');
                        this.value = '';
                        fileInfo.textContent = 'No file chosen';
                    }
                    
                    // Check file type
                    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
                    if (!validTypes.includes(this.files[0].type)) {
                        alert('Invalid file type. Please upload a PDF, DOC, or DOCX file.');
                        this.value = '';
                        fileInfo.textContent = 'No file chosen';
                    }
                } else {
                    fileInfo.textContent = 'No file chosen';
                }
            }
        });
    }
    
    // Upload button click handler
    const uploadButton = document.querySelector('.upload-button');
    if (uploadButton) {
        uploadButton.addEventListener('click', function() {
            const resumeInput = document.getElementById('resume');
            if (resumeInput) {
                resumeInput.click();
            }
        });
    }
    
    // Application form submission
    const jobApplicationForm = document.getElementById('job-application-form');
    if (jobApplicationForm) {
        jobApplicationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            const isValid = validateApplicationForm();
            
            if (isValid) {
                console.log('Form is valid, submitting...');
                // This would typically submit the form to the server
                // For this demo, we'll just simulate a submission
            }
        }
    }
}