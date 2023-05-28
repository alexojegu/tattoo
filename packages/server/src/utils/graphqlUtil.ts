import { GraphQLError } from "graphql";
import { autoInjectable } from "tsyringe";
import CryptoUtil from "./cryptoUtil.js";

@autoInjectable()
export default class GraphqlUtil {
    public static encodeGid(type: string, id: number): string {
        return CryptoUtil.encodeBase64([type, id], true);
    }

    public static decodeGid(gid: string): unknown[] {
        try {
            return GraphqlUtil.decodeToken(gid);
        } catch {
            throw new GraphQLError("Global ID cannot be in an invalid format");
        }
    }

    public static encodeCursor(id: number, sort?: unknown): string {
        return CryptoUtil.encodeBase64([id, sort], true);
    }

    public static decodeCursor(cursor?: string): unknown[] | undefined {
        if (!cursor) {
            return undefined;
        }

        try {
            return GraphqlUtil.decodeToken(cursor);
        } catch {
            throw new GraphQLError("Connection cursor cannot be in an invalid format");
        }
    }

    private static decodeToken(token: string): unknown[] {
        const payload = CryptoUtil.decodeBase64(token, true);

        if (!Array.isArray(payload)) {
            throw new TypeError("Payload cannot be anything other than an array");
        }

        return payload;
    }
}
