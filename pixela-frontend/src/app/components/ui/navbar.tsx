import Link from "next/link"
import { mainNavLinks } from "@/data/links/navigation"

export const Navbar = () => {
  return (
    <div className="w-full fixed top-0 left-0 z-50 mt-5">
      <div className="max-w-[83.333%] mx-auto flex items-center p-4 bg-dark-opacity backdrop-blur-sm rounded-[36px]">
        <h1 className="text-3xl font-bold font-outfit text-pixela-accent mx-10">Pixela</h1>
        <div className="flex-1 flex justify-center">
          <div className="flex space-x-8">
            {mainNavLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                className="font-pixela-outfit-sm text-pixela-light relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-pixela-accent transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>
        </div>
        <div className="mx-10 w-[85px]">
          {/* Espacio reservado para equilibrar el diseño */}
        </div>
      </div>
    </div>
  )
}


 