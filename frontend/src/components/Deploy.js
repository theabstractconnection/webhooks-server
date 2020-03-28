import React/*, { useState, useEffect, useRef }*/ from "react";
import PropTypes from 'prop-types';

const Deploy = (props) => {
  return (
    <div id="Deploy">
      {JSON.stringify(props.deploy)}
    </div>
  )
}

Deploy.propTypes = {
  deploy: PropTypes.shape({
    data: PropTypes.object.isRequired,
    log: PropTypes.array.isRequired,
    status: PropTypes.string.isRequired
  }).isRequired
};

export default Deploy;
