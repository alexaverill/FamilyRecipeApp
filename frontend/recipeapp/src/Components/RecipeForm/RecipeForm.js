import { Button, Container } from '@mui/material';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Unstable_Grid2';
import Item from '@mui/material'
import Stack from '@mui/material/Stack';
import './RecipeForm.css'
import EditableText from '../EditableText/EditableText';
import { useState } from 'react';
export default function RecipeForm() {
    const [ingredients, setIngredients] = useState(['']);
    const [instructions, setInstructions] = useState([''])
    const handleIngredientEnter = (event) => {
        if(event.key ==="Enter" ){
            setIngredients([...ingredients,'']);
        }
    }
    let ingredientDisplay = ingredients.map((ingredient,index) => {
        var isLast = index === ingredients.length-1 && index >0;
        if(isLast){
            return <div className='entry'>
            
            <TextField key={ingredient+index} size='small' onKeyDown={handleIngredientEnter} autoFocus></TextField>
        </div>
        }
        return <div className='entry'>      
            <TextField key={ingredient+index} size='small' onKeyDown={handleIngredientEnter}></TextField>
        </div>
    });
    const handleInstructionEnter = (event) => {
        if(event.key ==="Enter" ){
            setInstructions([...instructions,'']);
        }
    }
    let instructionDisplay = instructions.map((instruction,index) => {
        var isLast = index === instructions.length-1 && index >0;
        if(isLast){
            return <div className='entry'>
            
            <TextField key={instruction+index} size='small' onKeyDown={handleInstructionEnter} autoFocus></TextField>
        </div>
        }
        return <div className='entry'>      
            <TextField key={instruction+index} size='small' onKeyDown={handleInstructionEnter}></TextField>
        </div>
    });
    return (
        <Container>
            <div className='recipes'>
                <div className="titleRow">
                    <h1><EditableText initialText="Title" /></h1>
                    <Button>Save</Button>
                    <Button>Publish</Button>
                </div>
                <div className='leftAlign descriptionRow'>
                    <EditableText initialText="Description" />
                </div>
                <div className='leftAlign'>
                    Pairs
                </div>
                <div className='leftAlign'>
                    Tags
                </div>
                <div>
                    <h2>Ingredients</h2>
                    <div className='list'>
                        {ingredientDisplay}
                    </div>
                </div>
                <div>
                    <h2>Instructions</h2>
                    <div className='list'>
                        {ingredientDisplay}
                    </div>
                </div>
            </div>
        </Container>
    )
}