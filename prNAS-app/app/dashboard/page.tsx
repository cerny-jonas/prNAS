import { Metadata } from "next"
import Block from "@components/block"
import SystemInfo from "./system_info"
import CpuInfo from "./cpu_info"
import RamInfo from "./ram_info"
import ClientButtons from "./buttons_client"
import DiskSpace from "@/storage/disk_space"
import { getCookies } from 'next-client-cookies/server'
import { isUserAuthenticated } from "@components/secured_page_handler"
import SecuredPage from "@components/secured_page"

// force SSR
export const dynamic = "force-dynamic"

export const metadata: Metadata = {
    title: "Dashboard | prNAS",
}

const DashboardPage = () => {
    const cookie_store = getCookies();
    const cookie_value = cookie_store.get("SECRET_COOKIE_PASSWORD") ?? undefined

    if (cookie_value !== undefined) {
        const user_authed = isUserAuthenticated(cookie_value)

        if (!user_authed) return 1

        return (
            <>
                <Block>
                    <h3 className="text-lg font-bold">RAM</h3>
                    <hr className="my-2" />
                    <RamInfo />
                </Block>

                <Block>
                    <h3 className="text-lg font-bold">System</h3>
                    <hr className="my-2" />
                    <SystemInfo />
                </Block>

                <Block>
                    <h3 className="text-lg font-bold">CPU</h3>
                    <hr className="my-2" />
                    <CpuInfo />
                </Block>

                <Block>
                    <h3 className="text-lg font-bold">df -h</h3>
                    <hr className="my-2" />
                    <DiskSpace />
                </Block>

                <Block>
                    <h3 className="text-lg font-bold">Actions</h3>
                    <hr className="my-2" />
                    <ClientButtons />
                </Block>
            </>
        )
    }

    return (<SecuredPage></SecuredPage>)
}

export default DashboardPage