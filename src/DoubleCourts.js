import React, { useEffect, useState } from 'react';
import './double.css'
function DoubleCourt({ gameConfig }) {

    const { _team1Players, _team2Players } = gameConfig;
    const [score, setScore] = useState({ team1: 0, team2: 0 });
    const [scoredTeam, setScoredTeam] = useState(null);

    const [team1Players, setTeam1Players] = useState({
        name: "team1",
        players: _team1Players
    });
    const [team2Players, setTeam2Players] = useState({
        name: "team2",
        players: _team2Players
    });

    const [servingTeam, setServingTeam] = useState(null);
    const [servingPlayer, setServingPlayer] = useState(null);



    const [comments, setComments] = useState([]);

    const [arrowIndicator, setArrowIndicator] = useState(`${team1Players.name}_even`)


    const addPoint = (scoredTeam) => {

        setScoredTeam(scoredTeam)
        setScore((prevScore) => {
            const newScore = { ...prevScore, [scoredTeam]: prevScore[scoredTeam] + 1 };
            return newScore;
        });
    };
    useEffect(() => {
        if (scoredTeam != null) {
            handleServeRotation(scoredTeam, score[scoredTeam]);
        }
    }, [score])

    const handleServeRotation = (scoreTeam, newScore) => {

        if (servingTeam && servingPlayer) {
            if (servingTeam === scoreTeam) {

                if (scoreTeam === team1Players.name) {
                    let rotatedPlayers = swapPlayers(team1Players.players)
                    setTeam1Players({
                        name: scoreTeam,
                        players: rotatedPlayers
                    })
                    setArrowIndicator(`${scoreTeam}_${(newScore % 2 === 0 ? 'even' : 'odd')}`)
                }
                if (scoreTeam === team2Players.name) {
                    let rotatedPlayers = swapPlayers(team2Players.players)
                    setTeam2Players({
                        name: scoreTeam,
                        players: rotatedPlayers
                    })
                    setArrowIndicator(`${scoreTeam}_${(newScore % 2 === 0 ? 'even' : 'odd')}`)
                }

                // Implement serve rotation logic
                //setComments((prevComments) => [...prevComments, `Serve by ${servingPlayer} (${servingTeam})`]);

            } else {
                setServingTeam(scoreTeam);
                setArrowIndicator(`${scoreTeam}_${(newScore % 2 === 0 ? 'even' : 'odd')}`)
                //setComments((prevComments) => [...prevComments, `Serve by ${servingPlayer} (${servingTeam})`]);
            }

        }
    };

    const handlePopupSubmit = (team, player) => {
        setServingTeam(team);
        setServingPlayer(player);
        setComments((prevComments) => [...prevComments, `Starting serve by ${player} (${team})`]);

    };

    const swapPlayers = (playerArray) => {

        if (playerArray.length >= 2) {
            // Swap the first and second players
            const temp = playerArray[0];
            playerArray[0] = playerArray[1];
            playerArray[1] = temp;

            // Update the state (if you're using React)
            // setTeam1Players(playerArray);

            // Alternatively, if you're not using React, you can just return the updated array
            return playerArray;
        } else {
            console.log("Not enough players to swap.");
            // You can handle this case differently based on your requirements.
        }
    }





    useEffect(() => {
        setTimeout(() => {
            handlePopupSubmit(team1Players.name, team1Players.players[0])
        }, 2000)
    }, [])


    return (


        <div className='container-fluid'>
            <div className='row'>
                <div className='col-sm-12 col-lg-12'>
                    <div className='score text-center'>{score.team1} : {score.team2}</div>
                </div>
            </div>
            {console.log(team1Players.players)}

            <div className='row align-items-center'>
                <div className='col-sm-1 col-lg-2' >
                    <button className="btn btn-default" onClick={() => addPoint('team1')}>+1</button>
                </div>
                <div className='col-sm-10 col-lg-8'>
                    <div className="court">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div>
                            <div><span className='player_info'>{team1Players.players[1]}</span></div>
                        </div>
                        <div></div>
                        <div></div>
                        <div><div>
                            <span className='player_info'>{team2Players.players[1]}</span>
                        </div></div>
                        <div></div>
                        <div></div>
                        <div>
                            <div><span className='player_info'>{team1Players.players[0]}</span></div>
                        </div>
                        <div>
                            <div><span className='player_info'>{team2Players.players[0]}</span></div>
                        </div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <div className='serve-indicator'>
                        <div className={`court_arrow ${arrowIndicator}`}></div>
                    </div>
                </div>
                <div className='col-sm-1 col-lg-2'>
                    <button onClick={() => addPoint('team2')} className='btn btn-default'>+1</button>
                </div>

            </div>



            {/*            <div className='row '>
                <div className='col-xs-4'>
                    <button className="btn btn-default" onClick={() => addPoint('team1')}>+1</button>
                    </div>
                    <div className='col-xs-4'>
                    <button onClick={() => addPoint('team2')} className='btn btn-default'>+1</button>
                </div>
            </div> */}



        </div>

    );
}

export default DoubleCourt;
