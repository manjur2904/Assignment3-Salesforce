import { LightningElement, track, wire } from 'lwc';
import getResultantList from '@salesforce/apex/UnifiedDataController.getResultantList';

export default class MergedDataTable extends LightningElement {
    @track showData = false;
    @track label = "Show Data";
    mergedTableColumns = [
        {label: 'BoM Part Number', fieldName: 'BoM_Port_Number__c'},
        {label: 'Quantity of BoM', fieldName: 'Bom_Quantity__c'},
        {label: 'Disti Part Number', fieldName: 'Disti_Port_Number__c'},
        {label: 'Quantity of Disti', fieldName: 'Disti_Quantity__c'},
        {label: 'Error Flag', fieldName: 'Error_Flag__c'},
    ];
    
    mergedTableData;

    handleShow(){
        if(this.showData) this.label = "Show Data";
        else this.label = "Hide Data";
        
        this.showData = !this.showData;

        getResultantList()
        .then(result =>{
            this.mergedTableData = result;
        })
        .catch(error =>{
            this.mergedTableData = undefined;
        });
    }
}