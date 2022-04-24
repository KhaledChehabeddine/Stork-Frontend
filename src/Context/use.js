import { useContext } from 'react';
import { Data } from './context';

const useData = () => {
  return useContext(Data);
};

export { useData };
