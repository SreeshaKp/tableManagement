import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TableDetailService } from '../table-detail.service';

@Component({
  selector: 'app-addtable',
  templateUrl: './addtable.component.html',
  styleUrls: ['./addtable.component.scss']
})
export class AddtableComponent {

  tableDetails = {id:'', name: '', type: '',noOfSeats:0 };
  tableTypes =['Square','Circle','Rectangle'];
  tableList: any[] = [];
  private currentId = 1;
  constructor(private dialogRef: MatDialogRef<AddtableComponent>,
    private tableService:TableDetailService) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.tableDetails.id = this.currentId.toString();
    this.tableService.addTables({ ...this.tableDetails });
    this.currentId++;
    // this.tableDetails = { name: '', type: '', noOfSeats: 0 };
    this.dialogRef.close(this.tableDetails);

  }


  increment() {
    this.tableDetails.noOfSeats++;
  }

  decrement() {
    if (this.tableDetails.noOfSeats > 0) {
      this.tableDetails.noOfSeats--;
    }
  }

}
