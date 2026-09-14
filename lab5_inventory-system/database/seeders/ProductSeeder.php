<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $products = [
            ['name' => 'Hammer', 'sku' => 'HW-001', 'category' => 'Tools', 'quantity' => 50, 'reorder_level' => 10, 'unit_price' => 350.00, 'supplier' => 'ToolMaster Inc.'],
            ['name' => 'Screwdriver Set', 'sku' => 'HW-002', 'category' => 'Tools', 'quantity' => 8, 'reorder_level' => 15, 'unit_price' => 450.00, 'supplier' => 'ToolMaster Inc.'],
            ['name' => 'Plywood 1/4 inch', 'sku' => 'LM-001', 'category' => 'Lumber', 'quantity' => 100, 'reorder_level' => 20, 'unit_price' => 850.00, 'supplier' => 'WoodWorks Co.'],
            ['name' => 'Cement Bag 40kg', 'sku' => 'HM-001', 'category' => 'Hardware', 'quantity' => 5, 'reorder_level' => 25, 'unit_price' => 280.00, 'supplier' => 'BuildRight Supplies'],
            ['name' => 'Paint - White 1L', 'sku' => 'PT-001', 'category' => 'Paint', 'quantity' => 30, 'reorder_level' => 10, 'unit_price' => 550.00, 'supplier' => 'ColorPro Paints'],
            ['name' => 'Paint - Blue 1L', 'sku' => 'PT-002', 'category' => 'Paint', 'quantity' => 0, 'reorder_level' => 10, 'unit_price' => 550.00, 'supplier' => 'ColorPro Paints'],
            ['name' => 'PVC Pipe 2 inch', 'sku' => 'PL-001', 'category' => 'Plumbing', 'quantity' => 40, 'reorder_level' => 15, 'unit_price' => 320.00, 'supplier' => 'PipeWorks Ltd.'],
            ['name' => 'Electrical Wire 10m', 'sku' => 'EL-001', 'category' => 'Electrical', 'quantity' => 12, 'reorder_level' => 20, 'unit_price' => 750.00, 'supplier' => 'VoltTech'],
            ['name' => 'Nails 2 inch (1kg)', 'sku' => 'HM-002', 'category' => 'Hardware', 'quantity' => 60, 'reorder_level' => 20, 'unit_price' => 120.00, 'supplier' => 'BuildRight Supplies'],
            ['name' => 'Wrench Set', 'sku' => 'HW-003', 'category' => 'Tools', 'quantity' => 7, 'reorder_level' => 10, 'unit_price' => 1200.00, 'supplier' => 'ToolMaster Inc.'],
            ['name' => 'Wood Glue 500ml', 'sku' => 'LM-002', 'category' => 'Lumber', 'quantity' => 3, 'reorder_level' => 10, 'unit_price' => 380.00, 'supplier' => 'WoodWorks Co.'],
            ['name' => 'Light Switch', 'sku' => 'EL-002', 'category' => 'Electrical', 'quantity' => 45, 'reorder_level' => 15, 'unit_price' => 180.00, 'supplier' => 'VoltTech'],
            ['name' => 'Faucet Set', 'sku' => 'PL-002', 'category' => 'Plumbing', 'quantity' => 18, 'reorder_level' => 10, 'unit_price' => 950.00, 'supplier' => 'PipeWorks Ltd.'],
            ['name' => 'Paint Brush Set', 'sku' => 'PT-003', 'category' => 'Paint', 'quantity' => 25, 'reorder_level' => 10, 'unit_price' => 280.00, 'supplier' => 'ColorPro Paints'],
            ['name' => 'Drill Machine', 'sku' => 'HW-004', 'category' => 'Tools', 'quantity' => 2, 'reorder_level' => 5, 'unit_price' => 4500.00, 'supplier' => 'ToolMaster Inc.'],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}