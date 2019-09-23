import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './employee.service';
import {AgButtonComponent} from "../shared/ag-button/ag-button.component";
import { Router } from '@angular/router';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
data:any[];
emplyeeName:string;
rowData: any;
addNewTemplate = false;
  display = 'none'; // default Variable
  addTemplate = false;
  UpdateTemplate = false;
  uploadData: any[];
  constructor(private employeeService:EmployeeService, private router: Router) { }
  columnDefs = [
    {headerName: 'UploadId', field: 'UploadId', hide: true },
    {
    headerName: 'Edit',
    autoHeight: true,
    width: 150,
    cellRendererFramework: AgButtonComponent,
    cellRendererParams: [{
      text: 'Edit', 
    }]
  },
    {headerName: 'EmpNo', field: 'EmpNo' },
    {headerName: 'EmpName', field: 'EmpName' },
    {headerName: 'Salary', field: 'Salary'},
    {headerName: 'DeptNo', field: 'DeptNo'},
    {
      headerName: 'Delete',
      autoHeight: true,
      width: 150,
      cellRendererFramework: AgButtonComponent,
      cellRendererParams: [{
        text: 'Delete'
      }]
    },
];
  ngOnInit() {
    this.getIntitalData();
    const context = this;
    this.columnDefs.forEach(element => {
      if (element.headerName == 'Edit') {
        // if (context.selectedUser) {
          /* istanbul ignore next */
          element.cellRendererParams[0].action = (row) => {
            context.UpdateTemplate = true;
            // context.addTemplate = false;
            // context.display = 'block';
            context.uploadData = row;
            console.log("dta====", context.uploadData);
            this.employeeService.setRowData(this.UpdateTemplate);
            this.router.navigate(['/app-home'], {state:{data:row, uploadTemp:context.UpdateTemplate}});
          
          };
        // } else {
        //   element.cellRendererParams[0].disabled = 'disabled';
        // }
      }
      
      if (element.headerName == 'Delete') {

          element.cellRendererParams[0].action = (row) => {
            let uploadId = { 'UploadId': row.UploadId };
         
            this.employeeService.deleteEmployee(uploadId).subscribe(response => {
              console.log("response", response);
              // if (response && response.code == 200) {
              //   alert('deleted successfully');
              // }
            });
            alert('Deleted successfully');
            window.location.reload();
            this.getIntitalData();
  
    }
  }
    })
}
  getIntitalData() {
  this.employeeService.getEmployee().subscribe((res:any[]) => {
    debugger
    this.data=  res['recordset'];
  //   this.emplyeeName = this.data[0].EmpName
  // console.log("fornt", res);
  // console.log("fornt1", this.data);
  // console.log(this.data[0].EmpName)
  this.rowData = this.data;
  })
}

  // onNewTemplate() {
  //   this.addNewTemplate = true;
  //   this.addTemplate = true;
  //   this.display = 'block';
  // }
}
