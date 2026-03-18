'use client';

import { useState } from 'react';

const INITIAL_CATEGORIES = [
  { id: 1, name: 'Essentials', productCount: 18 },
  { id: 2, name: 'Footwear', productCount: 12 },
  { id: 3, name: 'Outerwear', productCount: 8 },
  { id: 4, name: 'Accessories', productCount: 10 },
];

export default function AdminCategories() {
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [newName, setNewName] = useState('');
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newName.trim()) return;
    const next = {
      id: Date.now(),
      name: newName.trim(),
      productCount: 0,
    };
    setCategories((prev) => [...prev, next]);
    setNewName('');
  };

  const handleDelete = (id) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  const startEdit = (c) => {
    setEditId(c.id);
    setEditName(c.name);
  };

  const saveEdit = (id) => {
    setCategories((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, name: editName.trim() || c.name } : c
      )
    );
    setEditId(null);
    setEditName('');
  };

  return (
    <div className="max-w-2xl">
      <div className="mb-10">
        <h1 className="text-3xl font-medium tracking-tighter uppercase">
          Categories
        </h1>
        <p className="text-sm text-[var(--color-muted-foreground)] mt-1 tracking-wide">
          Manage product categories.
        </p>
      </div>

      {/* Add new category */}
      <div className="bg-white border border-gray-100 rounded-sm p-6 mb-6">
        <h2 className="text-xs font-medium uppercase tracking-widest mb-5">
          New Category
        </h2>
        <form onSubmit={handleAdd} className="flex gap-4 items-end">
          <div className="flex-1">
            <label className="block text-xs text-[var(--color-muted-foreground)] uppercase tracking-widest mb-2">
              Category Name
            </label>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="e.g. Swimwear"
              className="w-full border-b border-gray-200 py-2 text-sm focus:outline-none focus:border-black transition-colors placeholder-gray-400 bg-transparent"
            />
          </div>
          <button
            type="submit"
            className="text-xs uppercase tracking-widest font-medium bg-black text-white px-6 py-2.5 hover:bg-gray-900 transition-colors whitespace-nowrap"
          >
            Add
          </button>
        </form>
      </div>

      {/* Categories list */}
      <div className="bg-white border border-gray-100 rounded-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-xs font-medium uppercase tracking-widest">
            All Categories ({categories.length})
          </h2>
        </div>
        <ul className="divide-y divide-gray-50">
          {categories.map((c) => (
            <li
              key={c.id}
              className="flex items-center justify-between px-6 py-4 hover:bg-gray-50/50 transition-colors"
            >
              <div className="flex items-center gap-4 flex-1">
                {editId === c.id ? (
                  <input
                    autoFocus
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && saveEdit(c.id)}
                    className="border-b border-black py-1 text-sm focus:outline-none bg-transparent flex-1"
                  />
                ) : (
                  <div>
                    <p className="text-sm font-medium">{c.name}</p>
                    <p className="text-xs text-[var(--color-muted-foreground)] mt-0.5">
                      {c.productCount} product{c.productCount !== 1 ? 's' : ''}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-4">
                {editId === c.id ? (
                  <>
                    <button
                      onClick={() => saveEdit(c.id)}
                      className="text-xs uppercase tracking-widest font-medium text-black hover:text-gray-600 transition-colors"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditId(null)}
                      className="text-xs text-[var(--color-muted-foreground)] hover:text-black transition-colors"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => startEdit(c)}
                      className="text-xs text-[var(--color-muted-foreground)] hover:text-black transition-colors underline underline-offset-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(c.id)}
                      className="text-xs text-red-500 hover:text-red-700 transition-colors underline underline-offset-4"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
