import React from "react";

export default function LoadingBox({ size = "" }) {
  return (
    <div className="loading">
      {!size && (
        <>
          Loading . . . <div className="sprite__loading"></div>
        </>
      )}
      {size && (
        <div class="sprite__loading--xl">
          <br />
          <b>LOADING</b>
        </div>
      )}
    </div>
  );
}
