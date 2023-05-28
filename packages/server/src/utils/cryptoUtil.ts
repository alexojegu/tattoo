import { webcrypto } from "node:crypto";
import { autoInjectable } from "tsyringe";

@autoInjectable()
export default class CryptoUtil {
    private static datePattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;

    public static async createHash(algorithm: AlgorithmIdentifier, payload: unknown): Promise<string> {
        const buffer = Buffer.from(JSON.stringify(payload), "utf8");
        const hash = await webcrypto.subtle.digest(algorithm, buffer);

        return Buffer.from(hash).toString("hex");
    }

    public static encodeBase64(payload: unknown, url = false): string {
        const json = JSON.stringify(payload);
        const algorithm = url ? "base64url" : "base64";

        return Buffer.from(json, "utf8").toString(algorithm);
    }

    public static decodeBase64(token: string, url = false): unknown {
        const algorithm = url ? "base64url" : "base64";
        const json = Buffer.from(token, algorithm).toString("utf8");

        return JSON.parse(json, CryptoUtil.reviverJson);
    }

    private static reviverJson(_key: string, value: unknown): unknown {
        if (typeof value === "string" && CryptoUtil.datePattern.test(value)) {
            return new Date(value);
        }

        return value;
    }
}
