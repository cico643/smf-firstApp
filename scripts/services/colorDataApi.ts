import ServiceCall from "@smartface/extension-utils/lib/service-call";

const sc = new ServiceCall({
    baseUrl: "https://reqres.in",
    logEnabled: true,
    headers: {
        apiVersion: "1.0"
    }
});

export type colorData = {
    id: number;
    name: string;
    year: number;
    color: string;
    pantone_value: string;

}

type GetColorDataResponse = {
    page: number,
    per_page: number,
    total: number,
    total_pages: number,
    data: colorData[],
    support: {
        url: string;
        text: string;
    }
}

export async function getColorData(): Promise<GetColorDataResponse> {
    try {
        const response: GetColorDataResponse = await sc.request("/api/unknown", {
            method: "GET"
        })

        return response;
    } catch (err) {
        console.error(err);
        throw err;
    }
}