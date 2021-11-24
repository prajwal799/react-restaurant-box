import "./styles.css";
import React from "react";
import data from "./data.json";
import RestaurantDetalis from "./RestaurantDetalis/RestaurantDetalis";
import { render } from "react-dom";
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterRating: 0,
      paymentMethod: "all",
      sortOrder: null,
      prev: 0,
      next: 5
    };
  }
  handleRating = (rating) => {
    this.setState({
      filterRating: rating
    });
  };
  handlePayment = (payment) => {
    this.setState({
      paymentMethod: payment
    });
  };
  handleSort = (order) => {
    this.setState({
      sortOrder: order
    });
  };
  handlePage = (page) => {
    if (this.state.next > 15) {
      this.setState({
        prev: 0,
        next: 0 + page
      });
    } else if (this.state.prev <= 0) {
      console.log("2");
      this.setState({
        prev: 5 + page,
        next: 10 + page
      });
    } else {
      console.log("3");
      this.setState({
        prev: this.state.prev + page,
        next: this.state.next + page
      });
    }
  };
  render() {
    const { filterRating, paymentMethod, sortOrder, prev, next } = this.state;

    return (
      <div className="App">
        <h1>Restaurant - Card</h1>
        <div>
          Rating
          {[4, 3, 2, 1, 0].map((rating) => (
            <button onClick={() => this.handleRating(rating)}>
              {rating == 0 ? "All" : rating}
            </button>
          ))}
        </div>
        <br />
        <div>
          Payment Accept
          {["all", "card", "cash"].map((method) => (
            <button onClick={() => this.handlePayment(method)}>{method}</button>
          ))}
        </div>
        <br />
        <div>
          Min Order
          {["asc", "des"].map((order) => (
            <button onClick={() => this.handleSort(order)}>{order}</button>
          ))}
        </div>
        <br />
        <div>
          Pagination
          <button onClick={() => this.handlePage(-5)}>Prev</button>
          <button onClick={() => this.handlePage(0)}>Current</button>
          <button onClick={() => this.handlePage(+5)}>Next</button>
        </div>
        {/* <img src="https://i.imgur.com/lMeVwr7.png" alt="name"/> */}
        {data
          .filter(({ rating, payment_methods }) => {
            const { card, cash } = payment_methods;
            let paymentCodition = "true";
            if (paymentMethod == "cash") {
              paymentCodition = cash ? true : false;
            } else if (paymentMethod == "card") {
              paymentCodition = card ? true : false;
            }
            return rating > filterRating && paymentCodition;
          })
          .sort((a, b) => {
            if (sortOrder == null) {
              return 0;
            }
            if (sortOrder == "asc") {
              return a.costForTwo - b.costForTwo;
            }
            if (sortOrder == "des") {
              return b.costForTwo - a.costForTwo;
            }
          })
          .slice(prev, next)
          .map((item) => (
            <RestaurantDetalis key={item.id} data={item} />
          ))}
      </div>
    );
  }
}
