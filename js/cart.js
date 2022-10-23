let cartItems = document.getElementById('cart');
let totalPriceEl = document.getElementById('total-price');
let btnClearCart = document.getElementById('btn-clear__cart');
let cartHtml = JSON.parse(localStorage.getItem('cart'));




// Функция отоброжения корзины

function renderCart() {
    cartItems.innerHTML = "";
    totalPriceEl.innerHTML = "";
    if (cartHtml.length === 0) {

        cartItems.innerHTML = "Корзина пуста";
        totalPriceEl.innerHTML = 0;
    } else {


        const template = (imgSrc, title, price, id, size, count) => {
            return `<div class="catalog-cart">
                <img src="${imgSrc}" alt="${title}" class="catalog-cart__image">
                <div class="cart-content">
                <h3 class="catalog-cart__title">${title}</h3>
            <div class="catalog-cart__content">
                <div class="catalog-price">Цена:
                <div class="catalog-cart__price" data-price>${price}</div>
                </div>
                <div class="catalog-cart__number">${id}</div>
                <div class="catalog-cart__size">Размер:${size}</div>
                <div class="quantity">Кол-во:
                    <div class="catalog-cart__counter" data-counter>${count}</div>
                </div>
            </div>
            </div>
            <button class="cart-delete" data-product-id="${id}">X</button>
            </div>`
        };



        cartHtml.forEach((element) => {
            cartItems.innerHTML += template(
                element.imgSrc,
                element.title,
                element.price,
                element.id,
                element.size,
                element.count
            );

        });



    }

}

renderCart();
calcCartPrice();

// Повесили слушатель на все кнопки удаления товара

cartItems.addEventListener('click', (event) => {
    if (event.target.classList.contains('cart-delete')) {
        let productId = event.target.dataset.productId;

        let findIndex = cartHtml.findIndex((item) => {
            return +productId === item.id;
        })


        let product = cartHtml[findIndex];



        if (product.count > 1) {
            product.count--;


        } else {
            cartHtml.splice(findIndex, 1);

        }

        localStorage.setItem('cart', JSON.stringify(cartHtml));
        renderCart();
        calcCartPrice();
    }

})

// Функция подсчета стоимости товаров в корзине
function calcCartPrice() {
    let catalogCart = document.querySelectorAll('.catalog-cart');
    let priceTotal = 0;

    catalogCart.forEach((item) => {
        const amountEl = item.querySelector('[data-counter]');
        const priceEl = item.querySelector('[data-price]');
        const currentPrice = parseInt(amountEl.innerText) * parseInt(priceEl.innerText);
        priceTotal += currentPrice;


    });
    totalPriceEl.innerHTML = priceTotal;
}

// btnClearCart.addEventListener('click', (event) => {
//     cartItems.innerHTML = "";
//     localStorage.clear();
// })