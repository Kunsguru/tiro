document.addEventListener("DOMContentLoaded", function() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.getElementById('mainImageSrc');
    const productNarration = document.getElementById('productNarration');
    const addToCartButton = document.getElementById('addToCart');
    const cart = document.getElementById('cart');

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            const imgSrc = thumbnail.querySelector('img').src;
            const narration = thumbnail.getAttribute('data-narration');
            const price = thumbnail.getAttribute('data-price');

            mainImage.src = imgSrc;
            mainImage.setAttribute('data-price', price);
            productNarration.textContent = narration;
        });
    });

    document.getElementById('increaseQty').addEventListener('click', function() {
        const quantityInput = document.getElementById('quantity');
        quantityInput.value = parseInt(quantityInput.value) + 1;
    });

    document.getElementById('decreaseQty').addEventListener('click', function() {
        const quantityInput = document.getElementById('quantity');
        if (quantityInput.value > 1) {
            quantityInput.value = parseInt(quantityInput.value) - 1;
        }
    });

    addToCartButton.addEventListener('click', function() {
        const quantity = document.getElementById('quantity').value;
        const price = mainImage.getAttribute('data-price');
        const narration = productNarration.textContent;
        const imgSrc = mainImage.src;

        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';

        const cartItemImg = document.createElement('img');
        cartItemImg.src = imgSrc;
        cartItem.appendChild(cartItemImg);

        const cartItemDescription = document.createElement('p');
        cartItemDescription.textContent = `${narration} - Quantity: ${quantity} - Price: ₦${price * quantity}`;
        cartItem.appendChild(cartItemDescription);

        cart.appendChild(cartItem);
    });
});
