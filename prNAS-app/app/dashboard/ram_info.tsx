import { execSync } from "child_process"
import ProgressBar from "@components/progress_bar"

const RamInfo = () => {
    // get total ram in MB
    let query_ram_total: string = ""
    try {
        query_ram_total = execSync("free -m | awk '/Mem/{print $2}'", { encoding: "utf-8" })
    } catch (error) {
        console.error("execSync error: ${error}")
        query_ram_total = "error"
    }

    // get used ram in MB
    let query_ram_used: string = ""
    try {
        query_ram_used = execSync("free -m | awk '/Mem/{print $3}'", { encoding: "utf-8" })
    } catch (error) {
        console.error("execSync error: ${error}")
        query_ram_used = "error"
    }

    // get free ram in MB
    let query_ram_free: string = ""
    try {
        query_ram_free = execSync("free -m | awk '/Mem/{print $4}'", { encoding: "utf-8" })
    } catch (error) {
        console.error("execSync error: ${error}")
        query_ram_free = "error"
    }

    // calculate percentages
    const ram_usage_percent: number = Math.round(parseInt(query_ram_used) / parseInt(query_ram_total) * 100)
    const ram_usage_percent_width: string = String(ram_usage_percent) + "%"

    // https://flowbite.com/docs/components/progress/
    return (
        <>
            <ProgressBar title="RAM Usage" width={ram_usage_percent_width} progress={ram_usage_percent} />
            <p className="mt-2">Free: {query_ram_free}MB</p>
            <p>Used: {query_ram_used}MB</p>
            <p>Total: {query_ram_total}MB</p>
        </>
    )
}

export default RamInfo