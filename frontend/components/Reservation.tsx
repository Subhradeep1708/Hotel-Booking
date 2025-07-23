// 2 hour 39 minutes
"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format, isPast, isToday } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverAnchor,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import Payment from "./Payment";
import { toast } from "sonner";
import { STRAPI_API_URL } from "@/utils/env";

const normalizeDate = (date: Date): number => {
    return new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
    ).getTime();
};

const parseStrapiDate = (dateStr: string): Date => {
    const [year, month, day] = dateStr.split("-").map(Number);
    return new Date(year, month - 1, day); // Strapi stores YYYY-MM-DD
};

const checkReservationOverlap = (
    reservations: any[],
    userCheckInDate: Date,
    userCheckOutDate: Date
): boolean => {
    if (!userCheckInDate || !userCheckOutDate) return false;
    const userCheckIn = normalizeDate(userCheckInDate);
    const userCheckOut = normalizeDate(userCheckOutDate);
    return reservations.some((res) => {
        const existingCheckIn = normalizeDate(parseStrapiDate(res.chackIn));
        const existingCheckOut = normalizeDate(parseStrapiDate(res.checkOut));
        return userCheckIn < existingCheckOut && userCheckOut > existingCheckIn;
    });
};

const Reservation = ({
    reservations,
    room,
    isUserAuthenticated,
    userData,
}: {
    reservations: any;
    room: any;
    isUserAuthenticated: boolean | null;
    userData: any;
}) => {
    const [checkInDate, setCheckInDate] = useState<any | undefined>();
    const [checkOutDate, setCheckOutDate] = useState<any | undefined>();
    const [alertMessage, setAlertMessage] = useState<null | {
        message: string;
        type: "error" | "success" | null;
    }>(null);
    console.log("User Data:", userData);

    useEffect(() => {
        toast("Select a date to check availability");
    }, [checkInDate]);

    useEffect(() => {
        console.log("checkInDate", checkInDate);
        toast("selected a date");
        if (checkInDate && checkOutDate) {
            const isOverlap = checkReservationOverlap(
                reservations,
                checkInDate,
                checkOutDate
            );

            if (isOverlap) {
                toast.success("Dates are not available for booking.");
            } else {
                toast.error("Dates are available for booking.");
            }
        } else {
            setAlertMessage(null);
        }
    }, [checkInDate, checkOutDate]);

    // console.log("Room", room.price);
    const saveReservation = async () => {
        if (!checkInDate || !checkOutDate) {
            toast("Please select both check-in and check-out dates.");
            return;
        }

        const formattedCheckIn = format(checkInDate, "yyyy-MM-dd");
        const formattedCheckOut = format(checkOutDate, "yyyy-MM-dd");

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/reservations`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        data: {
                            firstname: userData?.given_name || "",
                            lastname: userData.family_name || "",
                            email: userData?.email,
                            chackIn: formattedCheckIn,
                            checkOut: formattedCheckOut,
                            room: room.documentId,
                        },
                    }),
                }
            );

            if (!res.ok) throw new Error("Failed to save reservation");
            toast("Reservation saved successfully!");
        } catch (err) {
            console.error(err);
            toast("Error saving reservation");
        }
    };

    return (
        <div>
            <div className="bg-tertiary h-[320px] mb-4">
                <div className="bg-accent py-4 text-center relative mb-2">
                    <h4 className="text-xl text-white">Book Your Room</h4>

                    <div className="absolute -bottom-[8px] left-[calc(50%_-_10px)] w-0 h-0 border-l-[10px] border-l-transparent border-t-[8px] border-t-accent border-r-[10px] border-r-transparent"></div>
                </div>
                <div className="flex flex-col gap-4 w-full py-6 px-8">
                    {/* Check in Date */}
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                size={"lg"}
                                data-empty={!checkInDate}
                                className="data-[empty=true]:text-muted-foreground justify-start text-left font-semibold w-full mt-2"
                            >
                                <CalendarIcon />
                                {checkInDate ? (
                                    format(checkInDate, "PPP")
                                ) : (
                                    <span>Check In Date</span>
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                                mode="single"
                                selected={checkInDate}
                                onSelect={setCheckInDate}
                                disabled={(date) =>
                                    date <
                                    new Date(new Date().setHours(0, 0, 0, 0))
                                }
                            />
                        </PopoverContent>
                    </Popover>
                    {/* Check Out Date */}
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                data-empty={!checkOutDate}
                                size={"lg"}
                                className="data-[empty=true]:text-muted-foreground justify-start text-left font-semibold w-full mt-2"
                            >
                                <CalendarIcon />
                                {checkOutDate ? (
                                    format(checkOutDate, "PPP")
                                ) : (
                                    <span>Check Out Date</span>
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                                mode="single"
                                selected={checkOutDate}
                                onSelect={setCheckOutDate}
                                disabled={isPast}
                            />
                        </PopoverContent>
                    </Popover>

                    {/*  */}
                    {isUserAuthenticated ? (
                        <Payment
                            onPaymentSuccess={saveReservation}
                            amountInRupees={room.price}
                            customerData={{
                                firstName: userData?.firstName,
                                lastName: userData?.lastName,
                                email: userData?.email,
                            }}
                        >
                            Book Now
                        </Payment>
                    ) : (
                        <LoginLink>
                            <Button
                                className="w-full"
                                variant={"primary"}
                                size={"lg"}
                            >
                                Log In to Book
                            </Button>
                        </LoginLink>
                    )}

                    {alertMessage && (
                        <div
                            className={cn(
                                "p-4 rounded-md font-semibold text-sm",
                                alertMessage.type === "error"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-green-100 text-green-800"
                            )}
                        >
                            {alertMessage.message}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Reservation;
