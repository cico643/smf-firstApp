import PageSettingDesign from 'generated/pages/pageSetting';
import LviTwoLabel from "components/LviTwoLabel";
import Menu from "@smartface/native/ui/menu";
import MenuItem from "@smartface/native/ui/menuitem";
import Application from '@smartface/native/application';
import * as DataStore from "store/dataStore";

type listViewItemData = {
    title: string;
    content: string;
}

export default class PageSetting extends PageSettingDesign {
    router: any;
    langMenu: Menu;
    themeMenu: Menu;
    dataSet: listViewItemData[] = [];
	constructor() {
		super();
		// Overrides super.onShow method
		this.onShow = onShow.bind(this, this.onShow.bind(this));
		// Overrides super.onLoad method
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
        
    }
    

    initListView() {
        this.listView1.rowHeight = 50;
        this.listView1.onRowBind = (listViewItem: LviTwoLabel, index: number) => {
            listViewItem.titleText = this.dataSet[index].title;
            listViewItem.contentText = this.dataSet[index].content;
            if(index == 0 && !listViewItem.onTouch) {
                listViewItem.onTouch = () => {
                    this.langMenu.show(this);
                }
            }

            if(index == 1 && !listViewItem.onTouch) {
                listViewItem.onTouch = () => {
                    this.themeMenu.show(this);
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
        content: 'LIGHT'
    }]
    this.initListView();
     

    this.langMenu = new Menu();
    this.langMenu.headerTitle = global.lang["selectLanguage"];
    this.themeMenu = new Menu();
    this.themeMenu.headerTitle = global.lang["selectTheme"];


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

   
    [global.lang['light'], global.lang['dark']].forEach((value) => {
        //@ts-ignore
        const menuItem = new MenuItem({
            title: value,
            onSelected: () => {
                this.dataSet[1].content = value.toUpperCase();
                this.refreshListView();
            }
        })
        this.themeMenu.items.push(menuItem);
    });

}
