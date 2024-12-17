const stars = document.querySelectorAll ('.star')
const starsContainer = document.querySelector ('#star-container')

let selectedValue = 0;

function highlightStars (value) {
    stars.forEach (star => {
        if (star.dataset.value <= value) {
            star.classList.add ('selected');

        } else {
            star.classList.remove ('selected');

        }
    });
}
//evidenzio le stelle
stars.forEach (star => {
    star.addEventListener('mouseover',() => {
        highlightStars (star.dataset.value);
    })
})


stars.addEventListener('click', () => {
    selectedValue = stars.dataset.value;
    highlightStars(selectedValue);
});

stars.addEventListener('mouseout', () => {
    highlightStars(selectedValue);
});
console.log (stars)


