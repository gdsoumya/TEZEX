import React, { useEffect, useState } from 'react';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import maximize from '../../assets/maximize.svg';
import { tokens } from '../constants';
import useStyles from "./style";
import timer from '../convertDate.js';

const CurrentSwaps = (props) => {
  const { onClick, ongoingSwaps, swaps, } = props;
  const classes = useStyles();

  const state = {
    0: "Swap Failed",
    1: "Swap Initiated",
    2: "Implementing Swap",
    3: "Swap Completed",
    4: "Refunded",
  }

  const SwapItem = (data) => {
    // const refund = timer(data.refundTime, "Swap Timed Out!");
    const refund = timer(data.refundTime);

    const swapInProgress = data.pair.split('/');
    const asset = data.asset;
    let token = {}
    let counterToken = {}
    tokens.map((x) => {
      if (swapInProgress[0].toLowerCase() === x.title.toLowerCase()) {
        if (swapInProgress[0] === asset) token = x; else counterToken = x;
      }

      if (swapInProgress[1].toLowerCase() === x.title.toLowerCase()) {
        if (swapInProgress[1] === asset) token = x; else counterToken = x;
      }
    });
    return (
      <div className={classes.container}>
        <Paper elevation={2}>
          <div className={classes.CurrentSwaps}>
            <Typography>
              <span>
                <img src={token.logo} alt="logo" className={classes.img} /> {token.title}
              </span>
              {" "} &#8594; {" "}
              <span>
                <img src={counterToken.logo} alt="logo" className={classes.img} /> {counterToken.title}
              </span>
            </Typography>
          </div>
          <Button onClick={() => onClick(data)}>
            <img src={maximize} alt="maximize" className={classes.img} />
          </Button>
        </Paper>
        <Grid container alignContent="center" justify="space-between" >
          <Typography className={classes.minPad}> {state[data.state]}  </Typography>
          <Typography className={classes.minPad}> {data.value}  </Typography>
        </Grid>
        <Typography className={classes.minPad} >
          {refund !== undefined ? "Swap will timeout in: " + refund : "Redeem your funds"}
        </Typography>
      </div>
    )
  }

  return (
    <div className={classes.root}>
      {swaps !== undefined &&
        <>
          <Typography>
            {/* Current swaps in progress... */}
            Swap Status
          </Typography>
          {Object.keys(swaps).map((x) => SwapItem(swaps[x]))}
        </>
      }
    </div>
  )
}

export default CurrentSwaps;