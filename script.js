document.addEventListener('DOMContentLoaded', () => {
        const mainView = document.getElementById('mainView');
        const cartView = document.getElementById('cartView');
        const paymentView = document.getElementById('paymentView');

        const mainImageDiv = document.getElementById('mainImage');
        const mainImage = mainImageDiv.querySelector('img');
        const thumbnails = document.querySelectorAll('.thumbnail');
        const productNarration = document.getElementById('productNarration');
        const quantityInput = document.getElementById('quantity');
        const increaseQtyBtn = document.getElementById('increaseQty');
        const decreaseQtyBtn = document.getElementById('decreaseQty');
        const addToCartBtn = document.getElementById('addToCart');
        const cartItemsDiv = document.getElementById('cartItems');
        const totalCostSpan = document.getElementById('totalCost');
        const checkoutBtn = document.getElementById('checkout');
        const submitPaymentBtn = document.getElementById('submitPayment');
        const customerEmailInput = document.getElementById('customerEmail');
        const uploadReceiptInput = document.getElementById('uploadReceipt');
        const backToMainBtn = document.getElementById('backToMain');
        const backToCartBtn = document.getElementById('backToCart');

        let cartItems = [];

        function updateMainImage(src, price, narration) {
            mainImage.src = src;
            mainImage.setAttribute('data-price', price);
            productNarration.textContent = narration;
        }

        function renderCartItems() {
            cartItemsDiv.innerHTML = '';
            let totalCost = 0;
            cartItems.forEach((item, index) => {
                totalCost += item.price * item.quantity;
                const cartItemDiv = document.createElement('div');
                cartItemDiv.classList.add('cart-item');
                cartItemDiv.innerHTML = `
                    <span>${item.narration}</span>
                    <span>₦${item.price}</span>
                    <span>Qty: ${item.quantity}</span>
                    <span class="remove-item" data-index="${index}">Remove</span>
                `;
                cartItemsDiv.appendChild(cartItemDiv);
            });
            totalCostSpan.textContent = totalCost;
        }

        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', () => {
                const thumbnailSrc = thumbnail.getAttribute('data-src');
                const thumbnailPrice = thumbnail.getAttribute('data-price');
                const narration = thumbnail.getAttribute('data-narration');
                updateMainImage(thumbnailSrc, thumbnailPrice, narration);
            });
        });

        increaseQtyBtn.addEventListener('click', () => {
            quantityInput.value = parseInt(quantityInput.value) + 1;
        });

        decreaseQtyBtn.addEventListener('click', () => {
            if (quantityInput.value > 1) {
                quantityInput.value = parseInt(quantityInput.value) - 1;
            }
        });

        addToCartBtn.addEventListener('click', () => {
            const item = {
                src: mainImage.src,
                price: parseInt(mainImage.getAttribute('data-price')),
                quantity: parseInt(quantityInput.value),
                narration: productNarration.textContent
            };
            cartItems.push(item);
            alert('Item added to cart');
            renderCartItems();
            mainView.classList.remove('active');
            cartView.classList.add('active');
        });

        cartItemsDiv.addEventListener('click', (event) => {
            if (event.target.classList.contains('remove-item')) {
                const index = event.target.getAttribute('data-index');
                cartItems.splice(index, 1);
                renderCartItems();
            }
        });

        checkoutBtn.addEventListener('click', () => {
            cartView.classList.remove('active');
            paymentView.classList.add('active');
        });

        submitPaymentBtn.addEventListener('click', () => {
            const customerEmail = customerEmailInput.value;
            if (!customerEmail) {
                alert('Please enter your email');
                return;
            }

            let totalCost = 0;
            let emailBody = "Items in cart:\n\n";
            cartItems.forEach(item => {
                totalCost += item.price * item.quantity;
                emailBody += `Product: ${item.narration}\nPrice: ₦${item.price}\nQuantity: ${item.quantity}\nImage: ${item.src}\n\n`;
            });
            emailBody += `Total Cost: ₦${totalCost}`;

            const mailtoLink = `mailto:mondaykingsley80@gmail.com,${customerEmail}?subject=Cart Items&body=${encodeURIComponent(emailBody)}`;
            window.location.href = mailtoLink;
        });

        backToMainBtn.addEventListener('click', () => {
            cartView.classList.remove('active');
            mainView.classList.add('active');
        });

        backToCartBtn.addEventListener('click', () => {
            paymentView.classList.remove('active');
            cartView.classList.add('active');
        });

        mainView.classList.add('active');
    });
    
    
    







