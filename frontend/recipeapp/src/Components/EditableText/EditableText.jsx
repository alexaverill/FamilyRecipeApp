import TextField from '@mui/material/TextField';
import { useState } from 'react';
import classes from './EditableText.module.css';
import EditIcon from '@mui/icons-material/Edit'
import { Button } from '@mui/material';
export default function EditableText({initialText,text,onChange,label}){
    const [isEditing,setEditing] = useState(false);
    if(isEditing){
        return <TextField label={label} value={text} onBlur={()=>setEditing(false) } inputProps={{ maxLength: 80 }} onChange={onChange} size='small' fullWidth autoFocus></TextField>
    }
    return <div onClick={()=>setEditing(true)} className={text.length<=0 ? classes.placeholder : ''}><div className={classes.editRow}>{text.length>0?text:initialText}<Button className={classes.editButton}><EditIcon/></Button></div></div>

}