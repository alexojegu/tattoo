import { Entity, Property } from "@mikro-orm/core";
import AbstractEntity from "./abstractEntity.js";

@Entity({ tableName: "artist" })
export default class ArtistEntity extends AbstractEntity {
    @Property({ nullable: true })
    public avatar?: string;

    @Property({ columnType: "text" })
    public about!: string;

    @Property({ onCreate: () => new Date() })
    public created!: Date;

    @Property({ onUpdate: () => new Date(), nullable: true })
    public updated?: Date;
}
