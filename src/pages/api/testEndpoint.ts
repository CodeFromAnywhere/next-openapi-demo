import { Endpoint, makeEndpoint } from "@/api-util";

export const testEndpoint: Endpoint<"testEndpoint"> = async (context) => {
  return {
    isSuccessful: true,
  };
};

export default makeEndpoint(testEndpoint);
