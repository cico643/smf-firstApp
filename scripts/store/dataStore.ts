import Data from "@smartface/native/global/data";


export function getIsLoggedIn(): boolean {
    return Data.getBooleanVariable("userLogged");
}

export function setIsLoggedIn(value: boolean): void {
    Data.setBooleanVariable('userLogged', value);
}


export function getJwt(): string {
    return Data.getStringVariable("userToken");
}


export function setJwt(value: string): void {
    Data.setStringVariable('userToken', value);
}


export function getLang(): string {
    return Data.getStringVariable("appLanguage");
}

export function setLang(value: string): void {
    Data.setStringVariable('appLanguage', value);
}

export function getTheme(): string {
    return Data.getStringVariable("appTheme");
}

export function setTheme(value: string): void {
    return Data.setStringVariable("appTheme", value);
}

export function getIsItemMarked(index: string): boolean {
    return Data.getBooleanVariable(`${index} isMarked`);
}

export function setIsItemMarked(index: string, value: boolean): void {
    Data.setBooleanVariable(`${index} isMarked`, value);
}