// ============================================
// CHART MANAGER - Chart.js Configuration
// ============================================

const ChartManager = {
    categoryChart: null,
    stockStatusChart: null,

    initCharts() {
        this.createCategoryChart();
        this.createStockStatusChart();
    },

    createCategoryChart() {
        const ctx = document.getElementById('categoryChart').getContext('2d');
        const summary = DataManager.getCategorySummary();

        const categories = summary.map(s => s.category);
        const values = summary.map(s => s.totalValue);

        this.categoryChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: categories,
                datasets: [{
                    label: 'Inventory Value (₱)',
                    data: values,
                    backgroundColor: ['#6C3CE1', '#00D4AA', '#FF6B6B', '#FFA94D', '#4ECDC4', '#45B7D1'],
                    borderColor: '#141429',
                    borderWidth: 2,
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return '₱' + context.parsed.y.toLocaleString();
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: 'rgba(255,255,255,0.05)' },
                        ticks: {
                            color: '#8888AA',
                            callback: function(value) {
                                return '₱' + value.toLocaleString();
                            }
                        }
                    },
                    x: {
                        grid: { display: false },
                        ticks: { color: '#8888AA' }
                    }
                }
            }
        });
    },

    createStockStatusChart() {
        const ctx = document.getElementById('stockStatusChart').getContext('2d');
        const distribution = DataManager.getStockStatusDistribution();

        this.stockStatusChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['In Stock', 'Low Stock', 'Out of Stock'],
                datasets: [{
                    data: [distribution.inStock, distribution.lowStock, distribution.outOfStock],
                    backgroundColor: ['#00D4AA', '#FFA94D', '#FF6B6B'],
                    borderColor: '#141429',
                    borderWidth: 3,
                    hoverOffset: 10
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '65%',
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: '#8888AA',
                            padding: 20,
                            usePointStyle: true,
                            pointStyleWidth: 12
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = ((context.parsed / total) * 100).toFixed(1);
                                return context.label + ': ' + context.parsed + ' (' + percentage + '%)';
                            }
                        }
                    }
                }
            }
        });
    },

    updateCharts() {
        const summary = DataManager.getCategorySummary();
        const categories = summary.map(s => s.category);
        const values = summary.map(s => s.totalValue);

        if (this.categoryChart) {
            this.categoryChart.data.labels = categories;
            this.categoryChart.data.datasets[0].data = values;
            this.categoryChart.update();
        }

        const distribution = DataManager.getStockStatusDistribution();
        if (this.stockStatusChart) {
            this.stockStatusChart.data.datasets[0].data = [
                distribution.inStock,
                distribution.lowStock,
                distribution.outOfStock
            ];
            this.stockStatusChart.update();
        }
    },

    destroyCharts() {
        if (this.categoryChart) {
            this.categoryChart.destroy();
            this.categoryChart = null;
        }
        if (this.stockStatusChart) {
            this.stockStatusChart.destroy();
            this.stockStatusChart = null;
        }
    }
};