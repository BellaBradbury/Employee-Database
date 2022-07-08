const url = "https://randomuser.me/api/1.4/?results=12&nat=us&inc=name,location,email,dob,cell,picture";


// FETCHES 12 RANDOM UNITED STATES "EMPLOYEES"
  // WITH FULL NAME, FULL LOCATION, EMIAL, DOB, CELL #, AND PICTURE
function fetchData() {
  fetch(url)
    .then(checkStatus)
    .then( response => response.json() )
    .catch( error => console.log('ERROR:', error) );
}

fetchData();
