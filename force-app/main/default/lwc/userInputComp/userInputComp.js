import { LightningElement, track, wire} from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent'

// import { CurrentPageReference } from 'lightning/navigation';
// import { fireEvent } from 'c/pubsub';

import { createRecord } from 'lightning/uiRecordApi';
import BOM_DISTI_OBJECT from '@salesforce/schema/BoMDisti__c';
import PART_NUMBER_FIELD from '@salesforce/schema/BoMDisti__c.Part_Number__c';
import QUANTITY_OF_BOM_FIELD from '@salesforce/schema/BoMDisti__c.Quantity_of_BoM__c';
import QUANTITY_OF_DISTI_FIELD from '@salesforce/schema/BoMDisti__c.Quantity_of_Disti__c';


export default class UserInputComp extends LightningElement {

    // @wire(CurrentPageReference) pageRef;

    @track recordType = "";
    @track partNumber = "";
    @track quantity = "";


    get recordTypeOptions(){
        return [
            {label: 'BoM', value: 'BoM'},
            {label: 'Disti', value: 'Disti'},
        ];
    }
    handleRecordTypeChange(event){
        this.recordType = event.target.value;
    }
    handlePartNumberChange(event){
        this.partNumber = event.target.value;
    }
    handleQuantityChange(event){
        this.quantity = event.target.value;
    }
    clearFields(){
        this.recordType = "";
        this.partNumber = "";
        this.quantity = "";
    }
    handleSave(){
        if(this.part_number === "" || this.recordType === "" || this.quantity === "")
            return;
        let part_number = this.partNumber;
        let qty_bom = this.recordType === 'BoM' ? this.quantity : null;
        let qty_disti = this.recordType === 'Disti' ? this.quantity : null;
        const recordInput = {
            apiName: BOM_DISTI_OBJECT.objectApiName,
            fields: {
                [PART_NUMBER_FIELD.fieldApiName]: part_number,
                [QUANTITY_OF_BOM_FIELD.fieldApiName]: qty_bom,
                [QUANTITY_OF_DISTI_FIELD.fieldApiName]: qty_disti
            }
        };
        // Modify Data with LDS Functions
        createRecord(recordInput)
        .then(result =>{
            const event = new ShowToastEvent({
                title: 'Successfull',
                message: 'Data added succelfully',
                variant: 'success',
            })
            this.dispatchEvent(event);
            this.clearFields();
        })
        .catch(error =>{
            const event = new ShowToastEvent({
                title: 'Failed',
                message: 'Failed to add data',
                variant: 'error',
            })
            this.dispatchEvent(event);
        })
        fireEvent(this.pageRef, "eventdetails");
    }
}