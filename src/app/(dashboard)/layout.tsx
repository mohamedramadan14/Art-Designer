import { Navbar } from "./navbar";
import { Sidebar } from "./sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}
const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="bg-muted min-h-screen">
      <Sidebar />
      <div className="lg:pl-[300px] flex flex-col min-h-screen">
        <Navbar />
        <main className="bg-white flex-1 overflow-auto p-8 lg:rounded-tl-2xl">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
