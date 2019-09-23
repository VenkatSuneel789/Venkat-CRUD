import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'rebar-ag-button',
  templateUrl: './ag-button.html',
  styleUrls: []
})
export class AgButtonComponent implements OnInit {
  @Input()
  buttons: any[];
  @Input()
  text: string;
  data: any;
  constructor() { }

  ngOnInit() {
  }

  agInit(params: any): void {
    this.buttons = params.colDef.cellRendererParams;
    this.data = params.data;
  }

}
