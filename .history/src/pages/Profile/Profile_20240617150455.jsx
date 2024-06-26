import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Profile.css';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const showTab = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="container">
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
               
            </div>
          </div>
        </div>
      
      </div>
    </div>
  );
};

export default Profile;
