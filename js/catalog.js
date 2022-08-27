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

const cardTemplate = (imgSrc, title, price, id, size) => {
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

const cartItemTemplate = (imgSrc, title, price, id, size, qty) => {
    return `<div class="catalog-cart">
                <img src="${imgSrc}" alt="${title}" class="catalog-cart__image">
                <h3 class="catalog-cart__title">${title}</h3>
                <div class="catalog-cart__content">
                    <div class="catalog-cart__price">${price} ₽</div>
                    <div class="catalog-cart__number">${id}</div>
                    <div class="catalog-cart__size">Размер:${size}</div>
                    <div class="catalog-cart__counter">${qty}</div>
                </div>
            <button class="catalog-cart__delete-btn" data-product-id="${id}">X</button>
        </div>`
}

const minInput = document.getElementById('min-input');
const maxInput = document.getElementById('max-input');
const btnSort = document.getElementById('btn');
const catalogElement = document.getElementById('catalog');
const mini = document.getElementById('mini');
const maxi = document.getElementById('maxi');

const cartItems = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('total-price');
const clearAllLink = document.getElementById('clear-all-items');

let min;
let max;
let beer;

let productsInCart = [];

init();

function buildCartItems() {
    cartItems.innerHTML = "";
    totalPriceElement.innerHTML = "";
    let totalPrice = 0;

    for (let i = 0; i <= (productsInCart.length - 1); i++) {

        let item = productsInCart[i];
        let productInfo = getProduct(item.id);
        let price = productInfo.price * item.qty;
        totalPrice += price;
        cartItems.innerHTML += cartItemTemplate(
            productInfo.imgSrc,
            productInfo.title,
            price,
            productInfo.id,
            productInfo.size,
            item.qty
        );
    }
    if (totalPrice > 0) {
        totalPriceElement.innerHTML = `Итого ${totalPrice} ₽`;
    }

    clearAllLink.style.display = productsInCart.length > 0
        ? 'block'
        : 'none';
}

// function refreshCart() {
//     for (let i = 0; i <= (productsInCart.length - 1); i++) {
//         let item = productsInCart[i];
//         let productInfo = getProduct(item.id);
//         let price = productInfo.price * item.qty;
//         cartContainer.innerHTML += cartItemTemplate(
//             productInfo.imgSrc,
//             productInfo.title,
//             price,
//             productInfo.id,
//             productInfo.size,
//             item.qty
//         );
//     }
// }

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
    }

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

    filteredCatalog.forEach((element) => {
        catalogElement.innerHTML += cardTemplate(
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
}

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

function getProduct(id) {
    let findIndex = catalog.findIndex((item) => {
        return +id === item.id;
    })

    if (findIndex >= 0) {
        return catalog[findIndex];
    }

    return {};
}

let productInCart = (id, qty = 1) => {
    return {
        id: +id,
        qty: qty
    }
}

clearAllLink.addEventListener('click', (event) => {
    event.preventDefault();
    if (confirm('Вы уверены?')) {
        localStorage.setItem('cart', JSON.stringify([]));
        productsInCart = [];
        buildCartItems();
    }
});

// Хитрый способ динамически накладывать слушателей на динамически элементы
// называется "всплытие событий"
cartItems.addEventListener('click', (event) => {
    if (event.target.classList.contains('catalog-cart__delete-btn')) {
        let productId = event.target.dataset.productId;

        let findIndex = productsInCart.findIndex((item) => {
            return +productId === item.id;
        })

        let product = productsInCart[findIndex];

        if (product.qty > 1) {
            product.qty--;
        } else {
            productsInCart.splice(findIndex, 1);
        }

        localStorage.setItem('cart', JSON.stringify(productsInCart));
        buildCartItems();
    }
});

catalogElement.addEventListener('click', (event) => {
    if (event.target.classList.contains('catalog-card__btn')) {
        let productId = event.target.dataset.productId;
        let findIndex = productsInCart.findIndex((item) => {
            return +productId === item.id;
        })

        if (findIndex < 0) {
            productsInCart.push(productInCart(productId));
        } else {
            ++productsInCart[findIndex].qty;
        }

        localStorage.setItem('cart', JSON.stringify(productsInCart));
        buildCartItems();
    }
})

function init() {
    let itemsInLocaleStorage;

    if (localStorage.getItem('cart')) {
        itemsInLocaleStorage = JSON.parse(localStorage.getItem('cart'));
    }


    if (itemsInLocaleStorage) {
        productsInCart = [...productsInCart, ...itemsInLocaleStorage];
    }

    buildCatalog();
    buildCartItems();
}