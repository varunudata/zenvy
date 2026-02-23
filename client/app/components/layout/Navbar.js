"use client";

import { useState } from "react";
import Link from "next/link";
import CartDrawer from "../ui/CartDrawer";

// Inline SVG — no external icon dependency needed
function ShoppingBagIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
    );
}

export default function Navbar() {
    const [isCartOpen, setIsCartOpen] = useState(false);

    return (
        <>
            <nav className="fixed top-0 w-full z-40 glass-effect border-b border-[var(--color-border)]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        <div className="flex-shrink-0 flex items-center">
                            <Link href="/" className="text-2xl font-bold tracking-tighter uppercase">
                                Lumina
                            </Link>
                        </div>
                        <div className="hidden md:flex space-x-8">
                            <Link href="/shop" className="text-sm tracking-wide hover:text-gray-500 transition-colors">
                                Collection
                            </Link>
                            <Link href="/shop" className="text-sm tracking-wide hover:text-gray-500 transition-colors">
                                Categories
                            </Link>
                            <Link href="#" className="text-sm tracking-wide hover:text-gray-500 transition-colors">
                                Atelier
                            </Link>
                        </div>
                        <div className="flex items-center space-x-6">
                            <Link href="/login" className="text-sm tracking-wide hover:text-gray-500 transition-colors">
                                Account
                            </Link>
                            <button
                                onClick={() => setIsCartOpen(true)}
                                className="relative p-2 hover:bg-gray-50 rounded-full transition-colors group"
                                aria-label="Open cart"
                            >
                                <ShoppingBagIcon />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <CartDrawer
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
            />
        </>
    );
}
