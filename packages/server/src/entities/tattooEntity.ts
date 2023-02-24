import { Entity, Property } from "@mikro-orm/core";
import AbstractEntity from "./abstractEntity.js";

@Entity({ tableName: "tattoo" })
export default class TattooEntity extends AbstractEntity {
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
