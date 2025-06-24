import { Link } from "@nextui-org/react"
import Logo from "./Logo"
const Footer = ()=>{
  return (
    <footer className="w-full h-fit flex flex-col lg:flex-row bg-white lg:justify-between items-center px-6 lg:px-20 py-4 lg:py-8 text-xs lg:text-sm text-gray-500 gap-4">
      <div className="lg:w-1/2">
        © 2025 <span className="font-semibold">SEA Catering</span> | <Link href={"/"} className="text-gray-500 text-xs lg:text-sm hover:underline">Terms of Service</Link> | <Link href={"/"} className="text-gray-500 text-xs lg:text-sm hover:underline">Privacy and Policy</Link>
      </div>
      <div className="flex lg:justify-end">
        <span><span className="font-semibold">Manager </span> | Brian (+62 8123456789)</span>
      </div>
    </footer>
  )
}
export default Footer;