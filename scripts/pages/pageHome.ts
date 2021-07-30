import PageHomeDesign from 'generated/pages/pageHome';
import { getPassengerForLazyLoad, PassengerData } from "services/passenger";
import LviChevron, { passengerListViewData } from "components/LviChevron";
import HeaderBarItem from "@smartface/native/ui/headerbaritem";
import Image from '@smartface/native/ui/image';
import ListView from "@smartface/native/ui/listview";
import Color from '@smartface/native/ui/color';
import Font from '@smartface/native/ui/font';
import { getCombinedStyle } from '@smartface/extension-utils/lib/getCombinedStyle';
import * as DataStore from "store/dataStore";
import View from '@smartface/native/ui/view';
import System from '@smartface/native/device/system';

export default class PageHome extends PageHomeDesign {
    router: any;
    private dataSet: passengerListViewData[] = [];
    
    isLoading: boolean = false;
    index: number = 0;
    pagination: number = 0;

	constructor() {
		super();
		// Overrides super.onShow method
		this.onShow = onShow.bind(this, this.onShow.bind(this));
		// Overrides super.onLoad method
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
        this.orientation = PageHomeDesign.Orientation.AUTO;
        this.onOrientationChange = ({ orientation }) => {
            if(orientation === PageHomeDesign.Orientation.PORTRAIT || orientation === PageHomeDesign.Orientation.UPSIDEDOWN) {
                this.listView1.paddingLeft = 90;
                
            }
            else if(orientation === PageHomeDesign.Orientation.LANDSCAPELEFT || orientation === PageHomeDesign.Orientation.LANDSCAPERIGHT) {
                this.listView1.paddingLeft = 15;
            }
            
            if(System.OS === System.OSType.ANDROID) {
                return;
            }
        }  

    }
    
    initListView() {
        this.listView1.swipeEnabled = true;
        this.listView1.onRowCanSwipe = () => {
            return [ListView.SwipeDirection.LEFTTORIGHT, ListView.SwipeDirection.RIGHTTOLEFT];
        }

        this.listView1.onRowSwipe = (e) => {
            if(e.direction === ListView.SwipeDirection.LEFTTORIGHT) {
                e.ios.expansionSettings.buttonIndex = -1;
                var deleteItem = new ListView.SwipeItem();
                deleteItem.text = "DELETE";
                deleteItem.backgroundColor = Color.RED;
                deleteItem.textColor = Color.WHITE;
                deleteItem.font = Font.create("Arial-ItalicMT", 10, Font.BOLD_ITALIC);
                deleteItem.ios.padding = 40;
                deleteItem.ios.isAutoHide = false;
                this.applyDimension(e.index, deleteItem);
                deleteItem.onPress = (e) => {
                    this.deleteAndRefresh(e);
                    this.refreshListView();
                };
                return [deleteItem];
            }

            else if(e.direction === ListView.SwipeDirection.RIGHTTOLEFT) {
                e.ios.expansionSettings.buttonIndex = 0;
                e.ios.expansionSettings.threshold = 1.5;
                e.ios.expansionSettings.fillOnTrigger = true;
                var markItem = new ListView.SwipeItem();
                let currentMarkedStatus = DataStore.getIsItemMarked(e.index.toString()) || false;
                markItem.text = currentMarkedStatus ? "UNMARK" : "MARK";
                markItem.font = Font.create("Arial-ItalicMT", 10, Font.BOLD_ITALIC);
                let itemStyle = getCombinedStyle(".lviChevron-flexLayout1");
                markItem.backgroundColor = (
                    currentMarkedStatus ? itemStyle.backgroundColor : Color.create(204, 204, 0)
                );
                markItem.textColor = Color.WHITE;
                markItem.ios.padding = 40;
                markItem.ios.isAutoHide = false;
                this.applyDimension(e.index, markItem);
                markItem.onPress = () => {
                    DataStore.setIsItemMarked(e.index.toString(), !currentMarkedStatus);
                    this.listView1.itemCount = this.dataSet.length + 1;
                    this.listView1.refreshData();
                }
                return [markItem];
            }
        }

        this.listView1.itemCount = this.dataSet.length + 1;    

        this.listView1.onRowType = (index) => {
                if(this.dataSet.length === index) {// for loading
                    return 2;
                }
                else {
                    return 1;
                }
            }
        this.listView1.onRowBind = async (listViewItem: LviChevron, index: number) => {

            let itemStyle = getCombinedStyle(".lviChevron-flexLayout1");
            listViewItem.flexLayout1.backgroundColor = itemStyle.backgroundColor;
            listViewItem.seperator.backgroundColor = Color.WHITE;
            if(index === 0) {
                listViewItem.flexLayout1.borderWidth = 1;
                listViewItem.flexLayout1.borderRadius = 20;
                listViewItem.flexLayout1.borderColor = itemStyle.backgroundColor;
                listViewItem.flexLayout1.maskedBorders = [View.Border.TOP_LEFT, View.Border.TOP_RIGHT];                
            }
            else {
                listViewItem.flexLayout1.borderWidth = 0;
                listViewItem.flexLayout1.borderRadius = 0;
            }

            if(index === this.dataSet.length) {
                listViewItem.activityIndicator1.visible = true;
                listViewItem.seperator.visible = false;
                let isMarked = DataStore.getIsItemMarked(index.toString()) || false;
                listViewItem.flexLayout1.backgroundColor = (
                    isMarked ? Color.create(204, 204, 0) : itemStyle.backgroundColor
                );
            }
            
            else {                
                let isMarked = DataStore.getIsItemMarked(index.toString()) || false;
                listViewItem.flexLayout1.backgroundColor = (
                    isMarked ? Color.create(204, 204, 0) : itemStyle.backgroundColor
                );
                listViewItem.activityIndicator1.visible = false;
                listViewItem.seperator.visible = true;
                listViewItem.airlineName = this.dataSet[index].name;
                listViewItem.trips = this.dataSet[index].trips.toString();
                this.listView1.rowHeight = this.dataSet[index].height;
                listViewItem.lblChevron.onTouchEnded = () => {
                    this.router.push("/pages/detail/pageAirlineDetail", { data: this.dataSet[index].airline[0] });
                };
            }              

            if(index > this.dataSet.length - 2 && !this.isLoading) {
                this.isLoading = true;
                await this.pushPassengersToDataSet();
                this.listView1.itemCount = this.dataSet.length + 1;
                this.listView1.refreshData();
                this.isLoading = false;
            }

            if(this.dataSet[index]) {
                listViewItem.iconSmall.imgIcon.loadFromUrl(this.dataSet[index].airline[0].logo);
                listViewItem.iconSmall.visible = true;
            }
            else {
                listViewItem.iconSmall.visible = false;
                listViewItem.iconSmall.imgIcon = null;
            }
        }


    }

