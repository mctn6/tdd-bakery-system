function placeOrder(item, quantity, inventory) {
    if (inventory[item] >= quantity) return 'Order confirmed!';
    if (inventory[item] > 0) return `Only ${inventory[item]} ${item} available. Would you like those instead?`;
    return 'Sorry, out of stock.';
}

module.exports = placeOrder;