import { GraphQLError } from "graphql";

export default class GraphqlUtil {
    private static datePattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;

    public static encode(payload: unknown[]): string {
        const json = JSON.stringify(payload);

        return Buffer.from(json, "utf8").toString("base64url");
    }

    public static decode(payload: string): unknown[] {
        const json = Buffer.from(payload, "base64url").toString("utf8");

        return JSON.parse(json, GraphqlUtil.jsonReviver);
    }

    public static paginate(list: GraphqlUtilList): [GraphqlUtilPage, GraphqlUtilBuild] {
        const { limit, step, cursor } = GraphqlUtil.listParser(list);
        const build: GraphqlUtilBuild = (items, ...keys) => {
            const edges = items.slice(0, limit).map((item) => ({
                cursor: GraphqlUtil.encode(keys.map((key) => item[key])),
                node: item,
            }));

            if (step === "before") {
                edges.reverse();
            }

            const info = {
                hasPreviousPage: step === "before" ? items.length > limit : false,
                hasNextPage: step === "after" ? items.length > limit : false,
                startCursor: edges[0]?.cursor,
                endCursor: edges[edges.length - 1]?.cursor,
            };

            return { edges, pageInfo: info };
        };

        return [{ limit: limit + 1, step, cursor }, build];
    }

    private static jsonReviver(_key: string, value: unknown): unknown {
        if (typeof value == "string" && GraphqlUtil.datePattern.test(value)) {
            return new Date(value);
        }

        return value;
    }

    private static listParser({ first, after, last, before }: GraphqlUtilList): GraphqlUtilPage {
        if (first != undefined) {
            if (first < 0) {
                throw new GraphQLError("Argument first cannot be non-positive integer");
            }

            if (before) {
                throw new GraphQLError("Argument first and before cannot be used together");
            }

            return { limit: first, step: "after", cursor: after ? GraphqlUtil.decode(after) : [] };
        }

        if (last != undefined) {
            if (last < 0) {
                throw new GraphQLError("Argument last cannot be non-positive integer");
            }

            if (after) {
                throw new GraphQLError("Argument last and after cannot be used together");
            }

            return { limit: last, step: "before", cursor: before ? GraphqlUtil.decode(before) : [] };
        }

        throw new GraphQLError("Argument first and last cannot be both undefined");
    }
}

type GraphqlUtilBuild = <TItem>(items: TItem[], ...keys: (keyof TItem)[]) => GraphqlUtilConnection<TItem>;

export interface GraphqlUtilList {
    first?: number;
    after?: string;
    last?: number;
    before?: string;
}

export interface GraphqlUtilPage {
    limit: number;
    step: "after" | "before";
    cursor: unknown[];
}

export interface GraphqlUtilEdge<TNode> {
    cursor: string;
    node: TNode;
}

export interface GraphqlUtilInfo {
    hasPreviousPage: boolean;
    hasNextPage: boolean;
    startCursor: string | undefined;
    endCursor: string | undefined;
}

export interface GraphqlUtilConnection<TNode> {
    edges: GraphqlUtilEdge<TNode>[];
    pageInfo: GraphqlUtilInfo;
}
