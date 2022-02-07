import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  root: {
    width: 300 + 24 * 2,
    padding: 24
  },
  margin: {
    height: theme.spacing(1)
  }
}));

const PrettoSlider = withStyles({
  root: {
    color: "#a2df77",
    height: 8
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus,&:hover,&$active": {
      boxShadow: "inherit"
    }
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)"
  },
  track: {
    height: 8,
    borderRadius: 4
  },
  rail: {
    height: 8,
    borderRadius: 4
  }
})(Slider);

const CustomSlider = ({ label, value, setValue }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <div className={classes.margin} />
      <Typography gutterBottom>{label}</Typography>
      <PrettoSlider
        valueLabelDisplay="auto"
        aria-label="pretto slider"
        defaultValue={10}
        value={value}
        onChange={(event, v) => {
          setValue(v);
        }}
      />
    </Paper>
  );
};
export default CustomSlider;