import { ApiRsp } from "@/types";

export const buildJsonRsp = ({ data, message, statusCode }: ApiRsp): ApiRsp => {
  return { data, message, statusCode };
};
