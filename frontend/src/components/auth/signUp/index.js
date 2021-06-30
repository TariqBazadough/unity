import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import LoaderBar from "../../loadingBar/loaderBar";
import CountryList from "../../Api/CountryList";
import CheckInList from "../../Api/CheckInList";
import img from "./Stranded traveler-pana.png";
import "./signUp.css";

import {
  setUsers,
  addUser,
  updateUser,
  deleteUser,
} from "../../../reducers/signUp";

const SignUp = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [displayName, setDisplayName] = useState();
  const [region, setRegion] = useState();
  const [currentlyIn, setCurrentlyIn] = useState();
  const [gender, setGender] = useState();
  const [dateOfBirth, setDateOfBirth] = useState();
  const [language, setLanguage] = useState();
  const [profileImage, setProfileImage] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [id, setId] = useState();
  const [secondStep, setSecondStep] = useState(false);
  const [errorImgMessage, setErrorImgMessage] = useState();
  const [file, setFile] = useState(null);

  const types = ["image/png", "image/jpeg"];

  const dispatch = useDispatch();

  const state = useSelector((state) => {
    return {
      url: state.imgUploader.url,
    };
  });
  console.log("state", state);

  const signUpFirstStep = () => {
    if (password === confirmPassword) {
      axios
        .post("http://localhost:5000/signUp/firstStep", {
          first_name: firstName,
          last_name: lastName,
          email,
          password,
        })
        .then((result) => {
          setId(result.data.id);
          setSecondStep(true);
        })
        .catch((err) => {
          throw err;
        });
    } else {
      setErrorMessage("Password Does Not Match");
    }
  };

  const signUpSecondStep = () => {
    setProfileImage(state.url);

    axios
      .put(`http://localhost:5000/signUp/secondStep/${id}`, {
        region,
        currently_in: currentlyIn,
        language,
        gender,
        birth_date: dateOfBirth,
        profile_image: profileImage,
        display_name: displayName,
      })
      .then((result) => {
        //   perfernces
      })
      .catch((err) => {
        throw err;
      });
  };
  const uploadImage = (e) => {
    // console.log("test image uploade")
    let selectedImage = e.target.files[0];
    //console.log("select", selectedImage);
    if (selectedImage && types.includes(selectedImage.type)) {
      setFile(selectedImage);
      setErrorImgMessage("");
    } else {
      setFile(null);
      setErrorImgMessage("please select image type of png or jpeg");
    }
  };
  return (
    <>
      {!secondStep ? (
        <FirstStep
          setFirstName={setFirstName}
          setLastName={setLastName}
          setEmail={setEmail}
          setPassword={setPassword}
          setConfirmPassword={setConfirmPassword}
          signUpFirstStep={signUpFirstStep}
        />
      ) : (
        <SecondStep
          setRegion={setRegion}
          setCurrentlyIn={setCurrentlyIn}
          setLanguage={setLanguage}
          setGender={setGender}
          setDateOfBirth={setDateOfBirth}
          uploadImage={uploadImage}
          setDisplayName={setDisplayName}
          signUpSecondStep={signUpSecondStep}
          setFile={setFile}
          file={file}
          errorImgMessage={errorImgMessage}
        />
      )}
    </>
  );
};

const FirstStep = ({
  setFirstName,
  setLastName,
  setPassword,
  setEmail,
  setConfirmPassword,
  signUpFirstStep,
}) => {
  return (
    <div className="regCont">
      <div className="leftAuthReg">
        <div className="imgDiv"><img src={img} alt="" /></div>
      </div>
      <div className="rightAuthReg">
      <div className="regWrapper">
        <h1>First Step</h1>

        <div className="regForm">
          <div className="firstName">
            <label>First Name: </label>
            <input
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              type="text"
              placeholder="Enter First Name Here"
            />
          </div>
          <div className="lastName">
            <label>Last Name: </label>
            <input
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              type="text"
              placeholder="Enter Last Name Here"
            />
          </div>
          <div className="email">
            <label>Email: </label>
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              placeholder="Enter E-mail Here"
            />
          </div>
          <div className="password">
            <label>Password: </label>
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              placeholder="Enter Password Here"
            />
          </div>
          <div className="password">
            <label>Confirm Password: </label>
            <input
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              type="password"
              placeholder="Re-Enter Password Here"
            />{" "}
          </div>
          <div className="createAccount">
            <button onClick={signUpFirstStep}>Sign-Up</button>
            <small>
              Already Have Account?<Link>Login</Link>
            </small>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

const SecondStep = ({
  setRegion,
  setCurrentlyIn,
  setLanguage,
  setGender,
  setDateOfBirth,
  uploadImage,
  setDisplayName,
  signUpSecondStep,
  setFile,
  file,
  errorImgMessage,
}) => {
  const [cList, setCList] = useState();
  const [rList, setRList] = useState();

  console.log("list", cList)
  return (
    <div className="regCont">
      <div className="leftAuthReg">
      <div className="imgDiv"><img src={img} alt="" /></div>
      </div>
      <div className="rightAuthReg">
      <div className="regWrapper">
        <h1>Second Step</h1>
        <div className="regForm">
          {/* _____________________________________________ */}
          <div className="firstName">
            {/* <label>Region:</label>
            <input
              onChange={(e) => {
                setRegion(e.target.value);
              }}
              type="text"
              placeholder="Enter Your Country Here"
            /> */}
            <CountryList setCList={setCList} />
            {setRegion(cList)}
          </div>
          {/* _____________________________________________ */}
          <div className="lastName">
            {/* <label>Current Location:</label>
            <input
              onChange={(e) => {
                setCurrentlyIn(e.target.value);
              }}
              type="text"
              placeholder="Check In Your Current Location Here"
            /> */}
            <CheckInList setRList={setRList} />
            {setCurrentlyIn(rList)}
            {/* _____________________________________________ */}

          </div>
          <div className="email">
            <label>Languages:</label>
            <input
              onChange={(e) => {
                setLanguage(e.target.value);
              }}
              type="text"
              placeholder="Enter The Languages That you speak Here"
            />
          </div>
          <div className="firstName">
            <label>Display Name:</label>
            <input
              onChange={(e) => {
                setDisplayName(e.target.value);
              }}
              type="text"
              placeholder="Enter Display Name Here"
            />
          </div>
          <div className="lastName">
            <label>Birth Date:</label>
            <input
              onChange={(e) => {
                setDateOfBirth(e.target.value);
              }}
              type="date"
              placeholder="mm-dd-yyyy"
            />
          </div>
          <div className="firstName">
            <label>Gender:</label>
            <form>
              <div>
                <input
                  onChange={() => {
                    setGender("Male");
                  }}
                  name="Gender"
                  id="Male"
                  type="radio"
                  value="Male"
                />
                <label htmlFor="Male">Male</label>
              </div>
              <div>
                <input
                  onChange={() => {
                    setGender("Female");
                  }}
                  name="Gender"
                  id="Female"
                  type="radio"
                  value="Female"
                />
                <label htmlFor="Female">Female</label>
              </div>
            </form>
          </div>

          <div className="lastName">
            <label>Upload Image:</label>
            {file && <LoaderBar file={file} setFile={setFile} />}
            <input type="file" onChange={uploadImage} />
            {/* {file && <h1>{file.name}</h1>} */}
            {errorImgMessage && <div>{errorImgMessage}</div>}
          </div>
          <div className="createAccount">
            <button onClick={signUpSecondStep}>Next</button>
            <small>
              <Link>skip</Link>
            </small>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default SignUp;
