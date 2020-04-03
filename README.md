<p align="center">
    <img src="https://raw.githubusercontent.com/TropicalBastos/Poke-League/master/client/src/assets/logo.png">
</p>

This is a lightweight dynamic league table web app which was built with the intention to keep a record of wins, draws and losses on the Pokemon TCG Online game amongst friends.

However this is completely extendable as it was built with generic-ness in mind so that it could be reskinned for any sort of league, be it in sports or other competitive games.

## Features

- Inline editable AJAX cells so that values can be updated on the fly
- The table is sorted in real time by the current row's score 
- The score is automatically calculated by the wins, draws and losses cells
- The games column is also a calculation of wins, draws and losses
- Add, delete and update cells without a single page reload
- Ability to create a new season with an end date wherein all entries' values reset to 0 for the new season
- A countdown until the season ends banner is integrated above the table

## In the future

When time is on my side I plan to dockerize this dotnet/react application so as to make it more portable and less reliant on server setup.

![alt text](https://raw.githubusercontent.com/TropicalBastos/Poke-League/master/screenshots/1.png)