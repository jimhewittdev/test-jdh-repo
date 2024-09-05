import { Query } from "mongoose";
import { query } from "winston";
const esc = encodeURIComponent;


export async function makeRequest(url : string, queryParams : URLSearchParams) : Promise<string | void> {
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    headers.set('Accept', 'application/json');
    
    const requestOptions = {
        method: 'GET',
        headers: headers 
    };
    console.log(queryParams == null ? url : url + "?" + queryParams.toString());
	const response = await fetch(queryParams == null ? url : url + "?" + queryParams.toString(), requestOptions);
    if( response.status == 200) {
        return response.json();
    }
    else {
        return "";
    }
}