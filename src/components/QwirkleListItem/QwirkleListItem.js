import React from 'react';
import PropTypes from 'prop-types';

import './QwirkleListItem.scss';

const QwirkleListItem = ({ player, endPlayerTurn, removePlayer, setPlayerRoundScore }) => (
  <div className="qwirkle-list-item">
    <div className="qwirkle-list-item-meta qwirkle-list-item-row">
      <div>Player: {player.name}</div>
      <div>Score: {player.totalScore}</div>
    </div>
    <form className="qwirkle-list-item-score qwirkle-list-item-row">
      <label htmlFor={`player-${player.playerPosition}-score`}>
        Round Score:&nbsp;
        <input
          max="200"
          min="0"
          name={`player-${player.playerPosition}-score`}
          type="number"
          value={player.roundScore}
          onChange={({ target }) => setPlayerRoundScore(player.playerPosition, target.value)}
        />
      </label>
      <button
        onClick={e => {
          e.preventDefault();
          endPlayerTurn(player.playerPosition, player.roundScore);
        }}
      >
        Update Score
      </button>
    </form>
    <div className="qwirkle-list-item-delete">
      <button onClick={() => removePlayer(player.playerPosition)}>&times;</button>
    </div>
  </div>
);

QwirkleListItem.propTypes = {
  endPlayerTurn: PropTypes.func.isRequired,
  player: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    playerPosition: PropTypes.number,
    roundScore: PropTypes.number,
    totalScore: PropTypes.number,
  }).isRequired,
  removePlayer: PropTypes.func.isRequired,
  setPlayerRoundScore: PropTypes.func.isRequired,
};

export default QwirkleListItem;
