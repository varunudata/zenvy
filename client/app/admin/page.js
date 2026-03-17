import Link from "next/link";

// --- Reusable Stat Card ---
function StatCard({ label, value, sub, icon }) {
    return (
        <div className="bg-white border border-gray-100 rounded-sm p-6">
            <div className="flex items-start justify-between mb-4">
                <span className="text-[var(--color-muted-foreground)] text-xs uppercase tracking-widest">{label}</span>
                <span className="text-gray-300">{icon}</span>
            </div>
            <p className="text-4xl font-medium tracking-tighter text-black">{value}</p>
            {sub && <p className="text-xs text-[var(--color-muted-foreground)] mt-2">{sub}</p>}
        </div>
    );
}

// --- Dummy recent products ---
const RECENT = [
    { id: 1, name: "Classic White Tee", category: "Essentials", price: 45, quantity: 120 },
    { id: 2, name: "Heritage Runner", category: "Footwear", price: 120, quantity: 45 },
    { id: 3, name: "Linen Overshirt", category: "Outerwear", price: 95, quantity: 30 },
    { id: 4, name: "Minimal Dress Watch", category: "Accessories", price: 220, quantity: 18 },
    { id: 5, name: "Structured Tote", category: "Accessories", price: 175, quantity: 52 },
];

export default function AdminDashboard() {
    return (
        <div>
            {/* Page header */}
            <div className="mb-10">
                <h1 className="text-3xl font-medium tracking-tighter uppercase">Overview</h1>
                <p className="text-sm text-[var(--color-muted-foreground)] mt-1 tracking-wide">
                    Welcome back to the Zenvy Admin Console.
                </p>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                <StatCard
                    label="Total Products"
                    value="48"
                    sub="Across all categories"
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
                    }
                />
                <StatCard
                    label="Categories"
                    value="6"
                    sub="Active categories"
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" /></svg>
                    }
                />
                <StatCard
                    label="Low Stock"
                    value="3"
                    sub="Items below 20 units"
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
                    }
                />
                <StatCard
                    label="Avg. Price"
                    value="$131"
                    sub="Across all products"
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
                    }
                />
            </div>

            {/* Recent products table */}
            <div className="bg-white border border-gray-100 rounded-sm">
                <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                    <h2 className="text-sm font-medium uppercase tracking-widest">Recent Products</h2>
                    <Link
                        href="/admin/products/new"
                        className="text-xs uppercase tracking-widest font-medium bg-black text-white px-4 py-2 hover:bg-gray-900 transition-colors"
                    >
                        + Add Product
                    </Link>
                </div>
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-gray-100">
                            <th className="text-left px-6 py-3 text-xs text-[var(--color-muted-foreground)] uppercase tracking-widest font-medium">Name</th>
                            <th className="text-left px-6 py-3 text-xs text-[var(--color-muted-foreground)] uppercase tracking-widest font-medium">Category</th>
                            <th className="text-left px-6 py-3 text-xs text-[var(--color-muted-foreground)] uppercase tracking-widest font-medium">Price</th>
                            <th className="text-left px-6 py-3 text-xs text-[var(--color-muted-foreground)] uppercase tracking-widest font-medium">Stock</th>
                            <th className="text-left px-6 py-3 text-xs text-[var(--color-muted-foreground)] uppercase tracking-widest font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {RECENT.map((p) => (
                            <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
                                <td className="px-6 py-4 font-medium">{p.name}</td>
                                <td className="px-6 py-4 text-[var(--color-muted-foreground)]">{p.category}</td>
                                <td className="px-6 py-4">${p.price}</td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2 py-0.5 text-xs rounded-sm font-medium ${p.quantity < 20
                                            ? "bg-red-50 text-red-700"
                                            : "bg-gray-100 text-gray-700"
                                        }`}>
                                        {p.quantity} units
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <Link
                                        href={`/admin/products/${p.id}`}
                                        className="text-xs text-[var(--color-muted-foreground)] hover:text-black underline underline-offset-4 transition-colors"
                                    >
                                        Edit
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="px-6 py-4 border-t border-gray-100">
                    <Link href="/admin/products" className="text-xs uppercase tracking-widest text-[var(--color-muted-foreground)] hover:text-black transition-colors">
                        View all products →
                    </Link>
                </div>
            </div>
        </div>
    );
}
