import { LightningElement, track } from 'lwc';
export default class Assignment3Components extends LightningElement {

    handleRefresh(){
        const childComponent = this.template.querySelector('c-show-data');
        childComponent.update();
    }
}