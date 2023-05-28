import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Alert } from "../../common/Alert";
import { verifyEmail } from "../../services/Auth";
import { ReactComponent as CircledFillTimes } from "../../assets/circled-fill-times.svg";
import { ReactComponent as CircledFillCheck } from "../../assets/circled-fill-check.svg";
import "./VerifyEmail.scss";

function VerifyEmail() {
  const { token } = useParams();
  const history = useHistory();
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsConfirmed(false);
    verifyEmail(token)
      .then((response) => {
        setIsConfirmed(true);
      })
      .catch((err) => {
        Alert("error", err.response.data?.message || "Token is not valid");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [token, history]);

  return (
    <div className="mainDiv">
      <div className="flex">
        <div className="text-4xl font-bold">
          {isLoading ? (
            "Verifying Email"
          ) : isConfirmed ? (
            <span className="flex items-center gap-4">
              <CircledFillCheck width={45} height={45} /> Verification is successfully done
            </span>
          ) : (
            <span className="flex items-center gap-4">
              <CircledFillTimes width={45} height={45} /> Verification is failed
            </span>
          )}
        </div>
      </div>
      {isConfirmed && (
        <div style={{ marginTop: "35px" }}>
          <Link to="/home" className="btn1 p-3 no-underline">
            Go to Home Page
          </Link>
        </div>
      )}
    </div>
  );
}

export default VerifyEmail;
