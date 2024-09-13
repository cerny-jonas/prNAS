"use server"

import path from "path"
import ExcelJS from "exceljs"
import moment from "moment"
import { SanitizePassword } from "@components/secured_page_handler"
import bcrypt from "bcrypt"

import { fileURLToPath } from "url"
import { dirname } from "path"
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const filePath = path.resolve(__dirname, "logbook.xlsx")

export type logbookFormData = {
    driver: string,
    password: string,
    km_before: number,
    km_after: number
}

export const Create = async () => {
    try {
        const workbook = new ExcelJS.Workbook()

        const datasheet = workbook.addWorksheet("Data")

        datasheet.columns = [
            { header: "Id", key: "id", width: 16 },
            { header: "Driver", key: "driver", width: 16 },
            { header: "Km before", key: "km_before", width: 28 },
            { header: "Km after", key: "km_after", width: 28 },
            { header: "Distance driven", key: "distance_driven", width: 16 },
            { header: "Date", key: "date", width: 28 }
        ]

        await workbook.xlsx.writeFile(filePath)

        return 0
    } catch (error: unknown) {
        return HandleError(error)
    }
}

export const AppendRow = async (formData: logbookFormData) => {
    try {
        if (!formData.driver) throw new Error("driver undefined")
        if (!formData.password) throw new Error("password undefined")
        if (!+formData.km_before) throw new Error("km_before undefined")
        if (!+formData.km_after) throw new Error("km_after undefined")
        if (+formData.km_before < 0) throw new Error("km_before negative")
        if (+formData.km_after < 0) throw new Error("km_after negative")

        const passwd = await SanitizePassword(formData.password)
        if (!passwd) throw new Error("password undefined")

        let hash: string | undefined = undefined
        let passwords_match: boolean | undefined = undefined

        switch (formData.driver) {
            case "Jonas":
                hash = process.env.DRIVER_JONAS_PASSWORD_HASH
                break

            case "Vojtech":
                hash = process.env.DRIVER_VOJTECH_PASSWORD_HASH
                break

            default:
                throw new Error("No matching driver with that password found")
        }

        if (!hash) throw new Error("hash undefined")
        passwords_match = await bcrypt.compare(passwd, hash)

        if (passwords_match !== true) throw new Error("No matching driver with that password found")

        const workbook = await (new ExcelJS.Workbook().xlsx.readFile(filePath))
        if (!workbook) throw new Error("Workbook undefined")

        const datasheet = workbook.getWorksheet("Data")
        if (!datasheet) throw new Error("Datasheet undefined")

        datasheet.columns = [
            { header: "Id", key: "id", width: 16 },
            { header: "Driver", key: "driver", width: 16 },
            { header: "Km before", key: "km_before", width: 28 },
            { header: "Km after", key: "km_after", width: 28 },
            { header: "Distance driven", key: "distance_driven", width: 16 },
            { header: "Date", key: "date", width: 28 }
        ]

        const last_index = datasheet.lastRow?.getCell(1).value
        let last_id: number = 0
        if (!last_index || !(typeof (last_index) == typeof (5))) {
            last_id = 0
        } else {
            last_id = +last_index
        }

        if ((formData.km_after - formData.km_before) < 0 || formData.km_after < formData.km_before) {
            throw new Error("km_after cannot be smaller than km_before")
        }

        const id: number = last_id + 1
        const driver: string = formData.driver
        const km_before: number = formData.km_before
        const km_after: number = formData.km_after
        const distance_driven: number = km_after - km_before
        const date: string = moment().format()

        const row = { id: id, driver: driver, km_before: km_before, km_after: km_after, distance_driven: distance_driven, date: date }
        datasheet.addRow(row)

        await workbook.xlsx.writeFile(filePath)

        return JSON.stringify(row)
    } catch (error: unknown) {
        return HandleError(error)
    }
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