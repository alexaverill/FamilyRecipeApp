import TextField from '@mui/material/TextField';
import { useState } from 'react';
export default function EditableText({initialText}){
    const [text,setText] = useState(initialText);
    const [isEditing,setEditing] = useState(false);

    if(isEditing){
        return <TextField value={text} onBlur={()=>setEditing(false) }  onChange={(e)=>setText(e.target.value)}size='small'></TextField>
    }
    return <div onClick={()=>setEditing(true)} className="textDisplay">{text}</div>

}