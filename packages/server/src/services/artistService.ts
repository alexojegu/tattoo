import { GraphQLError } from "graphql";
import { inject, injectable } from "tsyringe";
import type ArtistEntity from "../entities/artistEntity.js";
import ArtistLoader from "../loaders/artistLoader.js";
import type { NodeProxyService } from "../proxies/nodeProxy.js";
import { ResolverNode } from "../schemas/nodes/resolverNode.js";
import ArtistStore from "../stores/artistStore.js";
import GraphqlUtil from "../utils/graphqlUtil.js";
import PageUtil, { type PageUtilArgs, type PageUtilConnection } from "../utils/pageUtil.js";

@injectable()
export default class ArtistService implements NodeProxyService {
    private artistLoader: ArtistLoader;
    private artistStore: ArtistStore;

    public constructor(
        @inject(ArtistLoader) artistLoader: ArtistLoader,
        @inject(ArtistStore) artistStore: ArtistStore,
    ) {
        this.artistLoader = artistLoader;
        this.artistStore = artistStore;
    }

    public static globalId(entity: ArtistEntity): string {
        return GraphqlUtil.encodeGid(ResolverNode.Artist, entity.id);
    }

    public async getArtist(gid: string): Promise<ArtistEntity | undefined> {
        const [type, id] = GraphqlUtil.decodeGid(gid);

        if (type !== ResolverNode.Artist || typeof id !== "number") {
            throw new GraphQLError("Artist global ID cannot be in an invalid format");
        }

        return this.loadNode(id);
    }

    public async getArtists(page: PageUtilArgs): Promise<PageUtilConnection<ArtistEntity>> {
        const { size, step, cursor } = PageUtil.parseArgs(page);

        if (cursor && (typeof cursor[0] !== "number" || cursor[1] != null)) {
            throw new GraphQLError("Artist connection cursor cannot be in an invalid format");
        }

        const pageUtil = new PageUtil(size, step, cursor);
        const entities = await this.artistStore.findRows(pageUtil);

        return pageUtil.toConnection(entities);
    }

    public async loadNode(id: number): Promise<ArtistEntity | undefined> {
        return this.artistLoader.fillNode(id);
    }
}
