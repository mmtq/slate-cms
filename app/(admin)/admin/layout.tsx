export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <aside>Admin Sidebar</aside>
        <main>{children}</main>
      </body>
    </html>
  );
}
