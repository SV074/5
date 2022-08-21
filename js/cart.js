const cart = document.getElementById('cart');
const totalPriceEl = document.getElementById('total-price');
const btnClearCart = document.getElementById('btn-clear__cart');
let btnDeleteCard = document.getElementsByClassName('cart-delete');





function renderCart() {
    if(cart.length === 0) {
        cart.innerHTML = "Корзина пуста";
        // btnDeleteCard.disabled = true;
    } else {
        let cartHtml = JSON.parse(localStorage.getItem('cart1'));
        // btnDeleteCard.disabled = false;
        const template = (imgSrc, title, price, id, size) => {
            return  `<div class="catalog-cart">
                <img src="${imgSrc}" alt="${title}" class="catalog-cart__image">
                <h3 class="catalog-cart__title">${title}</h3>
            <div class="catalog-cart__content">
                <div class="catalog-cart__price" data-price>${price}</div>
                <div class="catalog-cart__number">${id}</div>
                <div class="catalog-cart__size">Размер:${size}</div>
                <div class="catalog-cart__counter" data-counter>Кол-во:1</div>
            </div>
            <button class="cart-delete" data-delete id="delete">X</button>
            </div>`
        };
    
        cartHtml.forEach((element) => {
            cart.innerHTML += template(
                element.imgSrc,
                element.title,
                element.price,
                element.id,
                element.size
            );
        });
    }
}

 renderCart();

function deleteProduct(id) {
    
    let cart = JSON.parse(localStorage.getItem('cart1'));
    
    let item = cart.findIndex(item => item.id == parseInt(id));
    console.log(item);
    let index = cart.indexOf(item);
    
    console.log(index);
    cart.splice(index, 1);
    
    localStorage.setItem('cart1', JSON.stringify(cart));
    
};

document.getElementById('delete').addEventListener('click', () => {
    
    deleteProduct();
    
    renderCart();
    
});








// btnClearCart.addEventListener('click', () => {
//     localStorage.clear();
//     cart.innerHTML = "Корзина пуста";
// });