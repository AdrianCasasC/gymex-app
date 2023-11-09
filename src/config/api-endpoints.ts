const basicUrl: String = 'http://localhost:8080/';

export const API_ENDPOINTS = {
  routines: (userId: string) => basicUrl + `gymex/routines/${userId}`,
  weeks: {
    basic: (userId: string) => basicUrl + `gymex/weeks/${userId}`,
    byId: (userId: string, weekId: string) =>
      basicUrl + `gymex/weeks/${userId}/${weekId}`,
  },
};
