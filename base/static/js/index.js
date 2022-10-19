let song = {};

function Test() {
  fetch('spotify/is-access-token-valid')
    .then((response) => response.json())
    .then((data) => console.log(data));
  // .then(console.log('test'));
  // console.log('Test');
}

function authenticateSpotify() {
  fetch('/spotify/get-auth-url')
    .then((response) => {
      console.log('Response:', response);
      return response.json();
    })
    .then((data) => {
      console.log('Data:', data);
      window.location.replace(data.url); // replace the current document with the url
    });
}

function getCurrentSong() {
  fetch('/spotify/current-song')
    .then((response) => {
      if (!response.ok) {
        return {};
      } else return response.json();
    })
    .then((data) => {
      console.log(data);
      song = data;
      currentDiv = document.getElementById('song');
      for (var attribute in song) {
        console.log(attribute + '=' + song[attribute]);
        const newDiv = document.createElement('div');
        const newContent = document.createTextNode(
          attribute + '=' + song[attribute]
        );
        newDiv.appendChild(newContent);
        currentDiv.appendChild(newDiv);
      }
    });
}

let interval = '';
function componentDidMount() {
  interval = setInterval(getCurrentSong, 1000);
}

function componentDidUnmount() {
  clearInterval(interval);
}
