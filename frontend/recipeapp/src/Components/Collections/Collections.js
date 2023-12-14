import { useState, useEffect } from 'react';
import { GetCollections } from "../../API/CollectionApi";
import CollectionCard from "../CollectionCard/CollectionCard";
import classes from './Collection.module.css'
export default function Collections() {
    const [collections, setCollections] = useState([]);
    useEffect(() => {
        loadCollections();
    }, []);
    const loadCollections = async () => {
        let data = await GetCollections();
        if (data) {
            setCollections(data);
        }
    }
    let displayCollections = collections.map((collection) => {
        return <CollectionCard collection={collection} />
    })
    return (
        <div class="content">
            <div className={classes.collectionGrid}>
                {displayCollections}
            </div>
        </div>
    )
}