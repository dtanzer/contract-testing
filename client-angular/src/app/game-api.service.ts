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
  private baseURL = 'http://localhost:8000'

  constructor(private http: HttpClient) { }

  connect(baseURL: string = 'http://localhost:8000') {
    this.baseURL = baseURL
    console.log('posting to', `${this.baseURL}/games/`)

    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    this.http.post<{id: string}>(`${this.baseURL}/games/`, {}, { headers })
    .subscribe((response: {id: string}) => {
      console.log('received', response)
      this.gameId = response.id
      this.loadedSubject.next(true)
    })
  }

  status() {
    return this.http.get<GameStatus>(`${this.baseURL}/games${this.gameId}`)
  }

  guess(key: string) {
    return this.http.post(`${this.baseURL}/games/${this.gameId}/guesses`, { guess: key })
  }

  get loaded(): Observable<boolean> {
    return this.loadedSubject
  }
}
