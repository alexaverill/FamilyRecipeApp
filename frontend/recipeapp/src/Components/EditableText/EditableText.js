import TextField from '@mui/material/TextField';
import { useState } from 'react';
import classes from './EditableText.module.css';
import EditIcon from '@mui/icons-material/Edit'
import { Button } from '@mui/material';
export default function EditableText({text,onChange}){
    const [isEditing,setEditing] = useState(false);

    if(isEditing){
        return <TextField value={text} onBlur={()=>setEditing(false) }  onChange={onChange} size='small' autoFocus></TextField>
    }
    return <div onClick={()=>setEditing(true)} className="textDisplay"><div className={classes.editRow}>{text}<Button><EditIcon/></Button></div></div>

}