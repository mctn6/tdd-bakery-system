const placeOrder = require('../src/scalePlaceOrder');

describe('placeOrder Function', () => {
    let inventory;

    beforeEach(() => {
        // Reset inventory before each test
        inventory = { cookies: 20, muffins: 15, donuts: 0 };
    });

    // Existing test cases
    it('should confirm an order when inventory is sufficient', () => {
        const result = placeOrder('cookies', 12, inventory);
        expect(result).toEqual('Order confirmed for 12 cookies!');
    });

    it('should suggest an alternative when inventory is low', () => {
        const result = placeOrder('muffins', 20, inventory);
        expect(result).toEqual('Only 15 muffins available. Would you like those instead?');
    });

    it('should inform when the item is out of stock', () => {
        const result = placeOrder('donuts', 5, inventory);
        expect(result).toEqual('Sorry, out of stock.');
    });

    // New test cases for bulk discounts
    it('should apply a 10% discount for loyal customers on bulk orders', () => {
        const result = placeOrder('cookies', 10, inventory, true);
        expect(result).toEqual('Order confirmed for 9 cookies!'); // 10% discount applied
    });

    it('should not apply a discount for non-loyal customers', () => {
        const result = placeOrder('cookies', 10, inventory, false);
        expect(result).toEqual('Order confirmed for 10 cookies!'); // No discount
    });

    // New test cases for handling simultaneous orders
    it('should update inventory correctly for simultaneous orders', () => {
        placeOrder('cookies', 5, inventory); // First order
        const result = placeOrder('cookies', 10, inventory); // Second order
        expect(result).toEqual('Order confirmed for 10 cookies!');
        expect(inventory.cookies).toBe(5); // 20 - 5 - 10 = 5
    });

    it('should reject orders if inventory is insufficient after simultaneous orders', () => {
        placeOrder('cookies', 15, inventory); // First order
        const result = placeOrder('cookies', 10, inventory); // Second order
        expect(result).toEqual('Only 5 cookies available. Would you like those instead?');
    });

    // New test cases for payment processing
    it('should confirm an order if payment is successful', () => {
        const result = placeOrder('cookies', 5, inventory, false, true);
        expect(result).toEqual('Order confirmed for 5 cookies!');
    });

    it('should reject an order if payment fails', () => {
        const result = placeOrder('cookies', 5, inventory, false, false);
        expect(result).toEqual('Payment failed. Please try again.');
    });
});