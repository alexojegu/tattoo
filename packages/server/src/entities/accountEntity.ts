import { Entity, Property } from "@mikro-orm/core";
import AbstractEntity from "./abstractEntity.js";

@Entity({ tableName: "account" })
export default class AccountEntity extends AbstractEntity {
    @Property()
    public name!: string;

    @Property({ onCreate: () => new Date() })
    public created!: Date;

    @Property({ onUpdate: () => new Date(), nullable: true })
    public updated?: Date;
}
