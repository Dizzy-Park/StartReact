import { Button } from "@material-ui/core";
import React from "react";
import useUser from "../store/modules/user/userHook";

const UserPage: React.FC = () => {
  const { logout } = useUser();
  return (
    <>
      test router
      <Button onClick={() => logout()}>home</Button>
    </>
  );
};
export default UserPage;
