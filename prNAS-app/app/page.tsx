import { Metadata } from "next"
import Block from "@components/block"
import RamInfo from "@/dashboard/ram_info"
import DiskSpace from "@/storage/disk_space"

// force SSR
export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Home | prNAS",
}

const Home = () => {
  return (
    <>
      <Block>
        <h1 className="text-lg font-bold ">
          Welcome to prNAS!
        </h1>
      </Block>

      <Block>
        <h3 className="text-lg font-bold">RAM</h3>
        <hr className="my-2" />
        <RamInfo />
      </Block>

      <Block>
        <h3 className="text-lg font-bold">df -h</h3>
        <hr className="my-2" />
        <DiskSpace />
      </Block>
    </>
  )
}

export default Home