import Page1Design from 'generated/pages/page1';
import componentContextPatch from "@smartface/contx/lib/smartface/componentContextPatch";
import PageTitleLayout from "components/PageTitleLayout";
import System from "@smartface/native/device/system";
import * as userService from "../services/user";
import setupButtonActivity from "@smartface/extension-utils/lib/button-activity";
import SecureData from "@smartface/native/global/securedata";

export default class Page1 extends Page1Design {
    router: any;
    isSaved: boolean = false;
    mySecureData: SecureData;

	constructor () {
        super();
		// Overrides super.onShow method
        this.onShow = onShow.bind(this, this.onShow.bind(this));
		// Overrides super.onLoad method
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));


        setupButtonActivity(this.btnLogin, this.loginActivityIndicator , this.onLoginButtonPress);

        this.lblForgotPassword.onTouch = () => {
            this.router.push("/pages/pageForgotPassword", { message: "Did you forget your password?"});
        }

        this.lblSignUp.onTouch = () => {
            this.router.push("/pages/pageRegister", { message: "You are about to sign up.."});
        }
    }


    onLoginButtonPress = async (showIndicator, hideIndicator) => {
        try {
               showIndicator();
               const response = await userService.login(this.mtbUsername.materialTextBox.text, this.mtbPassword.materialTextBox.text);
               // await new Promise(r => setTimeout(r, 2000));

               await this.mySecureData.save({value: JSON.stringify(response)});
               this.isSaved = true;
               
               hideIndicator();
               this.router.push("/pages/pageHome", { message: "Hello World!" });
            } catch (err) {
                hideIndicator();
                alert("Invalid credentials");
                console.error(err)
                hideIndicator();
            }
    }



    autoLogin = async () => {
        if(this.isSaved) {
            try {
                await this.mySecureData.read();
                this.router.push("/pages/pageHome", { message: "Hello World!" });
            } catch (err) {
                console.error(err);
            }
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
 */
function onShow(superOnShow: () => void) {
  superOnShow();
  this.headerBar.titleLayout.applyLayout();
  this.autoLogin();
  this.mtbUsername.materialTextBox.text = userService.getUsername();
}

/**
 * @event onLoad
 * This event is called once when page is created.
 */
function onLoad(superOnLoad: () => void) {
    superOnLoad();
    console.info('Onload page1');

    //@ts-ignore
    this.mySecureData = new SecureData({
        ios: {
            service: "com.myapp.serviceparameter"
        },
        key: "keyparamater"
    });

    this.headerBar.leftItemEnabled = false;
    this.headerBar.titleLayout = new PageTitleLayout();
    componentContextPatch(this.headerBar.titleLayout, "titleLayout");
    if (System.OS === "Android") {
        this.headerBar.title = "";
    };
    this.initMaterialTextBoxes();
}
