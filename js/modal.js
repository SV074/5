let modal = document.getElementById('modal');
let bntmodal = document.getElementById('btn-modal');
let closemodal = document.getElementsByClassName('modal__close')[0];

bntmodal.onclick = function() {
    modal.style.display = 'block';
}

closemodal.onclick = function() {
    modal.style.display = 'none';
}

window.onclick = function(event) {
    if(event.target == modal ) {
        modal.style.display = 'none';
    }
}