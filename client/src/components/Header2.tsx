import React from "react";
import Logo from "./Logo";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
} from "@nextui-org/react";
import { useRouter } from "next/router";

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

export default function Header2() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const router = useRouter();

  return (
    <header className="w-full py-2 lg:py-4">
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent className="md:-ml-0 lg:-ml-12 xl:-ml-32">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link href={"/"} className="flex gap-x-2 text-black">
            <Logo height={20}></Logo>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {links.map((link) => (
          <NavbarItem key={link.key}>
            <Link
              href={link.href}
              className={`text-black ${
                router.pathname === link.href ? "font-semibold" : ""
              } hover:underline transition-all ease-in-out duration-100`}
              >
              {link.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      {/* <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent> */}
      <NavbarMenu>
        {links.map((link) => (
          <NavbarMenuItem key={link.key}>
            <Link
              href={link.href}
              className={`text-black text-xl ${
                router.pathname === link.href ? "font-semibold" : ""
              } hover:underline transition-all ease-in-out duration-100`}
              >
              {link.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
    </header>
  );
}

