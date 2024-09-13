"use server"

import { execSync } from "child_process"
import sanitize from "@components/sanitizer"

export type deleteUserFormData = {
    username: string
}

export const HandleDeleteUserFormData = async (formData: deleteUserFormData) => {
    try {
        // get data from form
        const username: string = sanitize(formData.username)

        // check if null
        if (username === "" || username === " ") {
            return (<p>returned null or incomplete data</p>)
        }

        DeleteUser({ username })
    } catch (error: unknown) {
        return HandleError(error)
    }
}

const DeleteUser = ({ username }: { username: string }) => {
    // stop all user processes
    try {
        const cmd = "sudo killall -q -u " + username
        execSync(cmd, { encoding: "utf-8" })
    } catch (error: unknown) {
        // TODO fix this
        // ignore errors, shits fucked
        //return HandleError(error)
    }

    // delete Samba user
    try {
        const cmd = "sudo smbpasswd -x " + username
        execSync(cmd, { encoding: "utf-8" })
    } catch (error: unknown) {
        return HandleError(error)
    }

    // delete system user
    try {
        const cmd = "sudo userdel -r " + username
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