import React/*, { useState, useEffect, useRef }*/ from "react";
import PropTypes from 'prop-types';


Deploy.propTypes = {
  deploy: PropTypes.shape({
    data: PropTypes.object.isRequired,
    log: PropTypes.array.isRequired,
    status: PropTypes.string.isRequired
  }).isRequired
};

const Deploy = (props) => {
  return (
    <div id="Deploy">
      {JSON.stringify(props.deploy)}
    </div>
  )
}

export default Deploy;
