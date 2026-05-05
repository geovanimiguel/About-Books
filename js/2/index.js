const buttons = document.querySelectorAll(".add-to-cart")

let cart = JSON.parse(localStorage.getItem("cart")) || []

buttons.forEach(button => { 
    button.addEventListener("click", () => {
        const id = button.dataset.id
        const name = button.dataset.name
        const price = Number(button.dataset.price)

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
        button.textContent = "Adicionado ✔"

        localStorage.setItem("cart", JSON.stringify(cart))

        updateCartCount() // 🔥 atualiza na hora
    })
})
