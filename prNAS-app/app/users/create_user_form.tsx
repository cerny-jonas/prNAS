"use client"

import React, { useState, FormEvent } from "react"
import { HandleCreateUserFormData, createUserFormData } from "./create_user_handler"
import { useRouter } from "next/navigation"

const CreateUserForm = () => {
    const router = useRouter()

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsLoading(true)
        setError(null) // Clear previous errors when a new request starts

        try {
            const formData: createUserFormData = { username: username, password: password }
            await HandleCreateUserFormData(formData)
        } catch (error: any) {
            // Capture the error message to display to the user
            setError(error.message)
            console.error(error)
        } finally {
            setUsername("")
            setPassword("")
            setIsLoading(false)

            router.refresh()
        }
    }

    // https://flowbite.com/docs/forms/floating-label/

    return (
        <div suppressHydrationWarning={true}>
            {error && <div style={{ color: "red" }}>{error}</div>}
            <form onSubmit={onSubmit}>
                <div className="relative z-0 my-4">
                    <input type="text" value={username} id="username" disabled={isLoading} onChange={(e) => setUsername(e.target.value)} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                    <label htmlFor="username" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                        Username
                    </label>
                </div>
                <div className="relative z-0 my-4">
                    <input type="password" value={password} id="password" disabled={isLoading} onChange={(e) => setPassword(e.target.value)} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                    <label htmlFor="password" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                        Password
                    </label>
                </div>
                <div className="mt-4 flex items-stretch md:items-start md:flex-row-reverse">
                    <button type="submit" disabled={isLoading} className="px-4 py-2 border-slate-500 border-1 bg-slate-700 rounded-2xl flex-auto md:flex-initial hover:bg-slate-500/50 transition delay-[1ms] motion-reduce:transition-none">
                        {isLoading ? "Loading..." : "Submit"}
                    </button>
                </div>
            </form>
        </div>
    )
}


export default CreateUserForm