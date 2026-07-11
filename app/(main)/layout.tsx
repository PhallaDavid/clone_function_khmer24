import { HeaderNavigationBase } from "@/components/application/app-navigation/header-navigation";
import { Footer } from "@/components/application/footer/footer";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Projects", href: "/projects" },
  { label: "Tasks", href: "/tasks" },
  { label: "Reporting", href: "/reporting" },
  { label: "Users", href: "/users" },
];

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <HeaderNavigationBase items={navItems} activeUrl="/" />
      <main className="flex-1 flex flex-col">{children}</main>
      <Footer />
    </>
  );
}
