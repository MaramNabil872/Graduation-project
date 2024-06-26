import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Input from "../../components/Input/Input";
import Title from "../../components/Title/Title";
import './loginPage.css';
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";
import { useLocation, useHistory } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { EMAIL } from "../../constants/patterns";
import axios from "axios";
import { login } from "../../services/userService";

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
            const data = await login(email, password);
            console.log("Login successful");
            // Additional code after successful login
        } catch (error) {
            console.error("Login failed:", error);
            // Additional error handling code
        }
    };
    return (
        <div className="container">
            <h1 className="pt-serif-bold h1">SIGN IN</h1>
                <form onSubmit={handleSubmit(submit)} noValidate>
                    <div class="form-group">
                        <label for="Email" className="form-label noto-sans">
                            Email / Mobile No.
                        </label>
                        <input
                            type="email"
                            className="form-input noto-sans"
                            label="Email"
                            {...register("email", {
                                required: true,
                                pattern: EMAIL,
                            })}
                            error={errors.email}
                        ></input>
                    </div>
                    <div className="form-group ">
                        <label for="password" className="form-label noto-sans">
                            Password
                        </label>
                        <input
                            className="form-input noto-sans"
                            type="password"
                            label="Password"
                            {...register("password", {
                                required: true,
                            })}
                            error={errors.password}
                        ></input>
                    </div>
                    <div className="checkbox">
                        <input
                            className="checkMark"
                            type="checkbox"
                            name=""
                            id=""
                        />

                        <label className="LabelCheckbox " for="checkbox">
                            Keep Me Logged In
                        </label>
                    </div>
                    <button type="submit" text="Login ➜" className="submitBTN" ></button>

                    <div className="ForgPass noto-sans">
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
    );
}
