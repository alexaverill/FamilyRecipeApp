import TextField from '@mui/material/TextField';
import { useState } from 'react';
import classes from './EditableText.module.css';
export default function EditableText({text,onChange}){
    const [isEditing,setEditing] = useState(false);

    if(isEditing){
        return <TextField value={text} onBlur={()=>setEditing(false) }  onChange={onChange} size='small' autoFocus></TextField>
    }
    return <div onClick={()=>setEditing(true)} className="textDisplay"><div className={classes.editRow}>{text}<img className={classes.editImg} src="/edit.png"/></div></div>

}