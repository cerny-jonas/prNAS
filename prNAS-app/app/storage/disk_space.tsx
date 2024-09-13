import { execSync } from "child_process"

const DiskSpace = () => {
    // get free space on disks
    let query: string = ""
    try {
        query = execSync("df -h", { encoding: "utf-8" })
    } catch (error) {
        console.error("execSync error: ${error}")
        query = "error"
    }

    return (
        <pre className="text-sm whitespace-pre-wrap tracking-tighter">{query}</pre>
    )
}

export default DiskSpace