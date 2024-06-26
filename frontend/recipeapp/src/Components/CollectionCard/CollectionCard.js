import { useNavigate } from 'react-router-dom';
import classes from './CollectionCard.module.css';
export default function CollectionCard({ collection }) {
    const navigate = useNavigate();
    return (
        <div className={classes.card} onClick={()=>navigate('/collections/'+collection.collectionId,{state:{collection}})}>
            <div className={classes.content}>
                <div className={classes.title}>{collection.name}</div>
                <div className={classes.subtitle}>{collection.recipes?.length} recipes</div>
            </div>
        </div>
    )
}