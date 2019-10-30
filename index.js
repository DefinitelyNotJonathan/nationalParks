'use strict';

const apiKey = 'IfcsBFYkZPOU1J024K3TaNhMYXtHZ7bCHqZhtxrP';
const searchURL = 'https://developer.nps.gov/api/v1/parks';
function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson) {
  console.log(responseJson);
  $('#results-list').empty();
  for (let i=0; i < responseJson.data.length; i++){
    $('#results-list').append(
      `<li><h3>${responseJson.data[i].fullName}</h3>
      <p>States: ${responseJson.data[i].states}
      <p>Designation: ${responseJson.data[i].designation}</p>
      <p>Description: ${responseJson.data[i].description}</p>
      <p>Weather Info: ${responseJson.data[i].weatherInfo}</p>
      <p>Directions: ${responseJson.data[i].directionsUrl}</p>
      <p>Website: ${responseJson.data[i].url}</p>
      </li>`
    )};
  $('#results').removeClass('hidden');
};

function getParkResults(query, maxResults=10) {
  const params = {
    stateCode: query,
    limit: maxResults,
    fields: "addresses",
    api_key: apiKey
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    const maxResults = $('#js-max-results').val();
    getParkResults(searchTerm, maxResults);
  });
}

$(watchForm);
