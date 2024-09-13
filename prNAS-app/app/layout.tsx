import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "./header"
import Sidebar from "./sidebar"
import { CookiesProvider } from 'next-client-cookies/server';

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "prNAS",
}

const RootLayout = ({ children, }: { children: React.ReactNode }) => {
  return (
    <CookiesProvider>
      <html lang="en" className="w-full h-full">
        <head>
          <link rel="icon" href="/favicon.ico" sizes="any" />
        </head>
        <body className={inter.className + " flex flex-col w-full h-full bg-slate-950"}>
          <Header />
          <div className="flex-1 md:flex md:items-stretch">
            <Sidebar />
            <main className="flex-auto flex gap-4 pt-4 md:p-4 flex-wrap flex-col md:flex-row justify-start md:content-start items-stretch md:items-start">
              {children}
            </main>
          </div>
        </body>
      </html>
    </CookiesProvider>
  )
}

export default RootLayout
