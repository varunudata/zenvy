import Link from "next/link";

// A curated set of reliable Unsplash direct image URLs
const PRODUCT_IMAGES = [
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=75",
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=75",
    "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&q=75",
    "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=600&q=75",
    "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&q=75",
    "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&q=75",
];

const PRODUCT_NAMES = [
    "Classic White Tee",
    "Heritage Runner",
    "Linen Overshirt",
    "Minimal Dress Watch",
    "Low-Top Sneaker",
    "Structured Tote",
];

const PRODUCT_CATEGORIES = [
    "Essentials",
    "Footwear",
    "Outerwear",
    "Accessories",
    "Footwear",
    "Accessories",
];

const PRODUCT_PRICES = ["$45", "$120", "$95", "$220", "$135", "$175"];

export default function ProductCard({ index = 0 }) {
    const i = index % PRODUCT_IMAGES.length;
    const imgUrl = PRODUCT_IMAGES[i];
    const name = PRODUCT_NAMES[i];
    const category = PRODUCT_CATEGORIES[i];
    const price = PRODUCT_PRICES[i];

    return (
        <div className="group cursor-pointer">
            <Link href={`/product/${index + 1}`}>
                {/* Image using CSS background for fast rendering in dev */}
                <div
                    className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-4"
                    style={{
                        backgroundImage: `url(${imgUrl})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        transition: "transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                >
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                    {/* Zoom effect via inner div */}
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: `url(${imgUrl})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            transform: "scale(1)",
                            transition: "transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
                        }}
                    />
                </div>

                <div className="flex justify-between items-start mt-3">
                    <div>
                        <h3 className="text-sm font-medium tracking-wide text-black mb-1">{name}</h3>
                        <p className="text-xs text-[var(--color-muted-foreground)] uppercase tracking-widest">
                            {category}
                        </p>
                    </div>
                    <span className="text-sm font-medium text-black">{price}</span>
                </div>
            </Link>
        </div>
    );
}
