import PageHomeDesign from 'generated/pages/pageHome';
import { getPassenger, PassengerData } from "services/passenger";
import LviThreeLabel from "components/LviThreeLabel";

type DataSetType = {
    name: string;
    airline: string;
    country: string;
}

export default class PageHome extends PageHomeDesign {
    private dataSet: DataSetType[] = [];
    isLoading: boolean = false;
    index: number = 0;
    pagination: number = 0;

	constructor() {
		super();
		// Overrides super.onShow method
		this.onShow = onShow.bind(this, this.onShow.bind(this));
		// Overrides super.onLoad method
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));

    }
    
    initListView() {
        this.listView1.itemCount = this.dataSet.length + 1;    

        this.listView1.onRowType = (index) => {
                if(this.dataSet.length === index) {// for loading
                    return 2;
                }
                else {
                    return 1;
                }
            }
            
        this.listView1.rowHeight = 50;

        this.listView1.onRowBind = async (listViewItem: LviThreeLabel, index: number) => {
            if(index === this.dataSet.length) {
                listViewItem.activityIndicator1.visible = true;
            }
            else {
                listViewItem.activityIndicator1.visible = false;
                listViewItem.lblName.text = this.dataSet[index].name;
                listViewItem.lblAirline.text = this.dataSet[index].airline;
                listViewItem.lblCountry.text = this.dataSet[index].country;
            }   

            if(index > this.dataSet.length - 2 && !this.isLoading) {
                this.isLoading = true;
                let response = await getPassenger(this.pagination);
                this.pagination += 1;
                for(let i = 0; i < 10; i++) {
                    let oneResponse = response.data[i];
                    let oneArr = {name: oneResponse.name, airline: oneResponse.airline.name, country: oneResponse.airline.country};
                    this.dataSet.push(oneArr);
                }
                
                this.listView1.itemCount = this.dataSet.length + 1;
                this.listView1.refreshData();
                this.isLoading = false;
            }
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
}
