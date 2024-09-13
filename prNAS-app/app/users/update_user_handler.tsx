"use server"

import { execSync } from "child_process"
import sanitize from "@components/sanitizer"

export type updateUserFormData = {
    username: string,
    password: string
}

export const HandleUpdateUserFormData = async (formData: updateUserFormData) => {
    try {
        // get data from form
        const username: string = sanitize(formData.username)
        const password: string = sanitize(formData.password)

        // check if null
        if (username === "" || password === "" || username === " " || password === " ") {
            return (<p>returned null or incomplete data</p>)
        }

        UpdateUser({ username, password })
    } catch (error: unknown) {
        return HandleError(error)
    }
}

const UpdateUser = ({ username, password }: { username: string, password: string }) => {
    // change user system password
    try {
        const cmd = "echo '" + username + ":" + password + "' | sudo chpasswd"
        execSync(cmd, { encoding: "utf-8" })
    } catch (error: unknown) {
        return HandleError(error)
    }

    // change user Samba password
    try {
        const cmd = 'printf "' + password + '\\n' + password + '\\n"' + ' | sudo smbpasswd -s ' + username
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