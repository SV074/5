let catalog = [
    {
        id: 1,
        title: "Спортивный костюм",
        price: 1700,
        size: "M",
        imgSrc: "img/img_products/i (1).webp"
    },
    {
        id: 2,
        title: "Толстовка",
        price: 1200,
        size: "S",
        imgSrc: "img/img_products/i.webp"
    },
    {
        id: 3,
        title: "Рубашка",
        price: 1100,
        size: "L",
        imgSrc: "img/img_products/d.webp"
    },
    {
        id: 4,
        title: "Футболка",
        price: 900,
        size: "Xl",
        imgSrc: "img/img_products/orig (1).webp"
    },
    {
        id: 5,
        title: "Пиджак",
        price: 1900,
        size: "S",
        "imgSrc": "img/img_products/orig (2).webp"
    },
    {
        id: 6,
        title: "Бомбер",
        price: 4000,
        size: "L",
        imgSrc: "img/img_products/orig.webp"
    }


]


const minInput = document.getElementById('min-input');
const maxInput = document.getElementById('max-input');
const btnSort = document.getElementById('btn');
const catalogElement = document.getElementById('catalog');
const mini = document.getElementById('mini');
const maxi = document.getElementById('maxi');
const btnDeleteCart = document.querySelector('[data-delete]');
const totalPriceEl = document.getElementById('total-price');

const pushToCartButtons = document.getElementsByClassName('catalog-card__btn');

let min;
let max;
let beer;




buildCatalog();

function buildCatalog() {
    let filteredCatalog = catalog;

    if (+beer === 1) {
        filteredCatalog = catalog.sort((a, b) => {
            if (a.price < b.price) {
                return -1;
            }
            if (a.price > b.price) {
                return 1;
            }
            return 0;
        });
    } else {
        filteredCatalog = catalog.sort((a, b) => {
            if (a.price > b.price) {
                return -1;
            }
            if (a.price < b.price) {
                return 1;
            }
            return 0;
        })

    };

    if (min) {
        filteredCatalog = catalog.filter((element) => {
            return element.price >= min;
        });
    }

    if (max) {
        filteredCatalog = catalog.filter((element) => {
            return element.price <= max;
        });
    }



    const template = (imgSrc, title, price, id, size) => {
        return `<div class="catalog-card">
                <img src="${imgSrc}" alt="${title}" class="catalog-card__image">
                <h3 class="catalog-title">${title}</h3>
            <div class="catalog-card__content">
                <div class="catalog-card__price">${price} ₽</div>
                <div class="catalog-card__number">Артикул:${id}</div>
                <div class="catalog-card__size">Размер:${size}</div>
            </div>
            <button class="catalog-card__btn" data-product-id="${id}">Добавить в корзину</button>
        </div>`;
    };

    filteredCatalog.forEach((element) => {
        catalogElement.innerHTML += template(
            element.imgSrc,
            element.title,
            element.price,
            element.id,
            element.size
        );


    });
}

function resetCatalog() {
    catalogElement.innerHTML = "";
};

btnSort.addEventListener('click', () => {

    min = minInput.value;
    max = maxInput.value;
    resetCatalog();
    buildCatalog();
});

mini.addEventListener('change', (event) => {
    beer = event.target.value;
    resetCatalog();
    buildCatalog();
});

maxi.addEventListener('change', (event) => {
    beer = event.target.value;
    resetCatalog();
    buildCatalog();
});

let productsInCart = [];

let productInCart = (id, count = 1) => {
    return {
        id: +id,
        count: count
    }
}

for (let i = 0; i <= pushToCartButtons.length; i++) {
    let item = pushToCartButtons[i];
    if (item) {
        item.addEventListener('click', (event) => {
            let productId = event.target.dataset.productId;

            let findIndex = productsInCart.findIndex((item) => {
                return +productId === item.id;
            })
            if (findIndex < 0) {
                productsInCart.push(productInCart(productId));
            } else {
                productsInCart[findIndex].count++;
            }

            localStorage.setItem('cart', JSON.stringify(productsInCart));
        })
    }
}



