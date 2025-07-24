"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaStar, FaStarHalf } from "react-icons/fa";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const RoomList = ({ rooms }: { rooms: any }) => {
    // console.log(rooms);

    const [roomType, setRoomType] = useState<
        "all" | "single" | "double" | "extended"
    >("all");

    const [filteredRooms, setFilteredRooms] = useState([...rooms.data]);

    useEffect(() => {
        if (roomType === "all") {
            setFilteredRooms(rooms.data);
        } else {
            const filtered = rooms.data.filter(
                (room: any) => room.type === roomType
            );
            setFilteredRooms(filtered);
        }
    }, [roomType, rooms.data]);

    return (
        <section className="py-16 min-h-[90vh]">
            {/* Titile */}
            <div className="flex flex-col items-center text-center ">
                <div className="relative w-[82px] h-[20px] mb-8">
                    <Image
                        src={"/assets/heading-icon.svg"}
                        alt="heading-logo"
                        fill
                    />
                </div>
                <h3 className="h2 mb-8">Our Room</h3>
            </div>

            {/* tabs */}
            <div>
                <Tabs
                    defaultValue="all"
                    className="mx-auto w-[240px] lg:w-[540px] h-[200px] lg:h-auto mb-8"
                >
                    <TabsList className="w-full h-full lg:h-[46px] flex flex-col lg:flex-row">
                        <TabsTrigger
                            value="all"
                            className="w-full h-full "
                            onClick={() => setRoomType("all")}
                        >
                            All
                        </TabsTrigger>
                        <TabsTrigger
                            value="single"
                            className="w-full h-full"
                            onClick={() => setRoomType("single")}
                        >
                            Single
                        </TabsTrigger>
                        <TabsTrigger
                            value="double"
                            className="w-full h-full"
                            onClick={() => setRoomType("double")}
                        >
                            Double
                        </TabsTrigger>
                        <TabsTrigger
                            value="extended"
                            className="w-full h-full"
                            onClick={() => setRoomType("extended")}
                        >
                            Extended
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-5xl mx-auto">
                {filteredRooms.map((room: any) => {
                    const imageURL = `${room.image.url} `;
                    return (
                        <div key={room.id}>
                            <Link href={`/room/${room.documentId}`}>
                                <div className="relative w-full aspect-square mb-6 overflow-hidden">
                                    <Image
                                        src={imageURL}
                                        fill
                                        priority
                                        alt=""
                                        className="object-cover rounded-tl-xl rounded-br-xl"
                                    />
                                </div>
                            </Link>
                            <div className="h-[134px] ">
                                <div className="flex items-center justify-between mb-6">
                                    <div>Capacity:{room.capacity} Persons</div>
                                    <div className="flex gap-1 text-accent ">
                                        <FaStar />
                                        <FaStar />
                                        <FaStar />
                                        <FaStar />
                                        <FaStarHalf />
                                    </div>
                                </div>
                                <Link href={`/room/${room.documentId}`}>
                                    <h3 className="h3">{room.name}</h3>
                                </Link>
                                <p className="h3 font-secondary font-bold text-accent mb-4">
                                    <span>$</span> {room.price + " "}
                                    <span className="text-base font-medium text-secondary">
                                        / night
                                    </span>
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default RoomList;
