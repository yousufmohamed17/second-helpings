import React, { Component } from 'react';
import axios from 'axios';

const { REACT_APP_ENDPOINT } = process.env;
export default class AddClaimedMeals extends Component {
  constructor(props) {
    super(props);
    this.state = { total: 0 };
    // this.state = { listings: [] };
  }

  // availableListings(data) {
  //   return data.filter((currentListing) => {
  //     return currentListing.claimedBy;
  //   });
  // }

  componentDidMount() {
    axios
      .get(`${REACT_APP_ENDPOINT}listings`)
      .then((response) => {
        // this.setState({ listings: this.availableListings(response.data) });
        console.log(response);
        let sum = 0;
        // for (let i = 0; i < foo.length; i++) {
        //   sum += foo[i].numberOfMeals;
        // }
        let foo = response.data.filter((currentListing) => {
          return currentListing.claimedBy;
        });

        console.log(foo, 'Here is foo');
        for (let i = 0; i < foo.length; i++) {
          sum += foo[i].numberOfMeals;
        }

        // sum = foo.length;

        this.setState({
          total: sum,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="section w-50 m-auto">
        <p className="mt-2 mb-2 text-center" htmlFor="meals">
          Number of meals that have been given to those in need thus far:
        </p>
        <p
          id="total"
          className="row font-weight-bold justify-content-center text-success display-5"
        >
          {this.state.total}
        </p>
      </div>
    );
  }
}
