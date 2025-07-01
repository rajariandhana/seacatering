import { cn } from "@/utils/cn";
import { Button, Listbox, ListboxItem } from "@nextui-org/react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { CiLogout } from "react-icons/ci";
import Logo from "../Logo";
import Link from "next/link";

interface SidebarItem {
  key: string;
  label: string;
  href: string;
  icon: JSX.Element;
}

interface PropTypes {
  sidebarItems: SidebarItem[];
  isOpen: boolean;
  role: string
}

const DashboardLayoutSidebar = (props: PropTypes) => {
  const { sidebarItems, isOpen } = props;
  const router = useRouter();
  const isActive = (path: string) => {
    if (path === `/${props.role}`) return router.pathname === `/${props.role}`;
    return router.pathname.startsWith(path);
  };
  return (
    <div
      className={cn(
        "fixed z-50 flex h-screen w-full max-w-[300px] -translate-x-full flex-col justify-between border-r-1 border-default-200 bg-white px-4 pt-12 pb-6 transition-all lg:relative lg:translate-x-0",
        { "translate-x-0": isOpen },
      )}
    >
      <div>
        <Logo height={20}></Logo>
        <Listbox
          items={sidebarItems}
          variant="solid"
          aria-label="Dashboard Menu"
          className="mt-8"
        >
          {(item) => (
            <ListboxItem
              key={item.key}
              className={cn("my-1 h-12 text-2xl", {
                "bg-primary text-black": isActive(item.href),
              })}
              startContent={item.icon}
              textValue={item.label}
              aria-labelledby={item.label}
              aria-describedby={item.label}
              href={item.href}
              as={Link}
            >
              <p className="text-small">{item.label}</p>
            </ListboxItem>
          )}
        </Listbox>
      </div>
      <div className="flex items-center p-1">
        <Button
          color="danger"
          fullWidth
          variant="light"
          className="flex justify-start rounded-lg px-2 py-1.5"
          size="lg"
          onClick={() => signOut()}
        >
          <CiLogout />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default DashboardLayoutSidebar;