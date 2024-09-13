import Image from "next/image"
import Link from "next/link"
import { getCookies } from 'next-client-cookies/server'
import { isUserAuthenticated } from "@components/secured_page_handler"

const Header = () => {
  const cookie_store = getCookies();
  const cookie_value = cookie_store.get("SECRET_COOKIE_PASSWORD") ?? undefined

  if (cookie_value !== undefined){
      const user_authed = isUserAuthenticated(cookie_value)

      if (!user_authed) return 1

      return (
        <header className="flex-initial w-full h-10 md:h-12 flex flex-nowrap gap-1 items-center bg-gradient-to-r from-indigo-500/20 via-purple-500/25 to-pink-500/20">
    
          <Link href={"/"}>
            <div className="flex-initial mt-1 h-6 md:h-8 w-16 md:w-20 relative">
              <Image
                src="/logo_white.svg"
                fill={true}
                alt="White prNAS Logo"
              />
            </div>
          </Link>
    
          <div className="flex-1"></div>
    
          <div className="flex-initial mr-4 text-center text-green-500 text-sm">
            AUTHENTICATED
          </div>
    
        </header>
      )
  }

  return (
    <header className="flex-initial w-full h-10 md:h-12 flex flex-nowrap gap-1 items-center bg-gradient-to-r from-indigo-500/20 via-purple-500/25 to-pink-500/20">

      <Link href={"/"}>
        <div className="flex-initial mt-1 h-6 md:h-8 w-16 md:w-20 relative">
          <Image
            src="/logo_white.svg"
            fill={true}
            alt="White prNAS Logo"
          />
        </div>
      </Link>

      <div className="flex-1"></div>

      <div className="flex-initial mr-4 text-center text-red-500 text-sm">
        NOT AUTHENTICATED
      </div>

    </header>
  )
}

export default Header