from flask import Flask, redirect, url_for, render_template, request
import requests
import json

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

    #--
    #
    # NOTE: We need to sort/fetch games based on game type, or at least put that data into the table (standard, bullet, etc)
    #
    #--


    # gameInfo is a list of dicts
    gameInfo = []
    for i in range(len(test.refinedGameList)):
        gameInfo.append((test.refinedGameList[i].getGameDict()))
    
    # Load json user data from text we got from api request
    # https://lichess.org/api#operation/apiUser
    userDataDict = json.loads(r.text)
    correctCaseUsername = userDataDict['username']
    userOnline = str(userDataDict['online'])
    userTitle = ''
    if('title' in userDataDict):
        userTitle = "Title: " + userDataDict['title']

    totalGames = test.totalGames
    loadTime = str(round(test.loadTime, 2))

    return render_template('game_stats.html', 
        mostCommonOpening=mostCommonOpening, 
        gameInfo=gameInfo, 
        correctCaseUsername=correctCaseUsername, 
        userOnline=userOnline, 
        userTitle=userTitle,
        loadTime=loadTime,
        totalGames=totalGames)

if __name__ == "__main__":
    app.run(debug=True)