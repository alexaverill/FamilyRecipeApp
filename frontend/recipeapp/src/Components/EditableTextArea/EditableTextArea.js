import TextField from '@mui/material/TextField';
import { useState } from 'react';
import classes from './EditableTextArea.module.css';

export default function EditableTextArea({text,onChange}){
    const [isEditing,setEditing] = useState(false);

    if(isEditing){
        return <TextField multiline value={text} onBlur={()=>setEditing(false) } rows={2} fullWidth onChange={onChange} size='small' autoFocus></TextField>
    }
    return <div onClick={()=>setEditing(true)} className="textDisplay"><div className={classes.editRow}>{text}<img className={classes.editImg} src="/edit.png"/></div></div>

}