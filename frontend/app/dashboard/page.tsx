import CancelReservation from "@/components/CancelReservation";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { format } from "date-fns";
import React from "react";

const getUserReservation = async (userEmail: any) => {
    try {
        const response = await fetch(
            `${process.env.STRAPI_API_URL}/api/reservations?filters[email][$eqi]=${userEmail}&populate=room`,
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
    // console.log("user in dashboard page", user?.email);

    const userReservations = await getUserReservation(user?.email);
    // console.log("User Reservations:", userReservations.data);

    return (
        <section className="min-h-[80vh]">
            <div className="container mx-auto py-8 h-full">
                <h3 className="h3 font-bold mb-12 border-b pb-4 text-center lg:text-left">
                    My Bookings
                </h3>
                <div>
                    {userReservations?.data?.length > 0 ? (
                        userReservations.data.map((item: any, idx: number) => (
                            <div
                                key={item.id}
                                className="bg-tertiary py-8 px-12 "
                            >
                                <div className="flex flex-col lg:flex-row gap-8 items-center justify-between">
                                    <h3 className="text-2xl font-medium text-center w-[200px] lg:text-left">
                                        {item.room.title}
                                    </h3>
                                    {/* check in and check out */}
                                    <div className="flex flex-col lg:flex-row gap-4  lg:w-[380px]">
                                        <div className="flex items-center gap-1 flex-1">
                                            <span className="text-accent font-bold uppercase tracking-tighter">
                                                from:
                                            </span>{" "}
                                            <span className="text-secondary font-semibold">
                                                {format(item.chackIn, "PPP")}
                                            </span>
                                        </div>
                                        <div>
                                            <span className="text-accent font-bold uppercase tracking-tighter">
                                                to:
                                            </span>{" "}
                                            <span className="text-secondary font-semibold">
                                                {format(item.checkOut, "PPP")}
                                            </span>
                                        </div>
                                    </div>
                                    {/* cancel reservation */}
                                    <CancelReservation reservation={item} />
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>You dont have any reservation</p>
                    )}
                </div>
            </div>
        </section>
    );
};

export default page;
