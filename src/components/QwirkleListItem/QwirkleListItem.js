import React from 'react';
import PropTypes from 'prop-types';

const QwirkleListItem = ({ player, removePlayer, endPlayerTurn }) => (
  <li key={player.id}>
    <input
      type="checkbox"
      checked={player.totalScore}
      onChange={({ target }) => endPlayerTurn(player.id, target.checked)}
      name={player.name}
    />
    <span className={player.totalScore ? 'totalScore' : ''}>{player.name}</span>
    <button onClick={() => removePlayer(player.id)}>X</button>
  </li>
);

QwirkleListItem.propTypes = {
  player: PropTypes.shape({
    id: PropTypes.number,
    totalScore: PropTypes.number,
    name: PropTypes.string,
  }).isRequired,
  removePlayer: PropTypes.func.isRequired,
  endPlayerTurn: PropTypes.func.isRequired,
};

export default QwirkleListItem;
