"use client";

import Image from "next/image";
import Button from "./Button";

// Inline SVG — no external icon dependency needed
function XIcon({ size = 20 }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
    );
}

export default function CartDrawer({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <>
            <div
                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 transition-opacity"
                onClick={onClose}
            />

            <div className="fixed inset-y-0 right-0 z-50 w-full md:w-[480px] bg-white shadow-2xl flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-6 border-b border-[var(--color-border)]">
                    <h2 className="text-lg font-medium tracking-tighter uppercase">Your Cart (1)</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-50 rounded-full transition-colors" aria-label="Close cart">
                        <XIcon />
                    </button>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-6 space-y-8">
                    <div className="flex gap-6">
                        <div className="relative w-24 aspect-[3/4] bg-gray-50 overflow-hidden">
                            <Image
                                src="https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                                alt="Product"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="flex-1 flex flex-col justify-between">
                            <div>
                                <div className="flex justify-between">
                                    <h3 className="text-sm font-medium tracking-wide">Classic White Tee</h3>
                                    <button className="text-[var(--color-muted-foreground)] hover:text-black" aria-label="Remove item">
                                        <XIcon size={16} />
                                    </button>
                                </div>
                                <p className="text-xs text-[var(--color-muted-foreground)] uppercase tracking-widest mt-1">Size: M</p>
                            </div>
                            <div className="flex justify-between items-end">
                                <div className="flex items-center border border-[var(--color-border)]">
                                    <button className="px-3 py-1 text-[var(--color-muted-foreground)] hover:text-black transition-colors">−</button>
                                    <span className="px-3 py-1 text-sm">1</span>
                                    <button className="px-3 py-1 text-[var(--color-muted-foreground)] hover:text-black transition-colors">+</button>
                                </div>
                                <p className="text-sm font-medium">$45.00</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="border-t border-[var(--color-border)] p-6 bg-gray-50/50">
                    <div className="flex justify-between mb-2">
                        <span className="text-sm text-[var(--color-muted-foreground)] tracking-wide">Subtotal</span>
                        <span className="text-sm font-medium">$45.00</span>
                    </div>
                    <p className="text-xs text-[var(--color-muted-foreground)] tracking-wide mb-6">
                        Shipping and taxes calculated at checkout.
                    </p>
                    <Button variant="primary" size="full">
                        Checkout
                    </Button>
                    <div className="mt-4 text-center">
                        <button onClick={onClose} className="text-xs uppercase tracking-widest text-[var(--color-muted-foreground)] hover:text-black transition-colors underline underline-offset-4">
                            Continue Shopping
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
