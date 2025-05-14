//your JS code here. If required.
function debounce(func, delay) {
	let timeout;
	return functon(...args){
		clearTimeout(timeout);
		timeout = setTimeout(() => func.apply(this, args), delay);
	};
}

async function fetchSuggestions(query) {
	if(!query) return;
	const responce = await
	fetch(`https://api.frontendexpert.io/api/fe/glossary-suggestions?text=${query}`);
	const suggestions = await responce.json();
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
  const typeaheadInput = 
	  document.getElementById('typeahead');
	typeaheadInput.value = suggestion;
	clearSuggestion();
}

function clearSuggestion() {
	
}