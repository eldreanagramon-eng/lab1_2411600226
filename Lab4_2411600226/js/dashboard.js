// ============================================
// DASHBOARD - Main Application Logic
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('Dashboard loaded!');

    // ========================================
    // SESSION CHECK
    // ========================================
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
        window.location.href = 'index.html';
        return;
    }

    // ========================================
    // USER DISPLAY
    // ========================================
    const userName = localStorage.getItem('userName') || loggedInUser;
    const displayNameEl = document.getElementById('displayName');
    if (displayNameEl) displayNameEl.textContent = userName;

    // ========================================
    // GREETING
    // ========================================
    function getGreeting() {
        const hour = new Date().getHours();
        let greeting = 'Good Evening';
        if (hour < 12) greeting = 'Good Morning';
        else if (hour < 17) greeting = 'Good Afternoon';
        const greetingEl = document.getElementById('greetingMessage');
        if (greetingEl) greetingEl.textContent = `${greeting}, ${userName}! 👋`;
    }
    getGreeting();

    // ========================================
    // CURRENT DATE
    // ========================================
    const now = new Date();
    const dateEl = document.getElementById('currentDate');
    if (dateEl) {
        dateEl.textContent = now.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    }

    // ========================================
    // INITIALIZE DASHBOARD
    // ========================================
    try {
        if (typeof ChartManager !== 'undefined' && ChartManager.initCharts) {
            ChartManager.initCharts();
        } else {
            console.warn('ChartManager not loaded');
        }

        if (typeof FilterManager !== 'undefined' && FilterManager.initFilters) {
            FilterManager.initFilters();
            FilterManager.applyFilters();
        } else {
            console.warn('FilterManager not loaded');
        }

        console.log('Dashboard initialized successfully!');
    } catch (error) {
        console.error('Error initializing dashboard:', error);
    }

    // ========================================
    // EXPORT CSV
    // ========================================
    const exportBtn = document.getElementById('exportBtn');
    if (exportBtn) {
        exportBtn.addEventListener('click', function() {
            if (typeof DataManager === 'undefined') {
                alert('DataManager not loaded!');
                return;
            }
            const products = DataManager.getProducts();
            const headers = ['SKU', 'Product Name', 'Category', 'Quantity', 'Price', 'Total Value', 'Status'];

            const rows = products.map(p => {
                let status = 'In Stock';
                if (p.quantity === 0) status = 'Out of Stock';
                else if (p.quantity <= p.reorderLevel) status = 'Low Stock';

                return [
                    p.sku,
                    p.name,
                    p.category,
                    p.quantity,
                    p.price.toFixed(2),
                    (p.quantity * p.price).toFixed(2),
                    status
                ];
            });

            let csvContent = headers.join(',') + '\n';
            rows.forEach(row => {
                csvContent += row.join(',') + '\n';
            });

            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'inventory_export.csv';
            link.click();

            alert('CSV exported successfully!');
        });
    }

    // ========================================
    // LOGOUT
    // ========================================
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            console.log('Logging out...');
            localStorage.removeItem('loggedInUser');
            localStorage.removeItem('userName');
            window.location.href = 'index.html';
        });
    }

    // ========================================
    // ✅ SIDEBAR NAVIGATION - FIXED!
    // ========================================
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    console.log('Found sidebar items:', sidebarItems.length);

    if (sidebarItems.length === 0) {
        console.warn('No sidebar items found! Check your HTML.');
    }

    sidebarItems.forEach(function(item, index) {
        console.log('Adding click listener to item', index, item.textContent.trim());

        // Remove any existing listeners by cloning
        const newItem = item.cloneNode(true);
        item.parentNode.replaceChild(newItem, item);

        newItem.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            console.log('✅ Sidebar item clicked:', this.textContent.trim());

            // Remove active from all
            document.querySelectorAll('.sidebar-item').forEach(function(i) {
                i.classList.remove('active');
            });

            // Add active to clicked
            this.classList.add('active');

            // Show alert for demo
            alert('You clicked: ' + this.textContent.trim());
        });
    });

    // ========================================
    // SIMULATE REAL-TIME UPDATES
    // ========================================
    if (typeof DataManager !== 'undefined' && DataManager.updateQuantity) {
        setInterval(function() {
            const products = DataManager.getProducts();
            if (products && products.length > 0) {
                const randomIndex = Math.floor(Math.random() * products.length);
                const product = products[randomIndex];

                const change = Math.floor(Math.random() * 5) - 2;
                const newQuantity = Math.max(0, product.quantity + change);

                DataManager.updateQuantity(product.id, newQuantity);
                if (typeof FilterManager !== 'undefined' && FilterManager.applyFilters) {
                    FilterManager.applyFilters();
                }

                console.log(`🔄 Real-time update: ${product.name} quantity changed to ${newQuantity}`);
            }
        }, 30000);
    }

    console.log('Dashboard fully loaded!');
});

