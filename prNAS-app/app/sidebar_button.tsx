import Link from "next/link"
import Image from "next/image"

const SidebarButton = ({ href, title, iconPath, iconAlt, prefetch = true }: { href: string, title: string, iconPath: string, iconAlt: string, prefetch?: boolean }) => {
    return (
        <div className="md:py-2 first:md:pt-4 last:md:pb-4 first:pt-2 last:pb-2 flex-none">
            <Link href={href} prefetch={prefetch} className="flex p-1 md:p-2 rounded-lg flex-nowrap gap-1 items-center ml-2 hover:bg-slate-500/50 transition delay-[1ms] motion-reduce:transition-none">

                <div className="flex-initial h-4 w-4 relative mr-[1px]">
                    <Image
                        className="p-[1px]"
                        src={iconPath}
                        fill={true}
                        alt={iconAlt}
                    />
                </div>

                <div className="flex-initial">
                    <p>{title}</p>
                </div>

            </Link>
        </div>
    )
}

export default SidebarButton
