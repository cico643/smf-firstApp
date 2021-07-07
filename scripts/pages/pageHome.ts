import PageHomeDesign from 'generated/pages/pageHome';
import { colorData, getColorData } from "services/colorDataApi";
import LviColor from "components/LviColor";

export default class PageHome extends PageHomeDesign {
    private data: colorData[] = [];

	constructor() {
		super();
		// Overrides super.onShow method
		this.onShow = onShow.bind(this, this.onShow.bind(this));
		// Overrides super.onLoad method
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));

    }
    
    initListView() {

            this.listView1.rowHeight = 50;
            this.listView1.onRowBind = (listViewItem: LviColor, index: number) => {
                listViewItem.colorName = this.data[index].name;
                listViewItem.colorYear = this.data[index].year.toString();
                listViewItem.color = this.data[index].color;
            }
            
            this.listView1.onPullRefresh = () => {
                this.refreshListView();
                this.listView1.stopRefresh();
            }
        }

    refreshListView() {
        this.listView1.itemCount = this.data.length;
        this.listView1.refreshData();
    }

    getColors = async () => {
        try {
            const response = await getColorData();
            this.data = response.data;
            this.refreshListView();
        } catch (err) {
            console.error(err);
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
    this.initListView();
    this.getColors();
}
