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
    username = request.form['username']
    numGames = request.form['numGames']
    usernameError = ''
    numGamesError = ''
    badInfo = False

    if(username == ''):
        usernameError = "Username Empty"
        badInfo = True
    else:
        username = str(request.form['username'].strip())

    if(numGames == ''):
        numGamesError = "Number of Games Empty"
        badInfo = True
    elif(int(request.form['numGames']) < 0):
        numGamesError = "Number of Games Must Be Positive"
        badInfo = True
    else:
        numGames = int(request.form['numGames'])

    # Sends a get request for user data based on username
    r = requests.get('https://lichess.org/api/user/' + username)
    
    # r.text is empty when the username is Invalid 
    if(r.text == ''):
        usernameError = "Username Invalid"
        badInfo = True

    # "closed":true is in r.text if the username is closed. Example of closed username: "123123"
    if('closed' in r.text):
        usernameError = "Usernamed Closed"
        badInfo = True

    if(badInfo):
        return render_template('index.html', numGamesError = numGamesError, usernameError = usernameError)

    test = LichessProject(username, numGames)
    mostCommonOpening = AnalysisAlgorithms.findMostPlayedOpening(test.gameDatabase)

    # gameInfo is a list of dicts
    gameInfo = []
    for i in range(len(test.refinedGameList)):
        gameInfo.append((test.refinedGameList[i].getGameDict()))
    
    return render_template('game_stats.html', mostCommonOpening=mostCommonOpening, gameInfo=gameInfo)

if __name__ == "__main__":
    app.run(debug=True)