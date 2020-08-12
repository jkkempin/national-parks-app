const apiKey = '4gZntoaFDIAbrMFifWd6QZKA3RRSh1JXCefcFuBQ';
const searchURL = 'https://developer.nps.gov/api/v1'

function formatQueryParams(params) {
    const queryItems = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
  }

function displayResults(responseJson) {
    $('#results-list').empty();

    for (let i = 0; i < responseJson[data].length; i++) {
        $('#results-list').append(
            `<li><h2>${responseJson[data][i].name}</h2>
            <p>${responseJson[data][i].description}</p>
            <a href="${responseJson[data][i].url}">Link</a>
            <li>`
        )
    };
    
    $('#results').removeClass('hidden');
};

function getStateParks(states, maxResults) {
    const params = {
        key: apiKey,
        limit: maxResults,
        stateCode: states
    };
    const queryString = formatQueryParams(params) ;
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
      const states = $('#js-search-term').val();
      const maxResults = $('#js-max-results').val();
      getStateParks(states, maxResults);
    });
  }
  
  $(watchForm);