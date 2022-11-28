import React from "react";
import { NavLink } from "react-router-dom";

function NotFound() {
  return (
    <div>
      <div>
        <div>
          <div>404</div>
          <div>Oops. Something is wrong!</div>
        </div>
      </div>
      <div>
        <div>It looks like you've visited a page that doesn't exist.</div>
        <div>
          <NavLink to="/">Back to main page</NavLink>
        </div>
      </div>
    </div>
  );
}

NotFound.propTypes = {};

export default NotFound;
