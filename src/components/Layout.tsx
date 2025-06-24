import { ReactNode } from "react";
import { inter } from "@/utils/fonts";
import Header from "./Header";
import PageHead from "./PageHead";

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
    <div className={`flex min-h-screen min-w-full flex-col items-center justify-between bg-white ${inter.className}`}>
      <PageHead title={title}></PageHead>
      <Header/>
      <main className="flex flex-col items-center justify-center max-w-screen-sm lg:max-w-screen-xl pt-4 px-4 gap-12 lg:gap-24">
        {children}
      </main>
      {/* <footer className="w-full bg-white border h-20">
        Footer
      </footer> */}
    </div>
  );
};

export default Layout;
