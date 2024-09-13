"use server"

import { execSync } from "child_process"
import sanitize from "@components/sanitizer"

export type createUserFormData = {
    username: string,
    password: string
}

export const HandleCreateUserFormData = async (formData: createUserFormData) => {
    try {
        // get data from form
        const username: string = sanitize(formData.username)
        const password: string = sanitize(formData.password)

        // check if null
        if (username === "" || password === "" || username === " " || password === " ") {
            return (<p>returned null or incomplete data</p>)
        }

        CreateUser({ username, password })
    } catch (error: unknown) {
        return HandleError(error)
    }
}

const CreateUser = ({ username, password }: { username: string, password: string }) => {
    // create a user with a home directory and no shell
    try {
        const cmd = "sudo useradd -m -s /usr/sbin/nologin " + username
        execSync(cmd, { encoding: "utf-8" })
    } catch (error: unknown) {
        return HandleError(error)
    }

    // change user system password
    try {
        const cmd = "echo '" + username + ":" + password + "' | sudo chpasswd"
        execSync(cmd, { encoding: "utf-8" })
    } catch (error: unknown) {
        return HandleError(error)
    }

    // change user Samba password
    try {
        const cmd = 'printf "' + password + '\\n' + password + '\\n"' + ' | sudo smbpasswd -as ' + username
        execSync(cmd, { encoding: "utf-8" })
    } catch (error: unknown) {
        return HandleError(error)
    }

    // restrict home directory access
    try {
        const cmd = "sudo chmod 700 /home/" + username
        execSync(cmd, { encoding: "utf-8" })
    } catch (error: unknown) {
        return HandleError(error)
    }

    // add access to shared Samba share
    try {
        const cmd = "sudo usermod -aG samba_shared " + username
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