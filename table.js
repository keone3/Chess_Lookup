const username = 'fleshygordon'
var api_url = "https://lichess.org/api/games/user/" + username + "?max=10&opening=true" /* The default game request url until we update it inside getData */
var newGames /* New list of games created from request url */
var newGamesTrimed = [] /* One individual match's information to populate a single row of our table */
var gameCounter = 0 /* Used to keep track of row number/how many games we have in the table */
var loadingGames = false /* Checks if we are in getData and won't let us enter it again until the last one is finished, 
							this stops problems with spamming the get games button  */

/* Load the first 10 games right away */
getData()

async function getData() {
	if(loadingGames == false){
		loadingGames = true
		
		/* Request json data from lichess api */
		let response = await fetch(api_url, {
		headers: {
			"Accept": "application/x-ndjson"
		}
		})
		newGames = (await response.text()).match(/.+/g).map(JSON.parse)
		console.log(newGames)

		/* Update the url for the next request */
		api_url = "https://lichess.org/api/games/user/" + username + "?max=10&opening=true&until=" + (newGames[9]['createdAt'] - 1)
		
		for(let i = 0; i < newGames.length; i++){
			let specificMatch = newGames[i]
			
			/* Who is playing what colour, check if vs AI */
			let white = 'undefined'
			let black =  'undefined'
			if('user' in specificMatch['players']['white']){
				white = specificMatch['players']['white']['user']['name'] + " (" + specificMatch['players']['white']['rating'] + ")"
			}
			else if('aiLevel' in specificMatch['players']['white']){
				white = 'Ai: Level ' + specificMatch['players']['white']['aiLevel']
			}

			if('user' in specificMatch['players']['black']){
				black = specificMatch['players']['black']['user']['name'] + " (" + specificMatch['players']['black']['rating'] + ")"
			}
			else if('aiLevel' in specificMatch['players']['black']){
				black = 'Ai: Level ' + specificMatch['players']['black']['aiLevel']
			}

			let gameTimeAgo = timeSince(specificMatch['createdAt'])

			newGamesTrimed.push({
				'gameTimeAgo': gameTimeAgo,
				'id': specificMatch['id'],
				'speed': specificMatch['speed'],
				'opening': specificMatch['opening']['name'],
				'white': white,
				'black': black,
				'winner': specificMatch['winner'],
			})
		}
		addRows()
		loadingGames = false
	}
}


/* Fetch 10 games and desplay them on the table, then on button click, fetch 10 more games starting from the oldest game time in the last request, 
then desplay those on the table too

Use this to change information you are requesting: https://lichess.org/api#operation/apiGamesUser 
*/

/* Games will be JSON Data, we will need some way to remember where we are in the list of games when populating the table so we dont repeat (maybe using time of game or some sort of counter?) */

/* If you are able to request games before a certain time that could be a solution to this problem. 
Save the latest time in the first query, start the next request with that value as the earliest time to start the query at */

function addRows(){

	var numNewRows = 10

	for(let i = 0; i < numNewRows; i++){
		let tbody = document.getElementById("tbody")
		let row = tbody.insertRow()
		let cell = row.insertCell()
		
		let text = document.createTextNode(gameCounter + 1)
		cell.appendChild(text)

		let element = newGamesTrimed[gameCounter]
		for(key in element){
			let cell = row.insertCell()
			let text = document.createTextNode(element[key])
			cell.appendChild(text)
		}
		gameCounter++
	}
}


/* https://stackoverflow.com/questions/3177836/how-to-format-time-since-xxx-e-g-4-minutes-ago-similar-to-stack-exchange-site */
function timeSince(date) {
	if (typeof date !== 'object') {
	  date = new Date(date)
	}
  
	var seconds = Math.floor((new Date() - date) / 1000)
	var intervalType
  
	var interval = Math.floor(seconds / 31536000)
	if (interval >= 1) {
	  intervalType = 'year'
	} else {
	  interval = Math.floor(seconds / 2592000)
	  if (interval >= 1) {
		intervalType = 'month'
	  } else {
		interval = Math.floor(seconds / 604800)
		if (interval >= 1) {
		  intervalType = 'week'
		} else {
		  interval = Math.floor(seconds / 86400)
		if (interval >= 1) {
		  intervalType = 'day'
		} else {
		  interval = Math.floor(seconds / 3600)
		  if (interval >= 1) {
			intervalType = "hour"
		  } else {
			interval = Math.floor(seconds / 60);
			if (interval >= 1) {
			  intervalType = "minute"
			} else {
			  interval = seconds
			  intervalType = "second"
			}
			}
		  }
		}
	  }
	}
  
	if (interval > 1 || interval === 0) {
	  intervalType += 's'
	}
  
	return interval + ' ' + intervalType + ' ago'
}