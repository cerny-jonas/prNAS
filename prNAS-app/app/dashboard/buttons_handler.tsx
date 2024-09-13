"use server"

import { execSync } from "child_process"

export const HandleRebootSubmit = async () => {
    // reboot
    try {
        const cmd = "sudo reboot"
        execSync(cmd, { encoding: "utf-8" })
    } catch (error: unknown) {
        return HandleError(error)
    }

    return 0
}

export const HandleRestartServiceSubmit = async () => {
    // restart prnas service
    try {
        const cmd = "sudo systemctl restart prnas-app.service"
        execSync(cmd, { encoding: "utf-8" })
    } catch (error: unknown) {
        return HandleError(error)
    }

    return 0
}

const HandleError = (error: unknown) => {
    if (typeof error === "string") {
        console.error(error)
        return error
    } else if (error instanceof Error) {
        console.error(error.message)
        return error.message
    }
}