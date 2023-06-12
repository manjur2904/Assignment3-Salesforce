import { LightningElement, track} from 'lwc';
import getResultantList from '@salesforce/apex/UnifiedDataController.getResultantList';

export default class MergedDataTable extends LightningElement {
    @track showData = false;
    @track label = "Show Merged Data";
    @track isLoading;
    mergedTableColumns = [
        {label: 'BoM Part Number', fieldName: 'BoM_Port_Number__c'},
        {label: 'Quantity of BoM', fieldName: 'Bom_Quantity__c'},
        {label: 'Disti Part Number', fieldName: 'Disti_Port_Number__c'},
        {label: 'Quantity of Disti', fieldName: 'Disti_Quantity__c'},
        {label: 'Error Flag', fieldName: 'Error_Flag__c'},
    ];
    
    mergedTableData;

    async handleShow(){
        if(this.showData){
            this.label = "Show Merged Data";
            this.isLoading = false;
        }
        else{
            this.label = "Hide Merged Data";
            this.isLoading = true;
            this.mergedTableData = [];
        } 

        this.showData = !this.showData;

        await getResultantList()
        .then(result =>{
            this.mergedTableData = result;
        })
        .catch(error =>{
            this.mergedTableData = undefined;
        });
        this.isLoading = false;
    }
}