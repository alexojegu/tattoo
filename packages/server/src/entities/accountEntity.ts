import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity({ tableName: "account" })
export default class AccountEntity {
    @PrimaryKey()
    public id!: number;

    @Property()
    public name!: string;
}
