import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getRequest, postRequest, putRequest} from "../api/api";
import Swal from "sweetalert2";

export default function Profile(){
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const [formData, setFormData] = useState({
      name: user.name,
      username: user.username,
      identification_number: user.identification_number,
      email: user.email,
      mobile: user.mobile,
      id: user.id,
      role_id: user.role_id,
    });
  
    const handleInputChange = (event) => {
      setFormData({
        ...formData,
        [event.target.name]: event.target.value
      });
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      const data = JSON.stringify(formData);
  
      try {
        const response = await putRequest('/users/' + user.id, data);
        if (response.data.status === 'success') {
          // Update local storage and user state only after successful response
          localStorage.setItem("user", JSON.stringify(formData));
          // update user state
          setUser(formData);
          // alert("Profile updated successfully");
            await Swal.fire({
                title: "Success!",
                text: "Profile updated successfully!",
                icon: "success"
            });
        } else {
          throw new Error(response.message);
        }
      } catch (error) {
        // alert("An error occurred: " + error.message);
          await Swal.fire({
              icon: "error",
              title: "Oops...",
              text: error.message,
          });
      }
    };

    return (
        <div className={"form-container"}>
            <h2>User Profile</h2>
            <form id="profile-form" onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name"
                           value={formData.name} onChange={handleInputChange}
                           required/><br/><br/>
                </div>

                <div className="input-group">
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username"
                           value={formData.username} onChange={handleInputChange}
                           required/><br/><br/>
                </div>

                <div className="input-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email"
                           value={formData.email} onChange={handleInputChange}
                           required/><br/><br/>
                </div>

                <div className="input-group">
                    <label htmlFor="identification_number">Identification Number:</label>
                    <input type="text" id="identification_number" name="identification_number"
                           value={formData.identification_number} onChange={handleInputChange}
                           required/><br/><br/>
                </div>

                <div className="input-group">
                    <label htmlFor="mobile">Mobile:</label>
                    <input type="text" id="mobile" name="mobile"
                           value={formData.mobile} onChange={handleInputChange}
                           required/><br/><br/>
                </div>

                <input type="submit" value="Save Changes"/>
            </form>
        </div>
    )
}