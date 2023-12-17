import { Button, Chip, Container, collapseClasses } from '@mui/material';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import classes from './RecipeForm.module.css'
import EditableText from '../EditableText/EditableText';
import { useEffect, useState,useContext } from 'react';
import { useLocation } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import CollectionRow from '../CollectionRow/CollectionRow';
import { AddToCollection, RemoveFromCollection } from '../../API/CollectionApi';
import { UserContext } from '../UserContext/UserContext';
import EditableTextArea from '../EditableTextArea/EditableTextArea';

export default function RecipeForm() {
    const location = useLocation();
    const [recipeId, setRecipeId] = useState(null);
    const [title, setTitle] = useState('Title');
    const [description, setDescription] = useState('Description');
    const [parentId, setParentId] = useState(null);
    const [ingredients, setIngredients] = useState(['']);
    const [steps, setSteps] = useState(['']);
    const [collections, setCollections] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [alert, setAlert] = useState({ type: 'success', visible: false, message: '' });
    const {user} = useContext(UserContext);
    useEffect(() => {
        if (location.state) {
            let recipe = location.state.recipe;
            console.log(location.state);
            if (location.state.variation) {
                console.log("Is Variation" + recipe.recipeId);
                setParentId(recipe.recipeId);
                delete recipe.recipeId;
            }
            setRecipeId(recipe.recipeId);
            setTitle(recipe.title);
            setDescription(recipe.description);
            setIngredients(recipe.ingredients);
            setSteps(recipe.steps);
            setCollections(recipe.collections);
        }
    }, [location.state]);
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
            return <div className={classes.listEntry}><div className={classes.listItem}>

                <TextField size='small' onKeyDown={handleIngredientEnter} value={ingredient} onChange={(e) => setIngredientChanged(index, e.target.value)} autoFocus></TextField>
                <Button onClick={() => { removeIngredient(index, ingredient) }}>X</Button></div>
            </div>
        }
        return <div className={classes.listEntry}><div className={classes.listItem}>
            <TextField size='small' onKeyDown={handleIngredientEnter} value={ingredient} onChange={(e) => setIngredientChanged(index, e.target.value)}></TextField>
            {index === 0 ? <></> : <Button onClick={() => { removeIngredient(index, ingredient) }}>X</Button>}</div>

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
    const handleStepsEnter = (event) => {
        if (event.key === "Enter") {
            setSteps([...steps, '']);
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
                <Button onClick={() => { removeStep(index, step) }}>X</Button></div>
            </div>
        }
        return <div className={classes.listEntry}><div className={classes.listItem}>
            <TextField size='small' value={step} onKeyDown={handleStepsEnter} onChange={(e) => setStepsChanged(index, e.target.value)}></TextField>
            {index === 0 ? <></> : <Button onClick={() => { removeStep(index, step) }}>X</Button>}</div>
        </div>
    });
    const handleSave = async () => {
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
            ingredients,
            steps,
            user
        };
        console.log(eventObj);

        let url = '/create-recipe'
        let data = await fetch(process.env.REACT_APP_API_URL + url, {
            method: "POST",
            headers: {
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
        if (data) {
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
    return (
        <div className="content">
            {alert.visible ?
                <Alert variant="outlined" severity={alert.type} onClose={() => { setAlert({ visible: false }) }}>
                    {alert.message}
                </Alert> : <></>}
            <div className='twoColumn'>
                <div><img src="/placeholder_1.png" /></div>
                <div className='recipes'>
                    <div className={classes.titleRow}>
                        <div className='recipeTitle'><EditableText initialText="Title" onChange={(e) => setTitle(e.target.value)} text={title} /></div>
                        <div className={classes.actions}>
                            <LoadingButton onClick={handleSave} loading={isLoading} variant="contained" className={classes.filledButton}>Save</LoadingButton>
                        </div>
                    </div>
                    <div className='leftAlign descriptionRow'>
                        <EditableTextArea initialText="Description" onChange={(e) => setDescription(e.target.value)} text={description} />
                        
                    </div>
                    <div className={classes.collections}>
                        {collectionList}
                    </div>
                    <div>
                        <h2>Ingredients</h2>
                        <div className='list'>
                            {ingredientDisplay}
                        </div>
                    </div>
                    <div>
                        <h2>Steps</h2>
                        <div className={classes.numberedList}>
                            {instructionDisplay}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}