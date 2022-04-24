import { useContext } from 'react';
import { Data } from './Context';

const useData = () => {
  return useContext(Data);
};

export { useData };
