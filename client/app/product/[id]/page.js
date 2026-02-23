"use client";

import Image from "next/image";
import { useState } from "react";
import Button from "../../components/ui/Button";

export default function ProductDetail() {
    const [selectedSize, setSelectedSize] = useState('M');

    const sizes = ['S', 'M', 'L', 'XL'];
    const images = [
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
            <div className="flex flex-col md:flex-row gap-16 lg:gap-24">

                {/* Left Image Gallery - Sticky */}
                <div className="w-full md:w-1/2">
                    <div className="sticky top-28 space-y-4">
                        {images.map((src, idx) => (
                            <div key={idx} className="relative aspect-[3/4] w-full bg-gray-50">
                                <Image
                                    src={src}
                                    alt={`Product Image ${idx + 1}`}
                                    fill
                                    className="object-cover"
                                    priority={idx === 0}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Product Info */}
                <div className="w-full md:w-1/2">
                    <div className="md:sticky md:top-28">
                        <nav className="text-xs uppercase tracking-widest text-[var(--color-muted-foreground)] mb-6">
                            Shop / Essentials / Classic White Tee
                        </nav>

                        <h1 className="text-4xl md:text-5xl font-medium tracking-tighter uppercase mb-4">
                            Classic White Tee
                        </h1>

                        <p className="text-xl font-medium mb-8">$45.00</p>

                        <div className="prose prose-sm text-[var(--color-muted-foreground)] leading-relaxed mb-10 border-t border-[var(--color-border)] pt-8">
                            <p>
                                The foundational piece of any wardrobe. Crafted from heavyweight, 100% organic cotton jersey that becomes beautifully worn with time. Features a ribbed crewneck, drop shoulder, and a relaxed boxy fit. Pre-shrunk for enduring shape.
                            </p>
                            <ul className="mt-4 space-y-2 text-xs uppercase tracking-widest">
                                <li>• 100% Organic Cotton</li>
                                <li>• Made in Portugal</li>
                                <li>• Model is 6'1" and wears a size M</li>
                            </ul>
                        </div>

                        {/* Size Selector */}
                        <div className="mb-10">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-xs font-medium uppercase tracking-widest">Size</span>
                                <button className="text-xs text-[var(--color-muted-foreground)] underline tracking-wide">Size Guide</button>
                            </div>
                            <div className="grid grid-cols-4 gap-4">
                                {sizes.map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`py-3 text-sm font-medium transition-colors border ${selectedSize === size
                                                ? 'border-black bg-black text-white'
                                                : 'border-[var(--color-border)] text-[var(--color-muted-foreground)] hover:border-black hover:text-black'
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="space-y-4">
                            <Button variant="primary" size="full">
                                Add to Cart
                            </Button>
                            <Button variant="outline" size="full" className="font-normal text-[var(--color-muted-foreground)] hover:text-black">
                                Add to Wishlist
                            </Button>
                        </div>

                        {/* Accordion Info */}
                        <div className="mt-16 space-y-6">
                            {[
                                { title: "Shipping & Returns", content: "Free standard shipping on orders over $150. Returns accepted within 14 days of delivery." },
                                { title: "Care Instructions", content: "Machine wash cold with like colors. Tumble dry on low heat. Do not bleach." }
                            ].map((item, idx) => (
                                <div key={idx} className="border-b border-[var(--color-border)] pb-6">
                                    <h3 className="text-sm font-medium uppercase tracking-widest mb-2">{item.title}</h3>
                                    <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">{item.content}</p>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}
