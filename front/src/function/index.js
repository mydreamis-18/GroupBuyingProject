export function saveNewAccessTokenFn(newAccessToken) {
  //
  if (newAccessToken !== undefined) {
    //
    sessionStorage.setItem("access_token", newAccessToken);
  }
}
