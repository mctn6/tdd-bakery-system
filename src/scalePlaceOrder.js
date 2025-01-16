function scalePlaceOrder(item, quantity, inventory, isLoyalCustomer = false, paymentSuccessful = true) {
    // Check if the item is in stock
    if (!inventory[item] || inventory[item] <= 0) {
        return 'Sorry, out of stock.';
    }

    // Apply bulk discount for loyal customers
    let finalQuantity = quantity;
    if (isLoyalCustomer && quantity >= 10) {
        finalQuantity = Math.floor(quantity * 0.9); // 10% discount for loyal customers
    }

    // Check if inventory can fulfill the order
    if (inventory[item] >= finalQuantity) {
        if (!paymentSuccessful) {
            return 'Payment failed. Please try again.';
        }
        inventory[item] -= finalQuantity; // Update inventory
        return `Order confirmed for ${finalQuantity} ${item}!`;
    } else {
        return `Only ${inventory[item]} ${item} available. Would you like those instead?`;
    }
}

module.exports = scalePlaceOrder;