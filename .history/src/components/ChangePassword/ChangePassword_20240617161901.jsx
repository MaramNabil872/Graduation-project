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
        
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <Button type="submit" text="Change" style />
      </form>
    </div>
  );
}
