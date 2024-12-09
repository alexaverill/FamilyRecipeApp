import { Button, ButtonGroup, TextField } from "@mui/material";
import classes from "./ScaleRecipe.module.css";
import { useState } from "react";

export default function ScaleRecipe({ scale, onChange }) {
  //const [scale, setScale] = useState(1);
  let handleScaleInputChanged = (event) => {
    let value = event.target.value;

    if (value.length > 0) {
      let parsedValue = parseFloat(value);
      onChange(parsedValue);
      //setScale(parsedValue);
    } else {
      //setScale(1);
      onChange(1);
    }
  };
  return (
    <div className={classes.ingredentScale}>
      <ButtonGroup variant="outlined" size="medium">
        <Button
          onClick={() => {
            // setScale(0.5);
            onChange(0.5);
          }}
          variant={scale == 0.5 ? "contained" : "outlined"}
        >
          1/2x
        </Button>
        <Button
          onClick={() => {
            //setScale(1);
            onChange(1);
          }}
          variant={scale == 1 ? "contained" : "outlined"}
        >
          1x
        </Button>
        <Button
          onClick={() => {
            //setScale(2);
            onChange(2);
          }}
          variant={scale == 2 ? "contained" : "outlined"}
        >
          2x
        </Button>
        <TextField
          size="small"
          placeholder="Custom"
          onChange={handleScaleInputChanged}
        ></TextField>
      </ButtonGroup>
    </div>
  );
}
