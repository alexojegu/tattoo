import DataLoader from "dataloader";
import type NodeEntity from "../entities/nodeEntity.js";
import type NodeStore from "../stores/nodeStore.js";

export default abstract class NodeLoader<TEntity extends NodeEntity> {
    private nodeStore: NodeStore<TEntity>;
    private nodeData: DataLoader<number, TEntity | undefined>;

    public constructor(nodeStore: NodeStore<TEntity>) {
        this.nodeStore = nodeStore;
        this.nodeData = new DataLoader(async (ids) => this.batchNodes(ids));
    }

    public async fillNode(id: number): Promise<TEntity | undefined> {
        return this.nodeData.load(id);
    }

    private async batchNodes(ids: readonly number[]): Promise<(TEntity | undefined)[]> {
        const entities = await this.nodeStore.findIds(ids);

        return ids.map((id) => entities.find((entity) => entity.id === id));
    }
}
