import React, { useState } from "react";
import Student from "./Student";
import Teacher from "./Teacher";

const logindetails = [{ email: 'student@gmail.com', password: '123', role: 'student' },
{ email: 'teacher@gmail.com', password: 'abc', role: 'teacher' }
]
const Rolebasedloginproject = () => {

    const data = { uname: '', password: '' };

    const [inputdata, setInputdata] = useState(data);

    const [error, setError] = useState({});

    const [userdata, setUserdata] = useState(null)

    const handelchange = (e) => {
        setInputdata({ ...inputdata, [e.target.name]: e.target.value });
        setError({ ...error, [e.target.name]: '' });
    }

    const Submitdata = () => {
        if (Validate()) {
            const founduser = logindetails.find(
                (u) => inputdata.uname === u.email && inputdata.password === u.password
            );

            if (founduser) {
                setUserdata(founduser)
            }
            else {
                alert('Invalid')
            }
        }
    }

    const Validate = () => {
        const newerror = {};

        if (inputdata.uname.trim() === '') {
            newerror.uname = "Email is required";
        }

        if (inputdata.password.trim() === '') {
            newerror.password = "Password is required";
        }

        setError(newerror);

        return Object.keys(newerror).length === 0;
    }

    const Logoutbtn = () => {
        setUserdata(null);
        setInputdata(data);  // fix: not ''
        setError({});
    }

    if (userdata) {
        return (
            <div style={{ margin: '40px' }}>
                <p>Welcome : {userdata.email}</p>
                <p>Role : {userdata.role}</p>
                {userdata.role === 'student' && <Student />}
                {userdata.role === 'teacher' && <Teacher />}
                <button type="button" onClick={Logoutbtn}>Logout</button>
            </div>
        )
    }

    return (
        <>
            <div style={{ margin: '40px' }}>
                <h2>Role based login project</h2>
        <h4>Login details are below</h4>
        <h5>For student: email- student@gmail.com , password - 123</h5>
        <h5>For teacher: email- teacher@gmail.com , password - abc</h5>
                <div>
                    <form>
                        <div>
                            <label>Username</label><br />
                            <input type="text" name="uname" value={inputdata.uname} onChange={handelchange} />
                            <p style={{ color: 'red', marginTop: '-1px' }}>{error.uname}</p>
                        </div>
                        <br />
                        <div>
                            <label>Password</label><br />
                            <input type="text" name="password" value={inputdata.password} onChange={handelchange} />
                            <p style={{ color: 'red', marginTop: '-1px' }}>{error.password}</p>
                        </div>
                        <br />
                        <button type="button" onClick={Submitdata}>Submit</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Rolebasedloginproject;
