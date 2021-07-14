import { scPassenger } from "./index";

export type Airline = {
    id: number;
    name: string;
    country: string;
    logo: string;
    slogan: string;
    head_quaters: string;
    website: string;
    established: number;

}

export type PassengerData = {
    _id: string;
    name: string;
    trips: number;
    airline: Airline;
    __v: number;
}

type AllPassengerData = {
    totalPassengers: number;
    totalPages: number;
    data: PassengerData[];
}

export async function getPassenger(page: number): Promise<AllPassengerData> {
    try {
        const response: AllPassengerData = await scPassenger.request(`/v1/passenger?page=${page}&size=10`, {
            method: "GET"
        });

        return response;

    } catch (err) {
        console.error(err);
        throw err;
    }
}