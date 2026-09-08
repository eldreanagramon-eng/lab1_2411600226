// ============================================
// FILTER MANAGER - Filtering and Search
// ============================================

const FilterManager = {
    currentFilters: {
        category: 'all',
        stockStatus: 'all',
        priceMin: null,
        priceMax: null,
        searchQuery: ''
    },

    initFilters() {
        const categoryFilter = document.getElementById('categoryFilter');
        const categories = DataManager.getCategories();

        categories.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat;
            option.textContent = cat;
            categoryFilter.appendChild(option);
        });

        document.getElementById('applyFiltersBtn').addEventListener('click', () => {
            this.applyFilters();
        });

        document.getElementById('resetFiltersBtn').addEventListener('click', () => {
            this.resetFilters();
        });

        document.getElementById('searchInput').addEventListener('input', (e) => {
            let searchTimeout;
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                this.currentFilters.searchQuery = e.target.value.trim();
                this.applyFilters();
            }, 300);
        });
    },

    applyFilters() {
        const category = document.getElementById('categoryFilter').value;
        const stockStatus = document.getElementById('stockFilter').value;
        const priceMin = parseFloat(document.getElementById('priceMin').value) || null;
        const priceMax = parseFloat(document.getElementById('priceMax').value) || null;

        this.currentFilters.category = category;
        this.currentFilters.stockStatus = stockStatus;
        this.currentFilters.priceMin = priceMin;
        this.currentFilters.priceMax = priceMax;

        let products = DataManager.getProducts();

        if (category !== 'all') {
            products = DataManager.getProductsByCategory(category);
        }

        if (stockStatus !== 'all') {
            products = DataManager.getProductsByStockStatus(stockStatus);
        }

        if (priceMin !== null || priceMax !== null) {
            products = DataManager.getProductsByPriceRange(priceMin, priceMax);
        }

        if (this.currentFilters.searchQuery) {
            products = DataManager.searchProducts(this.currentFilters.searchQuery);
        }

        this.updateTable(products);
        this.updateStatistics(products);
        this.updateProductCount(products.length);
        this.checkLowStockAlerts(products);
        this.updateChartsWithFilteredData(products);
    },

    resetFilters() {
        document.getElementById('categoryFilter').value = 'all';
        document.getElementById('stockFilter').value = 'all';
        document.getElementById('priceMin').value = '';
        document.getElementById('priceMax').value = '';
        document.getElementById('searchInput').value = '';

        this.currentFilters = {
            category: 'all',
            stockStatus: 'all',
            priceMin: null,
            priceMax: null,
            searchQuery: ''
        };

        this.applyFilters();
    },

    updateTable(products) {
        const tbody = document.getElementById('inventoryBody');
        tbody.innerHTML = '';

        if (products.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="7" class="text-center text-muted py-4">
                        <i class="fas fa-search fa-2x d-block mb-2"></i>
                        No products found.
                    </td>
                </tr>
            `;
            return;
        }

        products.forEach(product => {
            const row = document.createElement('tr');
            const totalValue = product.quantity * product.price;
            const isLowStock = product.quantity <= product.reorderLevel && product.quantity > 0;

            let statusClass = 'in-stock';
            let statusText = 'In Stock';
            if (product.quantity === 0) {
                statusClass = 'out-of-stock';
                statusText = 'Out of Stock';
            } else if (isLowStock) {
                statusClass = 'low-stock';
                statusText = 'Low Stock';
            }

            row.className = isLowStock ? 'low-stock' : '';

            row.innerHTML = `
                <td><span class="text-muted">${product.sku}</span></td>
                <td><strong>${product.name}</strong></td>
                <td>${product.category}</td>
                <td>${product.quantity}</td>
                <td>₱${product.price.toFixed(2)}</td>
                <td>₱${totalValue.toFixed(2)}</td>
                <td><span class="status-badge ${statusClass}">${statusText}</span></td>
            `;

            tbody.appendChild(row);
        });
    },

    updateStatistics(products) {
        const totalProducts = products.length;
        const totalValue = products.reduce((sum, p) => sum + (p.quantity * p.price), 0);
        const lowStock = products.filter(p => p.quantity <= p.reorderLevel && p.quantity > 0).length;
        const categories = [...new Set(products.map(p => p.category))].length;

        document.getElementById('totalProducts').textContent = totalProducts;
        document.getElementById('totalValue').textContent = '₱' + totalValue.toLocaleString();
        document.getElementById('lowStockCount').textContent = lowStock;
        document.getElementById('categoryCount').textContent = categories;
    },

    updateProductCount(count) {
        document.getElementById('productCount').textContent = count + ' items';
    },

    checkLowStockAlerts(products) {
        const lowStockProducts = products.filter(p => p.quantity <= p.reorderLevel && p.quantity > 0);
        const outOfStockProducts = products.filter(p => p.quantity === 0);
        const alertEl = document.getElementById('lowStockAlert');
        const messageEl = document.getElementById('lowStockMessage');

        if (lowStockProducts.length > 0 || outOfStockProducts.length > 0) {
            alertEl.classList.remove('d-none');
            let message = '';
            if (lowStockProducts.length > 0) {
                message += `${lowStockProducts.length} item(s) running low on stock. `;
            }
            if (outOfStockProducts.length > 0) {
                message += `${outOfStockProducts.length} item(s) are out of stock!`;
            }
            messageEl.textContent = message;
        } else {
            alertEl.classList.add('d-none');
        }
    },

    updateChartsWithFilteredData(products) {
        const categories = [...new Set(products.map(p => p.category))];
        const categorySummary = categories.map(cat => {
            const filtered = products.filter(p => p.category === cat);
            const totalValue = filtered.reduce((sum, p) => sum + (p.quantity * p.price), 0);
            return { category: cat, totalValue };
        });

        const inStock = products.filter(p => p.quantity > p.reorderLevel).length;
        const lowStock = products.filter(p => p.quantity <= p.reorderLevel && p.quantity > 0).length;
        const outOfStock = products.filter(p => p.quantity === 0).length;

        if (ChartManager.categoryChart) {
            ChartManager.categoryChart.data.labels = categorySummary.map(s => s.category);
            ChartManager.categoryChart.data.datasets[0].data = categorySummary.map(s => s.totalValue);
            ChartManager.categoryChart.update();
        }

        if (ChartManager.stockStatusChart) {
            ChartManager.stockStatusChart.data.datasets[0].data = [inStock, lowStock, outOfStock];
            ChartManager.stockStatusChart.update();
        }
    }
};