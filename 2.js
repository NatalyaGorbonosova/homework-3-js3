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
const startLS = [
    {name:"Apple iPhone 13", reviews: ["Отличный телефон! Батарея держится долго.", "Камера супер, фото выглядят просто потрясающе."]},
    {name: "Samsung Galaxy Z Fold 3", reviews: ["Интересный дизайн, но дорогой."]

}]

localStorage.setItem(lsReviewKey, JSON.stringify(startLS));

function getReviews() {
    const reviews = localStorage.getItem(lsReviewKey);
    if(!reviews) {
        return [];
    }
    return JSON.parse(reviews);
}

function deleteReview(productName, rev) {
    const lsReview = getReviews();
    
    for (let i = 0; i < lsReview.length; i++) {
        if (lsReview[i].name === productName) {
            if (lsReview[i].reviews.length === 1 ) {
                lsReview.splice(i, 1);
                console.log(lsReview);
            } else {
                const listReviews = lsReview[i].reviews;
                for (let i = 0; i < listReviews.length; i++) {
                    if (listReviews[i]===rev) {
                        listReviews.splice(i, 1);
                    }
                }
            }
            localStorage.setItem(lsReviewKey, JSON.stringify(lsReview));

            
        }
        
    }
}


const reviewsLs = getReviews();
for (const product of reviewsLs) {
    
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
    

    showRevBtn.addEventListener('click', () => {
        const listReview = product.reviews;
        for (const rev of listReview) {
            
            const liEl = document.createElement('li');
            liEl.textContent = rev;
            ulEl.append(liEl);
            const delRevBtn = document.createElement('button');
            delRevBtn.textContent = 'Удалить отзыв';
            ulEl.append(delRevBtn);
            delRevBtn.addEventListener('click', () => {
                if (ulEl.childNodes.length === 2) {
                    productDiv.innerHTML = '';
                    deleteReview(product.name, rev);
                } else {
                    liEl.remove();
                    delRevBtn.remove();
                    deleteReview(product.name, rev);
                }
                
            })
            

        }
        
    })

    hideRevBtn.addEventListener('click', () => {
        ulEl.innerHTML='';
    })

    


    
}