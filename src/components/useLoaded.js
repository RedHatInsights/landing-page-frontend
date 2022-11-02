import { useEffect, useState } from 'react';

const useLoaded = (loader) => {
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
