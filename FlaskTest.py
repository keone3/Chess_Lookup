from flask import Flask, redirect, url_for, render_template, request
import requests

from LichessProject import LichessProject
import AnalysisAlgorithms 

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')


# Might want to move the valid username check into a different file for more functionality in the future?
@app.route('/', methods=['POST'])
def home_post():
    username = str(request.form['username'])
    numGames = int(request.form['numGames'])
    usernameError = ''
        
    # Sends a get request for user data based on username
    r = requests.get('https://lichess.org/api/user/' + username)
    # r.text is empty when the username is Invalid 
    if(r.text == ''):
        usernameError = "Username Invalid"
        # Refreshes main page with error message
        return render_template('index.html', usernameError = usernameError)
    # "closed":true is in r.text if the username is closed. Example of closed username: "123123"
    if('closed' in r.text):
        usernameError = "Usernamed Closed"
        # Refreshes main page with error message
        return render_template('index.html', usernameError = usernameError)

    test = LichessProject(username, numGames)
    mostCommonOpening = AnalysisAlgorithms.findMostPlayedOpening(test.gameDatabase)

    gameInfo = []
    for i in range(len(test.refinedGameList)):
        gameInfo.append(str(test.refinedGameList[i]))
    
    return render_template('game_stats.html', mostCommonOpening=mostCommonOpening, gameInfo=gameInfo)

if __name__ == "__main__":
    app.run(debug=True)