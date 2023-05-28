import { Entity, PrimaryKey } from "@mikro-orm/core";

@Entity({ abstract: true })
export default abstract class NodeEntity {
    @PrimaryKey()
    public id!: number;
}
