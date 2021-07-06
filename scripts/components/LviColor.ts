import LviColorDesign from 'generated/my-components/LviColor';

export default class LviColor extends LviColorDesign {
	pageName?: string | undefined;
	constructor(props?: any, pageName?: string) {
		// Initalizes super class for this scope
		super(props);
		this.pageName = pageName;
	}
}
