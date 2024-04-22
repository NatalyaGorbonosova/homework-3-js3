/* 2. Страница просмотра отзывов.
Показывает список всех продуктов, на которые были оставлены отзывы.
Рядом с каждым продуктом должна быть кнопка "показать отзывы" / "скрыть отзывы"
(надпись кнопки меняется), при нажатии на которую показываются / скрываются
отзывы продукта.
После текста отзыва должна быть кнопка "удалить", которая удаляет данный отзыв
из localstorage и со страницы.
Если удалены все отзывы продукта, то продукта вовсе должен быть удален, как из
localstorage, так и со страницы. */

const contentDiv = document.querySelector('.content');

const lsReviewKey = 'reviews';
const reviewsLs = getReviews();

function getReviews() {
    const reviews = localStorage.getItem(lsReviewKey);
    if(!reviews) {
        return [];
    }
    return JSON.parse(reviews);
}

function testList() {
    const reviewsLs = getReviews();
    for (let i = 0; i < reviewsLs.length; i++) {
        if (reviewsLs[i].reviews.length === 0) {
            reviewsLs.splice(i, 1);
            return true;
        }
        return false;
    }
}

function changeLocalStorage() {
    testList();
    localStorage.setItem(lsReviewKey, JSON.stringify(reviewsLs));
}

function deleteReview(productName, rev) {

    for (const product of reviewsLs) {
        if (product.name === productName) {
            const reviews = product.reviews;
            for (let i = 0; i < reviews.length; i++) {
                if (reviews[i] === rev) {
                    reviews.splice(i, 1);
                }
                changeLocalStorage();
                return;
                
            }
        }
    }
    return false;

}



for (const product of reviewsLs) {
    testList();
    const productDiv = document.createElement('div');
    contentDiv.append(productDiv);
    productDiv.classList.add('product');
    productDiv.insertAdjacentHTML("beforeend", `<h2>${product.name}</h2>`);
    const showRevBtn = document.createElement('button');
    showRevBtn.classList.add('show-review');
    showRevBtn.textContent='Показать отзывы';
    productDiv.append(showRevBtn);
    const hideRevBtn = document.createElement('button');
    hideRevBtn.classList.add('hide-review');
    hideRevBtn.textContent = 'Скрыть отзывы';
    productDiv.append(hideRevBtn);
    const ulEl = document.createElement('ul');
    productDiv.append(ulEl);
    const listReview = product.reviews;

    showRevBtn.addEventListener('click', () => {
        for (const rev of listReview) {
            const liEl = document.createElement('li');
            liEl.textContent = rev;
            ulEl.append(liEl);
            const delRevBtn = document.createElement('button');
            delRevBtn.textContent = 'Удалить отзыв';
            ulEl.append(delRevBtn);
            delRevBtn.addEventListener('click', () => {
                deleteReview(product.name, rev);

                liEl.remove();
                delRevBtn.remove();
                if (testList()) {
                    productDiv.remove();
                }
            })
            

        }
        
    })

    hideRevBtn.addEventListener('click', () => {
        ulEl.innerHTML='';
    })

    


    
}