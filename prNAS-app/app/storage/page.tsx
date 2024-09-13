import { Metadata } from "next"
import Block from "@components/block"
import Mdadm from "./mdadm"
import Lsblk from "./lsblk"
import DiskSpace from "./disk_space"

// force SSR
export const dynamic = "force-dynamic"

export const metadata: Metadata = {
    title: "Storage | prNAS",
}

const StoragePage = () => {
    return (
        <>
            <Block>
                <h3 className="text-lg font-bold">lsblk</h3>
                <hr className="my-2" />
                <Lsblk />
            </Block>

            <Block>
                <h3 className="text-lg font-bold">df -h</h3>
                <hr className="my-2" />
                <DiskSpace />
            </Block>

            <Block>
                <h3 className="text-lg font-bold">mdadm -D /dev/md0</h3>
                <hr className="my-2" />
                <Mdadm />
            </Block>
        </>
    )
}

export default StoragePage