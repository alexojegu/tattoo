import { type QBFilterQuery, type QBQueryOrderMap, QueryOrder } from "@mikro-orm/core";
import { GraphQLError } from "graphql";
import { autoInjectable } from "tsyringe";
import type NodeEntity from "../entities/nodeEntity.js";
import GraphqlUtil from "./graphqlUtil.js";

@autoInjectable()
export default class PageUtil {
    private size: number;
    private step: PageUtilStep;
    private cursor: unknown[] | undefined;

    public constructor(size: number, step: PageUtilStep, cursor?: unknown[]) {
        this.size = size;
        this.step = step;
        this.cursor = cursor;
    }

    public static parseArgs({ first, after, last, before }: PageUtilArgs): PageUtilData {
        if (first != null && last != null) {
            throw new GraphQLError('Arguments "first" and "last" cannot both be defined');
        }

        if (first != null) {
            if (first < 0) {
                throw new GraphQLError('Argument "first" cannot be a negative integer');
            }

            if (before) {
                throw new GraphQLError('Arguments "first" and "before" cannot be used together');
            }

            return { size: first, step: "forward", cursor: GraphqlUtil.decodeCursor(after) };
        }

        if (last != null) {
            if (last < 0) {
                throw new GraphQLError('Argument "last" cannot be a negative integer');
            }

            if (after) {
                throw new GraphQLError('Arguments "last" and "after" cannot be used together');
            }

            return { size: last, step: "backward", cursor: GraphqlUtil.decodeCursor(before) };
        }

        throw new GraphQLError('Arguments "first" and "last" cannot both be undefined');
    }

    public queryLimit(): number {
        return this.size + 1;
    }

    public queryOrder<TEntity extends NodeEntity>(): QBQueryOrderMap<TEntity> {
        if (this.step === "backward") {
            return { id: QueryOrder.DESC };
        }

        return { id: QueryOrder.ASC };
    }

    public queryFilter<TEntity extends NodeEntity>(): QBFilterQuery<TEntity> {
        if (!this.cursor) {
            return {};
        }

        if (this.step === "backward") {
            return { id: { $lt: this.cursor[0] } };
        }

        return { id: { $gt: this.cursor[0] } };
    }

    public toConnection<TEntity extends NodeEntity>(entities: TEntity[]): PageUtilConnection<TEntity> {
        const edges = entities.slice(0, this.size).map((entity) => ({
            cursor: GraphqlUtil.encodeCursor(entity.id),
            node: entity,
        }));

        return {
            edges: this.step === "backward" ? edges.reverse() : edges,
            pageInfo: {
                hasPreviousPage: this.step === "backward" ? entities.length > this.size : false,
                hasNextPage: this.step === "forward" ? entities.length > this.size : false,
                startCursor: edges[0]?.cursor,
                endCursor: edges[edges.length - 1]?.cursor,
            },
        };
    }
}

type PageUtilStep = "backward" | "forward";

export interface PageUtilArgs {
    first?: number;
    after?: string;
    last?: number;
    before?: string;
}

export interface PageUtilData {
    size: number;
    step: PageUtilStep;
    cursor: unknown[] | undefined;
}

export interface PageUtilEdge<TNode> {
    cursor: string;
    node: TNode;
}

export interface PageUtilInfo {
    hasPreviousPage: boolean;
    hasNextPage: boolean;
    startCursor: string | undefined;
    endCursor: string | undefined;
}

export interface PageUtilConnection<TNode> {
    edges: PageUtilEdge<TNode>[];
    pageInfo: PageUtilInfo;
}
