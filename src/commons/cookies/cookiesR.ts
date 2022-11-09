import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const name = "cookies";

const cookiesSlice = createSlice({
  name,
  initialState: {},
  reducers: {
    rdxSetCookie(
      _,
      action: PayloadAction<{ name: string; value: string; expire: string }>
    ) {
      const now = new Date().getTime();
      const max = new Date(action.payload.expire).getTime();
      const temp = Math.floor((max - now) / 1000);
      document.cookie = `${action.payload.name}=${action.payload.value};max-age=${temp};path=/;`;
    },
    rdxRemoveCookie(_, action: PayloadAction<string>) {
      document.cookie = `${action.payload}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/;`;
    },
  },
});

export const { rdxSetCookie, rdxRemoveCookie } = cookiesSlice.actions;
export default cookiesSlice.reducer;
