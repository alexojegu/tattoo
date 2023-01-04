import { Entity, PrimaryKey } from "@mikro-orm/core";

@Entity({ abstract: true })
export default abstract class AbstractEntity {
    @PrimaryKey()
    public id!: number;
}
