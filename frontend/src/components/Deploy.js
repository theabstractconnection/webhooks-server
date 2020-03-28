import React/*, { useState, useEffect, useRef }*/ from "react";

const Deploy = (props) => {
  return (
    <div id="Deploy">
      {JSON.stringify(props.deploy)}
    </div>
  )
}

export default Deploy;
