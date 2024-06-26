
import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../hooks/useAuth';
import classes from './profilePage.module.css';
import Title from '../../components/Title/Title';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import ChangePassword from '../../components/ChangePassword/ChangePassword';

export default function ProfilePage() {
  const { user, updateProfile } = useAuth() || { user: {}, updateProfile: () => {} };

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      first_name: user?.first_name || '',
      address: user?.address || '',
    },
  });

  const onSubmit = data => {
    updateProfile(data);
  };

  return (
    <div className={classes.container}>
      <div className={classes.details}>
        <Title title="Update Profile" />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="text"
            label="First Name"
            defaultValue={user?.first_name || ''}
            {...register('first_name', {
              required: 'First name is required',
              minLength: {
                value: 5,
                message: 'First name must be at least 5 characters long',
              },
            })}
            error={errors.first_name && errors.first_name.message}
          />
          <Input
            type="text"
            label="Address"
            defaultValue={user?.address || ''}
            {...register('address', {
              required: 'Address is required',
              minLength: {
                value: 10,
                message: 'Address must be at least 10 characters long',
              },
            })}
            error={errors.address && errors.address.message}
          />

          <Button type="submit" text="Update" backgroundColor="#009e84" />
        </form>

        <ChangePassword />
      </div>
    </div>
  );
}
