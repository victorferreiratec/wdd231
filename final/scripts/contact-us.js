document.addEventListener('DOMContentLoaded', () => {
    const suggestionForm = document.getElementById('suggestionForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const suggestionTextarea = document.getElementById('suggestion');
    const messageDiv = document.getElementById('message');

    // Load saved data for form fields from local storage (for pre-filling if user navigates back)
    if (localStorage.getItem('currentSuggestionName')) {
        nameInput.value = localStorage.getItem('currentSuggestionName');
    }
    if (localStorage.getItem('currentSuggestionEmail')) {
        emailInput.value = localStorage.getItem('currentSuggestionEmail');
    }
    if (localStorage.getItem('currentSuggestionContent')) {
        suggestionTextarea.value = localStorage.getItem('currentSuggestionContent');
    }

    // Save data for form fields to local storage on input change
    nameInput.addEventListener('input', () => {
        localStorage.setItem('currentSuggestionName', nameInput.value);
    });

    emailInput.addEventListener('input', () => {
        localStorage.setItem('currentSuggestionEmail', emailInput.value);
    });

    suggestionTextarea.addEventListener('input', () => {
        localStorage.setItem('currentSuggestionContent', suggestionTextarea.value);
    });

    // Handle form submission
    suggestionForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission

        // Create an object with the submission data
        const submissionData = {
            name: nameInput.value,
            email: emailInput.value,
            suggestion: suggestionTextarea.value
        };

        // Store the submission data in sessionStorage
        sessionStorage.setItem('latestSubmission', JSON.stringify(submissionData));

        // Clear the form fields and local storage for pre-filling
        nameInput.value = '';
        emailInput.value = '';
        suggestionTextarea.value = '';
        localStorage.removeItem('currentSuggestionName');
        localStorage.removeItem('currentSuggestionEmail');
        localStorage.removeItem('currentSuggestionContent');

        // Redirect to the thank you page
        window.location.href = 'thank-you.html';
    });
});