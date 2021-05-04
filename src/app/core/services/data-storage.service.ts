import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient) { }

  addTask(user: User, task: string): Observable<{}> {
    return this.http.put(
      `${environment.dataStorageUrl}/users/${user.id}.json?auth=${user.token}`, { task }
    );
  }

  getTasks(user: User): Observable<{}> {
    return this.http.get(
      `${environment.dataStorageUrl}/users/${user.id}.json?auth=${user.token}`
    );
  }
}
