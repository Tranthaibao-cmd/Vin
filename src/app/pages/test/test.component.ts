import { Component, Inject, OnInit } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarRef,
  MAT_SNACK_BAR_DATA,
} from '@angular/material/snack-bar';
import { QuizesService } from '@user_pages/Exam/_services/quizes.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent {

  uploadFile(event: any) {
    const fileSelected = event.target.files[0];
    let data = this.test(fileSelected);
    console.log(data);
  }

  test(file: any) {
    let a:any = [1,2]
    let fileReader = new FileReader();
    fileReader.readAsBinaryString(file);
    fileReader.onload = (event: any) => {
      let binaryData = event.target.result;
      let workbook = XLSX.read(binaryData, { type: 'binary' });
      a = workbook.SheetNames.map((sheet) => {
        const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
        return data;
      });
      return a
    };


  }
}
