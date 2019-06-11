const token = `6205c51f2f31438ab76389b3644da184`;

const getLeague = () => new Promise ((resolve, reject) => {
    let url = `http://api.football-data.org/v2/competitions`;
    let xhttp = new XMLHttpRequest ();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            let object = JSON.parse(xhttp.responseText);
            console.log (object);
            resolve (object);
        }
        if(xhttp.readyState == 4 && xhttp.status !== 200) {
            reject ('load error')
        }
    }
    xhttp.open ('GET', url, true);
    xhttp.setRequestHeader ('X-Auth-Token',token);
    xhttp.send();
});

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

const getTeam = (leagueCode) => new Promise ((resolve, reject) => {
    let url = `http://api.football-data.org/v2/competitions/${leagueCode}/teams`;
    let xhttp = new XMLHttpRequest ();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            let object = JSON.parse(xhttp.responseText);
            console.log(object);
            resolve (object);
        }
        if(xhttp.readyState == 4 && xhttp.status !== 200) {
            reject ('error')
        }

    }
    xhttp.open ('GET', url, true);
    xhttp.setRequestHeader ('X-Auth-Token',token);
    xhttp.send();
});

const getTeamInTheInput = () => {
    const show = document.getElementById('show');
    let leagueCode = show.options[show.selectedIndex].value;

    let options = '<option>select team</option>';
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


const showResult = (team) => new Promise ((resolve, reject) => {

    let url = `http://api.football-data.org/v2/teams/${team}`;
    let xhttp = new XMLHttpRequest ();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            let object = JSON.parse(xhttp.responseText);
            console.log(object);
            resolve (object);
        }
        if(xhttp.readyState == 4 && xhttp.status !== 200) {
            reject ('error')
        }        
    }
    xhttp.open ('GET', url, true);
    xhttp.setRequestHeader ('X-Auth-Token',token);
    xhttp.send();
});

const showTeam = () => {
    let footballClub = document.getElementById('teams');
    let team = footballClub.options[footballClub.selectedIndex].value;
    let html =``;
    showResult(team)
    .then(data =>{
        html =`
        <div>
            <img src=${data.crestUrl} alt="logo" height="150" width="150">
            <br>
            <br>
            <div>CLUB NAME: ${data.name}</div><br>
            <div>CLUB COLORS: ${data.clubColors}</div><br>
            <div>CLUB SHORT NAME: ${data.tla}</div><br>
            <div>CLUB ADDRESS: ${data.address}</div><br>
            <div>CLUB PHONE: ${data.phone}</div><br>
            <div>CLIB EMAIL: ${data.email}</div><br>
            <div>CLUB WEBSITE: ${data.website}</div>
        </div>
        `
    const tim = document.getElementById('tim');
    tim.innerHTML = html;
    })
        
    .catch (err => console.log ('greska', err));
}