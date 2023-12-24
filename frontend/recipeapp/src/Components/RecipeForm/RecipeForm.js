import { Button, Chip, Container, collapseClasses } from '@mui/material';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import classes from './RecipeForm.module.css'
import EditableText from '../EditableText/EditableText';
import { useEffect, useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import CollectionRow from '../CollectionRow/CollectionRow';
import { AddToCollection, RemoveFromCollection } from '../../API/CollectionApi';
import { UserContext } from '../UserContext/UserContext';
import EditableTextArea from '../EditableTextArea/EditableTextArea';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import { CreateRecipe, DeleteRecipe } from '../../API/RecipeApi';
import ConfirmationDialog from '../ConfirmationDialog/ConfirmationDialog';
import IconCreation from '../IconCreation/IconCreation';
import EditIcon from '@mui/icons-material/Edit';
export default function RecipeForm() {
    const initialTitleText = 'Tap to enter a Title';
    const initialDescriptionText = 'Tap to enter a description';
    const initialNotesText = 'Add Notes';
    let navigate = useNavigate();
    const location = useLocation();
    const [recipeId, setRecipeId] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [source, setSource] = useState('');
    const [notes, setNotes] = useState('');
    const [parentId, setParentId] = useState(null);
    const [ingredients, setIngredients] = useState(['']);
    const [steps, setSteps] = useState(['']);
    const [collections, setCollections] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [confirmationOpen, setConfirmationOpen] = useState(false);
    const [alert, setAlert] = useState({ type: 'success', visible: false, message: '' });
    const { user } = useContext(UserContext);
    const [icon, setIcon] = useState('seven.svg');
    const [initialIconIdx, setIconIdx] = useState(0);
    const [initialColorIdx, setColorIdx] = useState(0);
    const colors = ["#FF9F2F", "#3CCEE2", "#227C88", "#4DC643", "#FF5D8E", "#DD3F65", "#B955C2", "#7B3981"];
    const icons = ["seven.svg", "two.svg", "three.svg", "four.svg", "five.svg", "six.svg", "one.svg", "eight.svg"];
    const [color, setColor] = useState('#FF9F2F');
    const [editIcon, setEditIcon] = useState(false);
    const arrayHasValidEntry = (arr) => {
        return arr[0].length > 0; // we always have at least an empty entry in the states we are testing above
    }
    const canSave = title.length > 0 && arrayHasValidEntry(steps) > 0 && arrayHasValidEntry(ingredients);
    useEffect(() => {
        if (location.state) {
            let recipe = location.state.recipe;
            if (location.state.variation) {
                setParentId(location.state.parentId);
                delete recipe.recipeId;
            }
            setRecipeId(recipe.recipeId);
            setTitle(recipe.title);
            setDescription(recipe.description);
            setIngredients(recipe.ingredients);
            setSteps(recipe.steps);
            setSource(recipe.source);
            setColor(recipe.image.color);
            setIcon(recipe.image.icon);
            setCollections(recipe.collections);
            if (recipe.notes) {
                setNotes(recipe.notes);
            }
        } else {
            let colorIdx = Math.floor(Math.random() * 8);
            let iconIdx = Math.floor(Math.random() * 8);
            setIcon(icons[iconIdx]);
            setColor(colors[colorIdx]);
        }
    }, [location.state]);
    const addIngredient = () => {
        setIngredients([...ingredients, '']);
    }
    const handleIngredientEnter = (event) => {
        if (event.key === "Enter") {
            addIngredient();
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
            return <div className={classes.listEntry}><div className={classes.listItem}>

                <TextField size='small' onKeyDown={handleIngredientEnter} value={ingredient} onChange={(e) => setIngredientChanged(index, e.target.value)} autoFocus></TextField>
                <Button onClick={() => { removeIngredient(index, ingredient) }}><RemoveCircleOutlineIcon /></Button></div>
            </div>
        }
        return <div className={classes.listEntry}><div className={classes.listItem}>
            <TextField size='small' onKeyDown={handleIngredientEnter} value={ingredient} onChange={(e) => setIngredientChanged(index, e.target.value)}></TextField>
            {index === 0 ? <></> : <Button onClick={() => { removeIngredient(index, ingredient) }}><RemoveCircleOutlineIcon /></Button>}</div>

        </div>
    });
    const removeStep = (index) => {
        steps.splice(index, 1);
        if (steps.length == 0) {
            setSteps(['']);
            return;
        }
        setSteps([...steps]);
    }
    const addStep = () => {
        setSteps([...steps, '']);
    }
    const handleStepsEnter = (event) => {
        if (event.key === "Enter") {
            addStep();
        }
    }
    const setStepsChanged = (index, value) => {

        steps.splice(index, 1, value);
        setSteps([...steps]);
    }

    let instructionDisplay = steps.map((step, index) => {
        var isLast = index === steps.length - 1 && index > 0;
        if (isLast) {
            return <div className={classes.listEntry}><div className={classes.listItem}>

                <TextField size='small' value={step} onKeyDown={handleStepsEnter} onChange={(e) => setStepsChanged(index, e.target.value)} autoFocus></TextField>
                <Button onClick={() => { removeStep(index, step) }}><RemoveCircleOutlineIcon /></Button></div>
            </div>
        }
        return <div className={classes.listEntry}><div className={classes.listItem}>
            <TextField size='small' value={step} onKeyDown={handleStepsEnter} onChange={(e) => setStepsChanged(index, e.target.value)}></TextField>
            {index === 0 ? <></> : <Button onClick={() => { removeStep(index, step) }}><RemoveCircleOutlineIcon /></Button>}</div>
        </div>
    });
    const handleSave = async () => {
        console.log("Save");
        setIsLoading(true);
        let cleanedCollections = collections?.map(collection => {
            if (collection.name != undefined || collection.name != null) {
                return { name: collection.name, collectionId: collection.collectionId };
            }
        });

        let eventObj = {
            userId: user.userId,
            recipeId,
            parentId,
            title,
            description,
            source,
            ingredients,
            steps,
            notes,
            user,
            image: { icon, color }
        };
        console.log(eventObj);
        let data = await CreateRecipe(eventObj);
        console.log(data);
        if (data) {
            console.log(data.recipeId);
            setRecipeId(data.recipeId);
            setAlert({
                visible: true,
                type: "success",
                message: "Successfully saved recipe"
            });


        } else {
            setAlert({
                visible: true,
                type: "error",
                message: "Error saving recipe."
            })
        }
        setTimeout(() => setAlert({ visible: false }), 5000);
        setIsLoading(false);
    }
    const handleRecipeDelete = () => {
        setConfirmationOpen(true);
    }
    const handleConfirmationClose = () => {
        setConfirmationOpen(false);
    }
    const handleConfirmation = async () => {
        await DeleteRecipe(recipeId);
        navigate('/');
    }
    const handleColorChanged = (color) => {
        setColor(color);
    }
    const handleIconChanged = (icon) => {
        setIcon(icon);
    }

    const handleDelete = async (collectionId, name) => {
        console.log(collectionId);
        let collectionObj = { collectionId, name };
        let recipeObj = { recipeId, title };
        console.log(recipeObj);
        await RemoveFromCollection(recipeObj, collectionObj)
        collections.splice(collections.findIndex(c => c.collectionId == collectionId), 1);
        setCollections([...collections])
    }
    let collectionList = collections?.map((collection) => {
        return <Chip label={collection.name} onDelete={() => handleDelete(collection.collectionId)} />;
    }
    );
    const imagePath = `/images/${icon}`;
    let imageStyle = { backgroundColor: color };
    return (
        <div className="content">
            <ConfirmationDialog open={confirmationOpen} onClose={handleConfirmationClose} onConfirm={handleConfirmation} />
            {alert.visible ?
                <Alert variant="outlined" severity={alert.type} onClose={() => { setAlert({ visible: false }) }}>
                    {alert.message}
                </Alert> : <></>}
            <div className='twoColumn'>
                <div className={classes.imageColumn}>
                    <div className={classes.recipeImage} style={imageStyle}><img src={imagePath} /><Button className={classes.edit} onClick={() => setEditIcon(!editIcon)}><EditIcon /></Button></div>
                    {editIcon ? <IconCreation colorChanged={(c) => setColor(c)} iconChanged={(i) => setIcon(i)} initialColor={colors.findIndex(c => c == color)} initialIcon={icons.findIndex(i => i == icon)} colors={colors} icons={icons} /> : <></>}
                </div>
                <div className='recipes'>
                    <div className={classes.titleRow}>
                        <div className='recipeTitle'><EditableText initialText={initialTitleText} onChange={(e) => setTitle(e.target.value)} text={title} /></div>
                        <div className={classes.actions}>
                            <Button onClick={handleRecipeDelete}><DeleteIcon /></Button>
                            <LoadingButton onClick={handleSave} loading={isLoading} variant="contained" className={classes.filledButton} disabled={!canSave}>Save Recipe</LoadingButton>
                        </div>
                    </div>
                    <div className='leftAlign descriptionRow'>
                        <EditableTextArea initialText={initialDescriptionText} onChange={(e) => setDescription(e.target.value)} text={description} />

                    </div>
                    <div>
                        <EditableText label="Source" initialText={"Source"} onChange={(e) => setSource(e.target.value)} text={source} />
                    </div>
                    <div className={classes.collections}>
                        {collectionList}
                    </div>
                    <div className={classes.listColumn}>
                        <h2>Ingredients</h2>
                        <div className='list'>
                            {ingredientDisplay}
                        </div>
                        <div className={classes.listHint}>Tip: Hit enter to add a new ingredient.</div>
                        <Button variant='contained' onClick={addIngredient} className={classes.addButton} disabled={!(ingredients[0].length > 0)}>Add Ingredient</Button>
                    </div>
                    <div className={classes.listColumn}>
                        <h2>Steps</h2>
                        <div className={classes.numberedList}>
                            {instructionDisplay}
                        </div>
                        <div className={classes.listHint}>Tip: Hit enter to add a new step.</div>
                        <Button variant='contained' onClick={addStep} className={classes.addButton} disabled={!(steps[0].length > 0)}>Add Step</Button>
                    </div>
                    <div>
                        <h2>Notes</h2>
                        <div className='leftAlign descriptionRow'>
                            <EditableTextArea initialText={initialNotesText} onChange={(e) => setNotes(e.target.value)} text={notes} />

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}