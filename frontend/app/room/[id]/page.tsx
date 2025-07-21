import Reservation from "@/components/Reservation";
import Image from "next/image";
import {
    TbArrowsCross,
    TbArrowsMaximize,
    TbUser,
    TbUsers,
} from "react-icons/tb";

const RoomDetails = async ({ params }: { params: Promise<{ id: string }> }) => {
    const id = (await params).id;
    let room: any;
    try {
        const res = await fetch(
            `http://127.0.0.1:1337/api/rooms/${id}?populate=*`
        );
        // console.log("success::", res);
        const result = await res.json();
        room = result.data;
        console.log("data::", result);
    } catch (error) {
        console.log("error");
    }
    const imgURL = `http://127.0.0.1:1337${room.image.url}`;
    console.log("imgURL::", imgURL);

    return (
        <section className="min-h-[80vh]">
            <div className="container mx-auto py-8">
                <div className="flex flex-col lg:flex-row lg:gap-12 h-full ">
                    {/* img and text */}
                    <div className="flex-1 ">
                        {/* image */}
                        <div className="relative h-[360px] lg:h-[420px] mb-8 rounded-tl-xl rounded-br-xl overflow-hidden">
                            <Image
                                src={imgURL}
                                fill
                                alt=""
                                className="object-cover"
                            />
                        </div>
                        <div className="flex flex-1 flex-col mb-8">
                            {/* title and price */}
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="h3">{room.title}</h3>
                                <p className="h3 font-secondary font-medium text-accent">
                                    ${room.price}
                                    <span className="text-base text-secondary">
                                        / night
                                    </span>
                                </p>
                            </div>
                            {/* info */}
                            <div className="flex items-center gap-8 mb-4">
                                <div className="flex items-center gap-2">
                                    <div className="text-2xl text-accent">
                                        <TbArrowsMaximize />
                                    </div>
                                    <p>
                                        {room.size} m <sup>2</sup>
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="text-2xl text-accent">
                                        <TbUsers />
                                    </div>
                                    <p>{room.capacity} Guests</p>
                                </div>
                            </div>
                            <p>{room.description}</p>
                        </div>
                    </div>
                    {/* reservation */}
                    <div className="w-full lg:max-w-[360px] h-max">
                        <Reservation />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RoomDetails;
