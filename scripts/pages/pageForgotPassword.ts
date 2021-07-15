import PageForgotPasswordDesign from 'generated/pages/pageForgotPassword';
import isEmail from "validator/lib/isEmail";
import HeaderBarItem from '@smartface/native/ui/headerbaritem';
import Image from '@smartface/native/ui/image';

export default class PageForgotPassword extends PageForgotPasswordDesign {
    isValidEmail: boolean = false;
	constructor() {
		super();
		// Overrides super.onShow method
		this.onShow = onShow.bind(this, this.onShow.bind(this));
		// Overrides super.onLoad method
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
        
        this.btnSendMail.text = global.lang["sendMail"];
    }
    
    initMaterialTextBoxes() {
        this.mtbEmail.options = {
            hint: global.lang["email"],
            onTextChanged: () => {
                this.isValidEmail = isEmail(this.mtbEmail.materialTextBox.text);
                this.mtbEmail.materialTextBox.errorMessage = this.isValidEmail ? "" : global.lang["mailValidationError"];
            }
        }
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

    this.headerBar.setLeftItem(
      new HeaderBarItem({
        onPress: () => {
          this.router.goBack();
        },
        image: Image.createFromFile('images://arrow_back.png'),
      }),
    );
}
