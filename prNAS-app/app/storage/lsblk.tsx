import { execSync } from "child_process"

const Lsblk = () => {
    // get lsblk info
    let query: string = ""
    try {
        query = execSync("lsblk", { encoding: "utf-8" })
    } catch (error) {
        console.error("execSync error: ${error}")
        query = "error"
    }

    return (
        <pre className="text-sm whitespace-pre-wrap tracking-tighter">{query}</pre>
    )
}

export default Lsblk