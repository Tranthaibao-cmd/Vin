import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';

import { TestCaseService } from './test-case.service';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { first, map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { FormDauVaoComponent } from './form-nhap-gia-tri-dau-vao/form-dau-vao.component';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-test-case',
  templateUrl: './test-case.component.html',
  styleUrls: ['./test-case.component.scss'],
})
export class TestCaseComponent implements AfterViewInit, OnInit {
  contentLoaded = false
  list_testcase_observable = new Observable();
  cau_hoi: any;
  dv: { ten_dau_vao: string; kieu_du_lieu: string }[] = [];
  kieu_du_lieu_dau_ra!: string;
  data_global: any;
  displayedColumns: string[] = ['stt', 'value_in', 'value_out', 'action'];
  dataSource = new MatTableDataSource<TestCase>();
  @ViewChild(MatPaginator) paginator: any;
  //snackbar config
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  config = new MatSnackBarConfig();
  constructor(
    private route: ActivatedRoute,
    private TestCaseService: TestCaseService,
    public dialog: MatDialog,
    private _snackbar:MatSnackBar
  ) {
    this.data_global = JSON.parse(localStorage.getItem('DATA_GLOBAL')!);
    //snackbar config
    this.config.verticalPosition = this.verticalPosition;
    this.config.horizontalPosition = this.horizontalPosition;
    this.config.duration = 2500;
    this.config.panelClass = ['green-snackbar'];
  }
  ngOnInit() {
    let cauhoiid = this.route.snapshot.queryParamMap.get('id_cau_hoi');
    this.list_testcase_observable = this.getAllTestCase(cauhoiid!);
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  filter(event: any) {
    this.dataSource.filter = event.target.value.trim().toLowerCase();
  }

  getAllTestCase(cauhoi: string): Observable<any> {
    return this.TestCaseService.GetAllTestCaseViaCauHoi(cauhoi).pipe(
      map((data) => {
        this.contentLoaded = true
        this.dataSource.data = data.list_testcase;
        this.cau_hoi = data.cau_hoi ? data.cau_hoi : '';
        this.dv = data.cau_hoi.dau_vao ? data.cau_hoi.dau_vao : this.dv;
        
        this.kieu_du_lieu_dau_ra = data.cau_hoi.kieu_du_lieu_dau_ra
          ? data.cau_hoi.kieu_du_lieu_dau_ra
          : this.kieu_du_lieu_dau_ra;
      })
    );
  }

  addCauHoi() {
    let dv = [];
    
    for (let d of this.dv) {
      dv.push({ ...d, gia_tri: '' });
    }
    let data = {
      dau_vao: dv,
      dau_ra: { kieu_du_lieu: this.kieu_du_lieu_dau_ra, gia_tri: '' },
      an:false,
      method: 'add',
    };
    this.openDialog(data);
  }
  edit(element: TestCase) {
    let data = {
      testcase_id: element.id,
      dau_vao: element.chuoi_gia_tri_dau_vao,
      dau_ra: element.gia_tri_dau_ra,
      an:element.an,
      method: 'edit',
    };
    this.openDialog(data);
  }
  delete(element: TestCase) {
    let is_confirm = confirm(`Bạn có chắc chắn muốn xóa testcase này`);
    if (!is_confirm) return;
    this.TestCaseService.DeleteTestCase(element.id)
      .pipe(first())
      .subscribe((data) => {
        
        this.ngOnInit()
        this._snackbar.open('Xóa thành công !!!',undefined,this.config)
      });
  }

  openDialog(data: any): void {
    let isValid = (result: {
      data: {
        dau_vao: {
          ten_dau_vao: string;
          kieu_du_lieu: string;
          gia_tri: string;
        }[];
        dau_ra: { kieu_du_lieu: string; gia_tri: string };
        an:boolean;
      };
      method: string;
    })=>{
        let valid = true 
      	for(var dv of result.data.dau_vao)
        {
          if (dv.gia_tri == '')
          {
            
            valid = false
            break;
          }


        }
        if(result.data.dau_ra.gia_tri == '') valid = false
        
        return valid

    }
    
    
    const dialogRef = this.dialog.open(FormDauVaoComponent, {
      width: '500px',
      data: data,
    });


    dialogRef.afterClosed().subscribe(
      (result: {
        data: {
          dau_vao: {
            ten_dau_vao: string;
            kieu_du_lieu: string;
            gia_tri: string;
          }[];
          dau_ra: { kieu_du_lieu: string; gia_tri: string };
          an:boolean;
        };
        method: string;
      }) => {
        if (result) {
          if(!isValid(result))
          {
            alert('Một vài trường chưa được hoàn thành, Bạn cần điền đầy đủ vào các trường');
            this.openDialog(data)
            return
          }
          
          let data_inserted = {
            ma_cau_hoi: this.cau_hoi.id,
            ten_cau_hoi: this.cau_hoi.ten_cau_hoi,
            chuoi_gia_tri_dau_vao: result.data.dau_vao,
            gia_tri_dau_ra: result.data.dau_ra,
            an:result.data.an
          };
          if (result.method == 'add') {
            this.TestCaseService.InsertTestCase(data_inserted)
              .pipe(first())
              .subscribe((data) => {
               
                this.ngOnInit();
                this._snackbar.open('Thêm thành công !!!',undefined,this.config)
              });
          } else {
            let is_confirm = confirm('Bạn chắc chắn muốn lưu thay đổi ?');
            if (!is_confirm) 
            {
              this.ngOnInit();
              return;
            }
            
            this.TestCaseService.UpdateTestCase(data.testcase_id, data_inserted)
              .pipe(first())
              .subscribe((data) => {
               
                this.ngOnInit();
                this._snackbar.open('Cập nhật thành công !!!',undefined,this.config)
              });
          }
        }
        else this.ngOnInit()
      }
    );
  }
}

export interface TestCase {
  id: string;
  ma_cau_hoi: string;
  ten_cau_hoi: string;
  chuoi_gia_tri_dau_vao: {
    ten_dau_vao: string;
    kieu_du_lieu: string;
    gia_tri: any;
  }[];
  gia_tri_dau_ra: { kieu_du_lieu: string; gia_tri: string };
  an:boolean;
}
