// Import the React JS packages
import React, { useEffect, useState } from "react";
import axios from "axios";

// Define the Home component
export const Home = () => {
    // State to hold the message
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Check if access token exists in local storage
        if (localStorage.getItem('access_token') === null) {
            // Redirect to login page if access token does not exist
            window.location.href = '/login';
        } else {
            // If access token exists, fetch data from server
            (async () => {
                try {
                    const { data } = await axios.get(
                        'http://localhost:8000/home/', {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                        }
                    });
                    console.log()
                    // Set the message state with the received data
                    setMessage(data.message);
                } catch (e) {
                    // Handle error if not authorized
                    console.log('not auth');
                }
            })();
        }
    }, []); // Run only on component mount

    // Render the component
    return (
        <div className="form-signin mt-5 text-center">
            <h3>Hi {message}</h3>
        </div>
    );
};
