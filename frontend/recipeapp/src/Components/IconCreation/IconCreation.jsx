import { useState,useEffect } from "react"
import classes from "./IconCreation.module.css"
export default function IconCreation({colorChanged,initialColor,initialIcon,iconChanged,colors,icons}){
    const [isEdit,setEdit] = useState(false);
    const [selectedColor,setColor] = useState(initialColor);
    const [selectedIcon,setIcon] = useState(initialIcon);
    const handleColorChange = (color,index)=>{
        setColor(index);
        colorChanged(color);
    }
    const handleIconChanged = (icon,index)=>{
        setIcon(index);
        iconChanged(icon);
    }
    const iconBlocks = icons.map((icon,index)=>{
        let imgPath = `/images/filled/${icon}`;
        let classList = classes.iconBlock;
        if(index == selectedIcon){
            classList += ' '+classes.selected;
        }
        return <div className={classList} onClick={()=>{handleIconChanged(icon,index)}}><img className={classes.iconImage} src={imgPath}/></div>
    });
    const colorBlocks = colors.map((color,index)=>{
        let style = {backgroundColor:color};
        let classList = classes.iconBlock;
        if(index == selectedColor){
            classList += ' '+classes.selected;
        }
        return <div className={classList} style={style} onClick={()=>{handleColorChange(color,index)}}></div>
    })
    return (
        <div className={classes.iconGrid}>
            <div className={classes.grid}>
                {iconBlocks}
            </div>
            <div className={classes.seperator}></div>
            <div className={classes.grid}>
                {colorBlocks}
            </div>
        </div>
        
    )
    
}