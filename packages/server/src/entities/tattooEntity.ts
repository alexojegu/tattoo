import { Entity, ManyToOne, Property, type Ref } from "@mikro-orm/core";
import ArtistEntity from "./artistEntity.js";
import NodeEntity from "./nodeEntity.js";

@Entity({ tableName: "tattoo" })
export default class TattooEntity extends NodeEntity {
    @ManyToOne({ entity: () => ArtistEntity, ref: true })
    public artist!: Ref<ArtistEntity>;

    @Property()
    public image!: string;

    @Property()
    public width!: number;

    @Property()
    public height!: number;

    @Property({ onCreate: () => new Date() })
    public created!: Date;

    @Property({ onUpdate: () => new Date(), nullable: true })
    public updated?: Date;
}
