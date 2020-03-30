import React/*, { useState, useEffect, useRef }*/ from "react";
import PropTypes from 'prop-types';

const Deployment = (props) => {
  return (
    <div id="Deployment">
      {JSON.stringify(props.deploy)}
    </div>
  )
}

Deployment.propTypes = {
  deploy: PropTypes.shape({
    data: PropTypes.object.isRequired,
    log: PropTypes.array.isRequired,
    status: PropTypes.string.isRequired
  }).isRequired
};

export default Deployment;
