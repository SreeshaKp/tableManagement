import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormsModule } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';


@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  // standalone: true,
  // imports: [BrowserModule,CommonModule,MatFormFieldModule, MatSelectModule, FormsModule,FormsModule, ReactiveFormsModule, NgIf, NgForOf,MatIconModule,MatRippleModule,MatInputModule,NoopAnimationsModule],
})
export class DropdownComponent implements OnInit {
  @ViewChild('search') searchTextBox: ElementRef | undefined;
  selectFormControl: any = new FormControl();
  searchTextboxControl = new FormControl();
  selectedValues: any = [];
  public isDataAvailable: any = true;
  public searchKey: any = false;
  public filteredListLength: any;
  data: string[] = [
   'filename1.txt','newfile.txt','abc.txt','cdf.txt','file2.txt'
       // {value:'All',isSelected: false},{ value:'filename1.txt',isSelected: false},{value:'newfile.txt',isSelected: false},{value:'abc.txt',isSelected: false},{value:'cdf.txt',isSelected: false},{value:'file2.txt',isSelected: false}
  ];
  length: any = this.data.length;

  filteredOptions: Observable<any[]> | undefined ;
  @ViewChild('allSelected')
  public allSelected!: MatOption;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
   
   
    this.filteredOptions = this.searchTextboxControl.valueChanges
      .pipe(
        startWith<string>(''),
        map(name => this._filter(name))
      );

      setTimeout(() => {
        this.selectFormControl.patchValue(this.data);
        this.allSelected.select();
      }, 100);
      
  }

//  data filtering based on search input 




  private _filter(name: string): String[] {
    debugger;

    const filterValue = name.toLowerCase();
    if(filterValue == '' && this.allSelected && this.allSelected.selected && this.selectFormControl.value.length !=this.length){
      setTimeout(() => {
      this.allSelected.deselect();
      }, 50);
      console.log("allselecthhhh",this.allSelected.selected,this.allSelected)
      this.searchKey = false;

    }
    else if(filterValue != '' && this.allSelected && this.allSelected.selected && this.filteredListLength != this.selectFormControl.value.length){
      console.log("not empty",this.filteredListLength,this.selectFormControl.value.length)

      this.allSelected.deselect();
    }
    
    else if(filterValue == '' && this.allSelected && !this.allSelected.selected  && this.selectFormControl.value.length ==this.length){
      console.log("neeww",this.selectFormControl.value.length,this.length)
      this.allSelected.select();
    }
  
    this.setSelectedValues();
    this.selectFormControl.patchValue(this.selectedValues);
    console.log("selected values",this.selectedValues);

    // let filteredList = this.data.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
    let filteredList = this.data.filter(option => option.toLowerCase().includes(filterValue));
    if(filteredList.length == 0){
      this.isDataAvailable =  false;
    }
    else{
      this.filteredListLength = filteredList.length;
      this.isDataAvailable =  true;
    }
    return filteredList;
  }

// new function

// private _filter(name: string): String[] {


//   const filterValue = name.toLowerCase();

//   // let filteredList = this.data.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
//   let filteredList = this.data.filter(option => option.toLowerCase().includes(filterValue));
//   if(filteredList.length == 0){
//     this.isDataAvailable =  false;
//   }
//   else{
//     // setTimeout(() => {
//     //   this.allSelected.deselect();
//     // }, 10);
   
//     this.filteredListLength = filteredList.length;
//     this.isDataAvailable =  true;
//   }
//   return filteredList;
// }

// end



// Remove from selected values based on uncheck
 
  // selectionChange(event: any) {
   
  //   if(event.source.value == 'All' && event.source.selected == true){
  //     this.selectFormControl.patchValue(this.data);
  //   }
  //   else  if(event.source.value == 'All' && event.source.selected == false){
  //     this.selectFormControl.patchValue('');
  //   }
  //   if (event.isUserInput && event.source.selected == false) {
     
  //     console.log("false", this.selectedValues)
  //     let index = this.selectedValues.indexOf(event.source.value)
  //     this.selectedValues.splice(index, 1)
  //   }
  // }



//  Clearing search textbox 
 
  clearSearch(event: any) {
    event.stopPropagation();
    this.searchTextboxControl.patchValue('');
  }

  setSelectedValues() {
    console.log('selectFormControl', this.selectFormControl.value);

    if (this.selectFormControl.value && this.selectFormControl.value.length > 0) {
    console.log('selectFormControl', this.selectFormControl);

      this.selectFormControl.value.forEach((e: any) => {
        if (this.selectedValues.indexOf(e) == -1) {
          this.selectedValues.push(e);
        }
      });
    }
  }

  
  toggleAllSelection() {
    console.log('here2', this.allSelected.selected);
    if (this.allSelected.selected) {
      this.selectFormControl.patchValue(this.data);
      this.allSelected.select();

    } else {
      console.log('here23');
      this.selectFormControl.patchValue([]);
    }
  }

  tosslePerOne() {
    console.log('here1');
    if (this.allSelected.selected) {
      this.allSelected.deselect();
      console.log("selection",this.selectFormControl.value.length,this.searchKey)
      // return false;
    }
    else if(!this.allSelected.selected && this.filteredListLength == this.selectFormControl.value.length){
      this.allSelected.select();
      console.log("check",this.allSelected.selected,this.selectFormControl.value.length,this.searchKey)
    }
    if (this.selectFormControl.value.length ==this.length){
      this.allSelected.select();
    }
    
   
  }
  
}