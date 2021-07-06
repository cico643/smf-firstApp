import ListView1Design from 'generated/my-components/ListView1';

export default class ListView1 extends ListView1Design {
	pageName?: string | undefined;
	constructor(props?: any, pageName?: string) {
		// Initalizes super class for this scope
		super(props);
		this.pageName = pageName;
	}
}
