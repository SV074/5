window.onload = function() {
    window.setInterval(function() {
        var now = new Date();
        var clock = document.getElementById('clock');
        clock.innerHTML = now.toLocaleTimeString();
    },1000);
    
};

// let friends = ['vil', 'alex', 'ilyia', 'ivan', 'sergei', 'dima', 'evgen'];



// friends.unshift('andrei');


// console.log(friends);

let styles = ['Джаз', 'Блюз'];
console.log(styles);

styles.push('Рок-н-ролл');
console.log(styles);

styles[Math.floor((styles.length - 1) / 2)] = "Классика";
console.log(styles);

alert(styles.shift());

styles.unshift('Рэгги');
styles.unshift('Рэп');
console.log(styles);

function sumInput() {

    let numbers = [];

    while(true) {

        let value = prompt('Введите число', 0);

        //Прекращаем ввод 

        if(value === "" || value === null || !isFinite(value)) break ;

        numbers.push(+value);
    }

    let sum = 0;

    for(let number of numbers) {
        sum+=number;
    }
    return sum;
}

alert(sumInput());
