import React, { useContext } from "react";
import { Box, Container, Typography } from "@mui/material";

import { url } from "../enviroment";

import { useForm } from "react-hook-form";
import axios from "axios";
import { DataContext } from "../utils/ContextApi";

export default function Login() {
  const { handleLoggedIn } = useContext(DataContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data, reset) => {
    // const form = new FormData();
    // form.append("Name", data.Name);
    // form.append("Contact", data.Contact);
    // form.append("Email", data.Email);
    // form.append("File", data.File[0]); //For Single File
    // for (let i = 0; i < data.File.length; i++) {
    //   form.append("File", data.File[i]); //for Multiple Files
    // }
    // post request
    try {
      const addRes = await axios.post(`${url}/login`, data);
      console.log("Login..Axios......", addRes?.data);
      // Update session storage
      sessionStorage.setItem("jwt-token", addRes?.data);
      alert("Login Successfully");
      reset();
      handleLoggedIn();
    } catch (error) {
      alert(error?.response?.data);
    }
  };

  return (
    <>
      <Box my={10}>
        <Container maxWidth="lg">
          <Typography
            sx={{
              color: "#000",
              fontSize: { xs: "20px", sm: "32px", md: "42px" },
              //   fontWeight: 700,
              textAlign: "center",
              borderBottom: "2px solid #000",
            }}
          >
            Login
          </Typography>
          <Box
            p={{ xs: 2, md: 5 }}
            mt={1}
            sx={{
              boxShadow: "0px 0px 10px 1px  #000",
              textAlign: "center",
            }}
          >
            <form
              onSubmit={handleSubmit((data) => {
                onSubmit(data, reset);
              })}
            >
              {/* <label style={{ width: "100% !important", textAlign: "left" }}>
                Name
              </label>
              <br />
              <input
                style={{
                  width: "95%",
                  fontSize: "18px",
                  outline: "none",
                  padding: "5px",
                  BorderRadius: "15px",
                }}
                {...register("name", {
                  required: true,
                  pattern: /^[A-Za-z]+$/i,
                })}
              />
              <br />
              {errors?.Name?.type === "required" && <p>Name is required</p>}
              {errors?.Name?.type === "pattern" && (
                <p>Alphabetical characters only</p>
              )}
              <br /> */}
              <label style={{ width: "100% !important", textAlign: "left" }}>
                Email
              </label>
              <br />
              <input
                style={{
                  width: "95%",
                  fontSize: "18px",
                  outline: "none",
                  padding: "5px",
                  BorderRadius: "15px",
                }}
                {...register("email", {
                  required: true,
                  pattern: /[a-zA-Z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,3}$/,
                })}
              />
              <br />
              {errors?.Email?.type === "required" && <p>Email is required</p>}
              {errors?.Email?.type === "pattern" && (
                <p>Email Pattren isn't correct</p>
              )}
              <br />
              <label style={{ width: "100% !important", textAlign: "left" }}>
                Password
              </label>
              <br />
              <input
                style={{
                  width: "95%",
                  fontSize: "18px",
                  outline: "none",
                  padding: "5px",
                  BorderRadius: "15px",
                }}
                {...register("password", {
                  required: true,
                  pattern: /^[A-Za-z]\w{7,14}$/,
                })}
              />
              <br />
              {errors?.Password?.type === "required" && (
                <p>Password is required</p>
              )}
              {errors?.Password?.type === "pattern" && (
                <p>Password Pattren isn't correct</p>
              )}

              {/* <input
                type="file"
                {...register("File")}
                multiple
                style={{
                  width: "95%",
                  fontSize: "18px",
                  outline: "none",
                  padding: "5px",
                  BorderRadius: "15px",
                }}
              /> */}
              <br />
              <input type="submit" />
            </form>
          </Box>
        </Container>
      </Box>
    </>
  );
}
