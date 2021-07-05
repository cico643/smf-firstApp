import { sc } from "./serviceConfig";

let userName = "";

export async function login( username: string, password: string): Promise<string>  {
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
                });
                

                return response;
            } catch (err) {
                console.error(err);
                throw err;
            }
        
}

export async function register( username: string, password: string): Promise<void> {
    try {
        userName = username;
        await sc.request(`/auth-test/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: {
                    name: username,
                    password
                }
        });

    } catch (err) {
        console.error(err);
        throw err;
    }
}


export function getUsername() {
    return userName;
}