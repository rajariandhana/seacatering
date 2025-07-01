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
    key: "members",
    label: "Members",
    href: "/admin",
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
    key: "subscription",
    label: "Subscription",
    href: "/member",
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