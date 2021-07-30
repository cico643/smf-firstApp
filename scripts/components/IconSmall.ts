import IconSmallDesign from 'generated/my-components/IconSmall';

export default class IconSmall extends IconSmallDesign {
	pageName?: string | undefined;
	constructor(props?: any, pageName?: string) {
		// Initalizes super class for this scope
		super(props);
		this.pageName = pageName;
	}
}
