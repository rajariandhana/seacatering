import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100","200","300","400","500","600","700","800","900"]
});
// const jakarta = Plus_Jakarta_Sans({
//   subsets: ["latin"],
//   weight: ["200","300","400","500","600","700","800"]
// });

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={`flex min-h-screen flex-col items-center justify-between bg-gray-50 ${inter.className}`}>
      <header className="w-full bg-white border h-20">
        Header
      </header>
      <main className="flex flex-col items-center justify-center">
        {children}
      </main>
      <footer className="w-full bg-white border h-20">
        Footer
      </footer>
    </div>
  );
};

export default Layout;
