import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Profile.css';
import Header from '../../components/Header/Header';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const showTab = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div >
      <Header/>
      <div className="row">
        <div className="col-lg-4">
          <div className="card">
            <div className="card-body">
              <div className="d-flex flex-column align-items-center text-center">
                <img
                src="https://static.vecteezy.com/system/resources/previews/014/194/232/non_2x/avatar-icon-human-a-person-s-badge-social-media-profile-symbol-the-symbol-of-a-person-vector.jpg"
                  alt="Admin"
                  className="rounded-circle p-1 bg-warning w-50"
                  width="50"
                />
                <div className="mt-3">
                  <h4>Jyoti</h4>
                  <p className="text-secondary mb-1">+91 7493658737</p>
                  <p className="text-muted font-size-sm">Delhi, NCR</p>
                </div>
              </div>
              <div className="col-lg-8">
          {activeTab === 'profile' && (
            <div className="card">
              <div className="card-body">
                <div className="profile-info">
                  <h5>Profile Information</h5>
                  <p><strong>Name:</strong> Jyoti</p>
                  <p><strong>Email Address:</strong> jyoti@gmail.com</p>
                  <p><strong>Contact:</strong> +91 7493658737</p>
                  <p><strong>Date Of Birth:</strong>  02-03-1999</p>
                  <p><strong>City:</strong> Delhi, NCR</p>
                  <p><strong>address</strong> 21 St.</p>
                  <p><strong>Role:</strong> User</p>
                </div>
              </div>
            </div>
  
         
         
        </div>
            </div>
          </div>
        </div>
      
      </div>
    </div>
  );
};

export default Profile;
