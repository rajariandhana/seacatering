import { Link } from "@nextui-org/react"
import Logo from "./Logo"
const Footer = ()=>{
  return (
    <footer className="w-full h-fit bg-white flex justify-between items-center px-20 py-8 text-sm text-gray-500">
      <div className="w-1/2">
        © 2025 SEA Catering | <Link href={"/"} className="text-gray-500 text-sm hover:underline">Terms of Service</Link> | <Link href={"/"} className="text-gray-500 text-sm hover:underline">Privacy and Policy</Link>
      </div>
      <div className="flex justify-end">
        <span><span className="font-semibold">Manager </span> | Brian (+62 8123456789)</span>
      </div>
    </footer>
  )
}
export default Footer;