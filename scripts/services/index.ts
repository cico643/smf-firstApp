//https://api.instantwebtools.net/v1/passenger?page=1&size=10
import ServiceCall from "@smartface/extension-utils/lib/service-call";


export const scHalit = new ServiceCall({
    baseUrl: "https://halitaksoy.com",
    logEnabled: true,
    headers: {
        apiVersion: "1.0"
    }
});


export const scColor = new ServiceCall({
    baseUrl: "https://reqres.in",
    logEnabled: true,
    headers: {
        apiVersion: "1.0"
    }
});

export const scPassenger = new ServiceCall({
    baseUrl: "https://api.instantwebtools.net",
    logEnabled: true,
    headers: {
        apiVersion: "1.0"
    }
})