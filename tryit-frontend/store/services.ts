import axios from 'axios';
import { Context as TicketContext } from "@nuxt/types"

export function post({data}: any, path:string){
    axios.post(
        path,
        {data}
    ).then((response)=>{
        console.log(response)
    },(error) =>{
        console.log(error)
    })
}
export function get(path : string):any{
    axios.get(
        path
    ).then((response)=>{
        return response
    },(error) =>{
        console.log(error)
    })
}

