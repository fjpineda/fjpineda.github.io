//website for calculating speed and acceleration
//copyright 2019 levi barshinger
//DO NOT DELETE

// function for testing if valid percentage
function validPercentage(value) {
	if(isNaN(value)) {
		return false;
	}
	else if(value < 0){
		return false;
	}
	else if(100 < value){
		return false;
	}
	else {
		return value;
	}
}

function setTest(){

	var sensitivities={
		'none': "enter value",
		'BinaxNOW (no symptoms)': 35.8,
		'BinaxNOW (with symptoms)': 71.1,
		'Flowflex': 93.0,
		'iHealth' : 94.30
	}

	var specificities={
		'none': "enter a value",
		'BinaxNOW (no symptoms)': 99.8,
		'BinaxNOW (with symptoms)': 100,
		'Flowflex':100,
		'iHealth' :98.1
	}

	//var notes={
	//	'BinaxNOW':
	//	'Flowflex':
	//	'iHealth' :
	//}

	dropdown = document.getElementById("antigen-tests-kits");
	selection = dropdown.value;
	//console.log("selection = " + selection);
	//console.log("sensitivity = " + sensitivities[selection]);
	sensitivityObj = document.getElementById("sensitivity");
	sensitivityObj.value = sensitivities[selection];

	specificityObj = document.getElementById("specificity");
	specificityObj.value = specificities[selection];

}

// interpret antigen test result
document.getElementsByClassName('btn-test')[0].addEventListener('click', () => {

 	sensitivity = document.getElementsByClassName('sensitivity')[0].value;
 	specificity = document.getElementsByClassName('specificity')[0].value;
 	prior       = document.getElementsByClassName('prior')[0].value;

 	if (!validPercentage(sensitivity)) {
		alert("Enter a valid percentage value for 'test sensitivity'");
	} else if (!validPercentage(specificity)) {
		alert("Enter a valid percentage value for 'test specificity'");
	} else if (!validPercentage(prior)) {
		alert("Enter a valid percentage value for 'disease prevalence'");
 	} else {

		var P = {};
		P['infected']        		= prior/100;
		P['not infected']    		= 1 - P['infected']
		P['+test | infected']		= sensitivity/100;
		P['-test | not infected']	= specificity/100;

		// joint probabilities and marginals
		P['+test & infected']		= P['+test | infected'] * P['infected'];
		P['-test & infected']		= P['infected'] - P['+test & infected'];

		P['-test & not infected']	= P['-test | not infected'] * P['not infected'];
		P['+test & not infected']	= P['not infected'] - P['-test & not infected'];

		P['+test']			        = P['+test & infected'] + P['+test & not infected'];
		P['-test']			        = P['-test & infected'] + P['-test & not infected'];

		P['infected | +test'] = P['+test & infected']/P['+test'];
		P['infected | -test'] = P['-test & infected']/P['-test'];

		positive_result = P['infected | +test'] *100;
		negative_result = P['infected | -test'] *100;

    	document.getElementsByClassName('positive-result')[0].innerHTML = positive_result.toFixed(0) + '% chance that you are actually infected';
		document.getElementsByClassName('negative-result')[0].innerHTML = negative_result.toFixed(0) + '% chance that you are actually infected';

	}
});
