import { Component } from '@angular/core'
import { DesignService } from '../common/design.service';

@Component({
    selector: 'stepThree-view',
    templateUrl: 'step3.component.html',
    styleUrls: ['step3.component.css']
})
export class StepThreeComponent {
    constructor( private designService: DesignService){

    }

    changeScreen() {
        this.designService.secondScreenEnabled = false;
        this.designService.saveContest().subscribe((res) => {
            console.log(res)
        });
 
    }

    getContestFinalDetails() {
        return this.designService.contest;
    }
}