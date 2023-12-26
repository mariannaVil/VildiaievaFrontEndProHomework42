const categories = document.getElementById('categories');
const products = document.getElementById('products');
const productInfo = document.getElementById('product-info');
const orderForm = document.getElementById('order-form');
const confirmOrderButton = document.querySelector('#order-form button');
const orderInfoContainer = document.getElementById('order-info');
let orderData = {};
const myOrdersButton = document.getElementById('my-orders-button');
const userOrdersContainer = document.getElementById('user-orders-list');
const userOrdersBlock = document.getElementById('user-orders');

const categoryData = [
    { id: 1, name: 'Категорія 1' },
    { id: 2, name: 'Категорія 2' },
];

const productData = [
    { id: 1, name: 'Товар 1', categoryId: 1, description: 'Опис товару 1' },
    { id: 2, name: 'Товар 2', categoryId: 1, description: 'Опис товару 2' },
    { id: 3, name: 'Товар 3', categoryId: 2, description: 'Опис товару 3' },
];

function displayCategories() {
    categories.innerHTML = '';
    categoryData.forEach(category => {
        const categoryElement = document.createElement('div');
        categoryElement.textContent = category.name;
        categoryElement.addEventListener('click', () => {
            displayProducts(category.id);
        });
        categories.appendChild(categoryElement);
    });
}

function displayProducts(categoryId) {
    products.innerHTML = '';
    const productsInCategory = productData.filter(product => product.categoryId === categoryId);
    productsInCategory.forEach(product => {
        const productElement = document.createElement('div');
        productElement.textContent = product.name;
        productElement.addEventListener('click', () => {
            displayProductInfo(product);
        });
        products.appendChild(productElement);
    });
}

function displayProductInfo(product) {
    productInfo.innerHTML = '';
    const productInfoElement = document.createElement('div');
    productInfoElement.innerHTML = `
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        <button id="buy-button">Купити</button>
    `;
    const buyButton = productInfoElement.querySelector('#buy-button');
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
    const name = document.getElementById('name').value;
    const city = document.getElementById('city').value;
    const novaPoshta = document.getElementById('novaPoshta').value;
    const payment = document.getElementById('payment').value;
    const quantity = document.getElementById('quantity').value;

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

    saveOrder(orderData);

    displayOrderInfo();
}

function saveOrder(order) {
    const savedOrders = JSON.parse(localStorage.getItem('userOrders')) || [];

    savedOrders.push({
        date: new Date().toLocaleString(),
        ...order
    });

    localStorage.setItem('userOrders', JSON.stringify(savedOrders));
}

function displayOrderInfo() {
    
    orderInfoContainer.innerHTML = '';

    const orderInfoElement = document.createElement('div');
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

    orderForm.style.display = 'none';
}

myOrdersButton.addEventListener('click', () => {
    categories.style.display = 'none';
    orderForm.style.display = 'none';

    userOrdersBlock.style.display = 'block';

    displayUserOrders();
});

function displayUserOrders() {
    const savedOrders = JSON.parse(localStorage.getItem('userOrders')) || [];

    userOrdersContainer.innerHTML = '';

    if (savedOrders.length > 0) {
        savedOrders.forEach(order => {
            const orderElement = document.createElement('div');
            orderElement.innerHTML = `
                <p>Дата: ${order.date}</p>
                <p>Ціна: ${order.price} грн</p>
                <button class="view-order-details" data-order='${JSON.stringify(order)}'>Деталі</button>
                <button class="delete-order" data-order='${JSON.stringify(order)}'>Видалити</button>
            `;
            userOrdersContainer.appendChild(orderElement);
        });

        document.querySelectorAll('.view-order-details').forEach(button => {
            button.addEventListener('click', (event) => {
                const order = JSON.parse(event.target.getAttribute('data-order'));
                displayOrderDetails(order);
            });
        });

        document.querySelectorAll('.delete-order').forEach(button => {
            button.addEventListener('click', (event) => {
                const order = JSON.parse(event.target.getAttribute('data-order'));
                deleteOrder(order);
            });
        });
    } else {
        userOrdersContainer.innerHTML = '<p>У вас немає замовлень.</p>';
    }

    userOrdersBlock.style.display = 'block';
}

function displayOrderDetails(order) {
    const orderDetailsContainer = document.getElementById('order-info');
    
    orderDetailsContainer.innerHTML = '';

    const orderDetailsElement = document.createElement('div');
    orderDetailsElement.innerHTML = `
        <h3>Деталі замовлення</h3>
        <p><strong>Товар:</strong> ${order.product}</p>
        <p><strong>Ціна:</strong> ${order.price} грн</p>
        <p><strong>ПІБ покупця:</strong> ${order.name}</p>
        <p><strong>Місто:</strong> ${order.city}</p>
        <p><strong>Склад Нової пошти:</strong> ${order.novaPoshta}</p>
        <p><strong>Спосіб оплати:</strong> ${order.payment}</p>
        <p><strong>Кількість товару:</strong> ${order.quantity}</p>
        <p><strong>Коментар:</strong> ${order.comment || 'Немає'}</p>
    `;

    orderDetailsContainer.appendChild(orderDetailsElement);
}

function deleteOrder(order) {
    const savedOrders = JSON.parse(localStorage.getItem('userOrders')) || [];

    const updatedOrders = savedOrders.filter(savedOrder => savedOrder.date !== order.date);

    localStorage.setItem('userOrders', JSON.stringify(updatedOrders));

    displayUserOrders();
}

displayCategories();
