import { DependencyContainer, inject, injectable, registry } from "tsyringe";
import type AbstractEntity from "../entities/abstractEntity.js";
import AccountEntity from "../entities/accountEntity.js";
import TattooEntity from "../entities/tattooEntity.js";
import { ResolverNode } from "../schemas/nodes/resolverNode.js";
import AccountService from "../services/accountService.js";
import TattooService from "../services/tattooService.js";
import GraphqlUtil from "../utils/graphqlUtil.js";

@injectable()
@registry([{ token: NodeProxy.factoryToken, useFactory: NodeProxy.factoryInjection }])
export default class NodeProxy {
    public static readonly factoryToken = Symbol("NodeProxyFactory");
    private factory: NodeProxyFactory;

    public constructor(@inject(NodeProxy.factoryToken) factory: NodeProxyFactory) {
        this.factory = factory;
    }

    public static resolveType(entity: AbstractEntity): string | undefined {
        switch (entity.constructor.name) {
            case AccountEntity.name:
                return ResolverNode.Account;
            case TattooEntity.name:
                return ResolverNode.Tattoo;
            default:
                return undefined;
        }
    }

    private static factoryInjection(container: DependencyContainer): NodeProxyFactory {
        return (type: string) => {
            switch (type) {
                case ResolverNode.Account:
                    return container.resolve(AccountService);
                case ResolverNode.Tattoo:
                    return container.resolve(TattooService);
                default:
                    return undefined;
            }
        };
    }

    public async getNode(gid: string): Promise<AbstractEntity | null | undefined> {
        const { type, id } = GraphqlUtil.decode(gid);

        if (typeof type != "string" || typeof id != "number") {
            return undefined;
        }

        return this.factory(type)?.getNode(id);
    }
}

type NodeProxyFactory = (type: string) => NodeProxyService | undefined;

export interface NodeProxyService {
    getNode(id: number): Promise<AbstractEntity | null>;
}
