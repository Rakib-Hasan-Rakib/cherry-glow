"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed top-4 left-4 z-50 rounded-md border bg-background p-2 shadow sm:hidden"
      >
        <Menu className="h-5 w-5 text-foreground" />
      </button>

      {/* Overlay (mobile) */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 sm:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed z-50 h-full w-64 transform border-r bg-background p-5
          transition-transform duration-300
          sm:static sm:translate-x-0
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-foreground">Cherry Glow</h2>

          {/* Close button (mobile) */}
          <button onClick={() => setOpen(false)} className="sm:hidden">
            <X className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="space-y-3">
          <SidebarLink href="/admin">Dashboard</SidebarLink>
          <SidebarLink href="/admin/products">Products</SidebarLink>
          <SidebarLink href="/admin/roles">Users</SidebarLink>
        </nav>
      </aside>
    </>
  );
}

/* Reusable link */
function SidebarLink({ href, children }) {
  return (
    <Link
      href={href}
      className="
        block rounded-md px-3 py-2 text-sm font-medium
        text-muted-foreground
        hover:bg-muted hover:text-primary
        transition-colors
      "
    >
      {children}
    </Link>
  );
}
