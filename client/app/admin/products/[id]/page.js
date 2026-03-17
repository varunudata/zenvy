"use client";

import { useState } from "react";
import Link from "next/link";

const CATEGORIES = [
    { id: 1, name: "Essentials" },
    { id: 2, name: "Footwear" },
    { id: 3, name: "Outerwear" },
    { id: 4, name: "Accessories" },
];

// Simulated product fetch by ID
const PRODUCT = {
    id: 1,
    name: "Classic White Tee",
    price: 45,
    description: "The foundational piece of any wardrobe. Crafted from heavyweight, 100% organic cotton jersey.",
    quantity: 120,
    categoryId: 1,
};

export default function EditProduct({ params }) {
    const [form, setForm] = useState(PRODUCT);
    const [saved, setSaved] = useState(false);

    const handleChange = (e) => {
        setSaved(false);
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSaved(true);
        // Will wire to API in backend integration phase
    };

    return (
        <div className="max-w-2xl">
            <div className="mb-10">
                <Link
                    href="/admin/products"
                    className="text-xs text-[var(--color-muted-foreground)] uppercase tracking-widest hover:text-black transition-colors mb-4 inline-flex items-center gap-2"
                >
                    ← Back to Products
                </Link>
                <h1 className="text-3xl font-medium tracking-tighter uppercase mt-4">Edit Product</h1>
                <p className="text-sm text-[var(--color-muted-foreground)] mt-1">
                    ID #{PRODUCT.id} — Last updated just now
                </p>
            </div>

            {saved && (
                <div className="mb-6 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs uppercase tracking-widest px-4 py-3">
                    ✓ Product saved successfully
                </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white border border-gray-100 rounded-sm p-8 space-y-8">
                <div>
                    <label className="block text-xs font-medium uppercase tracking-widest text-gray-700 mb-3">Product Name</label>
                    <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        type="text"
                        required
                        className="w-full border-b border-gray-200 py-2 text-sm focus:outline-none focus:border-black transition-colors bg-transparent"
                    />
                </div>

                <div className="grid grid-cols-2 gap-8">
                    <div>
                        <label className="block text-xs font-medium uppercase tracking-widest text-gray-700 mb-3">Price (USD)</label>
                        <input
                            name="price"
                            value={form.price}
                            onChange={handleChange}
                            type="number"
                            min="0"
                            required
                            className="w-full border-b border-gray-200 py-2 text-sm focus:outline-none focus:border-black transition-colors bg-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium uppercase tracking-widest text-gray-700 mb-3">Quantity</label>
                        <input
                            name="quantity"
                            value={form.quantity}
                            onChange={handleChange}
                            type="number"
                            min="0"
                            required
                            className="w-full border-b border-gray-200 py-2 text-sm focus:outline-none focus:border-black transition-colors bg-transparent"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-medium uppercase tracking-widest text-gray-700 mb-3">Category</label>
                    <select
                        name="categoryId"
                        value={form.categoryId}
                        onChange={handleChange}
                        required
                        className="w-full border-b border-gray-200 py-2 text-sm focus:outline-none focus:border-black transition-colors bg-transparent text-gray-700"
                    >
                        {CATEGORIES.map((c) => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-xs font-medium uppercase tracking-widest text-gray-700 mb-3">Description</label>
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        rows={4}
                        required
                        className="w-full border border-gray-200 p-3 text-sm focus:outline-none focus:border-black transition-colors bg-transparent resize-none"
                    />
                </div>

                <div className="flex items-center gap-4 pt-2">
                    <button
                        type="submit"
                        className="text-xs uppercase tracking-widest font-medium bg-black text-white px-8 py-3 hover:bg-gray-900 transition-colors"
                    >
                        Save Changes
                    </button>
                    <button
                        type="button"
                        className="text-xs uppercase tracking-widest font-medium text-red-500 hover:text-red-700 transition-colors"
                    >
                        Delete Product
                    </button>
                </div>
            </form>
        </div>
    );
}
