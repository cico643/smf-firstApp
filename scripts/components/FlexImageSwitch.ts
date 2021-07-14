import FlexImageSwitchDesign from 'generated/my-components/FlexImageSwitch';

export default class FlexImageSwitch extends FlexImageSwitchDesign {
	pageName?: string | undefined;
	constructor(props?: any, pageName?: string) {
		// Initalizes super class for this scope
		super(props);
		this.pageName = pageName;
	}
}
