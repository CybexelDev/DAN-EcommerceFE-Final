import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10 text-gray-800">
      
      <h1 className="text-3xl font-bold mb-6 text-center">
        Terms & Conditions
      </h1>

      <p className="text-sm text-gray-500 text-center mb-10">
        Last Updated: {new Date().toLocaleDateString()}
      </p>

      <section className="space-y-6 leading-relaxed">
        
        <p>
          Welcome to <strong>Dar Al Nahda Trading</strong>. By accessing or using our
          website, you agree to comply with and be bound by the following
          Terms & Conditions. Please read them carefully.
        </p>

        <h2 className="text-xl font-semibold">1. Acceptance of Terms</h2>
        <p>
          By using this website, you confirm that you accept these Terms &
          Conditions and agree to follow them. If you do not agree, please
          do not use our services.
        </p>

        <h2 className="text-xl font-semibold">2. Eligibility</h2>
        <p>
          You must be at least 18 years old or have permission from a legal
          guardian to use this website.
        </p>

        <h2 className="text-xl font-semibold">3. Account Registration</h2>
        <ul className="list-disc pl-6">
          <li>You may need to create an account to place orders.</li>
          <li>You are responsible for keeping your login details secure.</li>
          <li>Providing false information may lead to account suspension.</li>
        </ul>

        <h2 className="text-xl font-semibold">4. Products & Availability</h2>
        <p>
          Product details, prices, and availability may change without prior
          notice. We make every effort to display accurate information, but
          errors may occur.
        </p>

        <h2 className="text-xl font-semibold">5. Pricing & Payments</h2>
        <ul className="list-disc pl-6">
          <li>All prices are shown in AED unless stated otherwise.</li>
          <li>Payments are processed through secure payment gateways.</li>
          <li>
            Dar Al Nahda Trading is not responsible for payment gateway
            failures.
          </li>
        </ul>

        <h2 className="text-xl font-semibold">6. Order Confirmation</h2>
        <p>
          Orders are confirmed only after successful payment.
        </p>

        <h2 className="text-xl font-semibold">7. Shipping & Delivery</h2>
        <p>
          Delivery timelines are estimates and may vary due to logistics,
          location, or external factors beyond our control.
        </p>

        <h2 className="text-xl font-semibold">8. Returns & Refunds</h2>
        <p>
          Returns and refunds are governed by our Return & Refund Policy.
          Products must be returned in original condition with packaging.
        </p>

        <h2 className="text-xl font-semibold">9. User Conduct</h2>
        <p>
          You agree not to misuse the website, attempt unauthorized access,
          or engage in activities that may harm the platform or other users.
        </p>

        <h2 className="text-xl font-semibold">10. Intellectual Property</h2>
        <p>
          All content on this website including logos, text, images, and
          graphics belongs to <strong>Dar Al Nahda Trading</strong>. Unauthorized
          use is strictly prohibited.
        </p>

        <h2 className="text-xl font-semibold">11. Privacy Policy</h2>
        <p>
          Your personal data is handled according to our Privacy Policy. By
          using our website, you consent to data collection as described.
        </p>

        <h2 className="text-xl font-semibold">12. Limitation of Liability</h2>
        <p>
          Dar Al Nahda Trading shall not be liable for any indirect or
          consequential damages arising from the use of our services.
        </p>

        <h2 className="text-xl font-semibold">13. Changes to Terms</h2>
        <p>
          We may update these Terms & Conditions at any time. Continued use
          of the website implies acceptance of the updated terms.
        </p>

        <h2 className="text-xl font-semibold">14. Governing Law</h2>
        <p>
          These Terms & Conditions are governed by and interpreted under the
          laws of Dubai.
        </p>

        <h2 className="text-xl font-semibold">15. Contact Information</h2>
        <p>
          For questions or concerns, please contact us at:
        </p>
        <p className="font-medium">
          Email: info@daralnahdatrading.com
        </p>

      </section>
    </div>
  );
};

export default TermsAndConditions;
