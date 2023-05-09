import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private _http: HttpClient) {}

  register(data: any) {
    return this._http.post<any>('http://localhost:3000/users', data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  //Get Data using get method
  getUser(userId: number) {
    return this._http.get<any>('http://localhost:3000/users/' + userId).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  //Update
  updateUser(data: any, id: number) {
    return this._http.put<any>('http://localhost:3000/users/' + id, data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  //Delete
  deleteData(id: number) {
    return this._http.delete<any>('http://localhost:3000/posts/' + id).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
