import { ReactNode } from "react";
import { Inter } from "next/font/google";
import Header from "./Header";
import PageHead from "./PageHead";
const inter = Inter({
  subsets: ["latin"],
  weight: ["100","200","300","400","500","600","700","800","900"]
});
// const jakarta = Plus_Jakarta_Sans({
//   subsets: ["latin"],
//   weight: ["200","300","400","500","600","700","800"]
// });

interface PropType {
  title?: string;
  children: ReactNode;
}

const Layout = (props: PropType) => {
  const {title, children} = props;
  return (
    <div className={`flex min-h-screen flex-col items-center justify-between bg-gray-50 ${inter.className}`}>
      <PageHead title={title}></PageHead>
      <Header/>
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
