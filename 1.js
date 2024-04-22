/* 1. Страница добавления отзыва о продукте.
Должна содержать форму с полем для ввода названия продукта и текстовое поле
для текста отзыва.
Кнопка "Добавить отзыв", которая сохраняет отзыв о продукте в localstorage.
Необходимо реализовать проверку, оба поля должны быть заполнены, если это не
так, необходимо выводить ошибку пользователю. */

const lsReviewKey = 'reviews';

function getReviews() {
    const reviews = localStorage.getItem(lsReviewKey);
    if(!reviews) {
        return [];
    }
    return JSON.parse(reviews);
}

function addReview(productName, review) {
    const reviewsLs = getReviews();
    console.log(reviewsLs);
    for (const rev of reviewsLs) {
        if (rev.name === productName) {
            rev.reviews.push(review);
            localStorage.setItem(lsReviewKey, JSON.stringify(reviewsLs));
            return;
        }
    }
    reviewsLs.push({name: productName, reviews: [review]})
    
    localStorage.setItem(lsReviewKey, JSON.stringify(reviewsLs));
}

const prodauctNameEl = document.querySelector('.product-name');
const reviewEl = document.querySelector('.product-review');
const addBtn = document.querySelector('.add-review');


addBtn.addEventListener('click', () => {
    const productName = prodauctNameEl.value;
    const review = reviewEl.value;
    addReview(productName, review);
})