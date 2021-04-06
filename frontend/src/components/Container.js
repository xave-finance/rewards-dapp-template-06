import React from "react";
import PropTypes from "prop-types";

const Container = ({ staked, reward, handleStake, handleUnStake }) => {
  return (
    <div>
      <button type="button" onClick={handleStake}>
        Stake
      </button>
      <button type="button" onClick={handleUnStake}>
        Unstake
      </button>
      <br />
      <div>{`Amount staked: ${staked}`}</div>
      <div>{`Reward: ${reward}`}</div>
    </div>
  );
};

Container.propTypes = {
  staked: PropTypes.string.isRequired,
  reward: PropTypes.string.isRequired,
  handleStake: PropTypes.func.isRequired,
  handleUnStake: PropTypes.func.isRequired,
};

export default Container;
