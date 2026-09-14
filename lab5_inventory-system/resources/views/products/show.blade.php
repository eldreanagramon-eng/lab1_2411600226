@extends('layouts.app')

@section('title', $product->name)

@section('content')
<div class="container mt-4">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">
                    <h4><i class="fas fa-box me-2"></i> {{ $product->name }}</h4>
                </div>
                <div class="card-body">
                    <table class="table">
                        <tr><th width="30%">SKU</th><td>{{ $product->sku }}</td></tr>
                        <tr><th>Category</th><td>{{ $product->category }}</td></tr>
                        <tr><th>Description</th><td>{{ $product->description ?? 'N/A' }}</td></tr>
                        <tr><th>Quantity</th><td>{{ $product->quantity }}</td></tr>
                        <tr><th>Reorder Level</th><td>{{ $product->reorder_level }}</td></tr>
                        <tr><th>Unit Price</th><td>₱{{ number_format($product->unit_price, 2) }}</td></tr>
                        <tr><th>Total Value</th><td>₱{{ number_format($product->total_value, 2) }}</td></tr>
                        <tr><th>Supplier</th><td>{{ $product->supplier ?? 'N/A' }}</td></tr>
                        <tr>
                            <th>Status</th>
                            <td>
                                @if($product->isOutOfStock())
                                    <span class="status-badge out-of-stock">Out of Stock</span>
                                @elseif($product->isLowStock())
                                    <span class="status-badge low-stock">Low Stock</span>
                                @else
                                    <span class="status-badge in-stock">In Stock</span>
                                @endif
                            </td>
                        </tr>
                        <tr><th>Created</th><td>{{ $product->created_at->format('M d, Y h:i A') }}</td></tr>
                        <tr><th>Last Updated</th><td>{{ $product->updated_at->format('M d, Y h:i A') }}</td></tr>
                    </table>

                    <div class="d-flex justify-content-between">
                        <a href="{{ route('products.index') }}" class="btn btn-secondary">
                            <i class="fas fa-arrow-left"></i> Back
                        </a>
                        <div>
                            <a href="{{ route('products.edit', $product) }}" class="btn btn-warning">
                                <i class="fas fa-edit"></i> Edit
                            </a>
                            <form action="{{ route('products.destroy', $product) }}" method="POST" class="d-inline" onsubmit="return confirm('Delete this product?')">
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="btn btn-danger">
                                    <i class="fas fa-trash"></i> Delete
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection