import PageSettingDesign from 'generated/pages/pageSetting';
import LviTwoLabel from "components/LviTwoLabel";
import LviSwitch from "components/LviSwitch";
import LviSetting from "components/LviSetting";
import Menu from "@smartface/native/ui/menu";
import MenuItem from "@smartface/native/ui/menuitem";
import Application from '@smartface/native/application';
import addChild from "@smartface/contx/lib/smartface/action/addChild";
import * as DataStore from "store/dataStore";
import { ThemeService } from "theme";
import router from 'routes';
import System from '@smartface/native/device/system';
import Image from '@smartface/native/ui/image';
import Color from '@smartface/native/ui/color';



export default class PageSetting extends PageSettingDesign {
    router: any;
    langMenu: Menu;
    dataSet: any;
    appTheme: string;
    listViewItemIndex = 0;  
	constructor() {
		super();
		// Overrides super.onShow method
		this.onShow = onShow.bind(this, this.onShow.bind(this));
		// Overrides super.onLoad method
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
    }
    

    initListView() {
        

            this.listView1.rowHeight = 50;

            
            this.listView1.onRowBind = (listViewItem: LviSetting, index: number) => {
            if(index == 0) {
                listViewItem.seperator.visible = true;
                listViewItem.lblChevron.visible = true;
                listViewItem.flexImageSwitch.visible = false;
                listViewItem.lblTitle.text = this.dataSet[index].title;
                if(!listViewItem.lblChevron.onTouch) {
                    listViewItem.lblChevron.onTouch = () => {
                        this.langMenu.show(this);
                    }
                }
            }
            else if(index == 1) {
                listViewItem.seperator.visible = false;
                listViewItem.lblChevron.visible = false;
                listViewItem.flexImageSwitch.visible = true;
                listViewItem.lblTitle.text = this.dataSet[index].title;
                this.appTheme = DataStore.getTheme();
                listViewItem.flexImageSwitch.lblLeftIcon.onTouch = () => {
                    listViewItem.flexImageSwitch.lblLeftIcon.backgroundColor = Color.WHITE;
                    listViewItem.flexImageSwitch.lblLeftIcon.textColor = Color.DARKGRAY;
                    listViewItem.flexImageSwitch.lblRightIcon.backgroundColor = Color.DARKGRAY;
                    listViewItem.flexImageSwitch.lblRightIcon.textColor = Color.WHITE;
                    this.appTheme = "smartfaceDarkTheme";
                    ThemeService.changeTheme(this.appTheme);
                    DataStore.setTheme(this.appTheme);
                }

                listViewItem.flexImageSwitch.lblRightIcon.onTouch = () => {
                    listViewItem.flexImageSwitch.lblRightIcon.backgroundColor = Color.WHITE;
                    listViewItem.flexImageSwitch.lblRightIcon.textColor = Color.DARKGRAY;
                    listViewItem.flexImageSwitch.lblLeftIcon.backgroundColor = Color.DARKGRAY;
                    listViewItem.flexImageSwitch.lblLeftIcon.textColor = Color.WHITE;
                    this.appTheme = "loginTheme";
                    ThemeService.changeTheme(this.appTheme);
                    DataStore.setTheme(this.appTheme);
                }
            }
        }        

        this.listView1.onPullRefresh = () => {
            this.refreshListView();
            this.listView1.stopRefresh();
        }
       
    }


    refreshListView() {
        this.listView1.itemCount = this.dataSet.length;
        this.listView1.refreshData();
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
    this.initListView();
    this.refreshListView();
    

}

/**
 * @event onLoad
 * This event is called once when page is created.
 * @param {function} superOnLoad super onLoad function
 */
function onLoad(superOnLoad: () => void) {
    superOnLoad();



    this.dataSet = [{
        title: global.lang["language"],
        content: DataStore.getLang() || Device.language.toUpperCase()
    },
    {
        title: global.lang["theme"],
    }]
    
    this.appTheme = DataStore.getTheme() || "loginTheme";

     

    this.langMenu = new Menu();
    this.langMenu.headerTitle = global.lang["selectLanguage"];


    ['EN', 'TR'].forEach((value) => {
        //@ts-ignore
        const menuItem = new MenuItem({
            title: value,
            onSelected: () => {
                this.dataSet[0].content = value.toLowerCase();
                this.refreshListView();
                DataStore.setLang(value.toLowerCase());
                Application.restart();
            }
        })
        this.langMenu.items.push(menuItem);
    });

   

}
