import { GraphQLError } from "graphql";
import { inject, injectable } from "tsyringe";
import type TattooEntity from "../entities/tattooEntity.js";
import type { NodeProxyService } from "../proxies/nodeProxy.js";
import { ResolverNode } from "../schemas/nodes/resolverNode.js";
import TattooStore from "../stores/tattooStore.js";
import GraphqlUtil, { GraphqlUtilConnection, GraphqlUtilList } from "../utils/graphqlUtil.js";

@injectable()
export default class TattooService implements NodeProxyService {
    private tattooStore: TattooStore;

    public constructor(@inject(TattooStore) tattooStore: TattooStore) {
        this.tattooStore = tattooStore;
    }

    public static globalId(entity: TattooEntity): string {
        return GraphqlUtil.encode([ResolverNode.Tattoo, entity.id]);
    }

    public async getNode(id: number): Promise<TattooEntity | null> {
        return this.tattooStore.findId(id);
    }

    public async getTattoo(gid: string): Promise<TattooEntity | null> {
        const [type, id] = GraphqlUtil.decode(gid);

        if (type !== ResolverNode.Tattoo || typeof id != "number") {
            throw new GraphQLError("Argument id cannot be invalid global id of Tattoo");
        }

        return this.tattooStore.findId(id);
    }

    public async getTattoos(list: GraphqlUtilList): Promise<GraphqlUtilConnection<TattooEntity>> {
        const [page, build] = GraphqlUtil.paginate(list);

        if (page.cursor.length && typeof page.cursor[0] != "number") {
            throw new GraphQLError(`Argument ${page.step} cannot be invalid cursor of Tattoo`);
        }

        return build(await this.tattooStore.findRows(page), "id");
    }
}
