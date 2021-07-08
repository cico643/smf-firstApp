import LviTwoLabelDesign from 'generated/my-components/LviTwoLabel';
import Color = require('@smartface/native/ui/color');

export default class LviTwoLabel extends LviTwoLabelDesign {
	pageName?: string | undefined;
	constructor(props?: any, pageName?: string) {
		// Initalizes super class for this scope
		super(props);
		this.pageName = pageName;
    }
    
     set titleText(value: string) {
        this.lblTitle.text = value;
    }


    set contentText(value: string) {
        this.lblContent.text = value;
    }

    set color(value: string) {
        this.lblTitle.textColor = Color.create(value);
        this.lblContent.textColor = Color.create(value);
    }
}
