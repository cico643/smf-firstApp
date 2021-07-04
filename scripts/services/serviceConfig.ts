import ServiceCall from "sf-extension-utils/lib/service-call";
export const sc = new ServiceCall({
    baseUrl: "https://halitaksoy.com",
    logEnabled: true,
    headers: {
        apiVersion: "1.0"
    }
});