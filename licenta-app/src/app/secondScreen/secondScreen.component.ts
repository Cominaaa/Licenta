import { Component, OnInit } from '@angular/core'
import { DesignService } from '../common/design.service';

@Component ({
    selector: 'secondScreen-view',
    templateUrl: 'secondScreen.component.html',
    styleUrls: ['secondScreen.component.css']
})
export class SecondScreenComponent implements OnInit{
    constructor (private designService: DesignService) {

    }

    ngOnInit(){
        this.designService.getAllContests().subscribe((data) => {
            let obj = JSON.parse(data)
            this.designService.listOfContests = obj
        })
    }
}