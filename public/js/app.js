const formData = document.querySelector('form');
const searchData = document.querySelector('input');
const firstMessage = document.querySelector('#firstMessage');
const secondMessage = document.querySelector('#secondMessage');

formData.addEventListener('submit', (e) => {
    e.preventDefault();
    let location = searchData.value;
    firstMessage.textContent = 'Loading...';
    secondMessage.textContent = '';

    fetch(`http://localhost:3000/weather?address=${location}`).then(response => {
        response.json().then(data => {
            if (data && data.error) {
                firstMessage.textContent = data.error;
            } else {
                firstMessage.textContent = data.location;
                secondMessage.textContent = data.weatherResponse;
            }
        });
    });
});