import { execSync } from "child_process"

const SystemInfo = () => {
    // get uname info
    let query_uname: string = ""
    try {
        query_uname = execSync("uname -a", { encoding: "utf-8" })
    } catch (error) {
        console.error("execSync error: ${error}")
        query_uname = "error"
    }

    // get distro description
    let query_lsb: string = ""
    try {
        query_lsb = execSync("lsb_release -sd | tail -n 1", { encoding: "utf-8" })
    } catch (error) {
        console.error("execSync error: ${error}")
        query_lsb = "error"
    }

    return (
        <pre className="text-sm whitespace-pre-wrap tracking-tighter">{query_uname + query_lsb}</pre>
    )
}

export default SystemInfo