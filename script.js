let categories = document.getElementById('categories');
let products = document.getElementById('products');
let productInfo = document.getElementById('product-info');
let orderForm = document.getElementById('order-form');
let confirmOrderButton = document.querySelector('#order-form button');
let orderInfoContainer = document.getElementById('order-info');
let orderData = {};

let categoryData = [
    { id: 1, name: 'Категорія 1' },
    { id: 2, name: 'Категорія 2' },
];

let productData = [
    { id: 1, name: 'Товар 1', categoryId: 1, description: 'Опис товару 1' },
    { id: 2, name: 'Товар 2', categoryId: 1, description: 'Опис товару 2' },
    { id: 3, name: 'Товар 3', categoryId: 2, description: 'Опис товару 3' },
];

function displayCategories() {
    categories.innerHTML = '';
    categoryData.forEach(category => {
        let categoryElement = document.createElement('div');
        categoryElement.textContent = category.name;
        categoryElement.addEventListener('click', () => {
            displayProducts(category.id);
        });
        categories.appendChild(categoryElement);
    });
}

function displayProducts(categoryId) {
    products.innerHTML = '';
    let productsInCategory = productData.filter(product => product.categoryId === categoryId);
    productsInCategory.forEach(product => {
        let productElement = document.createElement('div');
        productElement.textContent = product.name;
        productElement.addEventListener('click', () => {
            displayProductInfo(product);
        });
        products.appendChild(productElement);
    });
}

function displayProductInfo(product) {
    productInfo.innerHTML = '';
    let productInfoElement = document.createElement('div');
    productInfoElement.innerHTML = `
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        <button id="buy-button">Купити</button>
    `;
    let buyButton = productInfoElement.querySelector('#buy-button');
    buyButton.addEventListener('click', () => {
        displayOrderForm(product);
    });
    productInfo.appendChild(productInfoElement);
}

function displayOrderForm(product) {
    orderForm.style.display = 'block';

    confirmOrderButton.addEventListener('click', () => {
        validateAndSubmitOrder(product);
    });
}

function validateAndSubmitOrder(product) {
    let name = document.getElementById('name').value;
    let city = document.getElementById('city').value;
    let novaPoshta = document.getElementById('novaPoshta').value;
    let payment = document.getElementById('payment').value;
    let quantity = document.getElementById('quantity').value;

    if (!name || !city || !novaPoshta || !payment || !quantity) {
        alert('Будь ласка, заповніть всі обовязкові поля.');
        return;
    }

    orderData = {
        product: product.name,
        price: 1000,
        name: name,
        city: city,
        novaPoshta: novaPoshta,
        payment: payment,
        quantity: quantity,
        comment: document.getElementById('comment').value,
    };

    displayOrderInfo();
}

function displayOrderInfo() {
    
    orderInfoContainer.innerHTML = '';

    let orderInfoElement = document.createElement('div');
    orderInfoElement.innerHTML = `
        <h3>Інформація про замовлення</h3>
        <p><strong>Товар:</strong> ${orderData.product}</p>
        <p><strong>Ціна:</strong> ${orderData.price} грн</p>
        <p><strong>ПІБ покупця:</strong> ${orderData.name}</p>
        <p><strong>Місто:</strong> ${orderData.city}</p>
        <p><strong>Склад Нової пошти:</strong> ${orderData.novaPoshta}</p>
        <p><strong>Спосіб оплати:</strong> ${orderData.payment}</p>
        <p><strong>Кількість товару:</strong> ${orderData.quantity}</p>
        <p><strong>Коментар:</strong> ${orderData.comment || 'Немає'}</p>
    `;

    orderInfoContainer.appendChild(orderInfoElement);

    let orderForm = document.getElementById('order-form');
    orderForm.style.display = 'none';
}

displayCategories();
