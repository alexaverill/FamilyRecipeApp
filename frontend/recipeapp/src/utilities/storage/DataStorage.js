let request;
let db;
let dbName = 'recipesapp';
let storeName = 'recipescache';
let userStoreName = 'usercache';
export function InitializeDB() {
    console.log("Initializing database");
    return new Promise((resolve, reject) => {
        request = indexedDB.open(dbName);
        request.onupgradeneeded = () => {
            db = request.result;
            if (!db.objectStoreNames.contains(storeName)) {
                console.log("Creating store");
                db.createObjectStore(storeName, { keyPath: 'id' });
            } 
            if(!db.objectStoreNames.contains(userStoreName)){
                db.createObjectStore(userStoreName, { keyPath: 'id' });
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
export function SaveData(saveStore,data) {
    console.log("Saving data");
    if(!data.id){
        data.id = 1;
    }
    data.timestamp = Date.now();
    console.log(data);
    return new Promise(resolve => {
        request = indexedDB.open(dbName);
        
        request.onsuccess = ()=>{
            db = request.result;
            console.log(db.objectStoreNames);
            const transaction = db.transaction(saveStore,'readwrite');
            
            const store = transaction.objectStore(saveStore);
            store.add(data);
            resolve(data);

        }
        request.onerror = ()=>{
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
export function LoadData(store,key) {
    return new Promise(resolve=>{
        request = indexedDB.open(dbName);
        
        request.onsuccess = ()=>{
            try{
                if(!request.result){
                    console.log("bad requst result");
                }
                db = request.result;
                console.log(db.objectStoreNames);
                const transaction = db.transaction(store);
                const objectStore = transaction.objectStore(store);
                const dataRequest = objectStore.get(key);
                dataRequest.onerror = ()=>{
                    console.log("Error getting data");
                }
                dataRequest.onsuccess = ()=>{
                    console.log(dataRequest.result);
                    resolve(dataRequest.result);
                }
            }catch(e){
                //console.log(e);
            }

        }
        request.onerror = ()=>{
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