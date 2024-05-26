let count = 0;
function counter() {
    setTimeout(() => {
        console.log(++count);
        counter();
    }, 1000);
}

counter();