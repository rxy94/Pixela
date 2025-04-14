import Link from "next/link"
import { mainNavLinks } from "@/data/links/navigation"

export const Navbar = () => {
  return (
    <div className="w-full px-4">
      <div className="max-w-[83.333%] mx-auto flex justify-between items-center p-4 bg-dark-opacity rounded-[36px]">
        <h1 className="text-2xl font-bold font-outfit text-pixela-accent">Pixela</h1>
        <div className="flex space-x-6">

          {mainNavLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                className="font-roboto text-[24px] text-pixela-light hover:text-pixela-accent transition-colors"
              >
                {link.label}
              </Link>
          ))}
          
        </div>
      </div>
    </div>
  )
}


 