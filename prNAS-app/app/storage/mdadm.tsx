import { execSync } from "child_process"

const Mdadm = () => {
    // get mdadm info about md0 array
    let query: string = ""
    try {
        query = execSync("sudo mdadm -D /dev/md0", { encoding: "utf-8" })
    } catch (error) {
        console.error("execSync error: ${error}")
        query = "error"
    }

    return (
        <p className="text-sm whitespace-pre tracking-tighter font-light">{query}</p>
    )
}

export default Mdadm