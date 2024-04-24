import IPAddress from "../../IPAddress";
const SessionServiceListner = {
    getCurrentSession: async () => {
      try {
        const response = await fetch(`http://${IPAddress}/api/Session/GetCurrentSession`);
        if (!response.ok) {
          throw new Error('Failed to fetch session');
        }
        return response;
      } catch (error) {
        throw new Error('Failed to fetch session');
      }
    }
  };
  
  export default SessionServiceListner;
  