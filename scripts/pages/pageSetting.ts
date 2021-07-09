import PageSettingDesign from 'generated/pages/pageSetting';
import LviTwoLabel from "components/LviTwoLabel";
import LviSwitch from "components/LviSwitch";
import Menu from "@smartface/native/ui/menu";
import MenuItem from "@smartface/native/ui/menuitem";
import Application from '@smartface/native/application';
import addChild from "@smartface/contx/lib/smartface/action/addChild";
import * as DataStore from "store/dataStore";
import { ThemeService } from "theme";

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

            this.listView1.onRowType = index => index;
        
            this.listView1.onRowCreate = (type) => {
                let listViewItem = type === 0 ? new LviTwoLabel() : new LviSwitch();
                this.listView1.dispatch(addChild(`myListViewItem${++this.listViewItemIndex}`, listViewItem));
                return listViewItem;
            }   
        
        

            this.listView1.rowHeight = 50;

            
            this.listView1.onRowBind = (listViewItem: LviTwoLabel | LviSwitch, index: number) => {
            if(index == 0 && listViewItem instanceof LviTwoLabel) {
                listViewItem.titleText = this.dataSet[index].title;
                listViewItem.contentText = this.dataSet[index].content;
                if(!listViewItem.onTouch) {
                    listViewItem.onTouch = () => {
                        this.langMenu.show(this);
                    }
                }
            }
            else if(index == 1 && listViewItem instanceof LviSwitch) {
                listViewItem.titleText = this.dataSet[index].title;
                this.appTheme = DataStore.getTheme();
                listViewItem.switchTheme.toggle = this.appTheme === "smartfaceDarkTheme";

                listViewItem.switchTheme.onToggleChanged = () => {
                    this.appTheme = this.appTheme == 'smartfaceDarkTheme' ? 'loginTheme' : 'smartfaceDarkTheme';
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
        title: global.lang["darkTheme"],
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
