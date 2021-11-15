//HTML references
const $clocks = document.getElementById('clocks')
const $clockDisplay = document.getElementById('clock-display')

//Internal variables
const offsets = {
    ottawa: -5,
    london: 0,
    tokyo: 9
}

//Functions
function capitalize(word) {
    return word[0].toUpperCase() + word.slice(1)
}

function getLocalTime(city) {
    let UTCTime = new Date()
    UTCTime = UTCTime.toUTCString().split(' ')[4]
    const offset = offsets[city]

    let hours = parseInt(UTCTime.slice(0, 2)) + offset

    if (hours >= 24) {
        hours -= 24
    } else if (hours < 0) {
        hours += 24
    }

    const localTime = hours + UTCTime.slice(2)

    return localTime
}

function createClock(city) {

    $clockDisplay.innerHTML = `
    <h2>Local time in ${capitalize(city)}</h2>
    <p id='time-display'>${getLocalTime(city)}</p>
    <button id='update'>Update</button>
    <button id='close'>Close</button>
    `
    document.getElementById('update').addEventListener('click', function () {
        document.getElementById('time-display').textContent = getLocalTime(city)
    })
    document.getElementById('close').addEventListener('click', function () {
        $clockDisplay.innerHTML = ''
    })

    localStorage.setItem('timeZoneCity', city)
}

function initialize() {

    const storedCity = localStorage.getItem('timeZoneCity')

    if (storedCity) {
        createClock(storedCity)
    } else {
        createClock($clocks.value)
    }
}

//Event listeners
$clocks.addEventListener('change', function () {
    createClock($clocks.value)
})

//Initialization
initialize()