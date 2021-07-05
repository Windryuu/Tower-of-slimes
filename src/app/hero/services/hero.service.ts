import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators'
import { Hero } from 'src/app/core/models/hero';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private collection$: BehaviorSubject<Hero[]> = new BehaviorSubject<Hero[]>([]);
  private urlApi = environment.urlApi;

  constructor(private http: HttpClient) {
    this.refreshCollection();

   }

   private refreshCollection(){
    this.http.get<Hero[]>(`${this.urlApi}/hero`).subscribe((data)=> {
      this.collection$.next(data);
    });
  }

  public get collection():BehaviorSubject<Hero[]> {
    return this.collection$;
  }

  public set collection(col:BehaviorSubject<Hero[]>) {
    this.collection$ = col;
  }

  // Amélioration du Hero
  public update(item:Hero):Observable<Hero> {
    return this.http.put<Hero>(`${this.urlApi}/hero/${item.id}`,item)
    .pipe(
      tap((res)=>{ this.refreshCollection() })
    )
  }
// get item dans la collection par son ID
  public getItemById(id:number):Observable<Hero> {
    return this.http.get<Hero>(`${this.urlApi}/hero/${id}`)
  }
}
