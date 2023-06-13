import { LightningElement, api, track, wire } from 'lwc';
import getBoMDistiCombinedList from '@salesforce/apex/BoMDistiController.getBoMDistiCombinedList';
import getBoMList from '@salesforce/apex/BoMDistiController.getBoMList';
import getDistiList from '@salesforce/apex/BoMDistiController.getDistiList';

export default class ShowData extends LightningElement {

    // when user saves the data, this update function will be called from parent component
    @api update(){
        // this will call the connectedCallback() lifecycle hook to update the tables 
        this.connectedCallback();
    }
    // these options are visible to the user to filter the table type
    options = [
        {label: 'BoM', value: 'BoM'},
        {label: 'Disti', value: 'Disti'},
        {label: 'Both', value: 'Both'},
        {label: 'Combined', value: 'Combined'},
    ];
    // by default value is set as Combined BoM and Disti
    value = 'Combined';

    // these tracking will inform the html component, which table to show, by default it will show combined table
    @track bomList = false;
    @track distiList = false;
    @track combinedList = true;

    // after choosing another radio-button, another button will be activated
    selectAnother(){
        // when user select to show the both BoM and Disti Table together, then bomList and distiList both table tracker will be activated
        this.bomList = (this.value === 'BoM' || this.value === 'Both') ? true : false;
        this.distiList = (this.value === 'Disti'|| this.value === 'Both') ? true : false;
        this.combinedList = this.value === 'Combined' ? true : false;
    }

    // listen the event to change the data table and call the above function to show selected table
    handleRadioChange(event){
        this.value = event.target.value;
        this.selectAnother();
    }
    
    // these are the columns name for the combined BoM and Disti table
    combinedTableColumns = [
        {label: 'Part Number', fieldName: 'Part_Number__c'},
        {label: 'Quantity of BoM', fieldName: 'Quantity_of_BoM__c'},
        {label: 'Quantity of Disti', fieldName: 'Quantity_of_Disti__c'},
    ];
    // these are the columns name for the combined BoM table
    bomTableColumns = [
        {label: 'Part Number', fieldName: 'Part_Number__c'},
        {label: 'Quantity of BoM', fieldName: 'Quantity_of_BoM__c'},
    ];
    // these are the columns name for the combined Disti table
    distiTableColumns = [
        {label: 'Part Number', fieldName: 'Part_Number__c'},
        {label: 'Quantity of Disti', fieldName: 'Quantity_of_Disti__c'},
    ];

    // these are the list to store the data of specific object and these data will reflect in the UI
    @track combinedTableData = [];
    @track bomTableData = [];
    @track distiTableData = [];

    // The connectedCallback() lifecycle hook fires when a component is inserted into the DOM.
    connectedCallback(){
        // we are calling this apex method to get BoMDistiCombinedList's data from the custom object and we are using a javascript Promise to resolve
        getBoMDistiCombinedList()
        .then(result =>{
            // if the promise is resolved, combinedTableData will get the value of object's current value
            this.combinedTableData = result;
        })
        .catch(error =>{
            // if the promise is not resolve, combinedTableData will set as undefined
            this.combinedTableData = undefined;
        })

        // we are calling this apex method to get BoMList's data from the custom object and we are using a javascript Promise to resolve
        getBoMList()
        .then(result =>{
            // if the promise is resolved, bomTableData will get the value of object's current value
            this.bomTableData = result;
        })
        .catch(error =>{
            // if the promise is not resolve, bomTableData will set as undefined
            this.bomTableData = undefined;
        })

        // we are calling this apex method to get DistiList's data from the custom object and we are using a javascript Promise to resolve
        getDistiList()
        .then(result =>{
            // if the promise is resolved, distiTableData will get the value of object's current value
            this.distiTableData = result;
        })
        .catch(error =>{
            // if the promise is not resolve, distiTableData will set as undefined
            this.distiTableData = undefined;
        })

        // after resolve all the promises, radio-buttons will get reactivated
        this.selectAnother();
    }
}