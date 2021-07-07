import LviColorDesign from 'generated/my-components/LviColor';
import Color from "@smartface/native/ui/color";

export default class LviColor extends LviColorDesign {
	pageName?: string | undefined;
	constructor(props?: any, pageName?: string) {
		// Initalizes super class for this scope
		super(props);
        this.pageName = pageName;
    }
    
    set colorName(value: string) {
        this.lblName.text = value;
    }

    set colorYear(value: string) {
        this.lblYear.text = value;
    }

    set color(value: string) {
        this.lblName.textColor = Color.create(value);
        this.lblYear.textColor = Color.create(value);
    }
}
