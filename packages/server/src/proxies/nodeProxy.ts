import { GraphQLError } from "graphql";
import { type DependencyContainer, inject, injectable, instancePerContainerCachingFactory, registry } from "tsyringe";
import AccountEntity from "../entities/accountEntity.js";
import ArtistEntity from "../entities/artistEntity.js";
import type NodeEntity from "../entities/nodeEntity.js";
import TattooEntity from "../entities/tattooEntity.js";
import { ResolverNode } from "../schemas/nodes/resolverNode.js";
import AccountService from "../services/accountService.js";
import ArtistService from "../services/artistService.js";
import TattooService from "../services/tattooService.js";
import GraphqlUtil from "../utils/graphqlUtil.js";

@injectable()
@registry([
    { token: NodeProxy.factoryToken, useFactory: instancePerContainerCachingFactory(NodeProxy.injectionFactory) },
])
export default class NodeProxy {
    public static readonly factoryToken = Symbol("NodeProxyFactory");
    private factory: NodeProxyFactory;

    public constructor(@inject(NodeProxy.factoryToken) factory: NodeProxyFactory) {
        this.factory = factory;
    }

    public static resolveType(entity: NodeEntity): string | undefined {
        switch (entity.constructor.name) {
            case AccountEntity.name:
                return ResolverNode.Account;
            case ArtistEntity.name:
                return ResolverNode.Artist;
            case TattooEntity.name:
                return ResolverNode.Tattoo;
            default:
                return undefined;
        }
    }

    private static injectionFactory(container: DependencyContainer): NodeProxyFactory {
        return (type: unknown) => {
            switch (type) {
                case ResolverNode.Account:
                    return container.resolve(AccountService);
                case ResolverNode.Artist:
                    return container.resolve(ArtistService);
                case ResolverNode.Tattoo:
                    return container.resolve(TattooService);
                default:
                    throw new GraphQLError("Node global ID cannot be in an invalid format");
            }
        };
    }

    public async getNode(gid: string): Promise<NodeEntity | undefined> {
        const [type, id] = GraphqlUtil.decodeGid(gid);

        if (typeof id !== "number") {
            throw new GraphQLError("Node global ID cannot be in an invalid format");
        }

        return this.factory(type).loadNode(id);
    }

    public async getNodes(gids: string[]): Promise<(NodeEntity | undefined)[]> {
        return Promise.all(gids.map(async (gid) => this.getNode(gid)));
    }
}

type NodeProxyFactory = (type: unknown) => NodeProxyService;

export interface NodeProxyService {
    loadNode(id: number): Promise<NodeEntity | undefined>;
}
