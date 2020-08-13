export const loadState = () => {
  try {
    const serializableState = sessionStorage.getItem("state");
    if (serializableState === null) {
      return undefined;
    }
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = state.jwtToken;
    console.log(serializedState);
    sessionStorage.setItem("jwtToken", serializedState);
  } catch (err) {
    console.log(err);
  }
};
