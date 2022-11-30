import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, Subject } from 'rxjs';

export interface GameStatus {
	guesses: number,
	wrongGuesses: number,
	placeholder: (string | null)[],
	status: 'running' | 'won' | 'lost',
}

@Injectable({
  providedIn: 'root'
})
export class GameApiService {
  public gameId: string | undefined
  private loadedSubject = new Subject<boolean>()
  public baseURL = 'http://localhost:8000'
  private headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');

  constructor(private http: HttpClient) { }

  connect(baseURL: string = 'http://localhost:8000') {
    this.baseURL = baseURL
    console.log('posting to', `${this.baseURL}/games/`)

    this.http.post<{id: string}>(`${this.baseURL}/games/`, {}, { headers: this.headers })
    .subscribe((response: {id: string}) => {
      console.log('received', response)
      this.gameId = response.id
      this.loadedSubject.next(true)
    })
  }

  status() {
    return this.http.get<GameStatus>(`${this.baseURL}/games/${this.gameId}`)
  }

  guess(key: string) {
    return this.http.post(`${this.baseURL}/games/${this.gameId}/guesses`, { guess: key }, { headers: this.headers })
  }

  get loaded(): Observable<boolean> {
    return this.loadedSubject
  }
}
