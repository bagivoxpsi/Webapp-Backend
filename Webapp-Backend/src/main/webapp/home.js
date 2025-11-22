const powerButton = document.getElementById('power-button');

powerButton.addEventListener('click', (e) => {
    e.preventDefault(); // prevent default focus/blur behavior
    powerButton.classList.toggle('on');
});