"use client"

import { HandleRebootSubmit, HandleRestartServiceSubmit } from "./buttons_handler"

const ClientButtons = () => {
    return (
        <>
            <form action={HandleRestartServiceSubmit} className="my-4">
                <button type="submit" className="px-4 py-2 border-slate-500 border-1 bg-slate-700 rounded-2xl flex-auto md:flex-initial hover:bg-slate-500/50 transition delay-[1ms] motion-reduce:transition-none">
                    Restart prNAS-app
                </button>
            </form>

            <form action={HandleRebootSubmit} className="my-4">
                <button type="submit" className="px-4 py-2 border-slate-500 border-1 bg-slate-700 rounded-2xl flex-auto md:flex-initial hover:bg-slate-500/50 transition delay-[1ms] motion-reduce:transition-none">
                    Reboot
                </button>
            </form>
        </>
    )
}

export default ClientButtons