'use strict';

(function() {
    loadOptions();
    submitHandler();
})();

function submitHandler() {
    var $submitButton = $('#submitButton');
    $submitButton.on('click', function () {
	    console.log('submit');

	    var return_to = getQueryParam('return_to', 'pebblejs://close#');
	    document.location = return_to + encodeURIComponent(JSON.stringify(getAndStoreConfigData()));
    });
}

function loadOptions() {
    var $normal = $('#normal');
    var $matchSingle = $('#match-1');
    var $matchThree = $('#match-3');
    var $matchFive = $('#match-5');

    if (localStorage.normal || localStorage.match) {
	
	if (localStorage.normal === 'true') {
	    $normal[0].checked = true;
	}
	else {
	    $normal[0].checked = false;
	}

	if (localStorage.match === '1') {
	    $matchSingle[0].checked = true;
	}
	if (localStorage.match === '3') {
	    $matchThree[0].checked = true;
	}
	if (localStorage.match === '5') {
	    $matchFive[0].checked = true;
	}
    }
    else {
	$normal[0].checked = true;
	$matchThree[0].checked = true;
    }
};

function getAndStoreConfigData() {
    var $normal = $('#normal');
    
    var $match = 0;
    var $matchSingle = $('#match-1');
    var $matchThree = $('#match-3');
    var $matchFive = $('#match-5');

    if ($matchSingle[0].checked) {
	$match = 1;
    }
    else if ($matchThree[0].checked) {
	$match = 3;
    }
    else {
	$match = 5;
    }
    var options = {
	normal: $normal[0].checked,
	match: $match
    };

    localStorage.normal = options.normal;
    localStorage.match = options.match;

    return options;
};

function getQueryParam(variable, defaultValue) {
    var query = location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
	var pair = vars[i].split('=');
	if (pair[0] === variable) {
	    return decodeURIComponent(pair[1]);
	}
    }
    return defaultValue || false;
};

