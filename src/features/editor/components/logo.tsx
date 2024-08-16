import Image from "next/image"
import Link from "next/link"

export const Logo = () =>{
    return (
        <Link href="/" className="flex items-center gap-x-1 uppercase hover:opacity-75 transition">
            <div className="size-8 relative shrink-0">
                <Image src="/logo.svg" alt="logo" fill className="shrink-0"/>
            </div>
                <span className="text-lg font-light">DesignArt</span>
        </Link>
    )
}