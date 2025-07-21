import Image from "next/image";
import Link from "next/link";
import React from "react";

import { FaYoutube, FaInstagram, FaTwitter, FaFacebook } from "react-icons/fa";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import {
    LoginLink,
    RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { Dropdown } from "./Dropdown";
import { Button } from "./ui/button";

const socials = [
    {
        icon: <FaYoutube />,
        link: "https://youtube.com",
    },
    {
        icon: <FaInstagram />,
        link: "https://instagram.com",
    },
    {
        icon: <FaTwitter />,
        link: "https://twitter.com",
    },
    {
        icon: <FaFacebook />,
        link: "https://facebook.com",
    },
];

const Header = async () => {
    const { isAuthenticated, getUser } = getKindeServerSession();
    const isUserAuthenticated = await isAuthenticated();
    const user = isUserAuthenticated ? await getUser() : null;

    console.log("User Authenticated:", isUserAuthenticated);

    return (
        <header className="py-6 shadow-md ">
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row md:justify-between gap-6 max-w-5xl mx-auto ">
                    {/* logo & social icons */}
                    <div className="flex items-center gap-5 justify-center xl:w-max">
                        {/* logo */}
                        <Link href="/" className="flex items-center gap-2">
                            <Image
                                src="/assets/logo.svg"
                                alt="logo"
                                width={160}
                                height={160}
                            />
                            <span className="text-2xl font-bold">
                                Hotel Booking
                            </span>
                        </Link>
                        {/* separator */}
                        <div className="w-[1px] h-[40px] bg-gray-300"></div>
                        {/* social icons */}
                        <div className="flex gap-2">
                            {socials.map((item, index) => {
                                return (
                                    <Link
                                        key={index}
                                        href={item.link}
                                        className="bg-accent text-white hover:bg-accent-hover text-sm w-[28px] h-[28px] flex items-center justify-center transition-all rounded-full"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {item.icon}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                    {/* sign in & sign up */}
                    <div>
                        <div>
                            {isUserAuthenticated ? (
                                <Dropdown user={user} />
                            ) : (
                                <div className="flex gap-2">
                                    <LoginLink>
                                        <Button
                                            variant={"primary"}
                                            className=""
                                        >
                                            Sign In
                                        </Button>
                                    </LoginLink>
                                    <RegisterLink className="">
                                        <Button variant={"primary"}>
                                            Register
                                        </Button>
                                    </RegisterLink>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