    refreshListView = () => {
        this.listView1.itemCount = this.dataSet.length;
        this.listView1.refreshData();
    }

    applyDimension = (index: number, item: ListView.SwipeItem) => {
            if (index == 0) {
                item.android.borderTopRightRadius = 20;
                item.android.borderTopLeftRadius = 20;
            }
            else if (index == this.dataSet.length - 1) {
                item.android.borderBottomRightRadius = 20;
                item.android.borderBottomLeftRadius = 20;
            }
            else {
                item.android.borderBottomRightRadius = 0;
                item.android.borderBottomLeftRadius = 0;
                item.android.borderTopRightRadius = 0;
                item.android.borderTopLeftRadius = 0;
            }
    }

    deleteAndRefresh = (e) => {
        this.dataSet.splice(e.index, 1);
        this.listView1.itemCount = this.dataSet.length;
        this.listView1.deleteRowRange({
            itemCount: 1,
            positionStart: e.index,
            ios: {
                animation: ListView.iOS.RowAnimation.FADE
            }
        })

        this.listView1.refreshRowRange({
            itemCount: 1,
            positionStart: 0
        });

        this.listView1.refreshRowRange({
            itemCount: 1,
            positionStart: this.dataSet.length - 1
        });

    }

    pushPassengersToDataSet = async () => {
        this.isLoading = true;
        let response = await getPassengerForLazyLoad(this.pagination);
        this.pagination += 1;

        for(let i = 0; i < 10; i++) {
            let passenger = response.data[i];
            let passengerForListView = LviChevron.processPassengerData(passenger);
            this.dataSet.push(passengerForListView);
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
    this.refreshListView();
}

/**
 * @event onLoad
 * This event is called once when page is created.
 * @param {function} superOnLoad super onLoad function
 */
function onLoad(superOnLoad: () => void) {
    superOnLoad();
    this.initListView();

    this.headerBar.setLeftItem(
      new HeaderBarItem({
        onPress: () => {
          this.router.goBack();
        },
        image: Image.createFromFile('images://arrow_back.png'),
      }),
    );

    this.headerBar.setItems([
        new HeaderBarItem({
        image: Image.createFromFile("images://settings.png"),
        onPress: () => {
            this.router.push("/pages/settings/pageSetting");
        },
        }),
    ]);
}
