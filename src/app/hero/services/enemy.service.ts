import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators'
import { environment } from 'src/environments/environment';
import { Enemy } from 'src/app/core/models/enemy';


@Injectable({
  providedIn: 'root'
})
export class EnemyService {

  private collection$: BehaviorSubject<Enemy[]> = new BehaviorSubject<Enemy[]>([]);
  private urlApi = environment.urlApi;


  constructor(private http: HttpClient) {
    this.refreshCollection();

   }
  private refreshCollection(){
      this.http.get<Enemy[]>(`${this.urlApi}/enemy`).subscribe((data)=> {
        this.collection$.next(data);
      });
    }
  public get collection():BehaviorSubject<Enemy[]> {
      return this.collection$;
    }

  public set collection(col:BehaviorSubject<Enemy[]>) {
      this.collection$ = col;
    }

// get item dans la collection par son ID
  public getItemById(id:number):Observable<Enemy> {
    return this.http.get<Enemy>(`${this.urlApi}/enemy/${id}`)
  }



}



















