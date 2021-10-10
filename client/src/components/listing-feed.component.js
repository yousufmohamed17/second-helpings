import React, { Component } from 'react';
import Listing from './listing.component';
import axios from 'axios';

const { REACT_APP_ENDPOINT } = process.env;

export default class ListingFeed extends Component {
  constructor(props) {
    super(props);
    this.state = { listings: [] };
  }

  componentDidMount() {
    axios
      .get(`${REACT_APP_ENDPOINT}listings`)
      .then((response) => {
        this.setState({ listings: this.availableListings(response.data) });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  availableListings(data) {
    return data.filter((currentListing) => {
      return !currentListing.claimedBy;
    });
  }

  claimListing(id) {
    const claim = { claimedBy: 222 };
    axios
      .patch(`${REACT_APP_ENDPOINT}listings/update/${id}`, claim)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  listingFeed() {
    return this.state.listings.map((currentListing) => {
      return (
        <Listing
          listing={currentListing}
          key={currentListing._id}
          handleClick={(key) => this.claimListing(key)}
        ></Listing>
      );
    });
  }

  render() {
    return (
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Listed by</th>
            <th>Number of meals</th>
            <th>Description</th>
            <th>Available until</th>
          </tr>
        </thead>
        <tbody>{this.listingFeed()}</tbody>
      </table>
    );
  }
}
