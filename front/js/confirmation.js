
function getOrderId() {
    let params = (new URL(document.location)).searchParams;
    let orderId = params.get('orderId');
    return orderId;
}
const orderIdCommand = getOrderId();

function displayOrderId(orderId) {
    const orderIdElement = document.querySelector("#orderId");
    orderIdElement.innerText = orderId;
}
displayOrderId(orderIdCommand);

function removeLocalStorageCache() {
    localStorage.clear();
}
removeLocalStorageCache();
