import { LightningElement, track} from 'lwc';
import getResultantList from '@salesforce/apex/UnifiedDataController.getResultantList';

export default class MergedDataTable extends LightningElement {
    // showData is false by default, after set it as true, merged data will show
    @track showData = false;
    // label of button "Show Merged Data" by default, after clicking the button it will convert in "Hide Merged Data"
    @track label = "Show Merged Data";
    // isLoading property is false by default, it will set as true while merge results are calculating 
    @track isLoading;

    // this is the column name of the merged data table
    mergedTableColumns = [
        {label: 'BoM Part Number', fieldName: 'BoM_Port_Number__c'},
        {label: 'Quantity of BoM', fieldName: 'Bom_Quantity__c'},
        {label: 'Disti Part Number', fieldName: 'Disti_Port_Number__c'},
        {label: 'Quantity of Disti', fieldName: 'Disti_Quantity__c'},
        {label: 'Error Flag', fieldName: 'Error_Flag__c'},
    ];
    
    // this mergedTableData list will store the merged data after calculating the result
    mergedTableData;

    // the button click process is asyncronous because, before calculating the data spinner will be activated
    async handleShow(){
        // when showData is true
        if(this.showData){
            // when showData is true, label will be set as "Show Merged Data"
            this.label = "Show Merged Data";
            // and spinner will be stop spinning
            this.isLoading = false;
        }
        // when the showData is false
        else{
            // when showData is false, label will be set as "Hide Merged Data"
            this.label = "Hide Merged Data";
            // and spinner will be start spinning
            this.isLoading = true;
            // and set mergedTableData as null
            this.mergedTableData = [];
        } 

        // convert the showData, if it is false set it as true, if it is true set it as false
        this.showData = !this.showData;
        // wait for the getResultantList to excecute, after the execution rest of the code will run
        await getResultantList()
        .then(result =>{
            // if we age getting result successfully, store the result
            this.mergedTableData = result;
        })
        .catch(error =>{
            // if we are getiing any error, set the result as undefined
            this.mergedTableData = undefined;
        });
        // after the successfull execution of apex function getResultantList(), we are ready with the merged data, stop spinning
        this.isLoading = false;
    }
}