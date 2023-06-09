import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { url } from "../enviroment";

import { useForm } from "react-hook-form";
import axios from "axios";

export default function SignUp() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data, reset) => {
    try {
      const addRes = await axios.post(`${url}/signup`, { ...data });
      console.log("Signup..Axios......", addRes?.data);
      reset();
      navigate("/login");
    } catch (error) {
      console.log(error?.response?.data);
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
            Signup
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
              <label style={{ width: "100% !important", textAlign: "left" }}>
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
              {errors?.name?.type === "required" && <p>Name is required</p>}
              {errors?.name?.type === "pattern" && (
                <p>Alphabetical characters only</p>
              )}
              <br />
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
              {errors?.email?.type === "required" && <p>email is required</p>}
              {errors?.email?.type === "pattern" && (
                <p>email Pattren isn't correct</p>
              )}
              <br />
              <label style={{ width: "100% !important", textAlign: "left" }}>
                password
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
              {errors?.password?.type === "required" && (
                <p>password is required</p>
              )}
              {errors?.password?.type === "pattern" && (
                <p>password Pattren isn't correct</p>
              )}
              <br />
              <input type="submit" />
            </form>
          </Box>
        </Container>
      </Box>
    </>
  );
}
