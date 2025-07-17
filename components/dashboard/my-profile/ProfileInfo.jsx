'use client'

import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const ProfileInfo = () => {
    const [profile, setProfile] = useState(null);
    const [profileImage, setProfileImage] = useState("");
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [position, setPosition] = useState("");
    const [license, setLicense] = useState("");
    const [taxNumber, setTaxNumber] = useState("");
    const [phone, setPhone] = useState("");
    const [faxNumber, setFaxNumber] = useState("");
    const [mobile, setMobile] = useState("");
    const [language, setLanguage] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [address, setAddress] = useState("");
    const [aboutMe, setAboutMe] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        async function fetchUser() {
            const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
            if (token) {
                try {
                    const res = await fetch("/api/me", { headers: { Authorization: `Bearer ${token}` } });
                    if (res.ok) {
                        const user = await res.json();
                        setUserName(user.username || "");
                        setUserEmail(user.email || "");
                        setFirstName(user.first_name || "");
                        setLastName(user.last_name || "");
                        setPosition(user.position || "");
                        setLicense(user.license || "");
                        setTaxNumber(user.tax_number || "");
                        setPhone(user.phone || "");
                        setFaxNumber(user.fax_number || "");
                        setMobile(user.mobile || "");
                        setLanguage(user.language || "");
                        setCompanyName(user.company_name || "");
                        setAddress(user.address || "");
                        setAboutMe(user.about_me || "");
                        setProfileImage(user.profile_image || "");
                        return;
                    }
                } catch {}
            }
            setUserName("");
            setUserEmail("");
        }
        fetchUser();
    }, []);

    // upload profile
    const uploadProfile = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        setProfile(file);
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('file', file);
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });
            const data = await res.json();
            if (data.filename) {
                setProfileImage(data.filename);
            }
        } catch (err) {
            setMessage("Failed to upload image");
        }
        setLoading(false);
    };

    const handleUpdateProfile = async () => {
        setLoading(true);
        setMessage("");
        try {
            const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
            if (!token) {
                setMessage("Not authenticated");
                return;
            }
            const res = await fetch("/api/update-profile", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    position,
                    license,
                    taxNumber,
                    phone,
                    faxNumber,
                    mobile,
                    language,
                    companyName,
                    address,
                    aboutMe,
                    profileImage
                }),
            });
            const data = await res.json();
            if (res.ok && data.success) {
                setMessage("Profile updated successfully!");
                setProfile(null); // Clear the file input
            } else {
                setMessage(data.error || "Failed to update profile");
            }
        } catch (err) {
            setMessage("Network error");
        }
        setLoading(false);
    };

    return (
        <div className="row">
            <div className="col-lg-12">
                <div className="wrap-custom-file">
                    <input
                        type="file"
                        id="image1"
                        accept="image/png, image/gif, image/jpeg"
                        onChange={uploadProfile}
                    />
                    <label
                        style={
                            profile !== null
                                ? {
                                      backgroundImage: `url(${URL.createObjectURL(profile)})`,
                                  }
                                : profileImage
                                ? {
                                      backgroundImage: `url(/api/image?filename=${profileImage})`,
                                  }
                                : undefined
                        }
                        htmlFor="image1"
                    >
                        <span>
                            <i className="flaticon-download"></i> Upload Photo{" "}
                        </span>
                    </label>
                </div>
                <p>*minimum 260px x 260px</p>
            </div>
            {/* End .col */}

            <div className="col-lg-6 col-xl-6">
                <div className="my_profile_setting_input form-group">
                    <label htmlFor="formGroupExampleInput1">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        id="formGroupExampleInput1"
                        placeholder="alitfn"
                        value={userName}
                        readOnly
                    />
                </div>
            </div>
            {/* End .col */}

            <div className="col-lg-6 col-xl-6">
                <div className="my_profile_setting_input form-group">
                    <label htmlFor="formGroupExampleEmail">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="formGroupExampleEmail"
                        placeholder="creativelayers@gmail.com"
                        value={userEmail}
                        readOnly
                    />
                </div>
            </div>
            {/* End .col */}

            <div className="col-lg-6 col-xl-6">
                <div className="my_profile_setting_input form-group">
                    <label htmlFor="formGroupExampleInput3">First Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="formGroupExampleInput3"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>
            </div>
            {/* End .col */}

            <div className="col-lg-6 col-xl-6">
                <div className="my_profile_setting_input form-group">
                    <label htmlFor="formGroupExampleInput4">Last Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="formGroupExampleInput4"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
            </div>
            {/* End .col */}

            <div className="col-lg-6 col-xl-6">
                <div className="my_profile_setting_input form-group">
                    <label htmlFor="formGroupExampleInput5">Position</label>
                    <input
                        type="text"
                        className="form-control"
                        id="formGroupExampleInput5"
                        value={position}
                        onChange={(e) => setPosition(e.target.value)}
                    />
                </div>
            </div>
            {/* End .col */}

            <div className="col-lg-6 col-xl-6">
                <div className="my_profile_setting_input form-group">
                    <label htmlFor="formGroupExampleInput6">License</label>
                    <input
                        type="text"
                        className="form-control"
                        id="formGroupExampleInput6"
                        value={license}
                        onChange={(e) => setLicense(e.target.value)}
                    />
                </div>
            </div>
            {/* End .col */}

            <div className="col-lg-6 col-xl-6">
                <div className="my_profile_setting_input form-group">
                    <label htmlFor="formGroupExampleInput7">Tax Number</label>
                    <input
                        type="text"
                        className="form-control"
                        id="formGroupExampleInput7"
                        value={taxNumber}
                        onChange={(e) => setTaxNumber(e.target.value)}
                    />
                </div>
            </div>
            {/* End .col */}

            <div className="col-lg-6 col-xl-6">
                <div className="my_profile_setting_input form-group">
                    <label htmlFor="formGroupExampleInput8">Phone</label>
                    <input
                        type="text"
                        className="form-control"
                        id="formGroupExampleInput8"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
            </div>
            {/* End .col */}

            <div className="col-lg-6 col-xl-6">
                <div className="my_profile_setting_input form-group">
                    <label htmlFor="formGroupExampleInput9">Fax Number</label>
                    <input
                        type="text"
                        className="form-control"
                        id="formGroupExampleInput9"
                        value={faxNumber}
                        onChange={(e) => setFaxNumber(e.target.value)}
                    />
                </div>
            </div>
            {/* End .col */}

            <div className="col-lg-6 col-xl-6">
                <div className="my_profile_setting_input form-group">
                    <label htmlFor="formGroupExampleInput10">Mobile</label>
                    <input
                        type="text"
                        className="form-control"
                        id="formGroupExampleInput10"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                    />
                </div>
            </div>
            {/* End .col */}

            <div className="col-lg-6 col-xl-6">
                <div className="my_profile_setting_input form-group">
                    <label htmlFor="formGroupExampleInput11">Language</label>
                    <input
                        type="text"
                        className="form-control"
                        id="formGroupExampleInput11"
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                    />
                </div>
            </div>
            {/* End .col */}

            <div className="col-lg-6 col-xl-6">
                <div className="my_profile_setting_input form-group">
                    <label htmlFor="formGroupExampleInput12">
                        Company Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="formGroupExampleInput12"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                    />
                </div>
            </div>
            {/* End .col */}

            <div className="col-xl-12">
                <div className="my_profile_setting_input form-group">
                    <label htmlFor="formGroupExampleInput13">Address</label>
                    <input
                        type="text"
                        className="form-control"
                        id="formGroupExampleInput13"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
            </div>
            {/* End .col */}

            <div className="col-xl-12">
                <div className="my_profile_setting_textarea">
                    <label htmlFor="exampleFormControlTextarea1">
                        About me
                    </label>
                    <textarea
                        className="form-control"
                        id="exampleFormControlTextarea1"
                        rows="7"
                        value={aboutMe}
                        onChange={(e) => setAboutMe(e.target.value)}
                    ></textarea>
                </div>
            </div>
            {/* End .col */}

            <div className="col-xl-12 text-right">
                <div className="my_profile_setting_input">
                    <button className="btn btn2" onClick={handleUpdateProfile} disabled={loading}>
                        {loading ? "Updating..." : "Update Profile"}
                    </button>
                </div>
            </div>
            {/* End .col */}
            {message && (
                <div className="col-xl-12">
                    <div className="alert alert-info mt-3 text-center">{message}</div>
                </div>
            )}
        </div>
    );
};

export default ProfileInfo;
