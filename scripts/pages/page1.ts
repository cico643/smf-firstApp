import Page1Design from 'generated/pages/page1';
import componentContextPatch from "@smartface/contx/lib/smartface/componentContextPatch";
import PageTitleLayout from "components/PageTitleLayout";
import System from "@smartface/native/device/system";
import * as userService from "../services/user";
import setupButtonActivity from "@smartface/extension-utils/lib/button-activity";
import SecureData from "@smartface/native/global/securedata";
import HeaderBarItem from '@smartface/native/ui/headerbaritem';
import Color from '@smartface/native/ui/color';
import * as jwtStore from "store/jwtStore";

export default class Page1 extends Page1Design {
    router: any;
    isSaved: boolean = false;
    mySecureData: SecureData;
    signUpItem: HeaderBarItem;

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

    }


    onLoginButtonPress = async (showIndicator, hideIndicator) => {
        try {
               showIndicator();
               const response = await userService.login(this.mtbUsername.materialTextBox.text, this.mtbPassword.materialTextBox.text);
               // await new Promise(r => setTimeout(r, 2000));

               jwtStore.setJwt('userToken', JSON.stringify(response));
               jwtStore.setIsLoggedIn('userLogged', true);
               
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

        if(jwtStore.getIsLoggedIn("userLogged")) {
            try {
                const token = jwtStore.getJwt("userToken");
                this.router.push("/pages/pageHome", { message: token });
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


    this.headerBar.leftItemEnabled = false;
    this.headerBar.titleLayout = new PageTitleLayout();
    componentContextPatch(this.headerBar.titleLayout, "titleLayout");
    if (System.OS === "Android") {
        this.headerBar.title = "";
    };

    this.headerBar.backgroundColor = Color.create("#F5A623");
    this.signUpItem = new HeaderBarItem({
        title: 'SIGN UP',
        onPress: () => {
            this.router.push("/pages/auth/pageRegister", { message: "You are about to sign up.."});
        }
    });

    this.headerBar.setItems([this.signUpItem]);
    this.initMaterialTextBoxes();
}
