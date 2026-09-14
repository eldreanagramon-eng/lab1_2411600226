// ============================================
// DATA MANAGER - Inventory Data Management
// ============================================

const DataManager = {
    // Sample product data
    products: [
        { id: 1, sku: 'SKU-001', name: 'Premium Dumbbell Set', category: 'Weights', quantity: 25, price: 1499.99, reorderLevel: 10 },
        { id: 2, sku: 'SKU-002', name: 'Yoga Mat Pro', category: 'Yoga', quantity: 8, price: 799.00, reorderLevel: 15 },
        { id: 3, sku: 'SKU-003', name: 'Resistance Bands Kit', category: 'Accessories', quantity: 42, price: 599.00, reorderLevel: 20 },
        { id: 4, sku: 'SKU-004', name: 'Adjustable Bench', category: 'Weights', quantity: 5, price: 2999.00, reorderLevel: 5 },
        { id: 5, sku: 'SKU-005', name: 'Jump Rope', category: 'Cardio', quantity: 30, price: 299.00, reorderLevel: 15 },
        { id: 6, sku: 'SKU-006', name: 'Kettlebell 16kg', category: 'Weights', quantity: 12, price: 1299.00, reorderLevel: 10 },
        { id: 7, sku: 'SKU-007', name: 'Foam Roller', category: 'Recovery', quantity: 3, price: 499.00, reorderLevel: 10 },
        { id: 8, sku: 'SKU-008', name: 'Training Gloves', category: 'Accessories', quantity: 18, price: 349.00, reorderLevel: 20 },
        { id: 9, sku: 'SKU-009', name: 'Treadmill T300', category: 'Cardio', quantity: 2, price: 14999.00, reorderLevel: 3 },
        { id: 10, sku: 'SKU-010', name: 'Push-up Stands', category: 'Accessories', quantity: 35, price: 399.00, reorderLevel: 15 },
        { id: 11, sku: 'SKU-011', name: 'Gym Ball', category: 'Yoga', quantity: 6, price: 699.00, reorderLevel: 10 },
        { id: 12, sku: 'SKU-012', name: 'Weight Lifting Belt', category: 'Accessories', quantity: 0, price: 899.00, reorderLevel: 10 }
    ],

    // Get all products
    getProducts() {
        return this.products;
    },

    // Get product by ID
    getProductById(id) {
        return this.products.find(p => p.id === id);
    },

    // Get categories
    getCategories() {
        const categories = [...new Set(this.products.map(p => p.category))];
        return categories.sort();
    },

    // Get products by category
    getProductsByCategory(category) {
        if (category === 'all') return this.products;
        return this.products.filter(p => p.category === category);
    },

    // Get products by stock status
    getProductsByStockStatus(status) {
        if (status === 'all') return this.products;
        return this.products.filter(p => {
            if (status === 'in-stock') return p.quantity > p.reorderLevel;
            if (status === 'low-stock') return p.quantity > 0 && p.quantity <= p.reorderLevel;
            if (status === 'out-of-stock') return p.quantity === 0;
            return true;
        });
    },

    // Get products by price range
    getProductsByPriceRange(min, max) {
        return this.products.filter(p => {
            const price = p.price;
            if (min && max) return price >= min && price <= max;
            if (min) return price >= min;
            if (max) return price <= max;
            return true;
        });
    },

    // Get low stock products
    getLowStockProducts() {
        return this.products.filter(p => p.quantity <= p.reorderLevel && p.quantity > 0);
    },

    // Get out of stock products
    getOutOfStockProducts() {
        return this.products.filter(p => p.quantity === 0);
    },

    // Get stock statistics
    getStockStatistics() {
        const totalProducts = this.products.length;
        const totalValue = this.products.reduce((sum, p) => sum + (p.quantity * p.price), 0);
        const lowStock = this.getLowStockProducts().length;
        const outOfStock = this.getOutOfStockProducts().length;
        const categories = this.getCategories().length;
        return { totalProducts, totalValue, lowStock, outOfStock, categories };
    },

    // Get category summary for charts
    getCategorySummary() {
        const categories = this.getCategories();
        return categories.map(cat => {
            const products = this.products.filter(p => p.category === cat);
            const totalValue = products.reduce((sum, p) => sum + (p.quantity * p.price), 0);
            const totalQuantity = products.reduce((sum, p) => sum + p.quantity, 0);
            return { category: cat, totalValue, totalQuantity, productCount: products.length };
        });
    },

    // Get stock status distribution for charts
    getStockStatusDistribution() {
        const inStock = this.products.filter(p => p.quantity > p.reorderLevel).length;
        const lowStock = this.getLowStockProducts().length;
        const outOfStock = this.getOutOfStockProducts().length;
        return { inStock, lowStock, outOfStock };
    },

    // Search products
    searchProducts(query) {
        if (!query) return this.products;
        const lowerQuery = query.toLowerCase();
        return this.products.filter(p =>
            p.name.toLowerCase().includes(lowerQuery) ||
            p.sku.toLowerCase().includes(lowerQuery) ||
            p.category.toLowerCase().includes(lowerQuery)
        );
    },

    // Update product quantity (simulate)
    updateQuantity(id, newQuantity) {
        const product = this.getProductById(id);
        if (product) {
            product.quantity = newQuantity;
            return true;
        }
        return false;
    }
};