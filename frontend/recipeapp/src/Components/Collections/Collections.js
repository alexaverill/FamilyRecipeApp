import { useState, useEffect } from 'react';
import { GetCollections } from "../../API/CollectionApi";
import CollectionCard from "../CollectionCard/CollectionCard";
import classes from './Collection.module.css'
import { CircularProgress } from '@mui/material';
export default function Collections() {
    const [collections, setCollections] = useState([]);
    const [loading,setLoading] = useState(false);
    useEffect(() => {
        loadCollections();
    }, []);
    const loadCollections = async () => {
        setLoading(true);
        let data = await GetCollections();
        if (data) {
            setCollections(data);
        }
        setLoading(false);
    }
    let displayCollections = collections.map((collection) => {
        return <CollectionCard collection={collection} />
    })
    return (
        <div className="content">
            <div className={classes.collectionGrid}>
               { loading ? <CircularProgress/>: displayCollections}
            </div>
        </div>
    )
}