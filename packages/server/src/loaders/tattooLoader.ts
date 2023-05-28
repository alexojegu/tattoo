import DataLoader from "dataloader";
import { inject, Lifecycle, scoped } from "tsyringe";
import type TattooEntity from "../entities/tattooEntity.js";
import TattooStore from "../stores/tattooStore.js";
import type PageUtil from "../utils/pageUtil.js";
import NodeLoader from "./nodeLoader.js";

@scoped(Lifecycle.ContainerScoped)
export default class TattooLoader extends NodeLoader<TattooEntity> {
    private tattooStore: TattooStore;
    private artistCache: Map<string, DataLoader<number, TattooEntity[]>>;

    public constructor(@inject(TattooStore) tattooStore: TattooStore) {
        super(tattooStore);

        this.tattooStore = tattooStore;
        this.artistCache = new Map();
    }

    public async fillArtist(id: number, pageUtil: PageUtil, hash: string): Promise<TattooEntity[]> {
        if (!this.artistCache.has(hash)) {
            this.artistCache.set(hash, new DataLoader(async (ids) => this.batchArtists(ids, pageUtil)));
        }

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return this.artistCache.get(hash)!.load(id);
    }

    private async batchArtists(ids: readonly number[], pageUtil: PageUtil): Promise<TattooEntity[][]> {
        const entities = await this.tattooStore.findArtists(ids, pageUtil);

        return ids.map((id) => entities.filter((entity) => entity.artist.id === id));
    }
}
