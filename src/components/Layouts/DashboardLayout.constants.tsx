import {
  CiBookmark,
  CiGrid41,
  CiSettings,
  CiShoppingTag,
  CiStar,
  CiUser,
  CiViewList,
  CiWallet,
} from "react-icons/ci";
import {  } from "react-icons/fa";
import { LiaUtensilsSolid } from "react-icons/lia";

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
    icon: <LiaUtensilsSolid />,
  },
  {
    key: "testimonials",
    label: "Testimonials",
    href: "/admin/testimonials",
    icon: <CiStar />,
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