const token = `6205c51f2f31438ab76389b3644da184`;

// fetch(url, {
//     method: 'POST', // *GET, POST, PUT, DELETE, etc.
//     headers: {
//         'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(data), // body data type must match "Content-Type" header
// })
// .then(response => response.json()); // parses JSON



const getLeague = () => {
    let url = `http://api.football-data.org/v2/competitions`;
    
    const requestObject = {
        method: 'GET', 
        headers: {
            'X-Auth-Token': token
        }
    }

    return fetch(url, requestObject)
        .then(response => response.json())
        .catch(err => console.log('nije uspio request', err));
}


const getLeagueInTheInput = () => {
    let options = ``;
    getLeague()
    .then (leagues => {
        leagues.competitions.forEach(league => {
            if(league.code) {
                options += `
                    <option value="${league.code}">${league.name}</option>
                `;
            }
        });
        const show = document.getElementById('show');
        show.innerHTML = options;
    })
    .catch (err => console.log ('error', err))
};

const getTeam = (leagueCode) => {
    let url = `http://api.football-data.org/v2/competitions/${leagueCode}/teams`;
    return fetch(url, {
        method: 'GET', 
        headers: {
            'X-Auth-Token': token
        }
    })
    .then(response => response.json())
    .catch(err => console.log('nije uspio getteams request', err));

};

const getTeamInTheInput = () => {
    const show = document.getElementById('show');
    let leagueCode = show.options[show.selectedIndex].value;

    let options = '';
    getTeam(leagueCode)
    .then(result => {
        result.teams.forEach(team => {
            options += `
                <option value="${team.id}">${team.name}</option>
            `;
        });
        
    const teamSelectInTheInput = document.getElementById('teams');
    teamSelectInTheInput.innerHTML = options;
    })
    .catch(err => console.log('show error', err))
}


const showResult = (team) => {
   
    let url = `http://api.football-data.org/v2/teams/${team}`;
    const metadata = {
        method: 'GET',
        headers: {
            'x-auth-token': token
        }
<<<<<<< HEAD
        if(xhttp.readyState == 4 && xhttp.status !== 200) {
            reject ('greska u requestu', err);
        }        
=======
>>>>>>> 3e94e73bacc8eaf9b81d66a8a12059a5d771c274
    }
    return fetch(url, metadata).then(response => response.json());
};

const showTeam = () => {
    let footballClub = document.getElementById('teams');
    let team = footballClub.options[footballClub.selectedIndex].value;
    showResult(team)
    .then()

}


const loginRequest = (email, password) => {
    const body = JSON.stringify({
        email,
        password
    });
    return fetch('https://3d1pftib26.execute-api.eu-west-1.amazonaws.com/dev/user/login', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
        },
        body
    })
    .then(response => response.json()); // parses JSON
}

const login = () => {
    loginRequest('elviruzunovic@gmail.com', 'hangover') 
      .then(token => console.log(token))
      .catch(err => console.error(err));
}