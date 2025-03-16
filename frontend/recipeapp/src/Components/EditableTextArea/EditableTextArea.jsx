import TextField from "@mui/material/TextField";
import { useState } from "react";
import classes from "./EditableTextArea.module.css";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
export default function EditableTextArea({
  initialText,
  text,
  onChange,
  label,
  onBlur,
}) {
  const [isEditing, setEditing] = useState(false);

  if (isEditing) {
    return (
      <TextField
        multiline
        value={text}
        label={label}
        onBlur={() => {
          setEditing(false);
          if (onBlur) {
            onBlur();
          }
        }}
        rows={2}
        fullWidth
        onChange={onChange}
        size="small"
        autoFocus
      ></TextField>
    );
  }
  return (
    <div
      onClick={() => setEditing(true)}
      className={text.length <= 0 ? classes.placeholder : ""}
    >
      <div className={classes.editRow}>
        {text.length > 0 ? text : initialText}
        <Button>
          <EditIcon />
        </Button>
      </div>
    </div>
  );
}
