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
import { useRouter } from "next/navigation";
import PaymentPage from "@/app/test/page";
import Payment from "./Payment";

const postData = async (url: string, data: any) => {
    try {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: data,
        });
        const responseData: any = await res.json();
        return responseData;
    } catch (error) {
        console.log(error);
    }
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
    const [checkInDate, setCheckInDate] = useState<Date>();
    const [checkOutDate, setCheckOutDate] = useState<Date>();
    const [alertMessage, setAlertMessage] = useState<null | {
        message: string;
        type: "error" | "success" | null;
    }>(null);

    const router = useRouter();

    const formatDateForStrapi = (date: Date) => {
        return date.toISOString().split("T")[0]; // Format to YYYY-MM-DD
    };

    // filter out reservations that overlap with the selected dates
    const isReserved = reservations.data
        .filter((item: any) => item.room.data.id == room.id)
        .some((item: any) => {
            if (!checkInDate || !checkOutDate) return false;
            const existingCheckIn = new Date(item.attributes.checkIn).setHours(
                0,
                0,
                0,
                0
            );
            const existingCheckout = new Date(
                item.attributes.checkOut
            ).setHours(0, 0, 0, 0);

            const checkInTime = checkInDate?.setHours(0, 0, 0, 0);
            const checkoutTime = checkOutDate?.setHours(0, 0, 0, 0);

            // check if overlaps
            const isReservedBetweenHours =
                (checkInTime >= existingCheckIn &&
                    checkInTime < existingCheckout) ||
                (checkoutTime > existingCheckIn &&
                    checkoutTime <= existingCheckout) ||
                (existingCheckIn > checkInTime &&
                    existingCheckIn < checkoutTime) ||
                (existingCheckout > checkInTime &&
                    existingCheckout < checkoutTime);
        });

    if (isReserved) {
        setAlertMessage({
            type: "error",
            message: "This room is already reserved for the selected dates.",
        });
    } else {
        const payload = {
            data: {
                firstName: userData?.firstName,
                lastName: userData?.lastName,
                email: userData?.email,
                checkIn: checkInDate ? formatDateForStrapi(checkInDate) : null,
                checkOut: checkOutDate
                    ? formatDateForStrapi(checkOutDate)
                    : null,
                room: room.id,
            },
        };

        postData("http://localhost:1337/api/reservations", payload);
        setAlertMessage({
            type: "success",
            message: "Reservation saved successfully.",
        });
        router.refresh();
    }

    const saveReservation = async () => {
        //
        if (!checkInDate || !checkOutDate) {
            setAlertMessage({
                type: "error",
                message: "Please select both check-in and check-out dates.",
            });

            if (checkInDate?.getTime() === checkOutDate?.getTime()) {
                setAlertMessage({
                    type: "error",
                    message: "Check-in and check-out dates cannot be the same.",
                });
            }

            return;
        }
        console.log("reservation saved");
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
                            amountInRupees={100}
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
