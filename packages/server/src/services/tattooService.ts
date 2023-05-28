import { GraphQLError } from "graphql";
import { inject, injectable } from "tsyringe";
import type TattooEntity from "../entities/tattooEntity.js";
import TattooLoader from "../loaders/tattooLoader.js";
import type { NodeProxyService } from "../proxies/nodeProxy.js";
import { ResolverNode } from "../schemas/nodes/resolverNode.js";
import TattooStore from "../stores/tattooStore.js";
import CryptoUtil from "../utils/cryptoUtil.js";
import GraphqlUtil from "../utils/graphqlUtil.js";
import PageUtil, { type PageUtilArgs, type PageUtilConnection } from "../utils/pageUtil.js";

@injectable()
export default class TattooService implements NodeProxyService {
    private tattooLoader: TattooLoader;
    private tattooStore: TattooStore;

    public constructor(
        @inject(TattooLoader) tattooLoader: TattooLoader,
        @inject(TattooStore) tattooStore: TattooStore,
    ) {
        this.tattooLoader = tattooLoader;
        this.tattooStore = tattooStore;
    }

    public static globalId(entity: TattooEntity): string {
        return GraphqlUtil.encodeGid(ResolverNode.Tattoo, entity.id);
    }

    public async getTattoo(gid: string): Promise<TattooEntity | undefined> {
        const [type, id] = GraphqlUtil.decodeGid(gid);

        if (type !== ResolverNode.Tattoo || typeof id !== "number") {
            throw new GraphQLError("Tattoo global ID cannot be in an invalid format");
        }

        return this.loadNode(id);
    }

    public async getTattoos(page: PageUtilArgs): Promise<PageUtilConnection<TattooEntity>> {
        const { size, step, cursor } = PageUtil.parseArgs(page);

        if (cursor && (typeof cursor[0] !== "number" || cursor[1] != null)) {
            throw new GraphQLError("Tattoo connection cursor cannot be in an invalid format");
        }

        const pageUtil = new PageUtil(size, step, cursor);
        const entities = await this.tattooStore.findRows(pageUtil);

        return pageUtil.toConnection(entities);
    }

    public async loadNode(id: number): Promise<TattooEntity | undefined> {
        return this.tattooLoader.fillNode(id);
    }

    public async loadArtist(id: number, page: PageUtilArgs): Promise<PageUtilConnection<TattooEntity>> {
        const { size, step, cursor } = PageUtil.parseArgs(page);

        if (cursor && (typeof cursor[0] !== "number" || cursor[1] != null)) {
            throw new GraphQLError("Tattoo connection cursor cannot be in an invalid format");
        }

        const pageUtil = new PageUtil(size, step, cursor);
        const hash = await CryptoUtil.createHash("SHA-1", page);
        const entities = await this.tattooLoader.fillArtist(id, pageUtil, hash);

        return pageUtil.toConnection(entities);
    }
}
