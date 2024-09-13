"use client"

import React, { useState, FormEvent } from "react"
import { HandleFormData, isUserAuthenticated } from "./secured_page_handler"
import { useCookies } from 'next-client-cookies'
import { useRouter } from "next/navigation"
import Block from "@components/block"

const SecuredPage = () => {
    const cookie_store = useCookies();
    const router = useRouter()

    const cookie_value = cookie_store.get("SECRET_COOKIE_PASSWORD") ?? undefined

    const [password, setPassword] = useState("")

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        try {
            const res = await HandleFormData(password) ?? "error"
            console.log(res)
        } catch (error: any) {
            console.error(error)
        } finally {
            router.refresh()
        }
    }

    const handleEntry = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (cookie_value !== undefined) {
            const user_authed = await isUserAuthenticated(cookie_value)
        }

        router.refresh()
    }

    if (cookie_value === undefined) {
        return (
            <Block>
                <div suppressHydrationWarning={true}>
                    <form onSubmit={onSubmit}>
                        <div className="relative z-0 my-4">
                            <input type="password" value={password} id="password" onChange={(e) => setPassword(e.target.value)} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                            <label htmlFor="password" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                                Password
                            </label>
                        </div>
                        <div className="mt-4 flex items-stretch md:items-start md:flex-row-reverse">
                            <button type="submit" className="px-4 py-2 border-slate-500 border-1 bg-slate-700 rounded-2xl flex-auto md:flex-initial hover:bg-slate-500/50 transition delay-[1ms] motion-reduce:transition-none">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </Block>
        )
    }

    return (
        <Block>
            <form onSubmit={handleEntry}>
                <div className="mt-4 flex items-stretch md:items-start md:flex-row-reverse">
                    <button type="submit" className="px-4 py-2 border-slate-500 border-1 bg-slate-700 rounded-2xl flex-auto md:flex-initial hover:bg-slate-500/50 transition delay-[1ms] motion-reduce:transition-none">
                        Submit
                    </button>
                </div>
            </form>
        </Block>
    )
}

export default SecuredPage