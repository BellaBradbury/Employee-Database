const url = "https://randomuser.me/api/1.4/?results=12&?nat=us&?inc=name,location,email,dob,cell,picture,nat";

function fetchData() {
  fetch(url)
    .then(checkStatus)
    .then( response => response.json() )
    .catch( error => console.log('ERROR:', error) );
}

fetchData();
