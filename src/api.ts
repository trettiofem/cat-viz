const HOST = "localhost";
const PORT = 8080; // TODO: prompt for port if server can't be found

export interface CATResponse {
    status: string;
    message: string;
    data: any;
}

export async function api(path: string, body?: any): Promise<any> {
    const _res = await fetch(`http://${HOST}:${PORT}${path}`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: body ? JSON.stringify(body) : ""
    });
    const res = (await _res.json()) as CATResponse;

    if (!res.status) {
        throw new Error("Internal server error.");
    }

    if (res.status !== "ok") {
        throw new Error(res.message);
    }

    return res.data;
}