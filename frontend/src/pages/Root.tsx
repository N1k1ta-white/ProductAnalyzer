import {Outlet} from 'react-router-dom'

export default function Root() {
    console.log("Root component rendered");
    return  (
        <Outlet/>
    )
}