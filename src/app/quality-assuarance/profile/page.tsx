export default function ProfilePage(){

    return (
        <div className={"form-container"}>
            <h2>User Profile</h2>
            <form id="profile-form">
                <div className="input-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" required/><br/><br/>
                </div>

                <div className="input-group">
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" required/><br/><br/>
                </div>

                <div className="input-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" required/><br/><br/>
                </div>

                <div className="input-group">
                    <label htmlFor="identification_number">Identification Number:</label>
                    <input type="text" id="identification_number" name="identification_number" required/><br/><br/>
                </div>

                {/*// <!--            <label for="bio">Bio:</label>-->*/}
                {/*// <!--            <textarea id="bio" name="bio" rows="4" cols="50"></textarea><br><br>-->*/}

                <input type="submit" value="Save Changes"/>
            </form>
        </div>
    )
}