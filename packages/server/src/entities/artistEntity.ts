import { Collection, Entity, OneToMany, OneToOne, Property, type Ref } from "@mikro-orm/core";
import AccountEntity from "./accountEntity.js";
import NodeEntity from "./nodeEntity.js";
import TattooEntity from "./tattooEntity.js";

@Entity({ tableName: "artist" })
export default class ArtistEntity extends NodeEntity {
    @OneToOne({ entity: () => AccountEntity, ref: true })
    public account!: Ref<AccountEntity>;

    @OneToMany({ entity: () => TattooEntity, mappedBy: "artist" })
    public tattoos: Collection<TattooEntity>;

    @Property({ nullable: true })
    public avatar?: string;

    @Property({ columnType: "text" })
    public about!: string;

    @Property({ onCreate: () => new Date() })
    public created!: Date;

    @Property({ onUpdate: () => new Date(), nullable: true })
    public updated?: Date;

    public constructor() {
        super();

        this.tattoos = new Collection<TattooEntity>(this);
    }
}
