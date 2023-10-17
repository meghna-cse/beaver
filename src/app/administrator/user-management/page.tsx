import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faToggleOff} from "@fortawesome/free-solid-svg-icons";

export default function UserManagementPage(){
    return (
        <>
            <div className="container">
                <h1>User Management</h1>
                <a href="add-user.html" className="custom-button">Add User</a>

                <div className="course-card">
                    <h2>Admins</h2>
                    <div className="table-container">
                        <table className="performance-table">
                            <thead>
                            <tr>
                                <th>Identification Number</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Username</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>432TYUEWQED</td>
                                <td>Morris Maryline</td>
                                <td>maryline@gmail.com</td>
                                <td>maryline</td>
                                <td className="action-column">
                                    <a href="user-management/update-user">
                                        <FontAwesomeIcon icon={faEye} color={"#4456cb"}/>
                                        View
                                    </a><br/>
                                    <a href="#" color={"#c72c2c"}>
                                        <FontAwesomeIcon icon={faToggleOff} color={"#c72c2c"}/>
                                        De-Activate
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td>432TYUEWQED</td>
                                <td>Morris Maryline</td>
                                <td>maryline@gmail.com</td>
                                <td>maryline</td>
                                <td className="action-column">
                                    <a href="user-management/update-user">
                                        <FontAwesomeIcon icon={faEye} color={"#4456cb"}/>
                                        View
                                    </a><br/>
                                    <a href="#" color={"#c72c2c"}>
                                        <FontAwesomeIcon icon={faToggleOff} color={"#c72c2c"}/>
                                        De-Activate
                                    </a>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="course-card">
                    <h2>QA Personell</h2>
                    <div className="table-container">
                        <table className="performance-table">
                            <thead>
                            <tr>
                                <th>Identification Number</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Username</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>432TYUEWQED</td>
                                <td>Morris Maryline</td>
                                <td>maryline@gmail.com</td>
                                <td>maryline</td>
                                <td className="action-column">
                                    <a href="user-management/update-user">
                                        <FontAwesomeIcon icon={faEye} color={"#4456cb"}/>
                                        View
                                    </a><br/>
                                    <a href="#" color={"#c72c2c"}>
                                        <FontAwesomeIcon icon={faToggleOff} color={"#c72c2c"}/>
                                        De-Activate
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td>432TYUEWQED</td>
                                <td>Morris Maryline</td>
                                <td>maryline@gmail.com</td>
                                <td>maryline</td>
                                <td className="action-column">
                                    <a href="user-management/update-user">
                                        <FontAwesomeIcon icon={faEye} color={"#4456cb"}/>
                                        View
                                    </a><br/>
                                    <a href="#" color={"#c72c2c"}>
                                        <FontAwesomeIcon icon={faToggleOff} color={"#c72c2c"}/>
                                        De-Activate
                                    </a>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="course-card">
                    <h2>Program Co-ordinators</h2>
                    <div className="table-container">
                        <table className="performance-table">
                            <thead>
                            <tr>
                                <th>Identification Number</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Username</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>432TYUEWQED</td>
                                <td>Morris Maryline</td>
                                <td>maryline@gmail.com</td>
                                <td>maryline</td>
                                <td className="action-column">
                                    <a href="user-management/update-user">
                                        <FontAwesomeIcon icon={faEye} color={"#4456cb"}/>
                                        View
                                    </a><br/>
                                    <a href="#" color={"#c72c2c"}>
                                        <FontAwesomeIcon icon={faToggleOff} color={"#c72c2c"}/>
                                        De-Activate
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td>432TYUEWQED</td>
                                <td>Morris Maryline</td>
                                <td>maryline@gmail.com</td>
                                <td>maryline</td>
                                <td className="action-column">
                                    <a href="user-management/update-user">
                                        <FontAwesomeIcon icon={faEye} color={"#4456cb"}/>
                                        View
                                    </a><br/>
                                    <a href="#" color={"#c72c2c"}>
                                        <FontAwesomeIcon icon={faToggleOff} color={"#c72c2c"}/>
                                        De-Activate
                                    </a>
                                </td>
                            </tr>

                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="course-card">
                    <h2>Instructors</h2>
                    <div className="table-container">
                        <table className="performance-table">
                            <thead>
                            <tr>
                                <th>Identification Number</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Username</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>432TYUEWQED</td>
                                <td>Morris Maryline</td>
                                <td>maryline@gmail.com</td>
                                <td>maryline</td>
                                <td className="action-column">
                                    <a href="user-management/update-user">
                                        <FontAwesomeIcon icon={faEye} color={"#4456cb"}/>
                                        View
                                    </a><br/>
                                    <a href="#" color={"#c72c2c"}>
                                        <FontAwesomeIcon icon={faToggleOff} color={"#c72c2c"}/>
                                        De-Activate
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td>432TYUEWQED</td>
                                <td>Morris Maryline</td>
                                <td>maryline@gmail.com</td>
                                <td>maryline</td>
                                <td className="action-column">
                                    <a href="user-management/update-user">
                                        <FontAwesomeIcon icon={faEye} color={"#4456cb"}/>
                                        View
                                    </a><br/>
                                    <a href="#" color={"#c72c2c"}>
                                        <FontAwesomeIcon icon={faToggleOff} color={"#c72c2c"}/>
                                        De-Activate
                                    </a>
                                </td>
                            </tr>

                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="course-card">
                    <h2>Students</h2>
                    <div className="table-container">
                        <table className="performance-table">
                            <thead>
                            <tr>
                                <th>Identification Number</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Username</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>432TYUEWQED</td>
                                <td>Morris Maryline</td>
                                <td>maryline@gmail.com</td>
                                <td>maryline</td>
                                <td className="action-column">
                                    <a href="user-management/update-user">
                                        <FontAwesomeIcon icon={faEye} color={"#4456cb"}/>
                                        View
                                    </a><br/>
                                    <a href="#" color={"#c72c2c"}>
                                        <FontAwesomeIcon icon={faToggleOff} color={"#c72c2c"}/>
                                        De-Activate
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td>432TYUEWQED</td>
                                <td>Morris Maryline</td>
                                <td>maryline@gmail.com</td>
                                <td>maryline</td>
                                <td className="action-column">
                                    <a href="user-management/update-user">
                                        <FontAwesomeIcon icon={faEye} color={"#4456cb"}/>
                                        View
                                    </a><br/>
                                    <a href="#" color={"#c72c2c"}>
                                        <FontAwesomeIcon icon={faToggleOff} color={"#c72c2c"}/>
                                        De-Activate
                                    </a>
                                </td>
                            </tr>

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}