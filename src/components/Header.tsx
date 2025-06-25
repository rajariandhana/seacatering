import Link from "next/link";
import Logo from "./Logo";
import { useRouter } from "next/router";
import { useState } from "react";
const links = [
  {
    key:'meal-plans',
    label:'Meal Plans',
    href:'/meal-plans'
  },
  {
    key:'subscription',
    label:'Subscription',
    href:'/subscription'
  },
  {
    key:'contact-us',
    label:'Contact Us',
    href:'/contact-us'
  }
]
const Header = () => {
  const router = useRouter();
  return(
    <header className="w-full h-20">
      <nav className="w-full h-full bg-white flex justify-between items-center px-20">
        <Link href={"/"} className="flex gap-x-2">
          <Logo height={20}></Logo>
        </Link>
        <div className="hidden lg:w-1/2 bg-blue-50 lg:flex justify-end gap-x-12">
          {links.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              className={`${
                router.pathname === link.href ? "font-semibold" : ""
              } hover:underline transition-all ease-in-out duration-100`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  )
}
export default Header;