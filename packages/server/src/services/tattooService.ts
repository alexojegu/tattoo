import { inject, injectable } from "tsyringe";
import type TattooEntity from "../entities/tattooEntity.js";
import type { NodeProxyService } from "../proxies/nodeProxy.js";
import { ResolverNode } from "../schemas/nodes/resolverNode.js";
import TattooStore from "../stores/tattooStore.js";
import GraphqlUtil from "../utils/graphqlUtil.js";

@injectable()
export default class TattooService implements NodeProxyService {
    private tattooStore: TattooStore;

    public constructor(@inject(TattooStore) tattooStore: TattooStore) {
        this.tattooStore = tattooStore;
    }

    public static globalId(entity: TattooEntity): string {
        return GraphqlUtil.encode({ type: ResolverNode.Tattoo, id: entity.id });
    }

    public async getTattoo(gid: string): Promise<TattooEntity | null> {
        const { type, id } = GraphqlUtil.decode(gid);

        if (type !== ResolverNode.Tattoo || typeof id != "number") {
            return null;
        }

        return this.getNode(id);
    }

    public async getNode(id: number): Promise<TattooEntity | null> {
        if (id <= 0) {
            return null;
        }

        return this.tattooStore.findId(id);
    }
}
