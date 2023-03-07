import {
  Component,
  Inject,
  Input,
  OnChanges,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { DauVaoFormComponent } from '../dau-vao-form/dau-vao-form.component';

@Component({
  selector: 'app-dau-vao-table',
  templateUrl: './dau-vao-table.component.html',
  styleUrls: ['./dau-vao-table.component.scss'],
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class DauVaoTableComponent implements OnInit, OnChanges {
  displayedColumns: string[] = [
    'stt',
    'ten_dau_vao',
    'kieu_du_lieu',
    'hoat_dong',
  ];
  @Input('data') DATA: DauVao[] = [];
  is_changed: boolean = false;

  dataSource = new MatTableDataSource<DauVao>();
  constructor(
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<DauVaoTableComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.DATA = this.data.is_dialog ? this.data.data.dau_vao : this.DATA;
  }
  @ViewChild(MatTable) table!: MatTable<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnChanges() {
    this.dataSource.data = this.DATA;
  }

  ngOnInit() {
    this.dataSource.data = this.DATA;
    //this.table.renderRows()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  addDauVaoData() {
    let data = { data: {}, is_edit: false };
    this.openDialog(data);
    this.is_changed = true;
  }

  openDialog(data: any): void {
    const dialogRef = this.dialog.open(DauVaoFormComponent, {
      //https://material.angular.io/components/dialog/overview
      autoFocus: false, //By default,mat dialog auto focus into the first focusable tab(any button) that it can find in component that inside dialog
      restoreFocus: false, //when dialog close, it was autofocus to element that was focused before opened dialog
      width: '30vw',
      data: data, //sharing data between dialog and component that open dialog
    });

    dialogRef.afterClosed().subscribe((result) => {
      let dauvao = new DauVao(result.data);
      for (let dv of this.DATA) {
        if (dv.ten_dau_vao == dauvao.ten_dau_vao) {
          alert('Trùng tên đầu vào');
          this.openDialog(data)
          return;
        }
      }
      if (result.method == 'add') {
        
        //this.DATA.push(dauvao)
        //not do like the above because reference not change
        //solve this problem
        this.DATA.push(dauvao);
        //this.dataSource.data = this.DATA
      } else {
        let pos = result.index;
        this.DATA.splice(pos, 1);
        this.DATA.splice(pos, 0, dauvao);
        this.table.renderRows();
      }
      this.table.renderRows();
    });
  }
  edit(element: DauVao, index: number) {
    this.is_changed = true;
    let data = {
      data: {
        ten_dau_vao: element.ten_dau_vao,
        kieu_du_lieu: element.kieu_du_lieu,
      },
      is_edit: true,
      index: index,
    };
    this.openDialog(data);
  }
  delete(index: number) {
    this.is_changed = true;
    let is_confirm = confirm('Bạn chắc chắn muốn xóa ?');
    if (is_confirm) {
      this.DATA.splice(index, 1);
      this.table.renderRows();
    }
  }
  Save() {
    let data = { data: this.DATA, btn: 'save', is_changed: this.is_changed };
    this.dialogRef.close(data);
  }
}
export class DauVao {
  ten_dau_vao: string;
  kieu_du_lieu: string;

  constructor(dauvao: { ten_dau_vao: string; kieu_du_lieu: string }) {
    this.ten_dau_vao = dauvao.ten_dau_vao;
    this.kieu_du_lieu = dauvao.kieu_du_lieu;
  }
}
