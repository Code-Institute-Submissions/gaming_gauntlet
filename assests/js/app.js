/* jshint esversion: 11 */

let scoreMultiplier = 1
let totalScore = 0
let difficulty = 1
let gamesPlayed = 0

//decide primary color
let primaryColor 

function colorPicker() {
    const root = document.querySelector(':root')
    if(document.title == "Gaming Gauntlet || Breakout") {
        root.style.setProperty('--primary-color', '#D6347B')
        primaryColor = '#D6347B'
    } else if(document.title == "Gaming Gauntlet") {
        root.style.setProperty('--primary-color', '#585959')
        primaryColor = '#585959'
    } else if(document.title == "Gaming Gauntlet || Quiz") {
        root.style.setProperty('--primary-color', '#16A085')
        primaryColor = '#16A085'
    }
}

colorPicker()