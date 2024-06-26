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
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtbEsykx-0fhTred6UwHDYtMFd2UgTJCG4gaklT1dx4suRO4_n5LJr4Gg28kquSX5fpNo&usqp=CAU"
                  alt="Admin"
                  className="rounded-circle p-1 bg-warning"
                  width="110"
                />
                <div className="mt-3">
                  <h4>Jyoti</h4>
                  <p className="text-secondary mb-1">+91 7493658737</p>
                  <p className="text-muted font-size-sm">Delhi, NCR</p>
                </div>
              </div>
              <div className="list-group list-group-flush text-center mt-4">
                <a href="#" className="list-group-item list-group-item-action border-0" onClick={() => showTab('profile')}>
                  Profile Information
                </a>
                <a href="#" className="list-group-item list-group-item-action border-0" onClick={() => showTab('orders')}>
                  Orders
                </a>
                <a href="#" className="list-group-item list-group-item-action border-0" onClick={() => showTab('address')}>
                  Address Book
                </a>
                <a href="#" className="list-group-item list-group-item-action border-0">Logout</a>
              </div>
            </div>
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
                  <p><strong>City:</strong> Delhi, NCR</p>
                  <p><strong>address</strong> 02-03-1999</p>
                
                  <p><strong>Role:</strong> User</p>
                </div>
              </div>
            </div>
          )}
          {activeTab === 'orders' && (
            <div className="card">
              <div className="card-body">
                {/* Your orders component */}
              </div>
            </div>
          )}
          {activeTab === 'address' && (
            <div className="card">
              <div className="card-body">
                {/* Your address component */}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
