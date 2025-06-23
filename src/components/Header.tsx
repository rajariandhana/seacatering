import Link from "next/link";
const Header = () => {
  return(
    <header className="w-full h-20">
      <nav className="w-full h-full bg-white flex justify-between items-center px-8">
        <Link href={"/"} className="flex gap-x-2">
          <span>LOGO</span>
          <span>SEA Catering</span>
        </Link>
        {/* <div className="w-1/2 bg-blue-50">
          tes
        </div> */}
      </nav>
    </header>
  )
}
export default Header;