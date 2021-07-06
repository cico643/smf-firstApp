import PageHomeDesign from 'generated/pages/pageHome';
import { colorData, getColorData } from "services/colorDataApi";
import LviColor from "components/LviColor";
import FlexLayout1 from "components/FlexLayout1";
import Color from "@smartface/native/ui/color";

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

            this.flexLayout1.listView1.rowHeight = 50;
            this.flexLayout1.listView1.onRowBind = (listViewItem: LviColor, index: number) => {
                listViewItem.lblName.text = this.data[index].name;
                listViewItem.lblYear.text = this.data[index].year.toString();
                listViewItem.lblName.textColor = Color.create(this.data[index].color);
                listViewItem.lblYear.textColor = Color.create(this.data[index].color);
            }
            
            this.flexLayout1.listView1.onPullRefresh = () => {
                this.refreshListView();
                this.flexLayout1.listView1.stopRefresh();
            }
        }

    refreshListView() {
        this.flexLayout1.listView1.itemCount = this.data.length;
        this.flexLayout1.listView1.refreshData();
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
