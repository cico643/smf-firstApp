import PageRegisterDesign from 'generated/pages/pageRegister';
import * as UserService from "../services/user";
export default class PageRegister extends PageRegisterDesign {
    router: any;
    credentialStatus: boolean = false;
	constructor() {
		super();
		// Overrides super.onShow method
		this.onShow = onShow.bind(this, this.onShow.bind(this));
		// Overrides super.onLoad method
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
        


        this.btnRegister.onPress = this.onRegisterButtonPress;
    }
    
    onRegisterButtonPress = async () => {
        try {
            const username = this.mtbUsername.materialTextBox.text;
            const password = this.mtbPassword.materialTextBox.text;
            if(username.length < 6 ) {
                   this.mtbUsername.materialTextBox.errorMessage = username.length + "/6";
                   this.credentialStatus = false;
               }
               if(password.length < 6 ) {
                   this.mtbPassword.materialTextBox.errorMessage = password.length + "/6";
                   this.credentialStatus = false;
               }
            this.btnRegister.text = global.lang["signingUp"];
            await UserService.register(username, password);
            this.router.dismiss();
        } catch (err) {
            this.btnRegister.text = global.lang["signUp"];
            alert(global.lang["invalidCredentials"]);
        }
        
    }

    initTextValue() {
        this.btnRegister.text = global.lang["signUp"];
        this.lblHeader.text = global.lang["createAccount"];
    }

    initMaterialTextBoxes() {
        
        this.mtbUsername.options = {
            hint: global.lang["username"],
            onActionButtonPress: () => this.mtbPassword.materialTextBox.requestFocus(),
            onTextChanged: () => {
                this.credentialStatus = this.mtbUsername.materialTextBox.text.length >= 6;
                this.mtbUsername.materialTextBox.errorMessage = this.mtbUsername.materialTextBox.text.length >= 6 ? "" : this.mtbUsername.materialTextBox.text.length + "/6";
            }
        };
        this.mtbPassword.options = {
            hint: global.lang["password"],
            isPassword: true,
            onTextChanged: () => {
                this.credentialStatus = this.mtbPassword.materialTextBox.text.length >= 6;
                this.mtbPassword.materialTextBox.errorMessage = this.mtbPassword.materialTextBox.text.length >= 6 ? "" : this.mtbPassword.materialTextBox.text.length + "/6";
            }
        };
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
    this.headerBar.title = global.lang["signUp"];
    this.initMaterialTextBoxes();
    this.initTextValue();
}
