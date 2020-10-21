/* Global Variables */
let baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
let apiKey = "23b56e7ba9eccf92532559a4a6bf054c";

// Application URL

const appURL = "http://localhost:9000";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

document.querySelector("#generate").addEventListener("click", performAction);

function performAction(e) {
  const zipCode = document.querySelector("#zip").value;
  const feeling = document.querySelector("#feelings").value;
  getWeatherData(baseURL, zipCode, apiKey).then(function (data) {
    // Send data
    postData(`${appURL}/sendWeatherData`, {
      date: newDate,
      temp: data.main.temp,
      content: feeling
    })
      // Update FrontEnd
      .then(function () {
        updateUI();
      });
  });
}

// GET Weather Data

const getWeatherData = async (baseURL, zipCode, apiKey) => {
  const res = await fetch(baseURL + zipCode + "&appid=" + apiKey);
  try {
    const data = await res.json();
    return data;
  } catch (err) {
    console.log("error", err);
  }
};

// Post Data

const postData = async (url = "", data = {}) => {
  const res = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  try {
    const response = await res.json();
    return response;
  } catch (err) {
    console.log("Error", err);
  }
};

// Update Front End Function

const updateUI = async () => {
  const req = await fetch(`${appURL}/all`);
  try {
    const res = await req.json();
    console.log(res)
    document.querySelector("#temp").innerHTML =`Temperature : ${res.temp}`;
    document.querySelector("#date").innerHTML = `Date : ${res.date}`;
    document.querySelector("#content").innerHTML = `Feeling: ${res.content}`;
  } catch (err) {
    console.log("error", err);
  }
};
