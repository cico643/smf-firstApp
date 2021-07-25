import PageAirlineDetailDesign from 'generated/pages/pageAirlineDetail';
import System from "@smartface/native/device/system";
import Image from "@smartface/native/ui/image";
import ImageView from "@smartface/native/ui/imageview";
import LviTwoLabel from "components/LviTwoLabel";

type DataSet = {
    name: string;
    country: string;
    established: string;
}

export default class PageAirlineDetail extends PageAirlineDetailDesign {
    router: any;
    imageView: ImageView;
    image: Image;
    dataSet: DataSet;
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
        if(index == 0) {
            listViewItem.lblTitle.text = global.lang["name"];
            listViewItem.lblContent.text = this.dataSet.name;
            listViewItem.seperator.visible = true;
        }
        else if(index == 1) {
            listViewItem.lblTitle.text = global.lang["country"];
            listViewItem.lblContent.text = this.dataSet.country;
            listViewItem.seperator.visible = true;
        }
        else if(index == 2) {
            listViewItem.lblTitle.text = global.lang["established"];
            listViewItem.lblContent.text = this.dataSet.established;
        }


      };
      this.listView1.onPullRefresh = async () => {
          this.refreshListView();
          this.listView1.stopRefresh();
      }
    }
    refreshListView() {
      this.listView1.itemCount = 3;
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

    this.dataSet = {
        name: this.routeData.data.name,
        country: this.routeData.data.country,
        established: this.routeData.data.established
    }

    const { headerBar } = System.OS === "Android" ? this : this.parentController;
    headerBar.title = this.routeData.data["name"];

    this.imageView1.loadFromUrl({
        url: this.routeData.data["logo"]
    });
    
    this.initListView();
}
