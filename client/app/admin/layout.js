import AdminSidebar from '../components/admin/AdminSidebar';

export const metadata = {
  title: 'Zenvy Admin',
  description: 'Zenvy Admin Panel',
};

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-[#f6f6f4]">
      <AdminSidebar />
      <main className="flex-1 ml-64 min-h-screen">
        <div className="p-8 lg:p-10">{children}</div>
      </main>
    </div>
  );
}
