import { Endpoint, makeEndpoint } from "@/api-util";

export const testEndpoint: Endpoint<"testEndpoint"> = async (context) => {
  const { a, b } = context;
  return {
    a,
    b,
    isSuccessful: true,
  };
};

export default makeEndpoint(testEndpoint);
