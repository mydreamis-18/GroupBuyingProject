export function forVerifyTokensFn(getState) {
  //
  const { userNum } = getState().user_reducer;
  const { access_token, refresh_token } = sessionStorage;
  //
  return { userNum, access_token, refresh_token };
}
export function ReLoginFn(isSuccess, logoutActionFn, toLoginPageFn) {
  //
  if (!isSuccess) {
    //
    logoutActionFn();
    toLoginPageFn();
  }
}
export function saveNewAccessTokenFn(newAccessToken) {
  //
  if (newAccessToken !== undefined) {
    //
    sessionStorage.setItem("access_token", newAccessToken);
  }
}
