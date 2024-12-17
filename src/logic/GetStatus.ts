import data from './getStatus.json';

const GetStatus = async (): Promise<any> => {
  return new Promise((resolve) => {
    resolve(data as any);
  });
};

export default GetStatus;

