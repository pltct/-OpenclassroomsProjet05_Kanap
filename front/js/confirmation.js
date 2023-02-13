const orderId = getOrderId()
displayOrderId(orderId)
removeLocalStorageCache()

function getOrderId() {
    let params = (new URL(document.location)).searchParams;
    let orderId = params.get('orderId');
    return orderId
}

function displayOrderId(orderId) {
    const orderIdElement = document.querySelector ("#orderId");
    orderIdElement.innerText = orderId
}

function removeLocalStorageCache() {
    localStorage.clear()
}