import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabasePublicKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabasePublicKey);

const Success = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    async function userData() {
      await supabase.auth.getUser().then((x) => {
        if (x.data?.user) {
          setUser(x.data?.user);
          let item = localStorage.getItem("sb-tobqgdswgannjhgugrmf-auth-token");
          let parsedItem = JSON.parse(item);
          console.log("parsedItem", parsedItem);
          let accessToken = parsedItem["access_token"];
          console.log("accesstoken", accessToken);
          setToken(accessToken);
        }
      });
    }
    userData();
  }, []);

  async function logOut() {
    await supabase.auth.signOut();
    navigate("/login");
  }
  return (
    <>
      {Object.keys(user).length != 0 ? (
        <>
          <h1>Success</h1>
          <button onClick={logOut}>LogOut</button>
        </>
      ) : (
        <>
          <h1>user is not logged in</h1>
          <button
            onClick={() => {
              navigate("/");
            }}
          >
            Go back to home
          </button>
        </>
      )}
    </>
  );
};

export default Success;
