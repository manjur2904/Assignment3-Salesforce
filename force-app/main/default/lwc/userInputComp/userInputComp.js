import { LightningElement, track, wire} from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent'
import { createRecord } from 'lightning/uiRecordApi';

// importing the reference of custom BoMDisti Object 
import BOM_DISTI_OBJECT from '@salesforce/schema/BoMDisti__c';
// importing the fields reference of the custom BoMDisti Object
import PART_NUMBER_FIELD from '@salesforce/schema/BoMDisti__c.Part_Number__c';
import QUANTITY_OF_BOM_FIELD from '@salesforce/schema/BoMDisti__c.Quantity_of_BoM__c';
import QUANTITY_OF_DISTI_FIELD from '@salesforce/schema/BoMDisti__c.Quantity_of_Disti__c';

export default class UserInputComp extends LightningElement {

    // values of the input fields are tracking throught the operation using @reack decorator
    @track recordType = "";
    @track partNumber = "";
    @track quantity = "";

    // options of combobox/dropdown is getting from here
    get recordTypeOptions(){
        return [
            {label: 'BoM', value: 'BoM'},
            {label: 'Disti', value: 'Disti'},
        ];
    }

    // when the recordType field is changed this function will listen the event and will update the value of recordType
    handleRecordTypeChange(event){
        this.recordType = event.target.value;
    }
    // when the part number field is changed this function will listen the event and will update the value of partNumber
    handlePartNumberChange(event){
        this.partNumber = event.target.value;
    }
    // when the quantity field is changed this function will listen the event and will update the value of quantity
    handleQuantityChange(event){
        this.quantity = event.target.value;
    }

    // this operation will clear the all input fields value
    clearFields(){
        this.recordType = "";
        this.partNumber = "";
        this.quantity = "";
    }

    // this function will store the input data in the custom object
    handleSave(){
        // if anything of these field are found null, noting will be saved
        if(this.part_number === "" || this.recordType === "" || this.quantity === "")
            return;
        // extracting the value from the input fields
        let part_number = this.partNumber;
        // when user try to input value for BoM object, quantity of BoM will be update 
        let qty_bom = this.recordType === 'BoM' ? this.quantity : null;
        // when user try to input value for Disti object, quantity of Disti will be update
        let qty_disti = this.recordType === 'Disti' ? this.quantity : null;

        // create the structure for the record 
        const recordInput = {
            apiName: BOM_DISTI_OBJECT.objectApiName,
            fields: {
                [PART_NUMBER_FIELD.fieldApiName]: part_number,
                [QUANTITY_OF_BOM_FIELD.fieldApiName]: qty_bom,
                [QUANTITY_OF_DISTI_FIELD.fieldApiName]: qty_disti
            }
        };
        // Create a record for the object Data with LDS Functions
        // We are using Javascript Promise to create record 
        createRecord(recordInput)
        .then(result =>{
            // when the create record is successfull, a success toast will show
            const event = new ShowToastEvent({
                title: 'Successfull',
                message: 'Data added succelfully',
                variant: 'success',
            })
            this.dispatchEvent(event);
            // after storing the record, fields data will be set as null
            this.clearFields();
            // will fire an event to modify the showData tables
            const uploadEvent = new CustomEvent('childnotification', {
                bubbles: true
            });
            this.dispatchEvent(uploadEvent);
        })
        .catch(error =>{
            // when the create record is failed for any reason, a error toast will show
            const event = new ShowToastEvent({
                title: 'Failed',
                message: 'Failed to add data',
                variant: 'error',
            })
            this.dispatchEvent(event);
        })
    }
}