// btnAdd.addEventListener('click', (event) => {
//
//     console.log(event);
//
//     if (event.target.hasAttribute('data-cart')) {
//
//         let card = event.target.closest('.catalog-card');
//
//         let productInfo = {
//             id: card.querySelector('.catalog-card__number').innerText,
//             imgSrc: card.querySelector('.catalog-card__image').getAttribute('src'),
//             title: card.querySelector('.catalog-title').innerText,
//             price: card.querySelector('.catalog-card__price').innerText,
//             size: card.querySelector('.catalog-card__size').innerText,
//         };
//
//         // let cartItemHtml = `<div class="catalog-cart">
//         //     <img src="${productInfo.imgSrc}" alt="${productInfo.title}" class="catalog-cart__image">
//         //     <h3 class="catalog-cart__title">${productInfo.title}</h3>
//         // <div class="catalog-cart__content">
//         //     <div class="catalog-cart__price" data-price>${productInfo.price}</div>
//         //     <div class="catalog-cart__number">${productInfo.id}</div>
//         //     <div class="catalog-cart__size">Размер:${productInfo.size}</div>
//         //     <div class="catalog-cart__counter" data-counter>Кол-во:1</div>
//         // </div>
//         // <button class="cart-delete" data-delete id="delete">X</button>
//         // </div>`
//         // let product = catalog.find(it => it.id === parseInt(id));
//         // catalogHtml.push(product);
//
//        // Сохранение в LocalStorage
//         let cart = JSON.parse(localStorage.getItem('cart1'))||[];
//         localStorage.setItem('productInfo', JSON.stringify(productInfo));
//         cart.push(productInfo);
//         localStorage.setItem('cart1', JSON.stringify(cart));
//    }
//
//
// })




// window.addEventListener('click', (event) => {
    

//     if (event.target.hasAttribute('data-cart')) {

//         let card = event.target.closest('.catalog-card');

//         let productInfo = {
//             id: card.querySelector('.catalog-card__number').innerText,
//             imgSrc: card.querySelector('.catalog-card__image').getAttribute('src'),
//             title: card.querySelector('.catalog-title').innerText,
//             price: card.querySelector('.catalog-card__price').innerText,
//             size: card.querySelector('.catalog-card__size').innerText,
//         };

//         let cartItemHtml = `<div class="catalog-cart">
//             <img src="${productInfo.imgSrc}" alt="${productInfo.title}" class="catalog-cart__image">
//             <h3 class="catalog-cart__title">${productInfo.title}</h3>
//         <div class="catalog-cart__content">
//             <div class="catalog-cart__price" data-price>${productInfo.price}</div>
//             <div class="catalog-cart__number">${productInfo.id}</div>
//             <div class="catalog-cart__size">Размер:${productInfo.size}</div>
//             <div class="catalog-cart__counter" data-counter>Кол-во:1</div>
//         </div>
//         <button class="cart-delete" data-delete id="delete">X</button>
//         </div>`

//         

//         

//     }


    // // Удаление товара
    // function deleteCartProduct() {
    //     event.target.closest('.catalog-cart').remove();
    // }

    // if (event.target.hasAttribute('data-delete')) {
    //     deleteCartProduct();
    // }
    // // Очистка корзины
    // function clearCart() {
    //     cart.innerHTML = '';
    // }

    // if(event.target.hasAttribute('data-delete-cart')) {
    //     clearCart();
    // }

    // totalPrice();

    



//});



// Подсчет стоимости товаров 
// function totalPrice() {
//     const catalogCard = document.querySelectorAll('.catalog-cart');
//     let totalCost = 0;

//     catalogCard.forEach(function (item) {
//         const priceEl = item.querySelector('.catalog-cart__price');
//         totalCost += parseInt(priceEl.innerText);
//     });

//     totalPriceEl.innerText = totalCost;
// }





