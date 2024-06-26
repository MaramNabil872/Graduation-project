import React from "react";
import { useForm } from "react-hook-form";
import Input from "../../components/Input/Input";
import './loginPage.css';
import Button from "../../components/Button/Button";
import { Link, useHistory } from "react-router-dom";
import { EMAIL } from "../../constants/patterns";
import axios from "axios";
import Swal from "sweetalert2"; // Import Swal

export default function LoginPage() {
    const history = useHistory();

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();

    const submit = async ({ email, password }) => {
        console.log("Submit button clicked");
        try {
            const response = await axios.post('http://localhost:5000/api/login', { email, password });
            const data = response.data;
            console.log("Login response:", data);

            if (response.status === 200) {
                // Check if the logged-in user is the admin
                if (email === 'mariam2412@gmail.com' && password === '12345678') {
                    console.log("Admin login successful");
                    // Redirect to admin dashboard or specific admin page
                    history.push("/home");
                } else {
                    console.log("Regular user login successful");
                    // Redirect regular user to /home or another appropriate page
                    history.push("/home");
                }
            } else {
                console.error("Login failed:", data.message);
                // Handle unsuccessful login here if needed
                Swal.fire({
                    title: "Login failed",
                    text: "Invalid email or password. Please try again.",
                    icon: "error",
                    confirmButtonText: "OK"
                });
            }
        } catch (error) {
            console.error("Login failed:", error);
            // Display Swal alert for user without account
            if (error.response && error.response.status === 404) {
                Swal.fire({
                    title: "No Account Found",
                    text: "The provided email does not match any account. Please register.",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Register",
                    cancelButtonText: "Cancel"
                }).then((result) => {
                    if (result.isConfirmed) {
                        history.push("/register");
                    }
                });
            } else {
                Swal.fire({
                    title: "Login failed",
                    text: "Something went wrong. Please try again.",
                    icon: "error",
                    confirmButtonText: "OK"
                });
            }
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
                    <Link to="/register">
                        Register here
                    </Link>
                </div>
            </form>
        </div>
    );
}