import React, { useState } from "react";
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
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Button,
  User,
} from "@nextui-org/react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import useGetProfile from "@/utils/useGetProfile";
import { signOut } from "next-auth/react";

const links = [
  {
    key:'meal-plans',
    label:'Meal Plans',
    href:'/meal-plans'
  },
  {
    key:'subscription',
    label:'Subscription',
    href:'/member/subscription'
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

  const session = useSession();

  const {dataProfile} = useGetProfile();
  const handleLogout = async () => {
     const result = await signOut({ redirect: false });
     router.push("/");
  };

  // console.log(dataProfile);

  return (
    <header className="w-full py-2 lg:py-4">
      <Navbar onMenuOpenChange={setIsMenuOpen} maxWidth="xl">
        <NavbarContent justify="start">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="md:hidden"
          />
          <NavbarBrand>
            <Link href={"/"} className="flex gap-x-2 text-black">
              <Logo height={20}></Logo>
            </Link>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden md:flex gap-8" justify="center">
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
        <NavbarContent className="hidden md:flex gap-8" justify="end">
          {session.status === 'authenticated' && dataProfile? (
            <>
              <NavbarItem key="profile">
                <Dropdown placement="bottom-end">
                  <DropdownTrigger>
                    <Avatar showFallback isBordered as="button" name={dataProfile.fullName} src=""/>
                  </DropdownTrigger>
                  <DropdownMenu variant="flat" color="default">
                    <DropdownItem key="dashboard">
                      <Link href="/member/dashboard" color="foreground">Dashboard</Link>
                    </DropdownItem>
                    <DropdownItem key="logout" color="danger" onClick={()=>handleLogout()}>
                      <span className="text-danger">Logout</span>
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </NavbarItem>
            </>
          ):(
            <>
              <NavbarItem>
                <Link href="/auth/login">Login</Link>
              </NavbarItem>
              <NavbarItem>
                <Button as={Link} color="default" href="/auth/register" variant="flat">
                  Sign Up
                </Button>
              </NavbarItem>
            </>
          )}
        </NavbarContent>
        <NavbarMenu className="mt-4">
          {links.map((link) => (
            <NavbarMenuItem key={link.key}>
              <Link
                href={link.href}
                className={`text-black text-2xl ${
                  router.pathname === link.href ? "font-semibold" : ""
                } hover:underline transition-all ease-in-out duration-100`}
                >
                {link.label}
              </Link>
            </NavbarMenuItem>
          ))}
          <div className="fixed bottom-12 flex flex-col w-full pr-12 gap-y-4">
            {session.status === 'authenticated' && dataProfile? (
              <>
                <NavbarMenuItem key="profile" className="mt-24">
                  <Dropdown placement="bottom-end">
                    <DropdownTrigger>
                      <User
                      avatarProps={{src:"",showFallback:true,isBordered:true}} name={dataProfile.fullName}>
                      </User>
                    </DropdownTrigger>
                    <DropdownMenu variant="flat" color="default">
                      <DropdownItem key="dashboard">
                        <Link href="/member/dashboard" color="foreground">Dashboard</Link>
                      </DropdownItem>
                      <DropdownItem key="logout" color="danger" onClick={()=>handleLogout()}>
                        <span className="text-danger">Logout</span>
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </NavbarMenuItem>
              </>
            ):(
              <>
                <NavbarMenuItem className="mt-24">
                  <Button size="lg" fullWidth as={Link} color="primary" href="/auth/login" >
                    Login
                  </Button>
                </NavbarMenuItem>
                <NavbarMenuItem>
                  <Button size="lg" fullWidth as={Link} color="default" href="/auth/register" variant="flat">
                    Sign Up
                  </Button>
                </NavbarMenuItem>
              </>
            )}
          </div>
        </NavbarMenu>
      </Navbar>
    </header>
  );
}

