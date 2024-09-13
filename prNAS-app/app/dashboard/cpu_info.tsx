import { execSync } from "child_process"

const CpuInfo = () => {
    // get uptime, cut the first character (whitespace) and remove linebreak
    let query_uptime: string = ""
    try {
        query_uptime = execSync("uptime | cut -c2- | tr '\n' ' ' | sed 's/.$//'", { encoding: "utf-8" })
    } catch (error) {
        console.error("execSync error: ${error}")
        query_uptime = "error"
    }

    // get cpu load info and remove linebreak
    let query_top: string = "CPU Load: "
    try {
        query_top += execSync("top -bn1 | awk '/Cpu/ { print $2 }' | tr '\n' ' ' | sed 's/.$//'", { encoding: "utf-8" })
    } catch (error) {
        console.error("execSync error: ${error}")
        query_top = "error"
    }
    query_top += "%"

    return (
        <pre className="text-sm whitespace-pre-wrap tracking-tighter">{query_uptime + "\n" + query_top}</pre>
    )
}

export default CpuInfo