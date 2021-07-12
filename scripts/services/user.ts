import { scHalit } from "./index";

let userName = "";

export async function login( username: string, password: string): Promise<string>  {
            try {
                const response: string = await scHalit.request(`/auth-test/login`, {
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
        
        await scHalit.request(`/auth-test/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: {
                    name: username,
                    password
                }
        });
        userName = username;
    } catch (err) {
        console.error(err);
        throw err;
    }
}


export function getUsername() {
    return userName;
}