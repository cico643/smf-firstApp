import Page1Design from 'generated/pages/page1';
import componentContextPatch from "@smartface/contx/lib/smartface/componentContextPatch";
import PageTitleLayout from "components/PageTitleLayout";
import System from "@smartface/native/device/system";
import * as userService from "../services/user";
import setupButtonActivity from "@smartface/extension-utils/lib/button-activity";
import SecureData from "@smartface/native/global/securedata";
import HeaderBarItem from '@smartface/native/ui/headerbaritem';
import Color from '@smartface/native/ui/color';
import * as DataStore from "store/dataStore";
import { ThemeService } from 'theme';



export default class Page1 extends Page1Design {
    router: any;
    isSaved: boolean = false;
    signUpItem: HeaderBarItem;
    credentialStatus: boolean = false;

	constructor () {
        super();
		// Overrides super.onShow method
        this.onShow = onShow.bind(this, this.onShow.bind(this));
		// Overrides super.onLoad method
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));


        setupButtonActivity(this.btnLogin, this.loginActivityIndicator , this.onLoginButtonPress);

        this.lblForgotPassword.onTouch = () => {
            this.router.push("/pages/pageForgotPassword");
        }

        this.lblSetting.onTouch = () => {
            this.router.push("/pages/settings/pageSetting");
        }

    }


    onLoginButtonPress = async (showIndicator, hideIndicator) => {
        try {

               if(this.mtbUsername.materialTextBox.text.length < 6 ) {
                   this.mtbUsername.materialTextBox.errorMessage = this.mtbUsername.materialTextBox.text.length + "/6";
                   this.credentialStatus = false;
               }
               if(this.mtbPassword.materialTextBox.text.length < 6 ) {
                   this.mtbPassword.materialTextBox.errorMessage = this.mtbPassword.materialTextBox.text.length + "/6";
                   this.credentialStatus = false;
               }

               if(this.credentialStatus) {
                  showIndicator();
                  const response = await userService.login(this.mtbUsername.materialTextBox.text, this.mtbPassword.materialTextBox.text);
                  // await new Promise(r => setTimeout(r, 2000));

                  DataStore.setJwt(JSON.stringify(response));
                  DataStore.setIsLoggedIn(true);
                
                  hideIndicator();
                  this.router.push("/pages/pageHome");
               }
            
               
            } catch (err) {
                hideIndicator();
                alert("Invalid credentials");
                console.error(err)
                hideIndicator();
            }
    }



    autoLogin = async () => {
        if(DataStore.getIsLoggedIn()) {
            try {
                const token = DataStore.getJwt();
                setTimeout(() => {
                    this.router.push("/pages/pageHome");
                }, 300)
            } catch (err) {
                console.error(err);
            }
        }
        
    }
   
    initTextValue() {
        this.lblLoginText.text = global.lang["login"];
        this.lblForgotPassword.text = global.lang["forgotPassword"];
        this.btnLogin.text = global.lang["login"];
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
 */
function onShow(superOnShow: () => void) {
    superOnShow();
    const theme = DataStore.getTheme() || "loginTheme";
    ThemeService.changeTheme(theme);
    this.headerBar.titleLayout.applyLayout();
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
        title: global.lang["signUp"],
        onPress: () => {
            this.router.push("/pages/auth/pageRegister");
        }
    });

    this.headerBar.setItems([this.signUpItem]);
    this.initMaterialTextBoxes();
    this.initTextValue();
    this.autoLogin();
    
    

}
