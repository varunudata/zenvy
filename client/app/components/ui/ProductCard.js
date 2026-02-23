import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ProductCard({ product }) {
    // Using a placeholder image for the initial frontend build
    const placeholderImage = `https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`;

    return (
        <div className="group cursor-pointer">
            <Link href={`/product/${product?.id || 1}`}>
                <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-4 rounded-sm">
                    <Image
                        src={product?.image || placeholderImage}
                        alt={product?.name || "Product Image"}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    {/* Subtle overlay on hover */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                </div>

                <div className="flex justify-between items-start mt-4">
                    <div>
                        <h3 className="text-sm font-medium tracking-wide text-black mb-1">
                            {product?.name || "Classic White Tee"}
                        </h3>
                        <p className="text-xs text-[var(--color-muted-foreground)] uppercase tracking-widest">
                            {product?.category?.name || "Essentials"}
                        </p>
                    </div>
                    <span className="text-sm font-medium text-black">
                        ${product?.price || "45.00"}
                    </span>
                </div>
            </Link>
        </div>
    );
}