// ============================================
// FALLBACK: Run again if DOM didn't load fully
// ============================================
setTimeout(function() {
    const items = document.querySelectorAll('.sidebar-item');
    if (items.length > 0 && !items[0]._listenerAdded) {
        items.forEach(function(item) {
            if (!item._listenerAdded) {
                item.addEventListener('click', function(e) {
                    e.preventDefault();
                    document.querySelectorAll('.sidebar-item').forEach(function(i) {
                        i.classList.remove('active');
                    });
                    this.classList.add('active');
                    alert('You clicked: ' + this.textContent.trim());
                });
                item._listenerAdded = true;
            }
        });
        console.log('✅ Fallback: Sidebar listeners added');
    }
}, 1000);

// ============================================
// VIEW SWITCHING - Sidebar Navigation
// ============================================

// Map sidebar items to views
const viewMap = {
    'Dashboard': 'view-dashboard',
    'Inventory': 'view-inventory',
    'Analytics': 'view-analytics',
    'Categories': 'view-categories',
    'Alerts': 'view-alerts'
};

// Get all sidebar items
const sidebarItems = document.querySelectorAll('.sidebar-item');

sidebarItems.forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();

        // Remove active from all
        sidebarItems.forEach(i => i.classList.remove('active'));

        // Add active to clicked
        this.classList.add('active');

        // Get the view name
        const viewName = this.textContent.trim();
        console.log('Switching to view:', viewName);

        // Hide all views
        document.querySelectorAll('.view-content').forEach(view => {
            view.classList.add('d-none');
        });

        // Show the selected view
        const viewId = viewMap[viewName];
        if (viewId) {
            const targetView = document.getElementById(viewId);
            if (targetView) {
                targetView.classList.remove('d-none');
                // Update subtitle
                const subtitle = document.getElementById('pageSubtitle');
                if (subtitle) {
                    subtitle.textContent = 'Viewing: ' + viewName;
                }
            }
        }

        // If switching to Inventory, refresh the table
        if (viewName === 'Inventory') {
            if (typeof FilterManager !== 'undefined') {
                FilterManager.applyFilters();
            }
        }

        // If switching to Analytics, update analytics
        if (viewName === 'Analytics') {
            updateAnalytics();
        }

        // If switching to Categories, update categories
        if (viewName === 'Categories') {
            updateCategories();
        }

        // If switching to Alerts, update alerts
        if (viewName === 'Alerts') {
            updateAlerts();
        }
    });
});

// ============================================
// ANALYTICS VIEW
// ============================================
function updateAnalytics() {
    if (typeof DataManager === 'undefined') return;
    const products = DataManager.getProducts();
    if (products.length === 0) return;

    const totalValue = products.reduce((sum, p) => sum + (p.quantity * p.price), 0);
    const avgPrice = totalValue / products.length;
    const mostExpensive = products.reduce((max, p) => p.price > max.price ? p : max, products[0]);

    document.getElementById('analyticsTotalValue').textContent = '₱' + totalValue.toFixed(2);
    document.getElementById('analyticsAvgPrice').textContent = '₱' + avgPrice.toFixed(2);
    document.getElementById('analyticsMostExpensive').textContent = mostExpensive.name + ' (₱' + mostExpensive.price.toFixed(2) + ')';
    document.getElementById('analyticsTotalProducts').textContent = products.length;
}

// ============================================
// CATEGORIES VIEW
// ============================================
function updateCategories() {
    if (typeof DataManager === 'undefined') return;
    const products = DataManager.getProducts();
    const categories = DataManager.getCategories();

    const tbody = document.getElementById('categoriesBody');
    if (!tbody) return;

    tbody.innerHTML = '';

    categories.forEach(cat => {
        const items = products.filter(p => p.category === cat);
        const totalQty = items.reduce((sum, p) => sum + p.quantity, 0);
        const totalValue = items.reduce((sum, p) => sum + (p.quantity * p.price), 0);

        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${cat}</strong></td>
            <td>${items.length}</td>
            <td>${totalQty}</td>
            <td>₱${totalValue.toFixed(2)}</td>
        `;
        tbody.appendChild(row);
    });
}

// ============================================
// ALERTS VIEW
// ============================================
function updateAlerts() {
    if (typeof DataManager === 'undefined') return;
    const products = DataManager.getProducts();

    const container = document.getElementById('alertsContainer');
    if (!container) return;

    const lowStock = products.filter(p => p.quantity <= p.reorderLevel && p.quantity > 0);
    const outOfStock = products.filter(p => p.quantity === 0);

    let html = '';

    if (outOfStock.length > 0) {
        html += `<div class="alert alert-danger">
            <h6><i class="fas fa-times-circle me-2"></i> Out of Stock</h6>
            <ul>`;
        outOfStock.forEach(p => {
            html += `<li>${p.name} (${p.sku}) - Need to restock!</li>`;
        });
        html += `</ul></div>`;
    }

    if (lowStock.length > 0) {
        html += `<div class="alert alert-warning">
            <h6><i class="fas fa-exclamation-triangle me-2"></i> Low Stock Items</h6>
            <ul>`;
        lowStock.forEach(p => {
            html += `<li>${p.name} (${p.sku}) - ${p.quantity} remaining (Reorder at ${p.reorderLevel})</li>`;
        });
        html += `</ul></div>`;
    }

    if (outOfStock.length === 0 && lowStock.length === 0) {
        html = `<div class="alert alert-success">
            <i class="fas fa-check-circle me-2"></i> All items are in stock!
        </div>`;
    }

    container.innerHTML = html;
}