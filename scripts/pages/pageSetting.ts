import PageSettingDesign from 'generated/pages/pageSetting';
import LviSetting from "components/LviSetting";
import Menu from "@smartface/native/ui/menu";
import MenuItem from "@smartface/native/ui/menuitem";
import Application from '@smartface/native/application';
import * as DataStore from "store/dataStore";
import { ThemeService } from "theme";
import { getCombinedStyle } from '@smartface/extension-utils/lib/getCombinedStyle';
import Image from '@smartface/native/ui/image';



export default class PageSetting extends PageSettingDesign {
    router: any;
    langMenu: Menu;
    dataSet: {title: string, content?: string}[];
    appTheme: string;

    constructor() {
		super();
		// Overrides super.onShow method
		this.onShow = onShow.bind(this, this.onShow.bind(this));
		// Overrides super.onLoad method
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
        
    }
    

    initListView() {
        

            this.listView1.rowHeight = 70;

            
            this.listView1.onRowBind = (listViewItem: LviSetting, index: number) => {
                if(index == 0) {

                    listViewItem.seperator.visible = true;
                    listViewItem.lblChevron.visible = true;
                    listViewItem.flexImageSwitch.visible = false;
                    listViewItem.iconSmall.visible = true;
                    listViewItem.iconSmall.imgIcon.image = Image.createFromFile("images://notification.png");  
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
                    listViewItem.iconSmall.visible = true;
                    listViewItem.iconSmall.imgIcon.image = Image.createFromFile("images://darkMode.png");  
                    listViewItem.lblTitle.text = this.dataSet[index].title;
                    this.appTheme = DataStore.getTheme();
                    listViewItem.flexImageSwitch.lblLeftIcon.onTouch = () => {
                            this.appTheme = "smartfaceDarkTheme";
                            ThemeService.changeTheme(this.appTheme);
                            DataStore.setTheme(this.appTheme);
                            let leftWrapperStyle = getCombinedStyle(".flexImageSwitch-leftWrapper");
                            let rightWrapperStyle = getCombinedStyle(".flexImageSwitch-rightWrapper");
                            let leftIconStyle = getCombinedStyle(".flexImageSwitch-leftIcon");
                            let rightIconStyle = getCombinedStyle(".flexImageSwitch-rightIcon");
                            listViewItem.flexImageSwitch.flexLeftWrapper.backgroundColor = leftWrapperStyle.backgroundColor;
                            listViewItem.flexImageSwitch.lblLeftIcon.textColor = leftIconStyle.textColor;
                            listViewItem.flexImageSwitch.lblRightIcon.backgroundColor = rightWrapperStyle.backgroundColor;
                            listViewItem.flexImageSwitch.lblRightIcon.textColor = rightIconStyle.textColor;
                            this.listView1.refreshData();
                }

                listViewItem.flexImageSwitch.lblRightIcon.onTouch = () => {
                        this.appTheme = "loginTheme";
                        ThemeService.changeTheme(this.appTheme);
                        DataStore.setTheme(this.appTheme);
                        let leftWrapperStyle = getCombinedStyle(".flexImageSwitch-leftWrapper");
                        let rightWrapperStyle = getCombinedStyle(".flexImageSwitch-rightWrapper");
                        let leftIconStyle = getCombinedStyle(".flexImageSwitch-leftIcon");
                        let rightIconStyle = getCombinedStyle(".flexImageSwitch-rightIcon");
                        listViewItem.flexImageSwitch.flexLeftWrapper.backgroundColor = leftWrapperStyle.backgroundColor;
                        listViewItem.flexImageSwitch.lblLeftIcon.textColor = leftIconStyle.textColor;
                        listViewItem.flexImageSwitch.lblRightIcon.backgroundColor = rightWrapperStyle.backgroundColor;
                        listViewItem.flexImageSwitch.lblRightIcon.textColor = rightIconStyle.textColor;
                        this.listView1.refreshData();
                    
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
