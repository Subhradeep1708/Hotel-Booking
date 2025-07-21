"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format, isPast,isToday } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverAnchor,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const Reservation = ({
    reservations,
    room,
    isUserAuthenticated,
    userData,
}: {
    reservations: any[];
    room: any;
    isUserAuthenticated: boolean | null;
    userData: any;
}) => {
    const [checkinDate, setCheckinDate] = useState<Date>();
    const [checkoutDate, setCheckoutDate] = useState<Date>();
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
                                data-empty={!checkinDate}
                                className="data-[empty=true]:text-muted-foreground justify-start text-left font-semibold w-full mt-2"
                            >
                                <CalendarIcon />
                                {checkinDate ? (
                                    format(checkinDate, "PPP")
                                ) : (
                                    <span>Check In Date</span>
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                                mode="single"
                                selected={checkinDate}
                                onSelect={setCheckinDate}
                                disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                                
                                
                            />
                        </PopoverContent>
                    </Popover>
                    {/* Check Out Date */}
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                data-empty={!checkoutDate}
                                size={"lg"}
                                className="data-[empty=true]:text-muted-foreground justify-start text-left font-semibold w-full mt-2"
                            >
                                <CalendarIcon />
                                {checkoutDate ? (
                                    format(checkoutDate, "PPP")
                                ) : (
                                    <span>Check Out Date</span>
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                                mode="single"
                                selected={checkoutDate}
                                onSelect={setCheckoutDate}
                                disabled={isPast}
                                
                            />
                        </PopoverContent>
                    </Popover>

                    {/*  */}
                </div>
            </div>
        </div>
    );
};

export default Reservation;
