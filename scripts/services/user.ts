import { sc } from "./serviceConfig";
export function login( username: string, password: string)  {
    return new Promise( async ( resolve, reject ) => {
            try {
            const response: string = await sc.request(`/auth-test/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: {
                name: username,
                password
            }
            })

            resolve(response);
            } catch (err) {
                console.error(err);
                reject(err);
            }
        
       })     
}

