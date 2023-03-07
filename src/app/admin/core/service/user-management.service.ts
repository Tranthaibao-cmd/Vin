import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, first, map, retry } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '@environment/environment';
import { api_urls } from '@shared/api_url';

@Injectable({
  providedIn: 'root',
})
export class UserManagementService {
  private BASE_URL = api_urls.LOCAL_API_URL;
  constructor(private http: HttpClient) {}

  getbasedId(id: string) {
    return this.http.get<any>(
      `${this.BASE_URL}/course/${id}/students`
    );
  }

  deleteStudentFromCourse(student_id:string,course_id:string) {
    let url = `${this.BASE_URL}/course/${course_id}/students/${student_id}`
    return this.http.delete(url)
  }
  getHistoryExam(classId: string, userId: string){
    return this.http.get<any>(`${this.BASE_URL}/multichoice-exam/course/${classId}/all-exams/student/${userId}`)
  }
  getAllInvite() {
    return this.http.get<any>(`${this.BASE_URL}/nguoithamgialop/ALL`);
  }

  getInviteBasedID(id: string) {
    return this.http.get<any>(
      `${this.BASE_URL}/nguoithamgialop/LOPHOc?id_lop_hoc=${id}`
    );
  }
  updateUserRole(userId: string, bodyUser: any) {
    let url = `${this.BASE_URL}/user/${userId}`;
    return this.http.patch(url, bodyUser).pipe(
      first(),
      map((res: any) => {
        return res.data;
      })
    );
  }
  addUserList(
    userList: any,
    class_id: string,
    user_id: string,
    first_name: any,
    last_name: any,
    quyen: any
  ): Observable<any> {
    var url = `${this.BASE_URL}/nguoithamgialop/Admin-Add?id_lop_hoc=${class_id}&id_nguoi_dung=${user_id}&first_name=${first_name}&last_name=${last_name}&quyen=${quyen}`;
    return this.http.post<any>(url, userList).pipe(retry(1), first());
  }

  importInviteUser(file: any): Observable<any> {
    var formData: any = new FormData();
    formData.append('file', file);
    var url = `${this.BASE_URL}/nguoithamgialop/importUser/`;
    return this.http.post<any>(url, formData).pipe(first());
  }

  updateUserList(
    userList: any,
    id: string,
    status: any,
    Role: any
  ): Observable<any> {
    var url = `${this.BASE_URL}/nguoithamgialop/${id}?trang_thai=${status}&quyen=${Role}`;
    return this.http.put<any>(url, userList).pipe(retry(1), first());
  }

  deleteUserList(Id: string): Observable<any> {
    var url = `${this.BASE_URL}/nguoithamgialop/${Id}`;
    return this.http.delete<any>(url);
  }

  classAssigmentViaUserEmail(courseId:string,emails:Array<string>){
    let url = `${this.BASE_URL}/user/class-assignment-via-email-user/course/${courseId}`
    return this.http.post<any>(url,emails)
  }
}
