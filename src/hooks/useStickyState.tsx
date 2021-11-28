import React from 'react';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useStickyState = (defaultValue:any, key: string):any => {
  const [value, setValue] = React.useState(() => {
    const stickyValue = window.localStorage.getItem(key);
    return stickyValue !== null
      ? JSON.parse(stickyValue)
      : defaultValue;
  });
  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
};

export default useStickyState;
