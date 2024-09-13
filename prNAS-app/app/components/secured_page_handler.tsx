"use server"

import { getCookies } from "next-client-cookies/server"
import bcrypt from "bcrypt"
import sanitize from "@components/sanitizer"

export const isUserAuthenticated = async (cookie_value: string) => {
    if (cookie_value === process.env.SECRET_COOKIE_PASSWORD) {
        return true
    } else {
        return false
    }
}

export async function HandlePassword(password: string) {
    // you can make a hash with: bcrypt.hash
    const hash = process.env.PASSWORD_HASH
    const secret_cookie = process.env.SECRET_COOKIE_PASSWORD
    const cookies = getCookies()

    if (hash === undefined || secret_cookie === undefined) {
        return 1
    }

    const passwords_match = await bcrypt.compare(password, hash)

    if (passwords_match) {
        cookies.set("SECRET_COOKIE_PASSWORD", secret_cookie)
        return 0
    }

    return 1
}

export const HandleFormData = async (formData: string) => {
    try {
        // get data from form
        const password: string = sanitize(formData)

        // check if null
        if (password === "" || password === " ") {
            return 1
        }

        return HandlePassword(password)
    } catch (error: unknown) {
        if (typeof error === "string") {
            console.error(error)
            return 1
        } else if (error instanceof Error) {
            console.error(error.message)
            return 1
        }
    }
}

export const SanitizePassword = async (formData: string) => {
    try {
        // get data from form
        const password: string = sanitize(formData)

        // check if null
        if (password === "" || password === " " || !password) {
            throw new Error("password undefined")
        }

        return password
    } catch (error: unknown) {
        if (typeof error === "string") {
            console.error(error)
            throw new Error("password undefined")
        } else if (error instanceof Error) {
            console.error(error.message)
            throw new Error("password undefined")
        }
    }
}