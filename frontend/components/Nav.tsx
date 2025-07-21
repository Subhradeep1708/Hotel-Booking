"use client"

import Link from "next/link";
import { redirect, usePathname } from "next/navigation";

const links = [
    { name: "Home", href: "/" },
    { name: "Restaurant", href: "/rooms" },
    { name: "Pool", href: "/about" },
    { name: "Contact", href: "/contact" },

]


const Nav = ({ isUserAuthenticated }: { isUserAuthenticated: boolean | null }) => {
    console.log("User Authenticated in Nav:", isUserAuthenticated);

    const pathname = usePathname();
    return (
        <nav>
            <ul className="flex flex-col lg:flex-row gap-6 ">
                {links.map((link, index) => (
                    <li key={index} className="text-base font-primary hover:text-accent-hover transition-all">
                        <Link href={link.href} className="text-primary hover:text-accent">
                            {link.name}
                        </Link>
                    </li>
                ))}
            </ul>
            {/* redirecting to the homepage if the user is not authenticated and pathname is /dashboard  */}
            {!isUserAuthenticated && pathname === "/dashboard" && redirect("/")}
        </nav>
    )
}

export default Nav
