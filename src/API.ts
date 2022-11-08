/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateMessageInput = {
  id?: string | null,
  body?: Array< BodyInput | null > | null,
  owner?: string | null,
};

export type BodyInput = {
  companyName?: string | null,
  messages?: Array< ChatInput | null > | null,
};

export type ChatInput = {
  message?: string | null,
  time?: string | null,
};

export type ModelMessageConditionInput = {
  owner?: ModelStringInput | null,
  and?: Array< ModelMessageConditionInput | null > | null,
  or?: Array< ModelMessageConditionInput | null > | null,
  not?: ModelMessageConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type Message = {
  __typename: "Message",
  id: string,
  body?:  Array<Body | null > | null,
  owner?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type Body = {
  __typename: "Body",
  companyName?: string | null,
  messages?:  Array<Chat | null > | null,
};

export type Chat = {
  __typename: "Chat",
  message?: string | null,
  time?: string | null,
};

export type UpdateMessageInput = {
  id: string,
  body?: Array< BodyInput | null > | null,
  owner?: string | null,
};

export type DeleteMessageInput = {
  id: string,
};

export type ModelMessageFilterInput = {
  id?: ModelIDInput | null,
  owner?: ModelStringInput | null,
  and?: Array< ModelMessageFilterInput | null > | null,
  or?: Array< ModelMessageFilterInput | null > | null,
  not?: ModelMessageFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelMessageConnection = {
  __typename: "ModelMessageConnection",
  items:  Array<Message | null >,
  nextToken?: string | null,
};

export type CreateMessageMutationVariables = {
  input: CreateMessageInput,
  condition?: ModelMessageConditionInput | null,
};

export type CreateMessageMutation = {
  createMessage?:  {
    __typename: "Message",
    id: string,
    body?:  Array< {
      __typename: "Body",
      companyName?: string | null,
      messages?:  Array< {
        __typename: "Chat",
        message?: string | null,
        time?: string | null,
      } | null > | null,
    } | null > | null,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateMessageMutationVariables = {
  input: UpdateMessageInput,
  condition?: ModelMessageConditionInput | null,
};

export type UpdateMessageMutation = {
  updateMessage?:  {
    __typename: "Message",
    id: string,
    body?:  Array< {
      __typename: "Body",
      companyName?: string | null,
      messages?:  Array< {
        __typename: "Chat",
        message?: string | null,
        time?: string | null,
      } | null > | null,
    } | null > | null,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteMessageMutationVariables = {
  input: DeleteMessageInput,
  condition?: ModelMessageConditionInput | null,
};

export type DeleteMessageMutation = {
  deleteMessage?:  {
    __typename: "Message",
    id: string,
    body?:  Array< {
      __typename: "Body",
      companyName?: string | null,
      messages?:  Array< {
        __typename: "Chat",
        message?: string | null,
        time?: string | null,
      } | null > | null,
    } | null > | null,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetMessageQueryVariables = {
  id: string,
};

export type GetMessageQuery = {
  getMessage?:  {
    __typename: "Message",
    id: string,
    body?:  Array< {
      __typename: "Body",
      companyName?: string | null,
      messages?:  Array< {
        __typename: "Chat",
        message?: string | null,
        time?: string | null,
      } | null > | null,
    } | null > | null,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListMessagesQueryVariables = {
  filter?: ModelMessageFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListMessagesQuery = {
  listMessages?:  {
    __typename: "ModelMessageConnection",
    items:  Array< {
      __typename: "Message",
      id: string,
      body?:  Array< {
        __typename: "Body",
        companyName?: string | null,
        messages?:  Array< {
          __typename: "Chat",
          message?: string | null,
          time?: string | null,
        } | null > | null,
      } | null > | null,
      owner?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateMessageSubscriptionVariables = {
  owner?: string | null,
};

export type OnCreateMessageSubscription = {
  onCreateMessage?:  {
    __typename: "Message",
    id: string,
    body?:  Array< {
      __typename: "Body",
      companyName?: string | null,
      messages?:  Array< {
        __typename: "Chat",
        message?: string | null,
        time?: string | null,
      } | null > | null,
    } | null > | null,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateMessageSubscriptionVariables = {
  owner?: string | null,
};

export type OnUpdateMessageSubscription = {
  onUpdateMessage?:  {
    __typename: "Message",
    id: string,
    body?:  Array< {
      __typename: "Body",
      companyName?: string | null,
      messages?:  Array< {
        __typename: "Chat",
        message?: string | null,
        time?: string | null,
      } | null > | null,
    } | null > | null,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteMessageSubscriptionVariables = {
  owner?: string | null,
};

export type OnDeleteMessageSubscription = {
  onDeleteMessage?:  {
    __typename: "Message",
    id: string,
    body?:  Array< {
      __typename: "Body",
      companyName?: string | null,
      messages?:  Array< {
        __typename: "Chat",
        message?: string | null,
        time?: string | null,
      } | null > | null,
    } | null > | null,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};
