import { LightningElement, api, track, wire } from 'lwc';
import getBoMDistiCombinedList from '@salesforce/apex/BoMDistiController.getBoMDistiCombinedList';
import getBoMList from '@salesforce/apex/BoMDistiController.getBoMList';
import getDistiList from '@salesforce/apex/BoMDistiController.getDistiList';

export default class ShowData extends LightningElement {

    @api update(){
        // console.log('update modified');
        this.connectedCallback();
    }

    options = [
        {label: 'BoM', value: 'BoM'},
        {label: 'Disti', value: 'Disti'},
        {label: 'Both', value: 'Both'},
        {label: 'Combined', value: 'Combined'},
    ];
    value = 'Combined';

    @track bomList = false;
    @track distiList = false;
    @track combinedList = true;

    selectAnother(){
        this.bomList = (this.value === 'BoM' || this.value === 'Both') ? true : false;
        this.distiList = (this.value === 'Disti'|| this.value === 'Both') ? true : false;
        this.combinedList = this.value === 'Combined' ? true : false;
    }

    handleRadioChange(event){
        this.value = event.target.value;
        this.selectAnother();
    }

    combinedTableColumns = [
        {label: 'Part Number', fieldName: 'Part_Number__c'},
        {label: 'Quantity of BoM', fieldName: 'Quantity_of_BoM__c'},
        {label: 'Quantity of Disti', fieldName: 'Quantity_of_Disti__c'},
    ];
    bomTableColumns = [
        {label: 'Part Number', fieldName: 'Part_Number__c'},
        {label: 'Quantity of BoM', fieldName: 'Quantity_of_BoM__c'},
    ];
    distiTableColumns = [
        {label: 'Part Number', fieldName: 'Part_Number__c'},
        {label: 'Quantity of Disti', fieldName: 'Quantity_of_Disti__c'},
    ];

    @track combinedTableData = [];
    @track bomTableData = [];
    @track distiTableData = [];

    connectedCallback(){
        // console.log('connectedCallback modified');
        getBoMDistiCombinedList()
        .then(result =>{
            this.combinedTableData = result;
            // console.log('getBoMDistiCombinedList() is executed');
        })
        .catch(error =>{
            this.combinedTableData = undefined;
        })

        getBoMList()
        .then(result =>{
            this.bomTableData = result;
            // console.log('getBoMList() is executed');
        })
        .catch(error =>{
            this.bomTableData = undefined;
        })

        getDistiList()
        .then(result =>{
            this.distiTableData = result;
            // console.log('getDistiList() is executed');
        })
        .catch(error =>{
            this.distiTableData = undefined;
        })

        this.selectAnother();
    }
}