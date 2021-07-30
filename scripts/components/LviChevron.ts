import LviChevronDesign from 'generated/my-components/LviChevron';
import { Airline ,PassengerData } from "services/passenger";

export type passengerListViewData = {
    _id: string;
    name: string;
    trips: number;
    airline: Airline | Airline[];
    __v: number;
    height: number;
}

export default class LviChevron extends LviChevronDesign {
	pageName?: string | undefined;
	constructor(props?: any, pageName?: string) {
		// Initalizes super class for this scope
		super(props);
		this.pageName = pageName;
    }
    
    set airlineName(value: string) {
        this.lblLeft.text = value;
    }

    set trips(value: string) {
        this.lblCenter.text = value;
    }

    static processPassengerData(passengerData: PassengerData): passengerListViewData{
        let itemHeight = 50;
        if(passengerData.name.length > 14) {
            itemHeight = 70;
        };

        return {
            ...passengerData,
            height: itemHeight
        }

    }
}
