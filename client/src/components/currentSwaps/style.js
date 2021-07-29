import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTypography-body1': {
      padding: '.5rem 0',
      lineHeight: "1.1rem",
      fontSize: ".875rem",
    },
    '& .MuiPaper-root ': {
      display: 'flex',
      padding: '.5rem',
      lineHeight: "1.1875rem",
      fontSize: "1rem",
      fontWeight: "500",
    },
  '@media (max-width: 501px)': {
  }
  },
  container: {
    margin: "1rem 0",
    background: "#f8f8f8",
    borderRadius: "16px",
  },
  img: {
    width: "24px",
    height: "24px",
    marginBottom: "-6px",
  },
  CurrentSwaps: {
    flexGrow: "1",
  },
  minPad: {
    padding: ".2rem 1rem !important"
  }
}));

export default useStyles;
