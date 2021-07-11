import ServiceCall from "@smartface/extension-utils/lib/service-call";
let userName = "";


const sc = new ServiceCall({
    baseUrl: "https://halitaksoy.com",
    logEnabled: true,
    headers: {
        apiVersion: "1.0"
    }
});


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
        userName = username;
    } catch (err) {
        console.error(err);
        throw err;
    }
}


export function getUsername() {
    return userName;
}