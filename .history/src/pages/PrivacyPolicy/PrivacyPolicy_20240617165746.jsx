import React from 'react';
import './PrivacyPolicy.css'; // Import CSS file
import Header from '../../components/Header/Header';

const PrivacyPolicyPage = () => {
    return (
        <div className="privacy-policy-container">
            <Header />
            <h1 className='title'>Privacy Policy</h1>
            <div className="content">
              

                <h2>Introduction</h2>
                <p>This privacy policy outlines how we collect, use, and protect your personal information when you visit our website or use our services.</p>

                <h2>Information Collection and Use</h2>
                <p>We may collect personal information such as your name, email address, and other contact details when you register an account or interact with our services.</p>

                <h2>Use of Information</h2>
                <p>We use the information collected to provide and improve our services, personalize your experience, send newsletters or promotional materials, and communicate with you.</p>

                <h2>Security</h2>
                <p>We take reasonable measures to protect your personal information from unauthorized access, use, or disclosure.</p>

                <h2>Third-party Services</h2>
                <p>We may use third-party services that have their own privacy policies. We are not responsible for the privacy practices of these third-party services.</p>

                <h2>Changes to This Privacy Policy</h2>
                <p>We may update this privacy policy periodically. We will notify you of any changes by posting the updated policy on our website.</p>

                <h2>Contact Us</h2>
                <p>If you have any questions about this privacy policy, please contact us at privacy@example.com.</p>
            </div>
        </div>
    );
}

export default PrivacyPolicyPage;
