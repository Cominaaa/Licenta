import { Component } from '@angular/core'
import { DesignService } from '../common/design.service';


@Component ({
    selector: 'stepTwo-view',
    templateUrl: 'step2.component.html',
    styleUrls: ['step2.component.css']
})
export class StepTwoComponent {
     constructor(private designService: DesignService) {
       
     }
     
}