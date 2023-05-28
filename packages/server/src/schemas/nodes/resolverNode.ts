import type NodeEntity from "../../entities/nodeEntity.js";
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
        nodes: async (_source, { ids }, context) => {
            return context.container.resolve(NodeProxy).getNodes(ids);
        },
    },
};

export const nodeAbstract: Record<"Node", ResolverSchemaAbstract<NodeEntity>> = {
    Node: {
        __resolveType: (source) => {
            return NodeProxy.resolveType(source);
        },
    },
};
