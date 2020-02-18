import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import QwirkleListItem from '../QwirkleListItem/QwirkleListItem';

import './QwirkleList.scss';

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
          if (newPlayer.totalScore > 200) {
            newPlayer.totalScore = 200;
          } else if (newPlayer.totalScore < 0) {
            newPlayer.totalScore = 0;
          }
        }
        return newPlayer;
      }),
    );
  };

  const setPlayerRoundScore = (playerPosition, score) => {
    const roundScore = parseInt(score, 10);
    setPlayers(
      players.map(player =>
        player.playerPosition === playerPosition ? { ...player, roundScore } : player,
      ),
    );
  };

  const removePlayer = playerPosition => {
    const newPlayers = players.filter(player => player.playerPosition !== playerPosition);
    newPlayers.map((p, newPosition) => {
      newPlayers[newPosition].playerPosition = newPosition;
      return p;
    });
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
    <div className="qwirkle-list">
      <ul>
        {players &&
          players.map(player => (
            <QwirkleListItem
              key={player.playerPosition}
              player={player}
              endPlayerTurn={endPlayerTurn}
              removePlayer={removePlayer}
              setPlayerRoundScore={setPlayerRoundScore}
            />
          ))}
      </ul>
      {players.length < maxPlayers && (
        <form className="new-player">
          <input ref={nameInputRef} type="text" />
          <button onClick={onAddButtonClick}>Add New Player</button>
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
