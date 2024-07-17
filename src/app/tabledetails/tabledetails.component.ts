import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TableDetailService } from '../table-detail.service';

@Component({
  selector: 'app-tabledetails',
  templateUrl: './tabledetails.component.html',
  styleUrls: ['./tabledetails.component.scss']
})
export class TabledetailsComponent implements OnInit {

  table: any; // Define the type as needed

  constructor(private route: ActivatedRoute, private tableService: TableDetailService) {}

  ngOnInit() {
    const tableId = this.route.snapshot.paramMap.get('id');
    this.table = this.tableService.getTables().find(t => t.id === tableId); // Adjust based on how you store tables
  }

}
