import { PrevilegeService } from '@admin/core/service/previlege.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { PrevilegeDialogComponent } from './previlege-dialog/previlege-dialog.component';

/** Constants used to fill up our data base. */

@Component({
  selector: 'app-previlege',
  templateUrl: './previlege.component.html',
  styleUrls: ['./previlege.component.scss'],
  providers: [PrevilegeService]
})
export class PrevilegeComponent implements OnInit {
  privilegeSub:Observable<any>
  displayedColumns: string[] = ['số thứ tự', 'Tên', 'Hành động', 'action'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild('paginator') paginator: MatPaginator;

  constructor(
    private previlegeService: PrevilegeService, 
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.getAllPrevilege()
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  getPrevilege(name: any){
    this.previlegeService.getPrevilege(name).subscribe((data) => {
      this.dataSource.data = data;
    })
  }

  getAllPrevilege(){
    this.previlegeService.getAllPrevilege().subscribe(data => {
      this.dataSource.data = data
    })
  }
  Filter(filter_data: any){
    this.dataSource.filter = filter_data.target.value.trim().toLowerCase();
  }

  openDialog(Action: any, data: any): void{
    const dialogRef = this.dialog.open(PrevilegeDialogComponent, {
      width: '500px',
      data: {
        Action: Action,
        data: data
      }
    });
    dialogRef.afterClosed().subscribe(result =>{
      if(!result)
        return
      if(result.Action == 'Thêm'){
        var add_data ={
          "name": result.data.name,
          "action": result.data.action
        }
        this.addPrevilege(add_data)
        console.log(add_data)
      }
      if(result.Action == 'Cập Nhật'){
        this.updatePrevilege(result.data, data._id)
        console.log(result.data)
      }
    })
  }

  addPrevilege(previlege: any){
    this.previlegeService.addPrevilege(previlege).subscribe((data)=>{
      Swal.fire({
        title: 'Thêm thành công!',
        icon: 'success',
        timer: 3000,
        showConfirmButton: true,
      });
      this.getAllPrevilege()
      console.log(data)
    })
  }

  updatePrevilege(previlege: any, _id: any){
    this.previlegeService.updatePrevilege(previlege, _id).subscribe((data)=>{
      Swal.fire({
        title: 'Sửa thành công!',
        icon: 'success',
        timer: 3000,
        showConfirmButton: true,
      });
      this.getAllPrevilege()
      console.log(data)
    })
  }

  deletePrivilege(id: string){
    Swal.fire({
      title: 'Bạn chắc chắn muốn xóa ?',
      text: "Thông tin sẽ bị xóa và không thể quay trở lại !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xóa',
      cancelButtonText:'Hủy'
    }).then((result)=>{
      if(result.isConfirmed){
        this.previlegeService.deletePrevilege(id).subscribe(()=>{
          Swal.fire(
            'Thành công!',
            'Thông tin đã được xóa',
            'success'
          )
          this.getAllPrevilege()
        })
      }
    })
  }

}
