import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

const PaymentSuccess = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { handleCreditUpdate } = useApp();

  useEffect(() => {
    const credits = Number(params.get("credits"));
    if (credits) {
      handleCreditUpdate(credits).then(() => {
        navigate("/"); 
      });
    }
  }, []);

  return (
    <div className="text-center mt-20 text-xl font-semibold text-green-600">
      Payment successful! Updating your credits...
    </div>
  );
};

export default PaymentSuccess;
