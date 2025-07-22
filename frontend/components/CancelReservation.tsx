import React from "react";
import { Button } from "./ui/button";

const CancelReservation = ({ reservation }: { reservation: any }) => {
    return (
        <Button variant={"primary"} disabled>
            Cancel Reservation
        </Button>
    );
};

export default CancelReservation;
