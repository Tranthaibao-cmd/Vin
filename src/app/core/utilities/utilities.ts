import { Observable, BehaviorSubject } from 'rxjs';
import * as XLSX from 'xlsx'
export default class Utilities {
  static trimAllPropertiesOfObject(object:any){
    for (let property in object) {
      if (object.hasOwnProperty(property)) {

        object[property] = object[property].trim();
      }
    }
  }

  static convertStringToNumber(value: string = '') {
    console.log(value, value.replace(/[^0-9]/g, ''));
    return +value.replace(/[^0-9]/g, '');
  }

  static convertExcelFileToJsonData(excelFile:any):Observable<any> {
    const jsonDataSubject = new BehaviorSubject<any>(null);
    let fileReader = new FileReader();
    fileReader.readAsBinaryString(excelFile);
    fileReader.onload = (event: any) => {
      let binaryData = event.target.result;
      let workbook = XLSX.read(binaryData, { type: 'binary' });
      let jsonData = workbook.SheetNames.map((sheet) => {

        const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
        return data;
      });
      //insert to db
      let jsonArrayData = jsonData[0];
      //trim space of all properties
      jsonArrayData.map(data=>this.trimAllPropertiesOfObject(data))
      jsonDataSubject.next(jsonArrayData);
    }
    return jsonDataSubject
  }

}


