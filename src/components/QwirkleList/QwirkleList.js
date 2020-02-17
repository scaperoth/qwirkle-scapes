import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

const QwirkleList = ({ maxPlayers }) => {
  const [players, setPlayers] = useState([]);

  const nameInputRef = useRef();

  const endPlayerTurn = (playerPosition, roundScore) => {
    const cleanedRoundScore = parseInt(roundScore, 10);
    setPlayers(
      players.map(player => {
        const newPlayer = { ...player, roundScore: 0 };
        if (player.playerPosition === playerPosition) {
          newPlayer.totalScore = player.totalScore + cleanedRoundScore;
        }
        return newPlayer;
      }),
    );
  };

  const setPlayerRoundScore = (playerPosition, score) => {
    setPlayers(
      players.map(player =>
        player.playerPosition === playerPosition ? { ...player, roundScore: score } : player,
      ),
    );
  };

  const removePlayer = playerPosition => {
    const newPlayers = players.filter(player => player.playerPosition !== playerPosition);
    setPlayers(newPlayers);
  };

  const addNewPlayer = name => {
    setPlayers([
      ...players,
      {
        playerPosition: players.length,
        name,
        roundScore: 0,
        totalScore: 0,
      },
    ]);
  };

  const onAddButtonClick = e => {
    e.preventDefault();
    const nameInput = nameInputRef.current;
    addNewPlayer(nameInput.value);
    nameInput.value = '';
  };

  return (
    <div className="player-list">
      <ul>
        {players &&
          players.map(player => (
            <li key={player.playerPosition}>
              <div>{player.name}</div>
              <div>{player.totalScore}</div>
              <input
                type="number"
                name="quantity"
                min="0"
                max="200"
                value={player.roundScore}
                onChange={({ target }) => setPlayerRoundScore(player.playerPosition, target.value)}
              />
              <button onClick={() => endPlayerTurn(player.playerPosition, player.roundScore)}>
                Save Score
              </button>
              <button onClick={() => removePlayer(player.playerPosition)}>X</button>
            </li>
          ))}
      </ul>
      {players.length < maxPlayers && (
        <form className="new-player">
          <input ref={nameInputRef} type="text" />
          <button onClick={onAddButtonClick}>Add</button>
        </form>
      )}
    </div>
  );
};

QwirkleList.defaultProps = {
  maxPlayers: 4,
};

QwirkleList.propTypes = {
  maxPlayers: PropTypes.number,
};

export default QwirkleList;
