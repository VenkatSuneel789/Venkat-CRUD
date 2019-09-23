import { Component, OnInit,OnChanges } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import { HomeService } from '../home/home.service';
import { EmployeeService } from '../employee/employee.service';
@Component({
  selector: 'app-home2',
  templateUrl: './home2.component.html',
  styleUrls: ['./home2.component.css']
})
export class Home2Component implements OnInit, OnChanges {
  form;
  data;
  editData:any;
  constructor(private formBuilder: FormBuilder, private homeService:HomeService, private employeeService:EmployeeService){
    this.form = this.formBuilder.group({
      EmpNo: [''],
      EmpName: [''],
      Salary: [''],
      DeptNo: ['']
 
    });
  }
ngOnChanges(){
  let context: this;
  this.employeeService.getRowData().subscribe(data => {
    // this.editData = new Employee(data.EmpNo, data.EmpName, data.Salary, data.DeptNo);
    context.editData = data;
    context.form.setValue({
      EmpNo: context.editData.EmpNo,
      EmpName: context.editData.EmpName,
      Salary: context.editData.Salary,
      DeptNo: context.editData.DeptNo
    })
    // this.getData(data);
     console.log("pichipav", data);
   });
}
  ngOnInit() {
   
  }

  submit() {
    // if (this.form.valid) {
    //   this.data = this.form.value;
    //   console.log(this.form.value)
    // }
    // else{
    //   alert("FILL ALL FIELDS")
    // }

    var result = { 'EmpNo': this.form.value.EmpNo, 'EmpName': this.form.value.EmpName, 'Salary': this.form.value.Salary, 'DeptNo':this.form.value.DeptNo };
    this.homeService.saveEmployee(result).subscribe(data => {
      alert('Added data successfully');

      window.location.reload();
    });
    console.log(this.form.value);
}
  }




