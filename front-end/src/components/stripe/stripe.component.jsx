import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { createPaymentIntent } from "./../../utils/stripe/stripe.utils";
import "./stripe.style.css";
//toast message helper
import { toastMessage } from "./../../helper/toast-messages";
//Import closBooking until to close booking (change colors)
import { closeBooking } from "./../../utils/bookings/bookings.utils";

export const StripeCheckout = ({ currentUser, bookingId, handleClose }) => {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const elements = useElements();
  const stripe = useStripe();

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
      //if payment is successed
      //print out success message
      toastMessage("s", "Payment successfully!");
      //set booking to Finished, changing the color and access
      closeBooking(currentUser.token, bookingId);
      //close all the modal and reset temp var
      handleClose();
      //set temp val to null and false
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
