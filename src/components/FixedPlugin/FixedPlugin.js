import React from "react";

function FixedPlugin({ position }) {
  return (
    <>
      {position === "left" ? (
        <div className="fixed-plugin">
          <i className="nc-icon rotate-180 nc-button-play"></i>
        </div>
      ) : (
        <div className="fixed-plugin" style={{right: '0px'}}>
          <i className="nc-icon nc-button-play"></i>
        </div>
      )}
    </>
  );
}

export default FixedPlugin;
