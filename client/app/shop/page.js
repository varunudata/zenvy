import ProductCard from "../components/ui/ProductCard";

export default function Shop() {
    const categories = ["All", "Essentials", "Outerwear", "Accessories", "Footwear"];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">

            <div className="flex flex-col md:flex-row gap-12">
                {/* Sidebar / Filters */}
                <div className="w-full md:w-64 shrink-0">
                    <div className="sticky top-28">
                        <h1 className="text-4xl font-medium tracking-tighter uppercase mb-12">
                            Collection
                        </h1>

                        <div className="space-y-8">
                            <div>
                                <h3 className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted-foreground)] mb-4">
                                    Categories
                                </h3>
                                <ul className="space-y-3">
                                    {categories.map((category) => (
                                        <li key={category}>
                                            <button className={`text-sm tracking-wide ${category === 'All' ? 'font-medium text-black' : 'text-[var(--color-muted-foreground)] hover:text-black transition-colors'}`}>
                                                {category}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted-foreground)] mb-4">
                                    Sort By
                                </h3>
                                <ul className="space-y-3">
                                    <li><button className="text-sm tracking-wide text-black font-medium">Newest Arrivals</button></li>
                                    <li><button className="text-sm tracking-wide text-[var(--color-muted-foreground)] hover:text-black transition-colors">Price: Low to High</button></li>
                                    <li><button className="text-sm tracking-wide text-[var(--color-muted-foreground)] hover:text-black transition-colors">Price: High to Low</button></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Product Grid */}
                <div className="flex-1">
                    <div className="flex justify-between items-center mb-8 border-b border-[var(--color-border)] pb-4">
                        <span className="text-sm text-[var(--color-muted-foreground)] tracking-wide">Showing 12 results</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                        {Array.from({ length: 9 }).map((_, i) => (
                            <ProductCard key={i} />
                        ))}
                    </div>

                    <div className="mt-16 flex justify-center">
                        <button className="text-sm font-medium tracking-widest uppercase border-b border-black pb-1 hover:text-gray-500 hover:border-gray-500 transition-colors">
                            Load More
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
