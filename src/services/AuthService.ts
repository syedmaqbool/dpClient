import axios from "axios";
import {
  UserLoginDTO,
  UserLoginResponse,
} from "../interfaces/AuthServiceInterface";
import { Nullable } from "../interfaces/CommonInterface";
import { promiseHandler } from "../utilities/PromiseHandler";
import { API_PATS, COMBINED } from "./API_PATHS";

export async function userLogin(
  data: UserLoginDTO
): Promise<Nullable<UserLoginResponse>> {
  const promise = axios.post(COMBINED(API_PATS.USER_LOGIN), data);
  const [result, error] = await promiseHandler(promise);
  if (result) {
    return result.data;
  }
  console.error("error", error);
  return null;
}
