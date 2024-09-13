import { execSync } from "child_process"

const UserList = () => {
    // get all Samba users
    let query: string = ""
    try {
        query = execSync("sudo pdbedit -L", { encoding: "utf-8" })
    } catch (error) {
        console.error("execSync error: ${error}")
        query = "error"
    }

    return (
        <p className="text-sm whitespace-pre tracking-tighter font-light">{query}</p>
    )
}

export default UserList