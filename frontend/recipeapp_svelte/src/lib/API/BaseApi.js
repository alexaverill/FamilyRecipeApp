import { fetchAuthSession } from "aws-amplify/auth";

export async function genericApiCall(url, method, data) {
  console.log(url);
  let session = await fetchAuthSession();
  let token = session.tokens.accessToken.toString();
  if (method == "GET" || method == "DELETE") {
    let requestUrl = import.meta.env.VITE_API_URL + url;
    return await fetch(requestUrl, {
      method: method,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "=application/json",
      },

      mode: "cors",
    })
      .then((response) => response.json())
      .then((data) => data)
      .catch((err) => {
        console.log(err.message);
        return;
      });
  }
  return await fetch(import.meta.env.VITE_API_URL + url, {
    method: method,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .catch((err) => {
      console.log(err);
      console.log(err.message);
    });
}
export async function GetUsers() {
  return await genericApiCall("/get-users", "GET", null);
}
