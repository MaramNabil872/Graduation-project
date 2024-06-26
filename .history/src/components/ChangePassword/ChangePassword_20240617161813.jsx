import React, { useState } from 'react';
import Title from '../Title/Title';
import Input from '../Input/Input';
import Button from '../Button/Button';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function ChangePassword({ logout }) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await changePassword({ currentPassword, newPassword });
      logout();
      toast.success('Password Changed Successfully, Please Login Again!');
    } catch (error) {
      setError('Failed to change password. Please try again.');
    }
  };

  const changePassword = async (passwords) => {
    await axios.put('/api/users/changePassword', passwords);
  };

  return (
    <div>
      <Title title="Change Password" />
      <form onSubmit={handleSubmit}>
        <Input
          type="password"
          label="Current Password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
        />

        <Input
          type="password"
          label="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          minLength={5}
        />

        <Input
          type="password"
          label="Confirm Password"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
          required
        />
        
        {error && <p style={{ color: '#/* ProfilePage.css */

.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.details {
  margin-top: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.label {
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
}

.input-field {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.error-message {
  color: #ff6347;
  font-size: 0.9rem;
  margin-top: 5px;
}

.button-container {
  margin-top: 20px;
  text-align: center;
}

.toast-success {
  background-color: #007e2b !important;
  color: #ffffff;
}

.toast-error {
  background-color: #ff6347 !important;
  color: #ffffff;
}
' }}>{error}</p>}

        <Button type="submit" text="Change" />
      </form>
    </div>
  );
}
