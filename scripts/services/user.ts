import { sc } from "./serviceConfig";
export async function login( username: string, password: string)  {
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

