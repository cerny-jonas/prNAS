import { execSync } from "child_process"

// force SSR
export const dynamic = "force-dynamic"

const TimePage = () => {
    // get date+time
    let output: string = ""
    try {
        output = execSync("date", { encoding: 'utf-8' })
    } catch (error) {
        console.error("execSync error: ${error}")
        output = "error"
    }

    return (
        <p>{output}</p>
    )
}

export default TimePage