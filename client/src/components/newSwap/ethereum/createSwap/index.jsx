import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { calcSwapReturn, constants } from "../../../../library/common/util";
import useStyles from "../../style";

const CreateSwap = ({ className, genSwap, loader, feeDetails }) => {
  const [input, setInput] = useState(0);
  const history = useHistory();
  const classes = useStyles();
  const msg = `Max Swap Limit : `;
  const generateSwap = async (e) => {
    e.preventDefault();
    if (e.target.eth.value === "" || e.target.eth.value === 0) return;
    const minValue =
      calcSwapReturn(
        e.target.eth.value * constants.decimals10_6,
        feeDetails.reward
      ) - feeDetails.botFee;
    if (minValue <= 0) {
      alert("Minimum expected return in less than zero!");
      return;
    }
    if (
      feeDetails.stats !== undefined &&
      minValue > feeDetails.stats.maxUSDtz
    ) {
      alert("Swap size exceeds current swap limit!");
      return;
    }
    loader(true);
    const res = await genSwap(
      1,
      e.target.eth.value * constants.decimals10_6,
      minValue
    );
    loader(false);
    if (!res) {
      alert("Error: Swap Couldn't be created");
    } else {
      history.push("/");
    }
  };

  return (
    <div className={className}>
      <div className={classes.createWrap}>
        <form onSubmit={generateSwap}>
          <strong>
            {feeDetails.stats === undefined
              ? msg + "Couldn't connect to server"
              : msg +
                (
                  feeDetails.stats.maxUSDtz / constants.decimals10_6
                ).toString() +
                " USDC"}
          </strong>
          <input
            type="number"
            placeholder="Amount in USDC"
            name="eth"
            step=".000001"
            min="0"
            onInput={(e) => setInput(e.target.value || 0)}
            className={classes.valueInput}
          />
          <input className={classes.create} type="submit" value="CREATE" />
        </form>
        <p className={classes.expectedValue}>
          Min Expected Value :{" "}
          {input === 0
            ? 0
            : (calcSwapReturn(
                input * constants.decimals10_6,
                feeDetails.reward
              ) -
                feeDetails.botFee) /
              constants.decimals10_6}{" "}
          USDtz
        </p>
        <p className={classes.expectedValue}>
          Max Network Fee :{" "}
          {input === 0 ? 0 : feeDetails.botFee / constants.decimals10_6} USDtz
        </p>
        <p className={classes.expectedValue}>
          Swap Fee :{" "}
          {input === 0
            ? 0
            : (
                input -
                calcSwapReturn(
                  input * constants.decimals10_6,
                  feeDetails.reward
                ) /
                  constants.decimals10_6
              ).toFixed(6)}{" "}
          USDtz
        </p>
      </div>
    </div>
  );
};

export default CreateSwap;
