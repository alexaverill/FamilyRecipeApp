import TextField from '@mui/material/TextField';
import { useState } from 'react';
export default function EditableText({text,onChange}){
    const [isEditing,setEditing] = useState(false);

    if(isEditing){
        return <TextField value={text} onBlur={()=>setEditing(false) }  onChange={onChange} size='small'></TextField>
    }
    return <div onClick={()=>setEditing(true)} className="textDisplay">{text}</div>

}