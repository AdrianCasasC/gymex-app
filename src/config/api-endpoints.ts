const basicUrl: string = 'https://54.229.117.137/';
//const basicUrl: string = 'https://b0shmpr0-8080.uks1.devtunnels.ms/';

export const API_ENDPOINTS = {
  routines: {
    basic: (userId: string) => basicUrl + `gymex/routines/${userId}`,
    associate: (userId: string, dayId: string) =>
      basicUrl + `gymex/${userId}/routines/associate/${dayId}`,
    desAssociate: (userId: string, dayId: string) =>
      basicUrl + `gymex/${userId}/routines/desassociate/${dayId}`,
    byId: (userId: string, routineId: string) =>
      basicUrl + `gymex/routines/${userId}/${routineId}`,
  },
  weeks: {
    basic: (userId: string) => basicUrl + `gymex/weeks/${userId}`,
    byId: (userId: string, weekId: string) =>
      basicUrl + `gymex/weeks/${userId}/${weekId}`,
  },
  user: {
    basic: () => basicUrl + 'gymex/user/register',
    byNameAndPwd: (name: string, password: string) =>
      basicUrl + `gymex/user/${name}/${password}`,
  },
};
