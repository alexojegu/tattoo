import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity({ tableName: "account" })
export default class AccountEntity {
    @PrimaryKey()
    public id!: number;

    @Property()
    public name!: string;

    @Property({ onCreate: () => new Date() })
    public createdAt!: Date;

    @Property({ onUpdate: () => new Date(), nullable: true })
    public updatedAt?: Date;
}
