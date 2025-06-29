import {
  CiBookmark,
  CiGrid41,
  CiSettings,
  CiShoppingTag,
  CiUser,
  CiViewList,
  CiWallet,
} from "react-icons/ci";
import {  } from "react-icons/fa";

const SIDEBAR_ADMIN = [
  {
    key: "dashboard",
    label: "Dashboard",
    href: "/admin",
    icon: <CiGrid41 />,
  },
  {
    key: "members",
    label: "Members",
    href: "/admin/members",
    icon: <CiUser />,
  },
  {
    key: "subscriptions",
    label: "Subscriptions",
    href: "/admin/subscriptions",
    icon: <CiWallet />,
  },
  {
    key: "plans",
    label: "Plans",
    href: "/admin/plans",
    icon: <CiWallet />,
  },
  {
    key: "testimonials",
    label: "Testimonials",
    href: "/admin/testimonials",
    icon: <CiWallet />,
  }
];

const SIDEBAR_MEMBER = [
  {
    key: "dashboard",
    label: "Dashboard",
    href: "/member",
    icon: <CiGrid41 />,
  },
  {
    key: "subscription",
    label: "Subscription",
    href: "/member/subscription",
    icon: <CiWallet />,
  },
  {
    key: "account",
    label: "Account",
    href: "/member/account",
    icon: <CiUser />,
  },
];

export { SIDEBAR_ADMIN, SIDEBAR_MEMBER };