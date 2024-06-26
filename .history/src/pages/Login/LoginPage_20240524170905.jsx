import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../../components/Input/Input";
import Title from "../../components/Title/Title";
import classes from "./loginPage.module.css";
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";
import { useLocation, useHistory } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { EMAIL } from "../../constants/patterns";
import { toast } from 'react-toastify';

export default function LoginPage() {
    const auth = useAuth();
    const history = useHistory();
    const location = useLocation();
    const returnUrl = new URLSearchParams(location.search).get("returnUrl");

    useEffect(() => {
        if (auth && auth.user) {
            returnUrl ? history.push(returnUrl) : history.push("/");
        }
    }, [auth, returnUrl, history]);

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();

    const submit = async ({ email, password }) => {
        console.log("Submit button clicked");
        try {
            await auth.login(email, password);
            toast.success('Login Successful');
        } catch (err) {
            toast.error(err.response?.data || 'Login failed');
        }
    };

    return (
        <div className="">
            <div className="">
                <Title title="Login" />
                <form
                    onSubmit={handleSubmit(submit)}
                    noValidate
                    className="mx-7"
                >
                    <Input
                        type="email"
                        label="Email"
                        {...register("email", {
                            required: true,
                            pattern: EMAIL,
                        })}
                        error={errors.email}
                    />

                    <Input
                        type="password"
                        label="Password"
                        {...register("password", {
                            required: true,
                        })}
                        error={errors.password}
                    />

                    <Button type="submit" text="Login" />

                    <div className={classes.register}>
                        New user? &nbsp;
                        <Link
                            to={`/register${
                                returnUrl ? "?returnUrl=" + returnUrl : ""
                            }`}
                        >
                            Register here
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
