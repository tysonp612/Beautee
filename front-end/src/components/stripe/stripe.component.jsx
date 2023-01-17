import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
// import { emptyCart } from "./../../utils/user/user.utils";
// import { createOrder } from "./../../utils/order/order.utils";
import { createPaymentIntent } from "./../../utils/stripe/stripe.utils";
import "./stripe.style.css";
export const StripeCheckout = ({ currentUser, bookingId }) => {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const elements = useElements();
  const stripe = useStripe();
  const dispatch = useDispatch();
  useEffect(() => {
    //when comp mounted, make request to backend and get res of client secret key
    createPaymentIntent(currentUser.token, bookingId).then((res) => {
      setClientSecret(res.data.clientSecret);
    });
  }, []);
  const cartStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: e.target.name.value,
        },
      },
    });
    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      //get result after successful payment
      console.log(payload);
      //create order and save in db for admin to process
      //   createOrder(payload.paymentIntent, user.token)
      //     .then((res) => {
      //       if (res.data.ok) {
      //         //emptyCart
      //         emptyCart(user.token);
      //         dispatch({ type: "EMPTY_CART" });
      //       }
      //     })
      //     .catch((err) => console.log(err));

      setError(null);
      setProcessing(false);
      setSucceeded(true);
    }
  };
  const handleChange = async (e) => {
    //Listen for changes in the card elem, and display any error as the customer type thier card details

    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };
  return (
    <div>
      <p className={succeeded ? "result-message" : "result-message hidden"}>
        Payment successful{" "}
      </p>
      <form className="stripe-form" id="payment-form" onSubmit={handleSubmit}>
        <CardElement
          id="card-element"
          options={cartStyle}
          onChange={handleChange}
        />
        <button
          className="stripe-button"
          disabled={processing || disabled || succeeded}
        >
          <span id="button-text">
            {processing ? <div className="spinner" id="spinner"></div> : "Pay"}
          </span>
        </button>
        <br />
        {error && (
          <div className="card-error" role="alert">
            {error}
          </div>
        )}
      </form>
    </div>
  );
};
