/* eslint-disable no-unused-vars */

import {
    AggregateOptions,
    AggregationCursor,
    BulkWriteOptions,
    Collection, DeleteOptions, DeleteResult, Filter, FindOneAndUpdateOptions, FindOptions, InsertManyResult, InsertOneOptions, InsertOneResult, ModifyResult, MongoClient,
    OptionalUnlessRequiredId, UpdateFilter, UpdateOptions, UpdateResult, WithId
} from 'mongodb';
import getConnectionString from '../dbConnection';
import config from '../../config/config';
export interface IBaseRepository<T> {
    insertOne(doc: OptionalUnlessRequiredId<T>, options?: InsertOneOptions): Promise<InsertOneResult<T>>;
    insertMany(docs: OptionalUnlessRequiredId<T>[], options?: BulkWriteOptions): Promise<InsertManyResult<T>>;
    updateOne(filter: Filter<T>, update: UpdateFilter<T> | Partial<T>, options?: UpdateOptions): Promise<UpdateResult<T>>;
    updateMany(filter: Filter<T>, update: UpdateFilter<T>, options?: UpdateOptions): Promise<UpdateResult<T>>;
    deleteOne(filter?: Filter<T>, options?: DeleteOptions): Promise<DeleteResult>;
    deleteMany(filter?: Filter<T>, options?: DeleteOptions): Promise<DeleteResult>;
    aggregate<T extends Document = Document>(pipeline?: Document[], options?: AggregateOptions): Promise<AggregationCursor<T>>;
    findOne(filter: Filter<T>, options?: FindOptions): Promise<WithId<T> | null>;
    find(filter: Filter<T>, options?: FindOptions): Promise<WithId<T>[]>;
}

export class BaseRepository<T> implements IBaseRepository<T> {

    private collection: Collection<T>;

    constructor(collectionName: string) {
        const client = new MongoClient(getConnectionString());
        client.connect().then(() => {
            const db = client.db(config.DbName);
            this.collection = db.collection<T>(collectionName);
        });
    }
    async insertOne(doc: OptionalUnlessRequiredId<T>, options?: InsertOneOptions): Promise<InsertOneResult<T>> {
        return await this.collection.insertOne(doc, options);
    }
    async insertMany(docs: OptionalUnlessRequiredId<T>[], options?: BulkWriteOptions): Promise<InsertManyResult<T>> {
        return await this.collection.insertMany(docs, options);
    }
    async updateOne(filter: Filter<T>, update: UpdateFilter<T> | Partial<T>, options?: UpdateOptions): Promise<UpdateResult<T>> {
        return await this.collection.updateOne(filter, update, options);
    }
    async updateMany(filter: Filter<T>, update: UpdateFilter<T>, options?: UpdateOptions): Promise<UpdateResult<T>> {
        return await this.collection.updateMany(filter, update, options);
    }
    async deleteOne(filter?: Filter<T>, options?: DeleteOptions): Promise<DeleteResult> {
        return await this.collection.deleteOne(filter, options);
    }
    async deleteMany(filter?: Filter<T>, options?: DeleteOptions): Promise<DeleteResult> {
        return await this.collection.deleteMany(filter, options);
    }
    async findOneAndUpdate(filter: Filter<T>, update: UpdateFilter<T>, options: FindOneAndUpdateOptions): Promise<ModifyResult<T>> {
        return await this.collection.findOneAndUpdate(filter, update, options);
    }
    async aggregate<T extends Document = Document>(pipeline?: Document[], options?: AggregateOptions): Promise<AggregationCursor<T>> {
        return await this.collection.aggregate(pipeline, options);
    }
    async findOne(filter: Filter<T>, options?: FindOptions): Promise<WithId<T> | null> {
        return await this.collection.findOne(filter, options);
    }
    async find(filter: Filter<T>, options?: FindOptions): Promise<WithId<T>[]> {
        return await this.collection.find(filter, options).toArray();
    }
}