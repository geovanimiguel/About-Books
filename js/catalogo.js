const buttons = document.querySelectorAll(".add-to-cart")

buttons.forEach(button => {
    button.addEventListener("click", () => {

        const id = button.dataset.id
        const name = button.dataset.name
        const price = Number(button.dataset.price)

        let cart = JSON.parse(localStorage.getItem("cart")) || []

        const existing = cart.find(item => item.id === id)

        if (existing) {
            existing.quantity++
        } else {
            cart.push({
                id,
                name,
                price,
                quantity: 1
            })
        }

        localStorage.setItem("cart", JSON.stringify(cart))

        // 🔥 feedback visual
        button.innerText = "Adicionado ✔️"
        button.disabled = true

        setTimeout(() => {
            button.innerText = "Adicionar ao Carrinho"
            button.disabled = false
        }, 1500)

        updateCartCount()
    })
})

function filterCategory(category) {

    const books = document.querySelectorAll(".book-card")

    books.forEach(book => {

        const bookCategory = book.dataset.category

        if (category === "all" || bookCategory === category) {
            book.style.display = "block"
        } else {
            book.style.display = "none"
        }

    })
}

const filterButtons = document.querySelectorAll("[data-filter]")
const books = document.querySelectorAll(".book-card")

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        const filter = button.dataset.filter

        books.forEach(book => {
            const category = book.dataset.category

            if (filter === "all" || filter === category) {
                book.style.display = "block"
            } else {
                book.style.display = "none"
            }
        })
    })
})