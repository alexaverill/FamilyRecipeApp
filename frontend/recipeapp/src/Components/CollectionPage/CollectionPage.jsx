import { useState, useEffect } from 'react';

import { CircularProgress } from '@mui/material';
import Collections from '../Collections/Collections';
export default function CollectionPage() {
    return (
        <div className="content">
            <div>
                <h1>Collections</h1>
            </div>
            <Collections />
        </div>
    )
}