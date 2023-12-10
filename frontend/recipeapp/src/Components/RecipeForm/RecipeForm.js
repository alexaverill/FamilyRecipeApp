import { Button, Container } from '@mui/material';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Unstable_Grid2';
import Item from '@mui/material'
import Stack from '@mui/material/Stack';
import './RecipeForm.css'
import EditableText from '../EditableText/EditableText';
import { useState } from 'react';
export default function RecipeForm() {
    const [recipeId,setRecipeId] = useState(null);
    const [title,setTitle] = useState('Title');
    const [description, setDescription] = useState('Description');
    
    const [ingredients, setIngredients] = useState(['']);
    const [instructions, setInstructions] = useState([''])
    const handleIngredientEnter = (event) => {
        if (event.key === "Enter") {
            setIngredients([...ingredients, '']);
        }
    }
    const removeIngredient = (index, ingredient) => {
        ingredients.splice(index, 1);
        if (ingredients.length == 0) {
            setIngredients(['']);
            return;
        }
        setIngredients([...ingredients]);
    }
    const setIngredientChanged = (index, value) => {

        ingredients.splice(index, 1, value);
        setIngredients([...ingredients]);
    }
    let ingredientDisplay = ingredients.map((ingredient, index) => {
        var isLast = index === ingredients.length - 1 && index > 0;
        if (isLast) {
            return <div className='entry'>

                <TextField size='small' onKeyDown={handleIngredientEnter} value={ingredient} onChange={(e) => setIngredientChanged(index, e.target.value)} autoFocus></TextField>
                <Button onClick={() => { removeIngredient(index, ingredient) }}>X</Button>
            </div>
        }
        return <div className='entry'>
            <TextField size='small' onKeyDown={handleIngredientEnter} value={ingredient} onChange={(e) => setIngredientChanged(index, e.target.value)}></TextField>
            {index === 0 ? <></> : <Button onClick={() => { removeIngredient(index, ingredient) }}>X</Button>}
        </div>
    });
    const removeInstructions = (index) => {
        instructions.splice(index, 1)
        setInstructions([...instructions]);
    }
    const handleInstructionEnter = (event) => {
        if (event.key === "Enter") {
            setInstructions([...instructions, '']);
        }
    }
    const setInstructionChanged = (index, value) => {

        instructions.splice(index, 1, value);
        setInstructions([...instructions]);
    }
    let instructionDisplay = instructions.map((instruction, index) => {
        var isLast = index === instructions.length - 1 && index > 0;
        if (isLast) {
            return <div className='entry'>

                <TextField size='small' value={instruction} onKeyDown={handleInstructionEnter} onChange={(e) => setInstructionChanged(index, e.target.value)} autoFocus></TextField>
            </div>
        }
        return <div className='entry'>
            <TextField size='small' value={instruction} onKeyDown={handleInstructionEnter} onChange={(e) => setInstructionChanged(index, e.target.value)}></TextField>
        </div>
    });
    const handleSave = async ()=>{
        let eventObj = {
            userId:123,
            recipeId,
            title,
            description,
            ingredients,
            instructions
        };
        console.log(eventObj);
        let url='/create-recipe'
        let data = await fetch(process.env.REACT_APP_API_URL+url, {
            method: "POST",
            headers:{
             //'Authorization':`Bearer ${token}`,
             "Content-Type": "application/json",
            },
            body: JSON.stringify(eventObj),
            })
            .then((response) => response.json())
            .catch((err) => {
                console.log(err);
               console.log(err.message);
            });  
        console.log(data);
        if(data){
            setRecipeId(data.recipeId);
        }
    }
    const handlePublish = ()=>{
        
    }
    return (
        <Container>
            <div className='recipes'>
                <div className="titleRow">
                    <h1><EditableText initialText="Title" onChange={(e)=>setTitle(e.target.value)} text={title}/></h1>
                    <Button onClick={handleSave}>Save</Button>
                    <Button onClick={handlePublish}>Publish</Button>
                </div>
                <div className='leftAlign descriptionRow'>
                    <EditableText initialText="Description" onChange={(e)=>setDescription(e.target.value)} text={description}/>
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
                        {instructionDisplay}
                    </div>
                </div>
            </div>
        </Container>
    )
}