import * as yup from 'yup';
import React, { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { API, Auth, withSSRContext, graphqlOperation, Amplify } from "aws-amplify";
import { listMessages } from "../src/graphql/queries";
import { createMessage,updateMessage } from "../src/graphql/mutations";
import Message from "../components/message";
import { onCreateMessage,onUpdateMessage } from "../src/graphql/subscriptions";
import { Observable } from './../node_modules/zen-observable-ts';
import { yupResolver } from '@hookform/resolvers/yup';
// import { of, Observable } from "rxjs"; 
import {
  FormProvider,
  SubmitHandler,
  useFieldArray,
  useForm,
  useFormContext,
} from 'react-hook-form';

import { GraphQLSubscription,GraphQLResult} from '@aws-amplify/api';
import {OnCreateMessageSubscription,UpdateMessageInput,UpdateMessageMutation} from '../src/API';

interface IFormInput {
  message?: string;
}
const schema = yup.object().shape({});

function Home({ messages }:any) {
  const [stateMessages, setStateMessages] = useState([...messages]);
  const [messageText, setMessageText] = useState("");
  const [user, setUser] = useState(null) as any;
  let [specMessages, setSpecMessages] = useState([]) as any;



  const methods = useForm<IFormInput>({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const amplifyUser = await Auth.currentAuthenticatedUser();
        setUser(amplifyUser);
      } catch (err) {
        setUser(null);
      }
    };
    fetchUser();
    
    // Subscribe to creation of message on crreate
    const subscription = API.graphql(
      graphqlOperation(onCreateMessage)
    ) as any;
   
    if('subscribe' in subscription)
    {
      subscription.subscribe({
      next: ({ provider, value }:any) => {
        setStateMessages((stateMessages) => [
          ...stateMessages,
          value.data.onCreateMessage,
        ]);
      },
    });
    } else 
    {
      console.log('bad')
    }
    
    // Subscribe to creation of message on update
        const subscriptionUpdate = API.graphql(
          graphqlOperation(onUpdateMessage)
        ) as any;
       
        if('subscribe' in subscriptionUpdate)
        {
          subscriptionUpdate.subscribe({
          next: ({ provider, value }:any) => {
            setStateMessages((stateMessages) => [
              ...stateMessages,
              value.data.onUpdateMessage,
            ]);
          },
        });
        } else 
        {
          console.log('bad')
        }
        
    // const pubSubClient = API.graphql(
    //   graphqlOperation(onCreateMessage)
    // ) as Observable<object>;
    // const subscription = pubSubClient.subscribe({
    //   next: (value: GraphQLResult<OnCreateMessageSubscription>) => {
    //     setStateMessages((stateMessages) => [
    //       ...stateMessages,
    //       value.data?.onCreateMessage,
    //     ]);
        
    //   },
    //   error: (error) => console.warn(error),
      
    // });
    // return () => {
    //   subscription.unsubscribe();
    // };
  }, []);
  
  // getMessages
  useEffect(() => {
     async function getMessages() {
      try {
        const messagesReq = await API.graphql({
          query: listMessages,
          authMode: "AMAZON_COGNITO_USER_POOLS",
        }) as any;
        setStateMessages([...messagesReq.data.listMessages.items]);
      } catch (error) {
        console.error(error);
      }
    }
    getMessages();
  },[user]);


  // getUniqueMessages
  const unique = [
    ...new Map(
      stateMessages.map((item: any) => [item['owner'], item]),
    ).values(),
  ];

  // getUniqueUsers
  const uniqueUsers = [
    ...new Map(
      stateMessages.map((item: any) => [item['owner'], item]),
    ).values(),
  ];

  const userNames = [] as any
  uniqueUsers.map(async (doc:any) => {
    userNames.push(doc.owner)
  })

  // setSpecMessages
  // useEffect(() => {
  //   unique.map((doc:any) => {
  //   if(doc.owner === user?.username)
  //   {
  //     doc.body.map((bd:any) => {
  //       if(bd.companyName === 'company2')
  //       {
  //         bd.messages.map(async (msg:any) => {
  //           try {
  //             specMessages.push(msg);
  //           } catch (error) {
  //            console.log(error) 
  //           }
          
  //         })
  //        }
  //     })
   
  //   }
  // })
  // },[])

  // onSubmit
  const onSubmit = async (data:any) => {
    // Prevent the page from reloading
    console.log(data)
    // event.preventDefault();
    // // clear the textbox
    setMessageText("");

    const input = {
      // id is auto populated by AWS Amplify
      owner: user?.username, 
      body: 
      [
        {
            companyName: 'company2',
            messages: 
            [
              {
                message: messageText,
                time: new Date()
              },
            ]
        }
      ]
    };

    // see if it exists
    try {
      if(userNames.includes(user?.username))
      {
        unique.map((doc:any) => {
          if(doc.owner === user?.username)
          {
            doc.body.map(async (bd:any) => {
              if(bd.companyName === 'company2')
              {
                // take the update outside the map bd.messages.map ? an IDEA
                bd.messages.map((msg:any) => {
                  specMessages.push(msg);
               
                  // specMessages = updateCandidatePost?.data?.updateMessage?.body[0].messages
                  // console.log(specMessages)
                })
                const message = messageText ? messageText : null;
                const updateMessageInput: UpdateMessageInput = {
                  id: doc?.id,
                  body:
                    [
                      {
                        companyName: 'company2',
                        messages: [{message, time:new Date()}, ...specMessages]
                      }
                    ]
                };
             
                // const updateCandidatePost = (await API.graphql({
                  await API.graphql({
                    query: updateMessage,
                    variables: { input: updateMessageInput },
                    authMode: "AMAZON_COGNITO_USER_POOLS",
                  });
                  console.log(...specMessages)
                  setSpecMessages([])
                  console.log(specMessages)
               }
            })
         
          }
        })
        
      }
      else {
        await API.graphql({
            authMode: "AMAZON_COGNITO_USER_POOLS",
            query: createMessage,
            variables: {
              input: input,
            },
        }) as any;
      }
    } catch (error) {
      console.log(error)
    }
    //  // Try make the mutation to graphql API
    // try {
    //       await API.graphql({
    //       authMode: "AMAZON_COGNITO_USER_POOLS",
    //       query: createMessage,
    //       variables: {
    //         input: input,
    //       },
    //     }) as any;
    //   } catch (err) {
    //     console.error(err);
    //   }
  };

