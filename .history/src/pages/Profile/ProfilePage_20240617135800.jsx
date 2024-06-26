import React, { useState } from 'react';
import Title from '../../components/Title/Title';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import ChangePassword from '../../components/ChangePassword/ChangePassword';
import { toast } from 'react-toastify';
import { updateProfile } from '../../services/userService'; // Import named export

export default function ProfilePage() {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedUser = await updateProfile(user);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      toast.success('Profile Update Was Successful');
      setUser(updatedUser); // Update local state with updated user data
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile. Please try again.');
      // Optionally, handle specific errors and update errors state
      setErrors({ message: 'Failed to update profile. Please try again.' });
    }
  };

  return (
    <div className='container'>
      <div className='details'>
        <Title title='Update Profile' />
        <form onSubmit={onSubmit}>
          <Input
            type='text'
            name='first_name'
            value={user.first_name}
            onChange={handleChange}
            label='First Name'
            required
            minLength={5}
            {...register("first_name", { required: true, minLength: 1 })}
            error={errors.first_name}
          />
          <Input
            type='text'
            name='address'
            value={user.address}
            onChange={handleChange}
            label='Address'
            required
            minLength={10}
            {...register("address", { required: true, minLength: 1 })}
                        error={errors.address}
          />

          <Button type='submit' text='Update' backgroundColor='#009e84' />
        </form>

        <ChangePassword />
      </div>
    </div>
  );
}
