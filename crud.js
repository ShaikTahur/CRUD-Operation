function saveToLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function getFromLocalStorage(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
}

function handleFormSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    const orderForm = document.getElementById('orderForm');
    const editIndex = orderForm.dataset.editIndex;

    const orders = getFromLocalStorage('orders');

    if (editIndex !== undefined) {
        orders[editIndex] = data;
        delete orderForm.dataset.editIndex;
    } else {
        orders.push(data);
    }

    saveToLocalStorage('orders', orders);

    console.log('Order updated:', data);
    console.log('All orders:', getFromLocalStorage('orders'));

    event.target.reset();
    displayOrders();
}

function handleDeleteOrder(orderIndex) {
    const orders = getFromLocalStorage('orders');
    if (orderIndex >= 0 && orderIndex < orders.length) {
        orders.splice(orderIndex, 1);
        saveToLocalStorage('orders', orders);

        console.log('Order deleted at index:', orderIndex);
        console.log('Updated orders:', getFromLocalStorage('orders'));

        displayOrders();
    } else {
        console.error('Invalid index for deletion');
    }
}

function handleEditOrder(orderIndex) {
    const orders = getFromLocalStorage('orders');
    const order = orders[orderIndex];

    document.getElementById('inputEmail4').value = order.email;
    document.getElementById('inputPhone').value = order.phone;
    document.getElementById('inputAddress').value = order.address;
    document.getElementById('inputAddress2').value = order.address2 || '';
    document.getElementById('inputCity').value = order.city;
    document.getElementById('inputState').value = order.state;
    document.getElementById('inputFish').value = order.orderFish;
    document.getElementById('inputQuantity').value = order.quantity;

    const orderForm = document.getElementById('orderForm');
    orderForm.dataset.editIndex = orderIndex;
}

function displayOrders() {
    const orders = getFromLocalStorage('orders');
    const orderList = document.getElementById('orderList');
    orderList.innerHTML = '';

    orders.forEach((order, index) => {
        orderList.innerHTML += `
            <div>
                <p>Email: ${order.email}</p>
                <p>Phone: ${order.phone}</p>
                <p>Address: ${order.address}</p>
                <p>Address 2: ${order.address2}</p>
                <p>City: ${order.city}</p>
                <p>State: ${order.state}</p>
                <p>Order Fish: ${order.orderFish}</p>
                <p>Quantity: ${order.quantity} kg</p>
                <button onclick="handleEditOrder(${index})" class="btn btn-warning">Edit</button>
                <button onclick="handleDeleteOrder(${index})" class="btn btn-danger">Delete</button>
                <hr/>
            </div>
        `;
    });
}

window.onload = () => {
    displayOrders();
};
