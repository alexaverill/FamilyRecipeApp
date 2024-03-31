let request;
let db;
let dbName = 'recipesapp';
let storeName = 'recipescache';
let userStoreName = 'usercache';
let favoriteStore = 'favoriteStore';
let collectionStore = 'collectionStore';
let version = 4;
export function InitializeDB() {
    console.log("Initializing database");
    return new Promise((resolve, reject) => {
        request = indexedDB.open(dbName, version);
        request.onupgradeneeded = (event) => {
            db = request.result;
            switch (event.oldVersion) {
                case 0:
                    console.log('creating recipe and user store');
                    db.createObjectStore(storeName, { keyPath: 'id' });
                    db.createObjectStore(userStoreName, { keyPath: 'id' });
                    break;
                case 2:
                    console.log("creating favorite store");
                    if (!db.objectStoreNames.contains(favoriteStore)) {
                        db.createObjectStore(favoriteStore, { keyPath: 'id' });
                    }
                case 3:
                    console.log("creating collection store");
                    //forcing update since I think I messed up my versioning.
                    if (!db.objectStoreNames.contains(favoriteStore)) {
                        console.log("creating favorite store in version 3");
                        db.createObjectStore(favoriteStore, { keyPath: 'id' });
                    }
                    if (!db.objectStoreNames.contains(userStoreName)) {
                        console.log("creating userName store in version 3");
                        db.createObjectStore(userStoreName, { keyPath: 'id' });
                    }
                    if (!db.objectStoreNames.contains(storeName)) {
                        console.log("creating recipe store in version 3");
                        db.createObjectStore(storeName, { keyPath: 'id' });
                    }
                    db.createObjectStore(collectionStore, { keyPath: 'id' });
            }
        };
        request.onsuccess = () => {
            db = request.result;
            console.log("DB Success");
            resolve(true);
        }
        request.onerror = () => {
            console.log('Error with db');
            resolve(false);
        }
    }
    )
}
export function SaveData(saveStore, data) {
    console.log("Saving data");
    let dataObj = { data, id: 1, timestamp: Date.now() }
    console.log(dataObj);
    return new Promise(resolve => {
        request = indexedDB.open(dbName);

        request.onsuccess = () => {
            db = request.result;
            const transaction = db.transaction(saveStore, 'readwrite');
            const store = transaction.objectStore(saveStore);
            store.put(dataObj);
            resolve(dataObj);

        }
        request.onerror = () => {
            const error = request.error?.message
            console.log(error);
            if (error) {
                resolve(error);
            } else {
                resolve('Unknown error');
            }
        }

    });

}
export function LoadData(store, key) {
    return new Promise(resolve => {
        request = indexedDB.open(dbName);

        request.onsuccess = () => {
            try {
                if (!request.result) {
                    console.log("bad requst result");
                }
                db = request.result;
                const transaction = db.transaction(store);
                const objectStore = transaction.objectStore(store);
                const dataRequest = objectStore.get(key);
                dataRequest.onerror = () => {
                    console.log("Error getting data");
                }
                dataRequest.onsuccess = () => {
                    console.log(dataRequest.result);
                    resolve(dataRequest.result);
                }
            } catch (e) {
                //console.log(e);
            }

        }
        request.onerror = () => {
            const error = request.error?.message
            console.log(error);
            if (error) {
                resolve(error);
            } else {
                resolve('Unknown error');
            }
        }
    });
}