import { readFile } from "fs/promises"
import path from "path"

// force SSR
export const dynamic = "force-dynamic"

export async function GET() {
    const buffer = await readFile(path.join(process.cwd(), "app/logbook/", "logbook.xlsx"))

    const headers = new Headers()
    headers.append("Content-Disposition", "attachment filename='logbook.xlsx'")
    headers.append("Content-Type", "application/vnd.ms-excel")

    return new Response(buffer, {
        headers,
    })
}