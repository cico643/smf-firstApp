import LviSettingDesign from 'generated/my-components/LviSetting';

export default class LviSetting extends LviSettingDesign {
	pageName?: string | undefined;
	constructor(props?: any, pageName?: string) {
		// Initalizes super class for this scope
		super(props);
		this.pageName = pageName;
	}
}
