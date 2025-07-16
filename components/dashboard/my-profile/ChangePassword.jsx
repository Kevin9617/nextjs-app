'use client'
import { useState } from 'react';

function validatePasswordStrength(password) {
  // At least 8 chars, one uppercase, one lowercase, one number, one special char
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
  return regex.test(password);
}

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async () => {
    setMessage('');
    if (newPassword !== confirmPassword) {
      setMessage('New password and confirm password do not match.');
      return;
    }
    if (!validatePasswordStrength(newPassword)) {
      setMessage('Password must be at least 8 characters and include uppercase, lowercase, number, and special character.');
      return;
    }
    setLoading(true);
    try {
      // Get user email from /api/me
      let email = '';
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      if (token) {
        const resMe = await fetch('/api/me', { headers: { Authorization: `Bearer ${token}` } });
        if (resMe.ok) {
          const user = await resMe.json();
          email = user.email;
        }
      }
      const res = await fetch('/api/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ oldPassword, newPassword, email }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setMessage('Password updated successfully!');
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setMessage(data.error || 'Failed to update password.');
      }
    } catch (err) {
      setMessage('Network error');
    }
    setLoading(false);
  };

  return (
    <>
      <div className="row">
        <div className="col-xl-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="formGroupExampleOldPass">Old Password</label>
            <input
              type="password"
              className="form-control"
              id="formGroupExampleOldPass"
              value={oldPassword}
              onChange={e => setOldPassword(e.target.value)}
              placeholder="Old Password"
            />
          </div>
        </div>
      </div>
      {/* End .row */}

      <div className="row">
        <div className="col-lg-6 col-xl-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="formGroupExampleNewPass">New Password</label>
            <input
              type="password"
              className="form-control"
              id="formGroupExampleNewPass"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
            />
          </div>
        </div>
        {/* End .col */}

        <div className="col-lg-6 col-xl-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="formGroupExampleConfPass">
              Confirm New Password
            </label>
            <input
              type="password"
              className="form-control"
              id="formGroupExampleConfPass"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>
        {/* End .col */}

        <div className="col-xl-12">
          <div className="my_profile_setting_input float-end fn-520">
            <button className="btn btn2" type="button" onClick={handleChangePassword} disabled={loading}>
              {loading ? 'Updating...' : 'Change Password'}
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
    </>
  );
};

export default ChangePassword;
