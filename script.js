function debounce(func, delay) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}

async function fetchSuggestions(query) {
    if (!query) return;
    const response = await fetch(`https://api.frontendexpert.io/api/fe/glossary-suggestions?text=${query}`);
    const suggestions = await response.json();
    displaySuggestions(suggestions);
}

function displaySuggestions(suggestions) {
    const suggestionsList = document.getElementById('suggestions-list');
    suggestionsList.innerHTML = '';
    suggestions.forEach(suggestion => {
        const li = document.createElement('li');
        li.textContent = suggestion;
        li.onclick = () => selectSuggestion(suggestion);
        suggestionsList.appendChild(li);
    });
}

function selectSuggestion(suggestion) {
    const typeaheadInput = document.getElementById('typeahead');
    typeaheadInput.value = suggestion;
    clearSuggestions();
}

function clearSuggestions() {
    const suggestionsList = document.getElementById('suggestions-list');
    suggestionsList.innerHTML = '';
}

const typeaheadInput = document.getElementById('typeahead');
typeaheadInput.addEventListener('input', debounce((event) => {
    fetchSuggestions(event.target.value);
}, 500));