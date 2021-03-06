/* eslint-disable no-undef */
import React, { Component, createRef } from 'react';
import axios from 'axios';
import { userContext } from '../../App.js';

const { REACT_APP_ENDPOINT } = process.env;

export default class ListingForm extends Component {
  constructor(props) {
    super(props);

    this.updateNumberOfMeals = this.updateNumberOfMeals.bind(this);
    this.updateDescription = this.updateDescription.bind(this);
    this.updateDate = this.updateDateTime.bind(this);
    this.id = createRef();
    this.username = createRef();

    this.state = {
      numberOfMeals: '',
      description: '',
      timeAvailableUntil: '',
      listedBy: '',
      listedByUsername: '',
      claimStatus: 'Available',
      showNotice: false,
    };
  }

  clearForm() {
    this.setState({
      numberOfMeals: '',
      description: '',
      timeAvailableUntil: '',
    });
  }

  showNotice() {
    this.setState({
      showNotice: true,
    });
    setTimeout(() => {
      this.setState({
        showNotice: false,
      });
    }, 2000);
  }

  updateNumberOfMeals(e) {
    this.setState({
      numberOfMeals: e.target.value,
    });
  }

  updateDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  updateDateTime(e) {
    this.setState({
      timeAvailableUntil: new Date(e.target.value).toISOString(),
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    const listing = {
      numberOfMeals: this.state.numberOfMeals,
      description: this.state.description,
      timeAvailableUntil: this.state.timeAvailableUntil,
      listedBy: this.id.current.value,
      listedByUsername: this.username.current.value,
      claimStatus: this.state.claimStatus,
    };

    axios.post(`${REACT_APP_ENDPOINT}listings/create`, listing).then((res) => {
      console.log(res.data);
    });
    this.clearForm();
    this.showNotice();
  }

  render() {
    return (
      <>
        <userContext.Consumer>
          {({ user }) => {
            return (
              <>
                <section className="section w-50 m-auto">
                  <form
                    className="listing-form"
                    onSubmit={this.handleSubmit.bind(this)}
                  >
                    <div className="form-group">
                      <label className="mt-2 mb-2" htmlFor="meals">
                        Number of Meals
                      </label>
                      <input
                        className="form-control"
                        type="number"
                        name="meals"
                        id="meals"
                        min="1"
                        max="1200"
                        value={this.state.numberOfMeals}
                        onChange={this.updateNumberOfMeals}
                      />
                    </div>

                    <div className="form-group">
                      <label className="mt-2 mb-2" htmlFor="desc">
                        Description
                      </label>
                      <textarea
                        className="form-control"
                        type="text"
                        name="desc"
                        id="desc"
                        rows="3"
                        value={this.state.description}
                        onChange={this.updateDescription}
                      ></textarea>
                      <small
                        id="listingDescGuidance"
                        className="form-text text-muted"
                      >
                        Please describe the type of food along with the dietary
                        requirements.
                      </small>
                    </div>

                    <div className="form-group">
                      <label className="mt-2 mb-2" htmlFor="timeAvailableUntil">
                        Available Until:
                      </label>
                      <input
                        className="form-control"
                        type="datetime-local"
                        name="timeAvailableUntil"
                        id="timeAvailableUntil"
                        onChange={this.updateDateTime.bind(this)}
                      />
                    </div>

                    <div className="form-group">
                      <input
                        className="form-control"
                        type="hidden"
                        name="listedBy"
                        id="listedBy"
                        ref={this.id}
                        value={user._id}
                      />
                    </div>

                    <div className="form-group mb-3">
                      <input
                        className="form-control"
                        type="hidden"
                        name="listedByUsername"
                        id="listedByUsername"
                        ref={this.username}
                        value={user.username}
                      />
                    </div>

                    <div className="form-submit">
                      <button
                        id="create-listing-btn"
                        className="btn btn-outline-success mt-4 mb-4 d-inline-block"
                        type="submit"
                      >
                        Create Listing
                      </button>
                      {this.state.showNotice && (
                        <p className="d-inline-block submission-notice m-4">
                          Your food listing has been successfully added.
                        </p>
                      )}
                    </div>
                  </form>
                </section>
              </>
            );
          }}
        </userContext.Consumer>
      </>
    );
  }
}
