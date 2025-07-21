"use client"
import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { FaBars } from "react-icons/fa"
import Link from "next/link"

const links = [
    { name: "Home", href: "/" },
    { name: "Restaurant", href: "/rooms" },
    { name: "Pool", href: "/about" },
    { name: "Contact", href: "/contact" },

]

const MobileNav = () => {
    return (
        <Sheet>
            <SheetTrigger className=" pointer-cursor text-2xl text-primary flex items-center">
                <FaBars />
            </SheetTrigger>
            <SheetContent side="left" className="justify-center items-center w-[250px]">
                <SheetHeader>
                    <SheetTitle className="text-center">Booky</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col  gap-8 text-center mt-4 text-2xl font-primary hover:text-accent-hover transition-all">
                    {links.map((link) => (
                        <Link key={link.name} href={link.href} className="text-lg text-primary hover:text-accent">
                            {link.name}
                        </Link>
                    ))}
                </nav>
            </SheetContent>
        </Sheet>
    )
}

export default MobileNav