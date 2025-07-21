import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import Link from "next/link";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { FaCalendarCheck, FaHome, FaSignOutAlt } from "react-icons/fa";

export const Dropdown = ({ user }: { user: any }) => {
    console.log(user);
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-3 cursor-pointer mx-2">
                    {/* avatar */}
                    <Avatar>
                        <AvatarImage src={user.picture} />
                        <AvatarFallback className="bg-accent text-white">
                            {`${user.given_name?.[0] ?? ""}${
                                user.family_name?.[0]
                                    ? " " + user.family_name[0]
                                    : ""
                            }`}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <div className="flex gap-1 font-bold text-sm">
                            <p>{user.given_name}</p>
                            <p>{user.family_name}</p>
                        </div>
                        <p className="text-xs font-semibold">{user.email}</p>
                    </div>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-72 mt-4 p-4 flex flex-col gap-2 items-start">
                <DropdownMenuLabel className="text-base">
                    My Account
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup className="flex flex-col gap-2">
                    <Link href="/">
                        <DropdownMenuItem>
                            Homepage
                            <DropdownMenuShortcut className="text-lg text-accent">
                                <FaHome />
                            </DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </Link>
                    <Link href="/dashboard">
                        <DropdownMenuItem>
                            My Bookings
                            <DropdownMenuShortcut className="text-lg text-accent">
                                <FaCalendarCheck />
                            </DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </Link>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <LogoutLink>
                    <DropdownMenuItem>
                        Logout
                        <DropdownMenuShortcut className="text-lg text-accent">
                            <FaSignOutAlt />
                        </DropdownMenuShortcut>
                    </DropdownMenuItem>
                </LogoutLink>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
