import { ModelInit, MutableModel } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";

type EagerBody = {
  readonly companyName?: (CmpData | null)[] | null;
}

type LazyBody = {
  readonly companyName?: (CmpData | null)[] | null;
}

export declare type Body = LazyLoading extends LazyLoadingDisabled ? EagerBody : LazyBody

export declare const Body: (new (init: ModelInit<Body>) => Body)

type EagerCmpData = {
  readonly cmpName?: string | null;
  readonly messages?: (Chat | null)[] | null;
}

type LazyCmpData = {
  readonly cmpName?: string | null;
  readonly messages?: (Chat | null)[] | null;
}

export declare type CmpData = LazyLoading extends LazyLoadingDisabled ? EagerCmpData : LazyCmpData

export declare const CmpData: (new (init: ModelInit<CmpData>) => CmpData)

type EagerChat = {
  readonly message?: string | null;
  readonly time?: string | null;
}

type LazyChat = {
  readonly message?: string | null;
  readonly time?: string | null;
}

export declare type Chat = LazyLoading extends LazyLoadingDisabled ? EagerChat : LazyChat

export declare const Chat: (new (init: ModelInit<Chat>) => Chat)

type MessageMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type EagerMessage = {
  readonly id: string;
  readonly body?: (Body | null)[] | null;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyMessage = {
  readonly id: string;
  readonly body?: (Body | null)[] | null;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Message = LazyLoading extends LazyLoadingDisabled ? EagerMessage : LazyMessage

export declare const Message: (new (init: ModelInit<Message, MessageMetaData>) => Message) & {
  copyOf(source: Message, mutator: (draft: MutableModel<Message, MessageMetaData>) => MutableModel<Message, MessageMetaData> | void): Message;
}