import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';

import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
 
  private url = 'api/heroes'; // URL to web api
  private httpOptions = { headers: new HttpHeaders({'Content-Type': 'application/json'}) };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

    searchHeroes(term: string): Observable<Hero[]> {
      if(!term.trim()) {
        // if no search term, return empty array.
        return of([]);
      }

      return this.http.get<Hero[]>(`${this.url}/?name=${term}`)
        .pipe(
          tap(x => x.length ? this.log(`found heroes matching "${term}"`)
                  : this.log(`no heroes matching "${term}"`)),
          catchError(this.handleError<Hero[]>('searchHeroes', []))
        );
    }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.url)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        tap(x => this.log(`${x.length} number of heroes fetched`)),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }

  getHero(id: number): Observable<Hero> {
    const url = `${this.url}/${id}`;
    return this.http.get<Hero>(url)
      .pipe(
        tap(x => this.log(`fetched hero with id=${id} and name=${x.name}`)),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
      );
  }

  deleteHero(id: number) : Observable<Hero> {
    const url = `${this.url}/${id}`;

    return this.http.delete<Hero>(url, this.httpOptions)
      .pipe(
        tap(_ => this.log(`deleted hero id=${id}`)),
        catchError(this.handleError<Hero>('deleteHero'))
      );
  }

  /** POST: add a new hero */
  addHero(hero: Hero) : Observable<Hero> {
    return this.http.post<Hero>(this.url, hero, this.httpOptions)
      .pipe(
        tap((newHero : Hero) => this.log(`added hero w/ id=${newHero.id}`)),
        catchError(this.handleError<Hero>('addHero'))
      );
  }

  /** PUT: update the hero on the server */
  updateHero(hero: Hero) : Observable<any> {
    return this.http.put(this.url, hero, this.httpOptions)
      .pipe(
        tap(_ => this.log(`updated hero id=${hero.id}`)),
        catchError(this.handleError<any>('updateHero'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any) : Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error);

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    }
  }

  getHeroesXX(): Observable<Hero[]> {
    const heroes = of(HEROES);
    this.log('HeroServive: fetched heroes');
    return heroes;
  }

  getHeroXX(id: number): Observable<Hero> {
    // For now assume that a hero with the specified `id` always exists.
    // Error handling will be added in the next step.
    const hero = HEROES.find(h => h.id == id)!;
    this.log(`HeroService: fetched hero id=${id}`);
    return of(hero);
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(message);
  }
}
