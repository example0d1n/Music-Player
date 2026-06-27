const items = document.querySelectorAll('.music-player', '.music-player2')
const defaultColor = 'black';

items.forEach(item => {
    //Trigger when mouse enters the element bounds
    item.addEventListener('mouseenter', () => {
        const image = item.getAttribute('data-image');
        document.body.style.backgroundImage = Image;
    })
})