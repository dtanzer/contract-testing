# Hangman Server and Client (Contract Testing)

This repository contains a server (TypeScript+express) and client (TypeScript+Angular)
for playing the word-guessing-game "hangman". The code is intentionally incomplete
and has no tests (see below). 

I created this repository to help a client practice **contract testing** using
[Pact](https://pact.io/), but you can potentially practice other skills
using the code.

## Incomplete and Untested

The code in this repository has no automated tests, and that's on purpose:
there are some bugs in it.

And it is incomplete:

* It allows users to guess letters again that they have already guessed
* It does not recognize when a game was won or lost
* It does not handle communication errors at all
* It does not allow guessing the whole word to solve in one step
* etc.

## How You can Use the Code

I originally created the code to practice contract testing with a client.

### Practice Contract Testing

If you want to try that, check out the branch `pact-intro` that contains the
basic setup for Pact and two first tests.

On the client, run

```bash
npm run test
```

to run all tests, including the Pact tests. This will create the Pact file in
the folder `pacts`. After that, run

```bash
npm run pact
```

on the server to run just the Pact tests. Both should pass after a fresh
checkout of the branch.

Create more Pact tests to find the bug where the client and the server do
not agree on the REST API (this bug can also be found by a code review, but
that's not really the purpose here).

### Bring Under Test

You could also use the code in this repository to practice adding characterization
tests to existing code. Bring the code under test, accepting the current
behavior as "correct"&mdash;i.e., the current behavior is the "Golden Master".

Then check if all the tests make sense: If not, you might have found a bug.

### Finish Test-Driven

After bringing the code under test, you can try to add the missing functionality
in a test-driven way.
