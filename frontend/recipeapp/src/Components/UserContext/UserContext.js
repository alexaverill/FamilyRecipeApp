import { useState, useEffect, createContext } from "react";
import { getCurrentUser } from "aws-amplify/auth";
import { GetFavorites } from "../../API/RecipeApi";
export const UserContext = createContext({});
export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [favorites, setFavorites] = useState([]);
    useEffect(() => {
        getUserAndSession();
    }, []);
    const getUserAndSession = async () => {
        setIsLoading(true)
        try {
            let user = await getCurrentUser();
            console.log(user);
            setUser(user)
            let favorites = await GetFavorites({ username: user.username, userId: user.userId });
            setFavorites(favorites);
        } catch (e) {
            console.log(e);
        }
        setIsLoading(false);
    }
    const AddFavorite = (id) => {
        if(favorites){
            setFavorites([...favorites, id]);
        }else{
            setFavorites([id]);
        }
    }
    const RemoveFavorite = (id) => {
        favorites.splice(favorites.find(fav => fav == id), 1);
        setFavorites(favorites);
    }
    const { Provider } = UserContext;
    return (
        <Provider value={{ user, isLoading, favorites, AddFavorite, RemoveFavorite }}>
            {children}
        </Provider>
    )
}