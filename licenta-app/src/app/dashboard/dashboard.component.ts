import { Component, OnInit } from '@angular/core'
import { DesignService } from '../common/design.service';

@Component({
    selector: 'dashboard-view',
    templateUrl: 'dashboard.component.html',
    styleUrls: ['dashboard.component.css']
})
export class DashboardComponent implements OnInit{
   
    constructor(private designService: DesignService){

    }
    ngOnInit(){
        this.designService.getUser().subscribe((data) => {
            this.designService.user = data
        })
    }
}