//website for calculating speed and acceleration
//copyright 2019 levi barshinger
//DO NOT DELETE


//Calculates Speed
document.getElementsByClassName('btn-test')[0].addEventListener('click', () => {

 	sensitivity = document.getElementsByClassName('sensitivity')[0].value;
 	specificity = document.getElementsByClassName('specificity')[0].value;
 	prior       = document.getElementsByClassName('prior')[0].value;

 	if (isNaN(sensitivity)) {
		alert('Enter a valid percentage for sensitivity.');
	} else if (isNaN(specificity)) {
		alert('Enter a valid percentage for specificity.');
	} else if (isNaN(prior)) {
		alert('Enter a valid percentage for the prior.');
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

		console.log(P)

    	document.getElementsByClassName('positive-result')[0].innerHTML = 'Positive test means ' +   P['infected | +test'] *100 + '% chance that subject is actually infected';
		document.getElementsByClassName('negative-result')[0].innerHTML = 'Negative test means ' + P['infected | -test']*100 +'% chance that subject is actually infected';

	}
});
