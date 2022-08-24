import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  @Input() Header: string[] = [];
  @Input() Body: [] = [];
  @Output() onEdit = new EventEmitter<any>();
  @Output() onDelete = new EventEmitter<any>();
  public p: number = 1;
  constructor() {}

  ngOnInit() {}

  editUser(item: string) {
    this.onEdit.emit(item);
  }

  deleteUser(item: string) {
    this.onDelete.emit(item);
  }
}
