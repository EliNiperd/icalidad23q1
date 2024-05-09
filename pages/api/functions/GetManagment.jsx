import { useMySWR } from './useMySWR';

export const GetManagment = (url) => {
  const { data, ...rest } = useMySWR(url);

  if (!data) {
    return { registro: [], ...rest };
  }

  return { registro: data.recordset, ...rest };
};
