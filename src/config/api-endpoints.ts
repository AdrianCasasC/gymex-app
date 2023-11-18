const basicUrl: String = 'http://localhost:8080/';

export const API_ENDPOINTS = {
  routines: {
    basic: (userId: string) => basicUrl + `gymex/routines/${userId}`,
    byId: (userId: string, routineId: string) =>
      basicUrl + `gymex/routines/${userId}/${routineId}`,
  },
  weeks: {
    basic: (userId: string) => basicUrl + `gymex/weeks/${userId}`,
    byId: (userId: string, weekId: string) =>
      basicUrl + `gymex/weeks/${userId}/${weekId}`,
  },
};
