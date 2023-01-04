export default class GraphqlUtil {
    public static encode(payload: Record<string, unknown>): string {
        const json = JSON.stringify(payload);

        return Buffer.from(json, "utf8").toString("base64");
    }

    public static decode(payload: string): Record<string, unknown> {
        const json = Buffer.from(payload, "base64").toString("utf8");

        return JSON.parse(json);
    }
}
