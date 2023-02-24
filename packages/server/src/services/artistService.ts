import { GraphQLError } from "graphql";
import { inject, injectable } from "tsyringe";
import type ArtistEntity from "../entities/artistEntity.js";
import type { NodeProxyService } from "../proxies/nodeProxy.js";
import { ResolverNode } from "../schemas/nodes/resolverNode.js";
import ArtistStore from "../stores/artistStore.js";
import GraphqlUtil, { GraphqlUtilConnection, GraphqlUtilList } from "../utils/graphqlUtil.js";

@injectable()
export default class ArtistService implements NodeProxyService {
    private artistStore: ArtistStore;

    public constructor(@inject(ArtistStore) artistStore: ArtistStore) {
        this.artistStore = artistStore;
    }

    public static globalId(entity: ArtistEntity): string {
        return GraphqlUtil.encode([ResolverNode.Artist, entity.id]);
    }

    public async getNode(id: number): Promise<ArtistEntity | null> {
        return this.artistStore.findId(id);
    }

    public async getArtist(gid: string): Promise<ArtistEntity | null> {
        const [type, id] = GraphqlUtil.decode(gid);

        if (type !== ResolverNode.Artist || typeof id != "number") {
            throw new GraphQLError("Argument id cannot be invalid global id of Artist");
        }

        return this.artistStore.findId(id);
    }

    public async getArtists(list: GraphqlUtilList): Promise<GraphqlUtilConnection<ArtistEntity>> {
        const [page, build] = GraphqlUtil.paginate(list);

        if (page.cursor.length && typeof page.cursor[0] != "number") {
            throw new GraphQLError(`Argument ${page.step} cannot be invalid cursor of Artist`);
        }

        return build(await this.artistStore.findRows(page), "id");
    }
}
