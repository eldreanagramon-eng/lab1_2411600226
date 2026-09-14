<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index()
    {
        $totalProducts = Product::count();
        $lowStockItems = Product::whereColumn('quantity', '<=', 'reorder_level')
                                ->where('quantity', '>', 0)->count();
        $outOfStockItems = Product::where('quantity', 0)->count();
        $totalValue = Product::sum(DB::raw('quantity * unit_price'));
        $recentProducts = Product::latest()->take(5)->get();

        return view('dashboard', compact(
            'totalProducts',
            'lowStockItems',
            'outOfStockItems',
            'totalValue',
            'recentProducts'
        ));
    }
}