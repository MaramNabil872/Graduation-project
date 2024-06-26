import { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from 'axios';
import Input from "../../components/Input/Input";
import Title from "../../components/Title/Title";
import "./registerPage.css";
import Button from "../../components/Button/Button";
import { Link, useHistory } from "react-router-dom";
import Swal from 'sweetalert2';
import { EMAIL } from "../../constants/patterns";

export default function RegisterPage() {
    const history = useHistory();

    const {
        handleSubmit,
        register,
        getValues,
        formState: { errors },
    } = useForm();

    const submit = async (registerData) => {
        const { confirmPassword, ...userData } = registerData;

        try {
            const { data } = await axios.post('http://localhost:5000/api/register', userData);
            history.push("/otp-verification", { email: userData.email });
        } catch (error) {
            if (error.response && error.response.status === 409) {
                Swal.fire({
                    title: 'Error',
                    text: 'This email is already registered.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            } else {
                console.error("Registration failed", error);
                Swal.fire({
                    title: 'Error',
                    text: 'Registration failed. Please try again.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        }
    };

    return (
        <div className="container">
            <h1 className="title-login">Register</h1>
          
            <form onSubmit={handleSubmit(submit)} noValidate>
                <Input
                    type="text"
                    className="form-input noto-sans"
                    label="First Name"
                    {...register("first_name", {
                        required: true,
                        minLength: 1,
                    })}
                    error={errors.first_name}
                />
                <Input
                    type="text"
                    className="form-input noto-sans"
                    label="Last Name"
                    {...register("last_name", { required: true, minLength: 1 })}
                    error={errors.last_name}
                />
                <Input
                    type="email"
                    label="Email"
                    className="form-input noto-sans"
                    {...register("email", { required: true, pattern: EMAIL })}
                    error={errors.email}
                />
                <Input
                    type="tel"
                    label="Phone Number"
                    className="form-input noto-sans"
                    {...register("phone_number", {
                        required: true,
                        pattern: {
                            value: /^[0-9()-\s]+$/,
                            message: "Please enter a valid phone number",
                        },
                    })}
                    error={errors.phone_number}
                />
                <Input
                    type="text"
                    className="form-input noto-sans"
                    label="Address"
                    {...register("address", { required: true, minLength: 5 })}
                    error={errors.address}
                />
                <Input
                    type="password"
                    className="form-input noto-sans"
                    label="Password"
                    {...register("password", { required: true, minLength: 7 })}
                    error={errors.password}
                />
                <Input
                    type="password"
                    label="Confirm Password"
                    className="form-input noto-sans"
                    {...register("confirmPassword", {
                        required: true,
                        validate: (value) =>
                            value === getValues("password") ||
                            "Passwords do not match",
                    })}
                    error={errors.confirmPassword}
                />
                <button type="submit" className="submitBTN"> Register ➜</button>
                <div className="ForgPass">
                    Already a user? <Link to="/login">Login here</Link>
                </div>
            </form>
        </div>
    );
}
