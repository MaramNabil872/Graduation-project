import React from 'react';
import { useForm } from 'react-hook-form';
import Title from '../../components/Title/Title';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import ChangePassword from '../../components/ChangePassword/ChangePassword';
import { toast } from 'react-toastify';
import { updateProfile } from '../../services/userService'; // Import named export

export default function ProfilePage() {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();

  const onSubmit = async (data) => {
    try {
      const updatedUser = await updateProfile(data);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      toast.success('Profile Update Was Successful');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile. Please try again.');
    }
  };

  return (
    <div className='container'>
      <He
      <div className='details'>
        <Title title='Update Profile' />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            type='text'
            label='First Name'
            {...register('first_name', {
              required: 'First name is required',
              minLength: {
                value: 1,
                message: 'First name must be at least 1 character long',
              },
            })}
            error={errors.first_name}
          />
          <Input
            type='text'
            label='Address'
            {...register('address', {
              required: 'Address is required',
              minLength: {
                value: 5,
                message: 'Address must be at least 5 character long',
              },
            })}
            error={errors.address}
          />

          <Button type='submit' text='Update' backgroundColor='#009e84' />
        </form>

        <ChangePassword />
      </div>
    </div>
  );
}
