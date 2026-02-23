import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-white border-t border-[var(--color-border)] py-16 mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-sm">
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="text-2xl font-bold tracking-tighter uppercase mb-6 block">
                            Lumina
                        </Link>
                        <p className="text-[var(--color-muted-foreground)] max-w-sm leading-relaxed">
                            Curating exceptional pieces for everyday elegance. Crafted with precision, designed for life.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-medium tracking-widest text-xs uppercase mb-6">Explore</h3>
                        <ul className="space-y-4 text-[var(--color-muted-foreground)]">
                            <li><Link href="/shop" className="hover:text-black transition-colors">All Products</Link></li>
                            <li><Link href="/categories" className="hover:text-black transition-colors">Categories</Link></li>
                            <li><Link href="/about" className="hover:text-black transition-colors">About Us</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-medium tracking-widest text-xs uppercase mb-6">Support</h3>
                        <ul className="space-y-4 text-[var(--color-muted-foreground)]">
                            <li><Link href="/contact" className="hover:text-black transition-colors">Contact</Link></li>
                            <li><Link href="/shipping" className="hover:text-black transition-colors">Shipping & Returns</Link></li>
                            <li><Link href="/terms" className="hover:text-black transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-16 pt-8 border-t border-[var(--color-border)] flex flex-col md:flex-row justify-between items-center text-xs text-[var(--color-muted-foreground)]">
                    <p>&copy; {new Date().getFullYear()} Lumina. All rights reserved.</p>
                    <div className="mt-4 md:mt-0 space-x-6">
                        <Link href="/privacy" className="hover:text-black transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-black transition-colors">Terms</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
