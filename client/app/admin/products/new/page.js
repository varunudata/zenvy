"use client";

import { useState } from "react";
import Link from "next/link";

const CATEGORIES = [
    { id: 1, name: "Essentials" },
    { id: 2, name: "Footwear" },
    { id: 3, name: "Outerwear" },
    { id: 4, name: "Accessories" },
];

export default function AddProduct() {
    const [form, setForm] = useState({
        name: "",
        price: "",
        description: "",
        quantity: "",
        categoryId: "",
    });

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Will wire to API in backend integration phase
        alert("Product would be saved: " + JSON.stringify(form, null, 2));
    };

    return (
        <div className="max-w-2xl">
            {/* Header */}
            <div className="mb-10">
                <Link
                    href="/admin/products"
                    className="text-xs text-[var(--color-muted-foreground)] uppercase tracking-widest hover:text-black transition-colors mb-4 inline-flex items-center gap-2"
                >
                    ← Back to Products
                </Link>
                <h1 className="text-3xl font-medium tracking-tighter uppercase mt-4">Add Product</h1>
                <p className="text-sm text-[var(--color-muted-foreground)] mt-1">
                    Fill in product details. All fields are required.
                </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="bg-white border border-gray-100 rounded-sm p-8 space-y-8">

                {/* Name */}
                <div>
                    <label className="block text-xs font-medium uppercase tracking-widest text-gray-700 mb-3">
                        Product Name
                    </label>
                    <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        type="text"
                        placeholder="e.g. Classic White Tee"
                        required
                        className="w-full border-b border-gray-200 py-2 text-sm focus:outline-none focus:border-black transition-colors placeholder-gray-400 bg-transparent"
                    />
                </div>

                {/* Price + Quantity side by side */}
                <div className="grid grid-cols-2 gap-8">
                    <div>
                        <label className="block text-xs font-medium uppercase tracking-widest text-gray-700 mb-3">
                            Price (USD)
                        </label>
                        <input
                            name="price"
                            value={form.price}
                            onChange={handleChange}
                            type="number"
                            min="0"
                            placeholder="45"
                            required
                            className="w-full border-b border-gray-200 py-2 text-sm focus:outline-none focus:border-black transition-colors placeholder-gray-400 bg-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium uppercase tracking-widest text-gray-700 mb-3">
                            Quantity
                        </label>
                        <input
                            name="quantity"
                            value={form.quantity}
                            onChange={handleChange}
                            type="number"
                            min="0"
                            placeholder="100"
                            required
                            className="w-full border-b border-gray-200 py-2 text-sm focus:outline-none focus:border-black transition-colors placeholder-gray-400 bg-transparent"
                        />
                    </div>
                </div>

                {/* Category */}
                <div>
                    <label className="block text-xs font-medium uppercase tracking-widest text-gray-700 mb-3">
                        Category
                    </label>
                    <select
                        name="categoryId"
                        value={form.categoryId}
                        onChange={handleChange}
                        required
                        className="w-full border-b border-gray-200 py-2 text-sm focus:outline-none focus:border-black transition-colors bg-transparent text-gray-700"
                    >
                        <option value="" disabled>Select a category</option>
                        {CATEGORIES.map((c) => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                    </select>
                </div>

                {/* Description */}
                <div>
                    <label className="block text-xs font-medium uppercase tracking-widest text-gray-700 mb-3">
                        Description
                    </label>
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Describe the product..."
                        required
                        className="w-full border border-gray-200 p-3 text-sm focus:outline-none focus:border-black transition-colors placeholder-gray-400 bg-transparent resize-none"
                    />
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4 pt-2">
                    <button
                        type="submit"
                        className="text-xs uppercase tracking-widest font-medium bg-black text-white px-8 py-3 hover:bg-gray-900 transition-colors"
                    >
                        Save Product
                    </button>
                    <Link
                        href="/admin/products"
                        className="text-xs uppercase tracking-widest font-medium text-[var(--color-muted-foreground)] hover:text-black transition-colors"
                    >
                        Cancel
                    </Link>
                </div>
            </form>
        </div>
    );
}
