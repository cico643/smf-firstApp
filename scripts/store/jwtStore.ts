import Data from "@smartface/native/global/data";


export function getIsLoggedIn(key: string): boolean {
    return Data.getBooleanVariable(key);
}

export function setIsLoggedIn(key: string, value: boolean): void {
    Data.setBooleanVariable(key, value);
}


export function getJwt(key: string): string {
    return Data.getStringVariable(key);
}


export function setJwt(key: string, value: string): void {
    Data.setStringVariable(key, value);
}

