// const cart = document.getElementById('cart');
const totalPriceEl = document.getElementById('total-price');
const btnClearCart = document.getElementById('btn-clear__cart');
const deleteCards = document.getElementsByClassName('cart-delete');
let cartHtml = JSON.parse(localStorage.getItem('cart'));



function renderCart() {
    if(cartHtml.length === 0) {
        cart.innerHTML = "Корзина пуста";
         
    } else {
        
        let cartHtml = JSON.parse(localStorage.getItem('cart'));
        const template =  (imgSrc, title, price, id, size, count) => {
            return  `<div class="catalog-cart">
                <img src="${imgSrc}" alt="${title}" class="catalog-cart__image">
                <h3 class="catalog-cart__title">${title}</h3>
            <div class="catalog-cart__content">
                <div class="catalog-cart__price" data-price>${price}</div>
                <div class="catalog-cart__number">${id}</div>
                <div class="catalog-cart__size">Размер:${size}</div>
                <div class="catalog-cart__counter" data-counter>Кол-во:${count}</div>
            </div>
            <button class="cart-delete" data-delete-id="${id}">X</button>
            </div>`
        };
    
        cartHtml.forEach((element) => {
            cart.innerHTML += template(
                element.imgSrc,
                element.title,
                element.price,
                element.id,
                element.size,
                element.count
            );
        });
        totalPrice();
        
    }
}

 renderCart();

for (i = 0; i < deleteCards.length; i++) {
    let item = deleteCards[i];
    if (item) {
        item.addEventListener('click', (event) => {
            let deleteId = event.target.dataset.deleteId;
            console.log(deleteId);            
            let findIndex = cartHtml.findIndex((item) => {
                return +deleteId === item.id;
                
            })
            console.log(findIndex);
            
            
            
            if(findIndex < 0) {
                cartHtml.splice(findIndex, 1);
                
            } else {
                
                cartHtml[findIndex].count--;
            }
            
            // event.target.closest('.catalog-cart').remove()
            localStorage.setItem('cart', JSON.stringify(cartHtml));
            
        })
    }



}

// Подсчет стоимости товаров 
function totalPrice() {
    const catalogCard = document.querySelectorAll('.catalog-cart');
    let totalCost = 0;

    catalogCard.forEach(function (item) {
        const priceEl = item.querySelector('.catalog-cart__price');
        totalCost += parseInt(priceEl.innerText);
    });

    totalPriceEl.innerText = totalCost;
}
totalPrice();