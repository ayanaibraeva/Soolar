import {RouterProvider} from "react-router-dom";
import {Loader} from "../UI/Loader/Loader.jsx";
import {router} from "./routes/Router.jsx";
export const App = () => {
    return <RouterProvider router={router} fallbackElement={<Loader/>}/>
}