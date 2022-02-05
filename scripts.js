//javascript for for COVID-19 website
//copyright 2022 Fernando J Pineda
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
	"none" : "enter value",
        "1" : 84.6,
        "2" : 91.7,
        "3" : 91.7,
        "4" : 84.6,
        "5" : 84,
        "6" : 93.8,
        "7" : 80.00,
        "8" : 91.10,
        "9" : 84.0,
        "10" : 84.0,
        "11" : 84.0,
        "12" : 87.5,
        "13" : 86.6,
        "14" : 93.3,
        "15" : 90,
        "16" : 97,
        "17" : 83.50,
        "18" : 87.6,
        "19" : 84.8,
        "20" : 93.9,
        "21" : 96.60,
        "22" : 94.4,
        "23" : 95.2,
        "24" : 97.6,
	}

	var specificities={
	"none" : "enter value",
        "1" : 98.5,
        "2" : 100,
        "3" : 100,
        "4" : 98.5,
        "5" : 100,
        "6" : 99.3,
        "7" : 100,
        "8" : 100,
        "9" : 98.0,
        "10" : 98.0,
        "11" : 98.0,
        "12" : 98.9,
        "13" : 100,
        "14" : 99.0,
        "15" : 100,
        "16" : 100,
        "17" : 99.20,
        "18" : 99.5,
        "19" : 99.1,
        "20" : 100,
        "21" : 99.30,
        "22" : 100.0,
        "23" : 100,
        "24" : 96.6,
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
