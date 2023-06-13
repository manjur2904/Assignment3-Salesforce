import { LightningElement, track } from 'lwc';
export default class Assignment3Components extends LightningElement {

    // After saving data of BoM/Disti, we are doing refresh the table data 
    handleRefresh(){
        // we are taking reference of child component 
        const childComponent = this.template.querySelector('c-show-data');
        // performing an update operation, which is mentioned in the child component using @api decorator
        childComponent.update();
    }
}