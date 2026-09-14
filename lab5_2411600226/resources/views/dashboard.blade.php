@extends('layouts.app')

@section('title', 'Dashboard')

@section('content')
<div class="container mt-4">
    <h1 class="mb-4"><i class="fas fa-tachometer-alt me-2"></i> Dashboard</h1>

    <!-- Statistics Cards -->
    <div class="row g-4 mb-4">
        <div class="col-md-3">
            <div class="stat-card">
                <h6 class="stat-label">Total Products</h6>
                <h3 class="stat-value">{{ $totalProducts }}</h3>
                <div class="stat-icon bg-primary"><i class="fas fa-boxes"></i></div>
            </div>
        </div>

        <div class="col-md-3">
            <div class="stat-card">
                <h6 class="stat-label">Low Stock Items</h6>
                <h3 class="stat-value">{{ $lowStockItems }}</h3>
                <div class="stat-icon bg-warning"><i class="fas fa-exclamation-triangle"></i></div>
            </div>
        </div>

        <div class="col-md-3">
            <div class="stat-card">
                <h6 class="stat-label">Out of Stock</h6>
                <h3 class="stat-value">{{ $outOfStockItems }}</h3>
                <div class="stat-icon bg-danger"><i class="fas fa-times-circle"></i></div>
            </div>
        </div>

        <div class="col-md-3">
            <div class="stat-card">
                <h6 class="stat-label">Total Value</h6>
                <h3 class="stat-value">₱{{ number_format($totalValue, 2) }}</h3>
                <div class="stat-icon bg-secondary"><i class="fas fa-peso-sign"></i></div>
            </div>
        </div>
    </div>

    <!-- Recent Products -->
    <div class="card">
        <div class="card-header">
            <h5><i class="fas fa-clock me-2"></i> Recent Products</h5>
        </div>
        <div class="card-body">
            <table class="table">
                <thead>
                    <tr>
                        <th>SKU</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse($recentProducts as $product)
                        <tr>
                            <td>{{ $product->sku }}</td>
                            <td>{{ $product->name }}</td>
                            <td>{{ $product->category }}</td>
                            <td>{{ $product->quantity }}</td>
                            <td>₱{{ number_format($product->unit_price, 2) }}</td>
                        </tr>
                    @empty
                        <tr><td colspan="5" class="text-center">No products yet.</td></tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>
</div>
@endsection