const form = document.getElementById("checkout-form")

form.addEventListener("submit", function(e) {
    e.preventDefault()

    const name = document.getElementById("name").value
    const phone = document.getElementById("phone").value
    const address = document.getElementById("address").value

    const cart = JSON.parse(localStorage.getItem("cart")) || []

    if (cart.length === 0) {
        alert("Seu carrinho está vazio!")
        return
    }

    let message = `📚 *Novo Pedido - Leitura Viva*%0A%0A`
    message += `👤 Nome: ${name}%0A`
    message += `📞 Número: ${phone}%0A`
    message += `📍 Localização: ${address}%0A%0A`

    message += `🛒 *Itens:*%0A`

    let total = 0

    cart.forEach(item => {
        const subtotal = item.price * item.quantity
        total += subtotal

        message += `- ${item.name} x${item.quantity} = ${subtotal} kz%0A`
    })

    message += `%0A💰 Total: ${total} kz`

    const whatsappURL = `https://wa.me/244930793980?text=${message}`

    window.open(whatsappURL, "_blank")
})