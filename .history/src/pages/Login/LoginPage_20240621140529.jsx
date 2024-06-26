import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Input from "../../components/Input/Input";
import Title from "../../components/Title/Title";
import './loginPage.css';
import Button from "../../components/Button/Button";
import { Link, useLocation, useHistory } from "react-router-dom";
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
            <div className="title-login">SIGN IN</div>
            <form onSubmit={handleSubmit(submit)} noValidate>
                <div className="form-group">
                    <Input
                        type="email"
                        className={`form-input noto-sans ${errors.email ? "input-error" : ""}`}
                        label="Email / Mobile No."
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: EMAIL,
                                message: "Invalid email address",
                            },
                        })}
                        error={errors.email}
                    />
                    {errors.email && <span className="error-message">{errors.email.message}</span>}
                </div>
                <div className="form-group">
                    <Input
                        className={`form-input noto-sans ${errors.password ? "input-error" : ""}`}
                        type="password"
                        label="Password"
                        {...register("password", {
                            required: "Password is required",
                        })}
                        error={errors.password}
                    />
                    {errors.password && <span className="error-message">{errors.password.message}</span>}
                </div>
                <div className="checkbox">
                    <input
                        className="checkMark"
                        type="checkbox"
                        name=""
                        id="checkbox"
                    />
                    <label className="LabelCheckbox" htmlFor="checkbox">
                        Keep Me Logged In
                    </label>
                </div>
                <button type="submit" className="submitBTN"> Login ➜</button>
                <div className="ForgPass noto-sans">
                    <Link to="/reset-password">Forget Password?</Link>
                    <p>------ Or ------</p>
                </div>
                <div className="ForgPass noto-sans">
                    New user? &nbsp;
                    <Link
                        to={`/register${returnUrl ? "?returnUrl=" + returnUrl : ""}`}
                    >
                        Register here
                    </Link>
                </div>
            </form>
        </div>
    );
}
