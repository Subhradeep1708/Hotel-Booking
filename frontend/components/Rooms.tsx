import React from 'react'
import RoomList from './RoomList'
import { STRAPI_API_URL } from '@/utils/env'

const getRooms = async () => {
    const res = await fetch(`${STRAPI_API_URL}/api/rooms?populate=*`, {
        next: {
            revalidate: 0,
        }
    })
    return await res.json()
}

const Rooms = async () => {
    const rooms = await getRooms()
    // console.log(rooms);

    return (
        <section>

            <div className="container mx-auto">
                <RoomList rooms={rooms} />
            </div>
        </section>
    )
}

export default Rooms
