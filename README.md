# Finishers
Capture the finishing times of a sports competition. Scaffolded by ChatGPT.

## Features
* Start button to begin the timer (disables itself afterward)
* Live timer display in mm:ss format
* Capture button to record the time of finishers
* Table showing captured times with comments
* LocalStorage support to persist captured finishers

![Screenshot](screenshot.png)

## Prompts

The code started out by prompting the free version of ChatGPT.

### Initial Prompt: The Requirements

```
Scaffold a simple HTML/CSS/Javascript based mobile app to capture finishers of a sports competition.

* Button "Start" to start the timing - shall be disabled after it has been pressed
* Large timer showing the time that has already passed. Format: mm:ss
* Button "Capture" to capture the time of the next finisher
* A table with a row for each already captured time:
   * a consecutive number
   * the captured time
   * a text field to enter occasional comments
* There is no active backend
* All data has to be immediately stored to local storage of the browser

No frameworks or libraries
```

### Refinement: Splitting Into Multiple Files
```
Please split HTML/CSS/JavaScript into separate files. Thank you.
```
The result can be seen in the [initial commit](https://github.com/paulroho/finishers/commit/47c9ff41e42e553587a634bdadee31decd3ad387).
