import React from 'react';
import './PrivacyPolicy.css'; // Import CSS file
import Header from '../../components/Header/Header';

const PrivacyPolicyPage = () => {
    return (
        <div className="privacy-policy-container">
            <Header />
            <h1 className='title'>Privacy Policy</h1>
            <div className="content">
                <section>
                    <h3>Introduction</h3>
                    <p>This privacy policy outlines how we collect, use, and protect your personal information when you visit our website or use our services.</p>
                </section>

                <section>
                    <h3>Information Collection and Use</h3>
                    <p>We may collect personal information such as your name, email address, and other contact details when you register an account or interact with our services.</p>
                </section>

                <section>
                    <h3>Use of Information</h3>
                    <p>We use the information collected to provide and improve our services, personalize your experience, send newsletters or promotional materials, and communicate with you.</p>
                </section>

                <section>
                    <h3>Security</h3>
                    <p>We take reasonable measures to protect your personal information from unauthorized access, use, or disclosure.</p>
                </section>

                <section>
                    <h3>Third-party Services</h3>
                    <p>We may use third-party services that have their own privacy policies. We are not responsible for the privacy practices of these third-party services.</p>
                </section>

                <section>
                    <h3>Changes to This Privacy Policy</h3>
                    <p>We may update this privacy policy periodically. We will notify you of any changes by posting the updated policy on our website.</p>
                </section>

                <section>
                    <h3>Contact Us</h3>
                    <p>If you have any questions about this privacy policy, please contact us at privacy@example.com.</p>
                </section>
            </div>
        </div>
    );
}

export default PrivacyPolicyPage;
