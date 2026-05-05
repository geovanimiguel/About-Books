document.addEventListener('DOMContentLoaded', () => {

    const valores = document.querySelectorAll('.valor-item');

    console.log('Bolinhas encontradas:', valores.length);

    valores.forEach((item) => {

        item.addEventListener('click', () => {

            valores.forEach((el) => {
                el.classList.remove('active');
                el.setAttribute('aria-expanded', 'false');
            });

            item.classList.add('active');
            item.setAttribute('aria-expanded', 'true');

        });

    });

});