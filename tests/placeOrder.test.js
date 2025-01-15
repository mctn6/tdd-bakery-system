const placeOrder = require('../src/placeOrder');

describe('placeOrder Function', () => {
    it('should confirm an order when inventory is sufficient', () => {
        const result = placeOrder('cookies', 12, { cookies: 20 });
        expect(result).toEqual('Order confirmed!');
    });

    it('should suggest an alternative when inventory is low', () => {
        const result = placeOrder('muffins', 10, { muffins: 5 });
        expect(result).toEqual('Only 5 muffins available. Would you like those instead?');
    });

    it('should inform when the item is out of stock', () => {
        const result = placeOrder('donuts', 5, { donuts: 0 });
        expect(result).toEqual('Sorry, out of stock.');
    });
});