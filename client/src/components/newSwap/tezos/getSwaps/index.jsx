import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { shorten } from "../../../../util";
import Loader from "../../../loader";
import useStyles from "../../style";
import CreateSwap from "../createSwap";

const GetSwap = ({ genSwap, ethStore }) => {
  const [swaps, setSwaps] = useState([]);
  const [loader, setLoader] = useState(true);
  const [fullLoader, setFullLoader] = useState(false);

  const history = useHistory();
  const classes = useStyles();
  const filterSwaps = async () => {
    try{
    const swps = await ethStore.getWaitingSwaps(4200);
    console.log(swps)
    setSwaps(swps);
    setLoader(false);
    }catch(err){
      console.error("Error getting swaps: ", err)
    }
  };

  const SwapItem = (data) => {
    return (
      <div
        onClick={() => {
          generateSwap(data.value, data);
        }}
        key={data.hashedSecret}
        className={classes.swap}
      >
        <p>Hash : {shorten(15, 15, data.hashedSecret)}</p>
        <p>USDC Value : {data.value}</p>
        <p>USDTz to Pay : {data.value}</p>
      </div>
    );
  };

  const generateSwap = async (value, data) => {
    setFullLoader(true);
    const res = await genSwap(1, value, data);
    setFullLoader(false);
    if (!res) {
      alert("Error: Swap Couldn't be created");
    } else {
      history.push("/");
    }
  };
  useEffect(() => {
    filterSwaps();
    const timer = setInterval(() => {
      filterSwaps();
    }, 600000);
    return () => {
      clearInterval(timer);
    };
  }, []);
  let data = "No Swaps Found. Create One!";
  if (swaps.length > 0) data = swaps.map((swp) => SwapItem(swp));
  if (fullLoader) return <Loader message="..Creating Your Swap.." />;
  return (
    <div className={classes.swapScreen}>
      <div className={classes.container}>
        <h3 className={classes.msg}>Create New Swap</h3>
        <CreateSwap
          className={classes.newSwap}
          genSwap={genSwap}
          loader={setFullLoader}
        />
      </div>
      <div className={classes.or}>
        <p>Or</p>
      </div>
      <div className={classes.container}>
        <h3 className={classes.msg}>Select From Available SWAPS</h3>
        <div className={classes.swaps}>
          {loader && <Loader message="..Loading Swaps.." />}
          {!loader && data}
        </div>
      </div>
    </div>
  );
};

export default GetSwap;
