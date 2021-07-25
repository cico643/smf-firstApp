import LviChevronDesign from 'generated/my-components/LviChevron';

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
}
