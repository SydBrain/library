import { LANGUAGES } from "./constants/languages.js";

export function populateLanguageSelector() {
    const languageSelect = document.querySelector('[data-languages]');
    LANGUAGES.forEach(lang => {
        const option = document.createElement('option');
        option.value = lang.name;
        option.textContent = lang.name;
        languageSelect.appendChild(option);
    });
}

export function updateBookIndices() {
    document.querySelectorAll('.book-card').forEach((card, index) => {
        card.setAttribute('data-book-index', index);
    });
}

export function validateYear() {
    const yearInput = document.getElementById('published');
    const year = yearInput.value;
    return /^\d{4}$/.test(year);
}