import { useState } from 'react';
import useLoaded from './useLoaded';

const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState({});

  const isLoaded = useLoaded(async () => {
    const { identity } = await insights.chrome.auth.getUser();
    setCurrentUser(identity.user);
  });

  return {
    isLoaded,
    currentUser,
  };
};

export default useCurrentUser;
