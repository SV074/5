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

let productInCart = (id, title, size, price, imgSrc, count = 1) => {
    
    return {
        id: +id,
        title: title,
        size: size, 
        price: price,
        imgSrc: imgSrc,
        count: count
    }
}


for (let i = 0; i <= pushToCartButtons.length; i++) {
    let item = pushToCartButtons[i];
    if (item) {
        item.addEventListener('click', (event) => {
            let productId = event.target.dataset.productId;
            let product = getProduct(productId); 
            let findIndex = productsInCart.findIndex((item) => {
                return +productId === item.id;
            })
            if (findIndex < 0) {
                productsInCart.push(productInCart(productId, product.title, product.size, product.price, product.imgSrc, product.count));
            } else {
                productsInCart[findIndex].count++;
            }

            localStorage.setItem('cart', JSON.stringify(productsInCart));
        })
    }
}

function getProduct(id) {
    let findIndex = catalog.findIndex((item) => {
        return +id === item.id;
    })

    if(findIndex >= 0) {
        return catalog[findIndex];
    }
    return {};
}




