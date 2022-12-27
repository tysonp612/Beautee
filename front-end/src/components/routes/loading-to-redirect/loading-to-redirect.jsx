import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoadingToRedirect = () => {
  const [count, setCount] = useState(5);
  let navigate = useNavigate();
  //When the page is loaded, it will count from 5 to 0 and redirect back to login page
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((count) => --count);
    }, 1000);
    if (count === 0) {
      navigate("/");
    }
    return () => clearInterval(interval);
  }, [count]);
  return (
    <div className="container p-5 text-center">
      <p>Redirecting you in {count}</p>
    </div>
  );
};

export default LoadingToRedirect;
