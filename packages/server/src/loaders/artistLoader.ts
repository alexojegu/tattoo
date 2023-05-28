import { inject, Lifecycle, scoped } from "tsyringe";
import type ArtistEntity from "../entities/artistEntity.js";
import ArtistStore from "../stores/artistStore.js";
import NodeLoader from "./nodeLoader.js";

@scoped(Lifecycle.ContainerScoped)
export default class ArtistLoader extends NodeLoader<ArtistEntity> {
    public constructor(@inject(ArtistStore) artistStore: ArtistStore) {
        super(artistStore);
    }
}
