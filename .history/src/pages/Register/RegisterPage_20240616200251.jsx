import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Input from "../../components/Input/Input";
import Title from "../../components/Title/Title";
import classes from "./registerPage.module.css";
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";
import { useLocation, useHistory } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { EMAIL } from "../../constants/patterns";
import { register as registerUser } from "../../services/userService";

export default function RegisterPage() {
    const auth = useAuth();
    const history = useHistory();
    const location = useLocation();
    const returnUrl = new URLSearchParams(location.search).get("returnUrl");

    useEffect(() => {
        if (!auth) return;

        if (auth.user) {
            returnUrl ? history.push(returnUrl) : history.push("/");
        }
    }, [auth, returnUrl, history]);

    const {
        handleSubmit,
        register, // This register is from react-hook-form
        getValues,
        formState: { errors },
    } = useForm();

    const submit = async (registerData) => {
        console.log("Submit Register clicked");
history.
        // Destructure confirmPassword from registerData
        const { confirmPassword, ...userData } = registerData;

        try {
            const data = await registerUser(userData); // Send only the userData without confirmPassword
            console.log("Registration successful", data);
        } catch (error) {
            console.error("Registration failed", error);
        }
    };

    return (
        <div className={classes.container}>
            <div className={classes.details}>
                <Title title="Register" />
                <form onSubmit={handleSubmit(submit)} noValidate>
                    <Input
                        type="text"
                        label="first Name"
                        {...register("first_name", {
                            required: true,
                            minLength: 1,
                        })}
                        error={errors.first_name}
                    />
                    <Input
                        type="text"
                        label="last Name"
                        {...register("last_name", {
                            required: true,
                            minLength: 1,
                        })}
                        error={errors.last_name}
                    />
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
                        type="tel"
                        label="Phone Number"
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
                        type="password"
                        label="Password"
                        {...register("password", {
                            required: true,
                            minLength: 7,
                        })}
                        error={errors.password}
                    />
                    <Input
                        type="password"
                        label="Confirm Password"
                        {...register("confirmPassword", {
                            required: true,
                            validate: (value) =>
                                value !== getValues("password")
                                    ? "Passwords Do No Match"
                                    : true,
                        })}
                        error={errors.confirmPassword}
                    />
                    <Button type="submit" text="Register" />
                    <div className={classes.login}>
                        Already a user? &nbsp;
                        <Link
                            to={`/login${
                                returnUrl ? "?returnUrl=" + returnUrl : ""
                            }`}
                        >
                            Login here
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
