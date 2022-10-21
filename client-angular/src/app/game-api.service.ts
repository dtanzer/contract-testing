import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

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
  private gameId: string | undefined
  private loadedSubject = new Subject<boolean>()

  constructor(private http: HttpClient) { }

  connect() {
    this.http.post<{id: string}>('http://localhost:8000/games', {}).subscribe((response: {id: string}) => {
      this.gameId = response.id
      this.loadedSubject.next(true)
    })
  }

  status() {
    return this.http.get<GameStatus>('http://localhost:8000/games/'+this.gameId)
  }

  guess(key: string) {
    return this.http.post(`http://localhost:8000/games/${this.gameId}/guesses`, { guess: key })
  }

  get loaded(): Observable<boolean> {
    return this.loadedSubject
  }
}
