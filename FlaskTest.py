from flask import Flask, redirect, url_for, render_template, request

from LichessProject import LichessProject
import AnalysisAlgorithms 

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/', methods=['POST'])
def home_post():
    username = str(request.form['username'])
    numGames = int(request.form['numGames'])

    test = LichessProject(username, numGames)
    
    mostCommonOpening = AnalysisAlgorithms.findMostPlayedOpening(test.gameDatabase)

    gameInfo = []
    for i in range(len(test.refinedGameList)):
        gameInfo.append(str(test.refinedGameList[i]))
    
    return render_template('game_stats.html', mostCommonOpening=mostCommonOpening, gameInfo=gameInfo)


if __name__ == "__main__":
    app.run(debug=True)