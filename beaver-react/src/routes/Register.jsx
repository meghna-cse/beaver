import {NavLink, useNavigate} from "react-router-dom";
import {useState} from "react";
import {postRequest} from "../api/api";

export default function Register(){
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        username: "",
        email: "",
        mobile_number: "",
        identification_number: "",
        password: "",
        role_id: "",
    });

    const handleInputChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    }


    const handleSubmit = async (event) => {
        event.preventDefault();

        // convert formData to json string
        const data = JSON.stringify(formData);

        try {
            // make api call to register
            const response = await postRequest('/register.php', data);
            
            console.log(response)
            alert("Registration successful");
            // navigate to login page
            navigate(`/login`);
        }catch (e) {
            if (e.response.status === 400) {
                alert(e.response.data.message);
            }else{
                alert("Something went wrong");
                // alert(e.data.message);
            }
        }

    }
    return (
        <div className="container">
            <div className="login-container">
                <h2>Register</h2>
                <form id="login-form">
                    <div className="input-group">
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" name="name" value={formData.name}
                               onChange={handleInputChange} required/>
                    </div>
                    <div className="input-group">
                        <label htmlFor="username">Username:</label>
                        <input type="text" id="username" name="username" value={formData.username}
                               onChange={handleInputChange} required/>
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required/>
                    </div>
                    <div className="input-group">
                        <label htmlFor="mobile_number">Mobile Number:</label>
                        <input type="text" id="mobile_number" name="mobile_number" value={formData.mobile_number} onChange={handleInputChange} required/>
                    </div>
                    <div className="input-group">
                        <label htmlFor="identification_number">Identification No:</label>
                        <input type="text" id="identification_number" name="identification_number"
                               value={formData.identification_number} onChange={handleInputChange} required/>
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" value={formData.password}
                               onChange={handleInputChange} required/>
                    </div>
                    <div className="input-group">
                        <label htmlFor="role_id">Role:</label>
                        <select id="role_id" name="role_id" value={formData.role_id}
                                onChange={handleInputChange} required>
                            <option value="">Select Role</option>
                            <option value={3}>Administrator</option>
                            <option value={4}>Quality Assurance</option>
                            <option value={2}>Coordinator</option>
                            <option value={5}>Instructor</option>
                            <option value={1}>Student</option>
                        </select>
                    </div>
                    <button type="submit" onClick={handleSubmit}>Register</button>
                    <div>
                        <span className="space-between"></span>
                        <NavLink to={`/login`}>Already have an account? Click to login</NavLink>
                    </div>
                </form>
            </div>
        </div>
    )
}