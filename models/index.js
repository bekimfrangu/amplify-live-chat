// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Message, Body, CmpData, Chat } = initSchema(schema);

export {
  Message,
  Body,
  CmpData,
  Chat
};