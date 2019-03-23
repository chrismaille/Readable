import * as React from "react";

import Spinner from "react-spinkit";

const Loading: React.FC = () => (
  <div className="overlay-content">
    <div className="wrapper">
      <Spinner name="ball-grid-beat" color="white" fadeIn="none" />
    </div>
  </div>
);

export default Loading;
