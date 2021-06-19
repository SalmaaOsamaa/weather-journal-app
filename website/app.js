/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
const WEATHER_API_KEY = "5db34371858ca4158da6850455037f33"
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather"
const getWeatherData = async (zip, baseUrl, apiKey) => {
    const res = await fetch(`${baseUrl}?zip=${zip}&appid=${apiKey}`)
    const data = await res.json()
    return data
}

const addData = async (temp, date, content) => {
    const data = { temp, date, content }
    await fetch('http://localhost:8080/api/data', {
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    updateUI()
}
const updateUI = async () => {
    const res = await fetch('http://localhost:8080/api/data')
    const data = await res.json()
    const dateField = document.getElementById('date')
    const tempField = document.getElementById('temp')
    const contentField = document.getElementById('content')
    
    dateField.textContent = new Date(data.date).toLocaleString()
    tempField.textContent = `${Math.ceil(data.temp)} ℃`
    contentField.textContent = data.content

}
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

let generateButton = document.getElementById("generate")
let zipField = document.getElementById("zip")
let feelingsField = document.getElementById("feelings")


generateButton.addEventListener('click', async () => {
    let data = await getWeatherData(zipField.value, BASE_URL, WEATHER_API_KEY)
    await addData(data.main.temp - 273.15, d, feelingsField.value)
})
// function fToC(fahrenheit) 
// {
//   var fTemp = fahrenheit;
//   var fToCel = (fTemp - 32) * 5 / 9;
//   var message = fTemp+'\xB0F is ' + fToCel + '\xB0C.';
//     console.log(message);
// } 
