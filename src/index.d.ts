import { ListIterateeCustom, CollectionChain } from 'lodash';

type Part<T> = Partial<T>

type MergeId<T> = T & { id?: string }

declare module "lodash" {
  interface LoDashStatic extends TLodashId {}
  interface CollectionChain<T> {
    getById(id: string): CollectionChain<T>;
    createId<T>(doc: T): string;
    upsert(doc: MergeId<T>): CollectionChain<T>;
    insert(doc: T): CollectionChain<T>;
    updateById(id: string, attrs: Part<T>): CollectionChain<T>;
    updateWhere(predicate: ListIterateeCustom<T, boolean>, attrs: Part<T>): CollectionChain<T[]>;
    replaceById(id: string, attrs: Part<T>): CollectionChain<T>;
    removeById(id: string): CollectionChain<T>;
    removeWhere(predicate: ListIterateeCustom<T, boolean>): CollectionChain<T[]>;
  }
}

type TLodashId = {
  id: string;
  getById: <T>(array: Array<T>, id: string) => CollectionChain<T>,
  createId: <T>(array: Array<T>, doc: T) => string,
  insert: <T>(array: Array<T>, doc: T) => CollectionChain<T>,
  updateById: <T>(array: Array<T>, id: string, attrs: Part<T>) => CollectionChain<T>,
  updateWhere: <T>(array: Array<T>, predicate: ListIterateeCustom<T, boolean>, attrs: Part<T>) => CollectionChain<T[]>
  upsert: <T>(array: Array<T>, doc: MergeId<T>) => CollectionChain<T>,
  removeById: <T>(array: Array<T>, id: string, attrs: Part<T>) => CollectionChain<T>,
  replaceById: <T>(array: Array<T>, id: string) => CollectionChain<T>,
  removeWhere: <T>(array: Array<T>, predicate: ListIterateeCustom<T, boolean>) => CollectionChain<T[]>,
}

declare const lodashId: TLodashId

export default lodashId
