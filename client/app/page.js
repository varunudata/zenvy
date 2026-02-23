import Image from "next/image";
import Link from "next/link";
import Button from "./components/ui/Button";
import ProductCard from "./components/ui/ProductCard";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Hero Background"
            fill
            className="object-cover object-top"
            priority
          />
          {/* Subtle gradient to ensure text readability only */}
          <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px]"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
          <span className="text-xs uppercase tracking-[0.3em] font-medium mb-6 slide-up-fade text-black/80">
            The Essentials Collection
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tighter text-black uppercase leading-[0.9] mb-8">
            Define Your <br /> Elegance
          </h1>
          <p className="text-lg md:text-xl text-black/70 font-light max-w-2xl mx-auto mb-10 tracking-wide">
            Curated pieces designed for longevity, blending minimalist form with exceptional craftsmanship.
          </p>
          <Link href="/shop">
            <Button variant="primary" size="lg" className="tracking-[0.2em]">
              Explore Collection
            </Button>
          </Link>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-24 md:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
            <h2 className="text-3xl font-medium tracking-tighter uppercase mb-4">New Arrivals</h2>
            <p className="text-[var(--color-muted-foreground)] tracking-wide">The latest additions to our curated selection.</p>
          </div>
          <Link href="/shop" className="text-sm uppercase tracking-widest font-medium border-b border-black pb-1 hover:text-gray-600 hover:border-gray-600 transition-colors mt-6 md:mt-0 inline-block">
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {Array.from({ length: 4 }).map((_, i) => (
            <ProductCard key={i} />
          ))}
        </div>
      </section>

      {/* Editorial Category Section */}
      <section className="py-20 bg-[var(--color-muted)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
              <Image
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                alt="Editorial Fashion"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-center max-w-md mx-auto md:mx-0">
              <span className="text-xs uppercase tracking-[0.3em] font-medium mb-4 text-[var(--color-muted-foreground)]">
                Featured Edit
              </span>
              <h2 className="text-4xl md:text-5xl font-medium tracking-tighter uppercase mb-6 leading-tight">
                The Silhouette
              </h2>
              <p className="text-base text-[var(--color-muted-foreground)] leading-relaxed mb-10">
                Discover pieces defined by precise cuts and fluid drape. A study in the beauty of simplicity and the power of understatement.
              </p>
              <Link href="/shop">
                <Button variant="outline" size="md" className="w-fit">
                  Shop Editorial
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
