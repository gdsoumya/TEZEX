import ethlogo from "../../assets/ethlogo.svg";
import tzlogo from "../../assets/tzlogo.svg"
import ethtzLogo from "../../assets/ethtzLogo.png";
import usdcLogo from "../../assets/usdcLogo.svg";
import usdtzLogo from "../../assets/usdtzLogo.png";
import wbtcLogo from "../../assets/wbtcLogo.svg";
import btctzLogo from "../../assets/btctzLogo.png";
import metamaskLogo from "../../assets/metamaskLogo.svg";
import walletconnectLogo from "../../assets/walletconnectLogo.svg";

export const content = {
  connectWallet: "If you would like create a cross-chain swap, you will need to connect to both your Ethereum and Tezos wallets.",
  errorMessage: "Please confirm the connection request in your MetaMask wallet. If you don’t see a request pop-up, open the wallet extension. "

}

export const tokens = [
  { title: 'USDtz', logo: usdtzLogo, banner: 'USD Tez', pairs: ['USDC', 'ETHtz', 'XTZ'] },
  { title: 'USDC', logo: usdcLogo, banner: 'USD Coin', pairs: ['USDtz'] },
  { title: 'ETHtz', logo: ethtzLogo, banner: 'ETH Tez', pairs: ['USDtz', 'ETH', 'XTZ'] },
  { title: 'ETH', logo: ethlogo, banner: 'Ether', pairs: ['ETHtz'] },
  { title: 'XTZ', logo: tzlogo, banner: 'Tez', pairs: ['USDtz', 'ETHtz'] },
  { title: 'WBTC', logo: btctzLogo, banner: 'WBTC', pairs: ['tzBTC'] },
  { title: 'tzBTC', logo: wbtcLogo, banner: 'tzBTC', pairs: ['WBTC'] },
];
export const tokenWallets = [
  { title: 'Metamask', logo: metamaskLogo, },
  { title: 'Wallet Connect', logo: walletconnectLogo, }
];
