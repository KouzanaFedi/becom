import { useSubscription } from "@apollo/client";
import { useState } from "react";
import { USER_CREATION_SUB } from "../api/auth";

const Notif = () => {
  const [users, setUsers] = useState([]);
  const { loading } = useSubscription(USER_CREATION_SUB, {
    shouldResubscribe: true,
    onSubscriptionData: ({
      subscriptionData: {
        data: {
          usersCreated: { name },
        },
      },
    }) => {
      setUsers([...users, name]);
    },
  });
  if (loading) return <div> listening for new users...</div>;
  else
    return (
      <ul>
        {users.map((item, index) => (
          <li key={index}>New user created : {item}</li>
        ))}
      </ul>
    );
};

export default Notif;
