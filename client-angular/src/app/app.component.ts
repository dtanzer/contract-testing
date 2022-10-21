import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { GameApiService } from './game-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public hint = new Subject<string>()
  public guesses = new Subject<number>()
  public wrongGuesses = new Subject<number>()

  constructor(private gameApiService: GameApiService) {}

  ngOnInit(): void {
    document.addEventListener('keypress', e => {
      this.gameApiService.guess(e.key).subscribe(_ => this.updateStatus())
    })
    this.gameApiService.connect()
    this.gameApiService.loaded.subscribe(_ => this.updateStatus())
  }

  private updateStatus() {
    this.gameApiService.status().subscribe(status => {
      this.hint.next(status.placeholder.map(c => c==null? '_':c).join(' '))
      this.guesses.next(status.guesses)
      this.wrongGuesses.next(status.wrongGuesses)
    })
  }

  get gameLoaded() {
    return this.gameApiService.loaded
  }
}
