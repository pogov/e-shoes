import React from "react";
import styles from "./StepIndicator.module.scss";

interface Props {
  step: number;
}

const StepIndicator: React.FC<Props> = ({ step }) => {
  const stepsDivs = [
    // { stepNum: 1, pageName: "Login" },
    { stepNum: 1, pageName: "User Details" },
    { stepNum: 2, pageName: "Payment" },
    { stepNum: 3, pageName: "Confirmation" },
  ];
  return (
    <div className={styles.wrapper}>
      <div className={styles.line} />
      <div className={styles.indicator}>
        {stepsDivs.map((stepDiv) => (
          <div key={stepDiv.stepNum} className={styles.stepDiv}>
            <div
              className={
                stepDiv.stepNum === step ? styles.sign_active : styles.sign
              }>
              {stepDiv.stepNum}
            </div>
            <p
              className={
                stepDiv.stepNum === step
                  ? styles.pageName_active
                  : styles.pageName
              }>
              {stepDiv.pageName}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepIndicator;
