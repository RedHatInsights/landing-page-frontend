import { useEffect, useState } from 'react';

const useLoaded = (loader: () => Promise<void>) => {
  const [isLoaded, setLoaded] = useState(false);
  useEffect(() => {
    (async () => {
      await loader();
      setLoaded(true);
    })();
  }, []);

  return isLoaded;
};

export default useLoaded;
