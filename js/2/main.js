function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || []

    let totalItems = 0

    cart.forEach(item => {
        totalItems += item.quantity
    })

    const countElement = document.getElementById("cart-count")

    if (countElement) {
        countElement.textContent = totalItems
    }
}

// 🔥 ISSO AQUI É O QUE TE FALTA
document.addEventListener("DOMContentLoaded", () => {
    updateCartCount()
})