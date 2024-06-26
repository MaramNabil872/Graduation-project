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
                    <h2>Introduction</h2>
                    <p>This privacy policy outlines how we collect, use, and protect your personal information when you visit our website or use our services.</p>
                </section>

                <section>
                    <h3>Information Collection and Use</h2>
                    <ul>
                        <li>We may collect personal information such as your name, email address, and other contact details when you register an account or interact with our services.</li>
                    </ul>
                </section>

                <section>
                    <h3>Use of Information</h2>
                    <ul>
                        <li>We use the information collected to:</li>
                        <li>Provide and improve our services</li>
                        <li>Personalize your experience</li>
                        <li>Send newsletters or promotional materials</li>
                        <li>Communicate with you</li>
                    </ul>
                </section>

                <section>
                    <h2>Security</h2>
                    <ul>
                        <li>We take reasonable measures to protect your personal information from unauthorized access, use, or disclosure.</li>
                    </ul>
                </section>

                <section>
                    <h2>Third-party Services</h2>
                    <p>We may use third-party services that have their own privacy policies. We are not responsible for the privacy practices of these third-party services.</p>
                </section>

                <section>
                    <h2>Changes to This Privacy Policy</h2>
                    <p>We may update this privacy policy periodically. We will notify you of any changes by posting the updated policy on our website.</p>
                </section>

                <section>
                    <h2>Contact Us</h2>
                    <p>If you have any questions about this privacy policy, please contact us at privacy@example.com.</p>
                </section>
            </div>
        </div>
    );
}

export default PrivacyPolicyPage;
