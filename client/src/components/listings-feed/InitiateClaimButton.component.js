import React from 'react';

function InitiateClaimButton(props) {
  const buttonId = `claim${props.listing._id}`;
  return (
    <button
      className="btn btn-outline-success mt-3"
      type="submit"
      id={buttonId}
      onClick={() => props.handleClick(props.listing)}
    >
      Claim Listing
    </button>
  );
}

export default InitiateClaimButton;