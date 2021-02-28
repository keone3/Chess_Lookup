from flask import Flask, redirect, url_for, render_template, request

from LichessProject import LichessProject
import AnalysisAlgorithms 

app = Flask(__name__)

@app.route("/")
def home():
    return render_template('test_template.html')

@app.route('/', methods=['POST'])
def home_post():
    username = str(request.form['username'])
    numGames = int(request.form['numGames'])

    test = LichessProject(username, numGames)

    return(AnalysisAlgorithms.findMostPlayedOpening(test.gameDatabase))

if __name__ == "__main__":
    app.run()