//  console.log('stateMessages:',stateMessages);
console.log('unique',unique);
console.log('stateMessage', stateMessages)

  if (user) {
    return (
      <div className={styles.background}>
        <div className={styles.container}>
          <h1 className={styles.title}> AWS Amplify Live Chat</h1>
          <div className={styles.chatbox}>
            {unique
              // sort messages oldest to newest client-side
              .map((message:any) => (
                // map each message into the message component with message as props
                <Message
                  // message={message.body.companyName.messages.message}
                  test={message}
                  user={user}
                  isMe={user.username === message?.owner}
                  key={message?.id}
                />
              ))}
          </div>
          <div className={styles.formContainer}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <input
              {...methods.register('message')}
                type="text"
                name="message"
                id="message"
                autoFocus
                required
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="💬 Send a message to the world 🌎"
                className={styles.textBox}
              />
              <br/>

             <br/>
              <button style={{ marginLeft: "8px"}} className="ml-2">Send</button>
            </form>
            <a href="https://www.youtube.com/watch?v=g2kMOr3d084">Youtube</a>
          </div>
        </div>
      </div>
    );
  } else {
    return <p>Loading...</p>;
  }
}

export default withAuthenticator(Home);

export async function getServerSideProps({ req }:any) {
  // wrap the request in a withSSRContext to use Amplify functionality serverside.
  const SSR = withSSRContext({ req });

  try {
    // currentAuthenticatedUser() will throw an error if the user is not signed in.
    const user = await SSR.Auth.currentAuthenticatedUser();

    // If we make it passed the above line, that means the user is signed in.
    const response = await SSR.API.graphql({
      query: listMessages,
      // use authMode: AMAZON_COGNITO_USER_POOLS to make a request on the current user's behalf
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });

    // return all the messages from the dynamoDB
    return {
      props: {
        messages: response.data.listMessages.items,
      },
    };
  } catch (error) {
    // We will end up here if there is no user signed in.
    // We'll just return a list of empty messages.
    return {
      props: {
        messages: [],
      },
    };
  }
}