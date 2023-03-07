import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { AnswerDialogComponent } from './answer-dialog/answer-dialog.component';

export class ListAnswer{
  dap_an_A: string;
  dap_an_B: string;
  dap_an_C: string;
  dap_an_D: string;
  constructor(
    cautraloi:{
      dap_an_A: string, 
      dap_an_B: string, 
      dap_an_C: string, 
      dap_an_D: string
    }
  ){
    this.dap_an_A = cautraloi.dap_an_A
    this.dap_an_B = cautraloi.dap_an_B
    this.dap_an_C = cautraloi.dap_an_C
    this.dap_an_D = cautraloi.dap_an_D
  }
}

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})
export class AnswerComponent implements OnInit {
  displayedColumns: string[] = [
    'Số thứ tự',
    'A',
    'B',
    'C',
    'D'
  ];
  @Input('data') DATA: ListAnswer[] = [];
  @ViewChild(MatTable) table!: MatTable<any>;

  dataSource = new MatTableDataSource<ListAnswer>();
  is_changed: boolean = false;
  
  constructor(
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<AnswerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.DATA = this.data.data.ds_cautraloi;
    }

  ngOnInit(): void {
    this.dataSource.data = this.DATA
  }

  addCauTraLoi(){
    let data = { data: {}, is_edit: false };
    this.openDialog(data);
    this.is_changed = true;
  }
  openDialog(data: any): void {
    const dialogRef = this.dialog.open(AnswerDialogComponent, {
      width: '30vw',
      data: data, 
    })
    dialogRef.afterClosed().subscribe(result => {
      let listanwser = new ListAnswer(result.data)
      if(!result)
        return
      if(result.action == 'Thêm'){
        this.DATA.push(listanwser);
        this.table.renderRows();
      }
      /* else {
        let Pos = result.index;
        this.DATA.splice(Pos, 1);
        this.DATA.splice(Pos, 0, listanwser);
        this.table.renderRows();
      } */
      
    })
  }
  update(element: ListAnswer, index: number){
    this.is_changed = true;
    let data = {
      data: {
        dap_an_A: element.dap_an_A,
        dap_an_B: element.dap_an_B,
        dap_an_C: element.dap_an_C,
        dap_an_D: element.dap_an_D,
      },
      is_edit: true,
      index: index,
    };
    this.openDialog(data);
    console.log(data);
  }
  Delete(index: number) {
    Swal.fire({
      title: 'Bạn chắc chắn muốn xóa ?',
      text: "Thông tin sẽ bị xóa và không thể quay trở lại !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xóa',
      cancelButtonText:'Hủy'
    }).then((result) => {
      this.is_changed = true;
      if (result.isConfirmed) {
        this.DATA.splice(index, 1);
        this.table.renderRows();
      }
    })
  }
  Save() {
    let data = { data: this.DATA, btn: 'save', is_changed: this.is_changed };
    this.dialogRef.close(data);
  }
}


