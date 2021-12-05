function cart(elementID) {
    const cartConatiner = document.querySelector(elementID);
    const productsContainer = cartConatiner.querySelector('.cart-body');
    const noItemsMsg = productsContainer.querySelector('.no-items');
    const productElements = Array.from(productsContainer.children)
    .filter(child => child.classList.contains('product'));

    const productsData = productElements.map(product => {
        const productName = product.querySelector('.product-name').innerText;
        const productQty = +product.querySelector('.product-qty').value;
        const productPrice = +product.querySelector('.product-price').innerText;
        return {
            productName,
            productQty,
            productPrice,
        };
    })

    outputTotal();

    function updateProducts(event) {
            const productChanged = event.target.closest('.product')
            const productChangedName = productChanged.querySelector('.product-name').innerText;
            const newQty = + event.target.value;
            const productToChangeData = productsData.find(product => product.productName === productChangedName);
            productToChangeData.productQty = newQty

            if(newQty === 0){
                removeProduct(productChanged, productToChangeData);
            } 

            if(productsData.length === 0){
                noItemsMsg.classList.remove('d-none');
            }
    }

    function removeProduct(product, productData) {
        product.remove();
        const productIdx = productsData.indexOf(productData)
        productsData.splice(productIdx, 1);
    }

    function calcTotal() {
        const total = productsData.reduce((sum,product) => {
            const productTotal = product.productQty * product.productPrice;
            return sum + productTotal;
        },0)

        return total;
    }

    function outputTotal() {
        const total = calcTotal();
        
        cartConatiner.querySelector('#total').innerText = `$ ${total}`
    }

    productsContainer.addEventListener('input', e => {
        updateProducts(e);
        outputTotal();
    })
}

