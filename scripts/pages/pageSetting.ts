import PageSettingDesign from 'generated/pages/pageSetting';
import LviTwoLabel from "components/LviTwoLabel";
import Menu from "@smartface/native/ui/menu";
import MenuItem from "@smartface/native/ui/menuitem";
import Application from '@smartface/native/application';

type listViewItemData = {
    title: string;
    content: string;
}

export default class PageSetting extends PageSettingDesign {
    router: any;
    langMenu: Menu;
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
        title: 'Language',
        content: 'en'
    },
    {
        title: 'Theme',
        content: 'Light'
    }]
    this.initListView();
     

    this.langMenu = new Menu();
    this.langMenu.headerTitle = "Select your language";

    //@ts-ignore
    this.menuItem1 = new MenuItem({
        title: 'EN',
        onSelected: () => {
            this.dataSet[0].content = 'en';
            this.refreshListView();
           
        }
    })

    // @ts-ignore
    this.menuItem2 = new MenuItem({
        title: 'TR',
        onSelected: () => {
            this.dataSet[0].content = 'tr';
            this.refreshListView();
        }
    })

    this.langMenu.items = [this.menuItem1, this.menuItem2];

}
