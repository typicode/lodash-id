import { ListIterateeCustom, CollectionChain, ObjectChain, StringChain } from 'lodash';

type Part<T> = Partial<T>

type MergeId<T> = T & { id?: string }

declare module "lodash" {
  interface LoDashStatic extends TLodashId {}
  interface CollectionChain<T> {
    getById(id: string): ObjectChain<T>;
    createId<T>(doc: T): StringChain;
    upsert(doc: MergeId<T>): ObjectChain<T>;
    insert(doc: T): ObjectChain<T>;
    updateById(id: string, attrs: Part<T>): ObjectChain<T>;
    updateWhere(predicate: ListIterateeCustom<T, boolean>, attrs: Part<T>): CollectionChain<T[]>;
    replaceById(id: string, attrs: Part<T>): ObjectChain<T>;
    removeById(id: string): ObjectChain<T>;
    removeWhere(predicate: ListIterateeCustom<T, boolean>): CollectionChain<T[]>;
  }
}

type TLodashId = {
  id: string;
  getById: <T>(array: Array<T>, id: string) => ObjectChain<T>,
  createId: <T>(array: Array<T>, doc: T) => StringChain,
  insert: <T>(array: Array<T>, doc: T) => ObjectChain<T>,
  updateById: <T>(array: Array<T>, id: string, attrs: Part<T>) => ObjectChain<T>,
  updateWhere: <T>(array: Array<T>, predicate: ListIterateeCustom<T, boolean>, attrs: Part<T>) => CollectionChain<T[]>
  upsert: <T>(array: Array<T>, doc: MergeId<T>) => ObjectChain<T>,
  removeById: <T>(array: Array<T>, id: string, attrs: Part<T>) => ObjectChain<T>,
  replaceById: <T>(array: Array<T>, id: string) => ObjectChain<T>,
  removeWhere: <T>(array: Array<T>, predicate: ListIterateeCustom<T, boolean>) => CollectionChain<T[]>,
}

declare const lodashId: Omit<TLodashId, 'id'>

export default lodashId
