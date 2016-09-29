var textarea = document.getElementById('textarea');
var utterance = new SpeechSynthesisUtterance();


function updateQueryStringParam(key, value) {
	baseUrl = [location.protocol, '//', location.host, location.pathname].join('');
	urlQueryString = document.location.search;
	var newParam = key + '=' + value,
		params = '?' + newParam;

	// If the "search" string exists, then build params from it
	if (urlQueryString) {
		keyRegex = new RegExp('([\?&])' + key + '[^&]*');
		// If param exists already, update it
		if (urlQueryString.match(keyRegex) !== null) {
			params = urlQueryString.replace(keyRegex, "$1" + newParam);
		} else { // Otherwise, add it to end of query string
			params = urlQueryString + '&' + newParam;
		}
	}
	window.history.replaceState({}, "", baseUrl + params);
}

function getParameterByName(name, url) {
	if (!url) url = window.location.href;
	name = name.replace(/[\[\]]/g, "\\$&");
	var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
		results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, " "));
}


window.addEventListener('load', function (e) {
	textarea.value = getParameterByName('q', document.location.href);
	if (textarea.value.length > 0) {
		sayIt();
	}
})

textarea.addEventListener('keyup', function (e) {
	updateQueryStringParam('q', textarea.value);
});

textarea.addEventListener('keydown', function (e) {
	if (e.code === 'Enter') {
		e.preventDefault();
		sayIt();
		return false;
	}
});

function sayIt() {
	utterance.text = textarea.value;
	speechSynthesis.cancel();
	speechSynthesis.speak(utterance);
}
