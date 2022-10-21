import { TestBed, inject } from '@angular/core/testing'
import {PactWeb, Matchers} from '@pact-foundation/pact-web';

import { GameApiService } from './game-api.service'
import { HttpClientModule, HttpEvent, HttpEventType } from '@angular/common/http'


describe('PACT: angular client <-> game API', () => {
  let service: GameApiService | undefined
  let provider: PactWeb | undefined

  beforeAll(function (done) {
    provider = new PactWeb({
      port: 1234,
      consumer: "AngularGameClient",
      provider: "GameServer",
      logLevel: 'debug',
    })

    setTimeout(done, 2000);

    provider.removeInteractions();
  })
  afterAll(function (done) {
    provider!.finalize()
    .then(function () {
      done();
    }, function (err) {
      done.fail(err);
    });
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(GameApiService);
  });

  describe('starting a new game', () => {
    it('starts a new game', (done) => {
      provider!.addInteraction({
        state: '',
        uponReceiving: "start new game",
        withRequest: {
          method: "POST",
          path: "/games/",
        },
        willRespondWith: {
          status: 201,
          body: {
            id: Matchers.like("1234"),
          },
        },
      }).then(_ => {
        service!.connect('http://localhost:1234');
        service?.loaded.subscribe(_ => {
          expect(service!.gameId).toEqual('1234')
          done()
        })
      })
    })

    describe('guessing', () => {
      it('guesses letter a as first guess', (done) => {
        provider!.addInteraction({
          state: 'a game with id 1234-5678 is running',
          uponReceiving: "guessed letter a",
          withRequest: {
            method: "POST",
            path: "/games/1234-5678/guesses",
            body: { guess: 'a' },
          },
          willRespondWith: {
            status: 201,
          },
        }).then(_ => {
          service!.gameId = '1234-5678'
          service!.baseURL = 'http://localhost:1234'
          service?.guess('a').subscribe(_ => done())
        })
      })
    })
  })
})
