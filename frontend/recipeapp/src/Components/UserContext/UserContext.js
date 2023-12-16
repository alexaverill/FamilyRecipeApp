import { useState, useEffect, createContext } from "react";
import { getCurrentUser } from "aws-amplify/auth";
export const UserContext = createContext(null);
export const UserContextProvider = ({children}) =>{
    const [data, setData] = useState({user:{}})
  
    useEffect(() =>{
        getUserAndSession();
    },[]);
   const getUserAndSession = async () =>{
    let user = await getCurrentUser();
    console.log(user);
    setData({user})

   }
   const { Provider } = UserContext;
   return(
       <Provider value={data}>
           {children}
       </Provider>
   )
}