import { Component, OnInit, OnChanges } from '@angular/core';
import { HomeService } from './home.service';
import { EmployeeService } from '../employee/employee.service';
import { Employee } from './employee-details';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

submitBtn: boolean = false;
editData: any={};
EmployeNumber;
EmployeName;
Salart;
DepartmentNO;
upload = false;

public employee: Employee;
  constructor(private homeService:HomeService, private employeeService:EmployeeService) { }

  ngOnInit() {
    this.editData = history.state.data;
    this.upload = history.state.uploadTemp;
    // console.log("row----",this.editData)
    // console.log("row1----",this.upload)
    //this.editData.EmpNo = 1;
    // this.employeeService.getRowData().subscribe(data => {
    //  this.uploadTemp = true;
    // //  this.editData = data;
    //  // this.getData(data);
     
    //   console.log("pichipav", this.uploadTemp);
    //   // console.log("pichipav1", this.editData.EmpName);
    //   // console.log("pichipav2", this.editData.Salary);
    //   // console.log("pichipav", this.editData.DeptNo);
    //   // this.EmployeNumber = this.editData.EmpNo;
    //   // this.EmployeName = this.editData.EmpName;
      
    // });
    // this.editData = {
    //   EmpNo : this.editData.EmpNo,
    //   EmpName: this.editData.EmpName
    // }
     // f.value.EmpNo = this.editData.EmpNo;
  }
// getData(x: any) {
//   console.log('AAA',x)
//   this.editData = x;
//   this.employee = {
//     EmpNo : this.editData.EmpNo,
//     EmpName: this.editData.EmpName,
//     Salary: this.editData.Salary,
//     DeptNo: this.editData.DeptNo
//   }
//   alert(this.editData.EmpName);
// }
  onSubmit(f) {
    debugger
    // this.submitBtn = true;
    var result = { 'EmpNo': f.value.EmpNo, 'EmpName': f.value.EmpName, 'Salary': f.value.Salary, 'DeptNo':f.value.DeptNo };
    this.homeService.saveEmployee(result).subscribe(data => {
      alert('Added data successfully');

      window.location.reload();
    });
    console.log(f.value);
}

onUpdate(){
  debugger
  var result =  { 'UploadId': this.editData.UploadId, 'EmpNo': this.editData.EmpNo, 'EmpName': this.editData.EmpName, 'Salary':  this.editData.Salary, 'DeptNo': this.editData.DeptNo };
  this.homeService.updateEmployee(result).subscribe(data => {
    alert('Updated data successfully');

    window.location.reload();
  });
  console.log("dsasdsad-----", result);
}
// ngOnDestroy(): void {
//   this.employeeService.getRowData().unsubscribe();
// }
}
