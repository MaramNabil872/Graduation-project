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
                history.push("/admin");
            } else {
                console.log("Regular user login successful");
                // Redirect regular user to /home or another appropriate page
                history.push("/home");
            }
        } else {
            console.error("Login failed:", data.message);
            // Handle unsuccessful login here if needed
        }
    } catch (error) {
        console.error("Login failed:", error);
        // Additional error handling code
    }
};