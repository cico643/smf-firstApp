import PageRegisterDesign from 'generated/pages/pageRegister';
import * as UserService from "../services/user";
export default class PageRegister extends PageRegisterDesign {
    router: any;
	constructor() {
		super();
		// Overrides super.onShow method
		this.onShow = onShow.bind(this, this.onShow.bind(this));
		// Overrides super.onLoad method
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
        

        this.btnCancel.onPress = () => {
            this.router.dismiss();
        }

        this.btnRegister.onPress = this.onRegisterButtonPress;
    }
    
    onRegisterButtonPress = async () => {
        try {
            const username = this.mtbUsername.materialTextBox.text;
            const password = this.mtbPassword.materialTextBox.text;
            this.btnRegister.text = 'Signing up...';
            await UserService.register(username, password);
            this.router.dismiss();
        } catch (err) {
            this.btnRegister.text = 'Sign up';
        }
        
    }

    initMaterialTextBoxes() {
        this.mtbUsername.options = {
            hint: "Username"
        };
        this.mtbPassword.options = {
            hint: "Password"
        };
        this.mtbPassword.materialTextBox.isPassword = true;
    }
}

/**
 * @event onShow
 * This event is called when a page appears on the screen (everytime).
 * @param {function} superOnShow super onShow function
 * @param {Object} parameters passed from Router.go function
 */
function onShow(superOnShow: () => void) {
	superOnShow();
}

/**
 * @event onLoad
 * This event is called once when page is created.
 * @param {function} superOnLoad super onLoad function
 */
function onLoad(superOnLoad: () => void) {
    superOnLoad();
    this.initMaterialTextBoxes();
}
