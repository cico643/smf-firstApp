import LviSwitchDesign from 'generated/my-components/LviSwitch';


export default class LviSwitch extends LviSwitchDesign {
	pageName?: string | undefined;
	constructor(props?: any, pageName?: string) {
		// Initalizes super class for this scope
		super(props);
		this.pageName = pageName;
    }
    
    set titleText(value: string) {
        this.lblTheme.text = value;
    }

}
