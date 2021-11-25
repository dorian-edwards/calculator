# calculator

- User presses number button

  - Is display full?
    - Yes: nothing happens
    - No: add number to number string
  - Is display empty?
    - Yes
      - Is number 0?
        - Yes: don't add
        - No: add number to number string
    - No
      - Add number to number string

- User presses calculate button
  - Current Total?
    - No: nothing happens
    - Yes:
      - Is something in work queue?
        - No: store currentTotal in work queue, clear display
        - Yes: perform calc
