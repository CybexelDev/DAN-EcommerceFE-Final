import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10 text-gray-800">

      <h1 className="text-3xl font-bold mb-6 text-center">
        Privacy Policy
      </h1>

      <p className="text-sm text-gray-500 text-center mb-10">
        Last Updated: {new Date().toLocaleDateString()}
      </p>

      <section className="space-y-6 leading-relaxed">

        <p>
          At <strong>Dar Al Nahda Trading</strong>, we value your privacy and are
          committed to protecting your personal information. This Privacy
          Policy explains how we collect, use, and safeguard your data when
          you use our website and services.
        </p>

        <h2 className="text-xl font-semibold">1. Information We Collect</h2>
        <ul className="list-disc pl-6">
          <li>Personal details such as name, email address, phone number</li>
          <li>Shipping and billing address information</li>
          <li>Order, payment, and transaction details</li>
          <li>Login credentials and account-related information</li>
          <li>Device, browser, and IP address information</li>
        </ul>

        <h2 className="text-xl font-semibold">2. How We Use Your Information</h2>
        <ul className="list-disc pl-6">
          <li>To process orders and deliver products</li>
          <li>To manage your account and customer support</li>
          <li>To improve website functionality and user experience</li>
          <li>To send order updates, notifications, and service emails</li>
          <li>To prevent fraud and ensure platform security</li>
        </ul>

        <h2 className="text-xl font-semibold">3. Sharing of Information</h2>
        <p>
          We do not sell or rent your personal information. Your data may be
          shared only with trusted third parties such as:
        </p>
        <ul className="list-disc pl-6">
          <li>Payment gateway providers</li>
          <li>Shipping and logistics partners</li>
          <li>Legal or regulatory authorities when required by law</li>
        </ul>

        <h2 className="text-xl font-semibold">4. Cookies & Tracking</h2>
        <p>
          We use cookies and similar technologies to enhance your browsing
          experience, analyze traffic, and personalize content. You may
          disable cookies through your browser settings.
        </p>

        <h2 className="text-xl font-semibold">5. Data Security</h2>
        <p>
          We implement appropriate technical and organizational measures to
          protect your personal data against unauthorized access, loss, or
          misuse. However, no online system is 100% secure.
        </p>

        <h2 className="text-xl font-semibold">6. Your Rights</h2>
        <ul className="list-disc pl-6">
          <li>Access and review your personal data</li>
          <li>Request corrections to inaccurate information</li>
          <li>Request deletion of your account or data</li>
          <li>Opt-out of promotional communications</li>
        </ul>

        <h2 className="text-xl font-semibold">7. Third-Party Links</h2>
        <p>
          Our website may contain links to third-party websites. We are not
          responsible for their privacy practices or content.
        </p>

        <h2 className="text-xl font-semibold">8. Children’s Privacy</h2>
        <p>
          Our services are not intended for individuals under the age of 18.
          We do not knowingly collect data from children.
        </p>

        <h2 className="text-xl font-semibold">9. Changes to This Policy</h2>
        <p>
          We reserve the right to update this Privacy Policy at any time.
          Changes will be posted on this page and become effective
          immediately.
        </p>

        <h2 className="text-xl font-semibold">10. Contact Us</h2>
        <p>
          If you have any questions or concerns regarding this Privacy Policy,
          please contact us:
        </p>
        <p className="font-medium">
          Email: info@daralnahdatrading.com
        </p>

      </section>
    </div>
  );
};

export default PrivacyPolicy;
