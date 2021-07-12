import LviThreeLabelDesign from 'generated/my-components/LviThreeLabel';

export default class LviThreeLabel extends LviThreeLabelDesign {
	pageName?: string | undefined;
	constructor(props?: any, pageName?: string) {
		// Initalizes super class for this scope
		super(props);
		this.pageName = pageName;
	}
}
