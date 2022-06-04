import { Event } from "../modules/Event/Event";
import { Home } from "../modules/Home/Home";
import { Friend_request } from "../modules/Notifications/Friend_request";
import { HostRequestDetail } from "../modules/Notifications/HostRequestDetail";
import { Notifications } from "../modules/Notifications/Notifications";
import { Queries } from "../modules/Queries/Queries";
import { Querydetail } from "../modules/Queries/Querydetail";
import { QueryToolDetail } from "../modules/Queries/QueryToolDetail";
import { Settings } from "../modules/Settings/Settings";
import  EventDetail  from "../modules/Event/EventDetail";

import { Profile } from "../modules/Profile/Profile";
import { Account} from "../modules/Account_setting/Account";
import { People} from "../modules/People/People";
import { People_detail} from "../modules/People/People_detail";
import { PlaceDetails} from "../modules/Place/PlaceDetails";
import { Signup } from "../modules/Auth/Signup";
import { Login } from "../modules/Auth/Login";








export const elements=[
    {
        isAuth:true,
        path:'/', 
        element:<Home/>
    },
    {
        isAuth:true,
        path:'/event', 
        element:<Event/>
    },
    {
        isAuth:true,
        path:'/settings', 
        element:<Settings/>
    },
    {
        isAuth:true,
        path:'/queries', 
        element:<Queries/>
    },
    {
        isAuth:true,
        path:'/querydetail/:id', 
        element:<Querydetail/>
    },
    {
        isAuth:true,
        path:'/eventdetail/:id', 
        element:<EventDetail/>
    },
    {
        isAuth:true,
        path:'/profile', 
        element:<Profile/>
    },
    {
        isAuth:true,
        path:'/account', 
        element:<Account/>
    },
    {
        isAuth:true,
        path:'/notifications', 
        element:<Notifications/>
    },
    {
        isAuth:true,
        path:'/people', 
        element:<People/>
    },
    {
        isAuth:true,
        path:'/peopledetail/:id', 
        element:<People_detail/>
    },
    {
        isAuth:true,
        path:'/friend_request', 
        element:<Friend_request/>
    },
    {
        isAuth:true,
        path:'/host_request_detail/:id', 
        element:<HostRequestDetail/>
    },
    {
        isAuth:true,
        path:'/qdt', 
        element:<QueryToolDetail/>
    },
    {
        isAuth:true,
        path:'/place/:id', 
        element:<PlaceDetails/>
    },
    {
        isAuth:false,
        path:'/signup', 
        element:<Signup/>
    },
    {
        isAuth:false,
        path:'/login', 
        element:<Login/>
    }
]

