import { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { GetCollections } from "../../API/CollectionApi";
import { Button, CircularProgress } from "@mui/material";
import classes from './CollectionRow.module.css'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
const filter = createFilterOptions();
export default function CollectionRow({ collectionAdded }) {
    const [collections, setCollections] = useState([]);
    const [value, setValue] = useState(null);
    const [inEdit,setInEdit] = useState(false);
    const [creatingCollection,setCreating] = useState(false);
    useEffect(() => {
        LoadCollections();
    }, [])
    const LoadCollections = async () => {
        let data = await GetCollections();
        if (data) {
            setCollections(data);
        }
    }
    const addNewCollection = async (name) => {
        setCreating(true);
        console.log(name);
        const collection = { name }
        let url = '/create-collection'
        let data = await fetch(process.env.REACT_APP_API_URL + url, {
            method: "POST",
            headers: {
                //'Authorization':`Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(collection),
        })
            .then((response) => response.json())
            .catch((err) => {
                console.log(err);
                console.log(err.message);
            });
        if(data){
            collectionAdded(data);
            setValue(null);
        }
        setCreating(false);
    }
    if(!inEdit){
        return <Button onClick={()=>setInEdit(true)}><AddCircleOutlineIcon/></Button>
    }

    return (
        <div className={classes.entry}>
        <Autocomplete
            value={value}
            onChange={(event, newValue) => {
                if (typeof newValue === 'string') {
                    setValue('1');
                } else if (newValue && newValue.inputValue) {
                    // Create a new value from the user input
                    addNewCollection(newValue.inputValue)
                    setValue(null);
                } else {
                    collectionAdded(newValue);
                    setValue(null);
                }
            }}
            filterOptions={(options, params) => {
                const filtered = filter(options, params);

                const { inputValue } = params;
                // Suggest the creation of a new value
                const isExisting = options.some((option) => inputValue === option.title);
                if (inputValue !== '' && !isExisting) {
                    filtered.push({
                        inputValue,
                        name: `Add "${inputValue}"`,
                    });
                }

                return filtered;
            }}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            id="free-solo-with-text-demo"
            options={collections}
            getOptionLabel={(option) => {
                // Value selected with enter, right from the input
                if (typeof option === 'string') {
                    return option;
                }
                // Add "xxx" option created dynamically
                if (option.inputValue) {
                    return option.inputValue;
                }
                // Regular option
                return option.name;
            }}
            renderOption={(props, option) => <li {...props}>{option.name}</li>}
            sx={{ width: 300 }}
            freeSolo
            renderInput={(params) => (
                <div className={classes.loadingRow}><TextField {...params} disabled={creatingCollection} label="Add Collection" size="small"/>{creatingCollection? <CircularProgress/>:<></>} </div>
            )}
        />
        <Button onClick={()=>setInEdit(false)}>X</Button>
        </div>
    );

}