import Link from 'next/link';

// Dummy product data aligned with backend schema (name, price, description, quantity, categoryId)
const PRODUCTS = [
  {
    id: 1,
    name: 'Classic White Tee',
    category: 'Essentials',
    price: 45,
    quantity: 120,
    description: '100% organic cotton',
  },
  {
    id: 2,
    name: 'Heritage Runner',
    category: 'Footwear',
    price: 120,
    quantity: 45,
    description: 'Suede upper with gum sole',
  },
  {
    id: 3,
    name: 'Linen Overshirt',
    category: 'Outerwear',
    price: 95,
    quantity: 30,
    description: '100% French linen',
  },
  {
    id: 4,
    name: 'Minimal Dress Watch',
    category: 'Accessories',
    price: 220,
    quantity: 18,
    description: 'Swiss quartz movement',
  },
  {
    id: 5,
    name: 'Structured Tote',
    category: 'Accessories',
    price: 175,
    quantity: 52,
    description: 'Full-grain leather',
  },
  {
    id: 6,
    name: 'Low-Top Sneaker',
    category: 'Footwear',
    price: 135,
    quantity: 67,
    description: 'Vulcanised canvas',
  },
  {
    id: 7,
    name: 'Tapered Trouser',
    category: 'Essentials',
    price: 88,
    quantity: 40,
    description: 'Italian wool blend',
  },
  {
    id: 8,
    name: 'Merino Crewneck',
    category: 'Essentials',
    price: 115,
    quantity: 22,
    description: 'Extra-fine merino wool',
  },
];

export default function AdminProducts() {
  return (
    <div>
      {/* Header */}
      <div className="flex items-end justify-between mb-10">
        <div>
          <h1 className="text-3xl font-medium tracking-tighter uppercase">
            Products
          </h1>
          <p className="text-sm text-[var(--color-muted-foreground)] mt-1 tracking-wide">
            {PRODUCTS.length} products in catalogue
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="text-xs uppercase tracking-widest font-medium bg-black text-white px-5 py-3 hover:bg-gray-900 transition-colors"
        >
          + Add Product
        </Link>
      </div>

      {/* Search bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full md:w-80 bg-white border border-gray-200 text-sm px-4 py-3 focus:outline-none focus:border-black transition-colors placeholder-gray-400"
        />
      </div>

      {/* Products table */}
      <div className="bg-white border border-gray-100 rounded-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              <th className="text-left px-6 py-4 text-xs text-[var(--color-muted-foreground)] uppercase tracking-widest font-medium">
                #
              </th>
              <th className="text-left px-6 py-4 text-xs text-[var(--color-muted-foreground)] uppercase tracking-widest font-medium">
                Name
              </th>
              <th className="text-left px-6 py-4 text-xs text-[var(--color-muted-foreground)] uppercase tracking-widest font-medium">
                Category
              </th>
              <th className="text-left px-6 py-4 text-xs text-[var(--color-muted-foreground)] uppercase tracking-widest font-medium">
                Price
              </th>
              <th className="text-left px-6 py-4 text-xs text-[var(--color-muted-foreground)] uppercase tracking-widest font-medium">
                Stock
              </th>
              <th className="text-right px-6 py-4 text-xs text-[var(--color-muted-foreground)] uppercase tracking-widest font-medium">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {PRODUCTS.map((p) => (
              <tr
                key={p.id}
                className="hover:bg-gray-50/60 transition-colors group"
              >
                <td className="px-6 py-4 text-[var(--color-muted-foreground)] text-xs">
                  {p.id}
                </td>
                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium text-black">{p.name}</p>
                    <p className="text-xs text-[var(--color-muted-foreground)] mt-0.5">
                      {p.description}
                    </p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-sm">
                    {p.category}
                  </span>
                </td>
                <td className="px-6 py-4 font-medium">${p.price}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-sm ${
                      p.quantity < 20
                        ? 'bg-red-50 text-red-700'
                        : p.quantity < 50
                          ? 'bg-amber-50 text-amber-700'
                          : 'bg-emerald-50 text-emerald-700'
                    }`}
                  >
                    {p.quantity} units
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-4">
                    <Link
                      href={`/admin/products/${p.id}`}
                      className="text-xs text-[var(--color-muted-foreground)] hover:text-black transition-colors underline underline-offset-4"
                    >
                      Edit
                    </Link>
                    <button className="text-xs text-red-500 hover:text-red-700 transition-colors underline underline-offset-4">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6">
        <p className="text-xs text-[var(--color-muted-foreground)] tracking-wide">
          Showing 1–{PRODUCTS.length} of {PRODUCTS.length} results
        </p>
        <div className="flex gap-1">
          {[1, 2, 3].map((n) => (
            <button
              key={n}
              className={`w-8 h-8 text-xs font-medium transition-colors ${
                n === 1
                  ? 'bg-black text-white'
                  : 'text-[var(--color-muted-foreground)] hover:bg-gray-100'
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
