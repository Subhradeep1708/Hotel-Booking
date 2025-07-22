import CancelReservation from "@/components/CancelReservation";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { format } from "date-fns";
import React from "react";

const getUserReservation = async (userEmail: any) => {
    try {
        const response = await fetch(
            `http://localhost:1337/api/reservations?filters[user][email][$eq]=${userEmail}&populate=*`,
            {
                next: { revalidate: 0 },
            }
        );
        if (!response.ok) {
            console.error("Failed to fetch reservations");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching reservations:", error);
    }
};

const page = async () => {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const userReservations = await getUserReservation(user?.email);
    return (
        <section className="min-h-[80vh]">
            <div className="container mx-auto py-8 h-full">
                <h3 className="h3 font-bold mb-12 border-b pb-4 text-center lg:text-left">
                    My Bookings
                </h3>
                <div>
                    {userReservations?.data?.length > 0 ? (
                        userReservations.data.map(
                            (reservation: any, idx: number) => (
                                <div
                                    key={reservation.id}
                                    className="bg-tertiary py-8 px-12 "
                                >
                                    <div className="flex flex-col lg:flex-row gap-8 items-center justify-between">
                                        <h3 className="text-2xl font-medium text-center w-[200px] lg:text-left">
                                            {
                                                reservation.data.room.data
                                                    .attributes.title
                                            }
                                        </h3>
                                        {/* check in and check out */}
                                        <div className="flex flex-col lg:flex-row gap-4  lg:w-[3800px]">
                                            <div className="flex items-center gap-1 flex-1">
                                                <span className="text-accent font-bold uppercase tracking-tighter">
                                                    from:
                                                </span>{" "}
                                                <span className="text-secondary font-semibold">
                                                    {format(
                                                        reservation.data
                                                            .checkIn,
                                                        "PPP"
                                                    )}
                                                </span>
                                            </div>
                                            <div>
                                                <span className="text-accent font-bold uppercase tracking-tighter">
                                                    to:
                                                </span>{" "}
                                                <span className="text-secondary font-semibold">
                                                    {format(
                                                        reservation.data
                                                            .checkOut,
                                                        "PPP"
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                        {/* cancel reservation */}
                                        <CancelReservation
                                            reservation={reservation}
                                        />
                                    </div>
                                </div>
                            )
                        )
                    ) : (
                        <p>You dont have any reservation</p>
                    )}
                </div>
            </div>
        </section>
    );
};

export default page;
