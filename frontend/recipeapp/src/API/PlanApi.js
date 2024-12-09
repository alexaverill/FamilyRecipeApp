import { genericApiCall } from "./BaseApi";

export async function CreatePlan(eventObj) {
  let url = "/create-plan";
  return await genericApiCall(url, "POST", eventObj);
}
export async function GetPlans(eventObj) {
  let url = "/get-plans";
  return await genericApiCall(url, "POST", eventObj);
}
export async function GetPlan(planId) {
  let url = `/get-plan/${planId}`;
  return await genericApiCall(url, "GET", null);
}
