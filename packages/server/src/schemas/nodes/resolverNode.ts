import type AbstractEntity from "../../entities/abstractEntity.js";
import NodeProxy from "../../proxies/nodeProxy.js";
import type { ResolverSchemaAbstract, ResolverSchemaObject } from "../resolverSchema.js";

export enum ResolverNode {
    Account = "Account",
    Artist = "Artist",
    Tattoo = "Tattoo",
}

export const nodeRoot: Record<"Query", ResolverSchemaObject<undefined>> = {
    Query: {
        node: async (_source, { id }, context) => {
            return context.container.resolve(NodeProxy).getNode(id);
        },
    },
};

export const nodeAbstract: Record<"Node", ResolverSchemaAbstract<AbstractEntity>> = {
    Node: {
        __resolveType: (source) => {
            return NodeProxy.resolve(source);
        },
    },
};
