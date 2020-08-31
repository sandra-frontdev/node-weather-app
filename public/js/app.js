console.log('Hey, I am client side js!');

const form = document.querySelector('form');
const input = document.querySelector('input');
const message1 = document.querySelector('#message-1');
const message2 = document.querySelector('#message-2');

form.addEventListener('submit', (e) => {
	const location = input.value;
	message1.textContent = 'Loading...';
	message2.textContent = '';
	e.preventDefault();
	console.log(location);

	// Fetch:
	fetch('/weather?address=' + location).then((response) => {
		response.json().then((data) => {
			if(data.error) {
				console.log(data.error);
				message1.textContent = data.location;
				message2.textContent = data.error;
			} else {
				console.log(data.forecast);
				console.log(data.location);
				message1.textContent = data.location;
				message2.textContent = data.forecast;
			}
			});
	});
});