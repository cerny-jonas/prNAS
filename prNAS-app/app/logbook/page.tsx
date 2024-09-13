"use client"

import React, { useState, FormEvent } from "react"
import { useRouter } from "next/navigation"
import { Create, AppendRow } from "./handler"
import Block from "@components/block"
import type { logbookFormData } from "./handler"
import { saveAs } from "file-saver"

const LogbookPage = () => {
    const router = useRouter()

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const [driver, setDriver] = useState("")
    const [password, setPassword] = useState("")
    const [km_before, setKm_before] = useState("")
    const [km_after, setKm_after] = useState("")

    const saveFile = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsLoading(true)
        setError(null) // Clear previous errors when a new request starts

        try {
            saveAs("/api/logbook", "logbook.xlsx")
        } catch (error: any) {
            // Capture the error message to display to the user
            setError(error.message)
            console.error(error)
        } finally {
            setIsLoading(false)
            router.refresh()
        }
    }

    const onCreate = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsLoading(true)
        setError(null) // Clear previous errors when a new request starts

        try {
            await Create()
        } catch (error: any) {
            // Capture the error message to display to the user
            setError(error.message)
            console.error(error)
        } finally {
            setIsLoading(false)
            router.refresh()
        }
    }

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsLoading(true)
        setError(null) // Clear previous errors when a new request starts

        try {
            if (!driver) throw new Error("driver undefined")
            if (!password) throw new Error("password undefined")
            if (!+km_before) throw new Error("km_before undefined")
            if (!+km_after) throw new Error("km_after undefined")
            if (+km_before < 0) throw new Error("km_before negative")
            if (+km_after < 0) throw new Error("km_after negative")

            const formData: logbookFormData = { driver: driver, password: password, km_before: +km_before, km_after: +km_after }
            const res = await AppendRow(formData)

            window.alert(res)
        } catch (error: any) {
            // Capture the error message to display to the user
            setError(error.message)
            console.error(error)
        } finally {
            setDriver("")
            setPassword("")
            setKm_before("")
            setKm_after("")
            setIsLoading(false)

            router.refresh()
        }
    }

    /*
        <div suppressHydrationWarning={true}>
            {error && <div style={{ color: "red" }}>{error}</div>}
            <form onSubmit={onCreate}>
                <div className="mt-4 flex items-stretch md:items-start md:flex-row-reverse">
                    <button type="submit" disabled={isLoading} className="px-4 py-2 border-slate-500 border-1 bg-slate-700 rounded-2xl flex-auto md:flex-initial hover:bg-slate-500/50 transition delay-[1ms] motion-reduce:transition-none">
                        {isLoading ? "Loading..." : "Create"}
                    </button>
                </div>
            </form>
        </div>
    */

    return (
        <>
            <Block>
                <div suppressHydrationWarning={true}>
                    {error && <div style={{ color: "red" }}>{error}</div>}
                    <form onSubmit={onSubmit}>
                        <div className="relative z-0 my-4">
                            <select value={driver} id="driver" disabled={isLoading} onChange={(e) => setDriver(e.target.value)} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">
                                <option value="">Select a Driver</option>
                                <option value="Jonas">Jonáš</option>
                                <option value="Vojtech">Vojtěch</option>
                            </select>
                            <label htmlFor="driver" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                                Driver
                            </label>
                        </div>
                        <div className="relative z-0 my-4">
                            <input type="password" value={password} id="password" disabled={isLoading} onChange={(e) => setPassword(e.target.value)} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                            <label htmlFor="password" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                                Password
                            </label>
                        </div>
                        <div className="relative z-0 my-4">
                            <input type="number" value={km_before} id="km_before" disabled={isLoading} onChange={(e) => setKm_before(e.target.value)} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                            <label htmlFor="km_before" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                                Odometer Before
                            </label>
                        </div>
                        <div className="relative z-0 my-4">
                            <input type="number" value={km_after} id="km_after" disabled={isLoading} onChange={(e) => setKm_after(e.target.value)} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                            <label htmlFor="km_after" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                                Odometer After
                            </label>
                        </div>
                        <div className="mt-4 flex items-stretch md:items-start md:flex-row-reverse">
                            <button type="submit" disabled={isLoading} className="px-4 py-2 border-slate-500 border-1 bg-slate-700 rounded-2xl flex-auto md:flex-initial hover:bg-slate-500/50 transition delay-[1ms] motion-reduce:transition-none">
                                {isLoading ? "Loading..." : "Submit"}
                            </button>
                        </div>
                    </form>
                </div>
            </Block>

            <Block>
                <div suppressHydrationWarning={true}>
                    {error && <div style={{ color: "red" }}>{error}</div>}
                    <form onSubmit={saveFile}>
                        <div className="flex items-stretch md:items-start md:flex-row-reverse">
                            <button type="submit" disabled={isLoading} className="px-4 py-2 border-slate-500 border-1 bg-slate-700 rounded-2xl flex-auto md:flex-initial hover:bg-slate-500/50 transition delay-[1ms] motion-reduce:transition-none">
                                {isLoading ? "Loading..." : "Save as Excel spreadsheet"}
                            </button>
                        </div>
                    </form>
                </div>
            </Block>
        </>
    )
}

export default LogbookPage