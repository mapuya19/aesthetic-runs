import Footer from '@/components/Footer';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-[var(--foreground)] mb-6 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-lg text-[var(--text-secondary)]">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">1. Introduction</h2>
            <p className="text-[var(--text-secondary)] mb-4">
              Aesthetic Runs (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our running route application.
            </p>
            <p className="text-[var(--text-secondary)] mb-4">
              Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy, please do not access our Service.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">2. Information We Collect</h2>
            
            <h3 className="text-xl font-semibold text-[var(--foreground)] mb-3">Information You Provide to Us</h3>
            <p className="text-[var(--text-secondary)] mb-4">
              When you create an account, we collect:
            </p>
            <ul className="list-disc pl-6 text-[var(--text-secondary)] mb-4 space-y-2">
              <li>Email address</li>
              <li>Password (encrypted)</li>
              <li>Profile information you choose to provide</li>
            </ul>

            <h3 className="text-xl font-semibold text-[var(--foreground)] mb-3">Information Automatically Collected</h3>
            <p className="text-[var(--text-secondary)] mb-4">
              When you use our Service, we may automatically collect:
            </p>
            <ul className="list-disc pl-6 text-[var(--text-secondary)] mb-4 space-y-2">
              <li>Device information (browser type, operating system, device identifiers)</li>
              <li>Log information (IP address, browser type, referring pages, pages visited)</li>
              <li>Usage data (routes viewed, completed routes, time spent on the Service)</li>
            </ul>

            <h3 className="text-xl font-semibold text-[var(--foreground)] mb-3">Location Information</h3>
            <p className="text-[var(--text-secondary)] mb-4">
              Our Service uses location data to provide:
            </p>
            <ul className="list-disc pl-6 text-[var(--text-secondary)] mb-4 space-y-2">
              <li>Map functionality and route visualization</li>
              <li>Navigation assistance during runs</li>
              <li>Distance tracking and route completion</li>
            </ul>
            <p className="text-[var(--text-secondary)] mb-4">
              We collect location data only when you explicitly grant permission through your device settings. You can revoke this permission at any time through your device settings.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">3. How We Use Your Information</h2>
            <p className="text-[var(--text-secondary)] mb-4">
              We use the information we collect for various purposes, including:
            </p>
            <ul className="list-disc pl-6 text-[var(--text-secondary)] mb-4 space-y-2">
              <li>Providing, maintaining, and improving our Service</li>
              <li>Processing transactions and sending you related information</li>
              <li>Sending technical notices, updates, security alerts, and support messages</li>
              <li>Responding to your comments, questions, and customer service requests</li>
              <li>Monitoring and analyzing trends, usage, and activities</li>
              <li>Detecting, preventing, and addressing technical issues and fraudulent activity</li>
              <li>Personalizing your experience and delivering content relevant to your interests</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">4. Information Sharing</h2>
            <p className="text-[var(--text-secondary)] mb-4">
              We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this Privacy Policy.
            </p>

            <h3 className="text-xl font-semibold text-[var(--foreground)] mb-3">Service Providers</h3>
            <p className="text-[var(--text-secondary)] mb-4">
              We may employ third-party companies and individuals to facilitate our Service, including:
            </p>
            <ul className="list-disc pl-6 text-[var(--text-secondary)] mb-4 space-y-2">
              <li><strong>Supabase</strong> - For database management and authentication</li>
              <li><strong>Mapbox</strong> - For mapping and location services</li>
            </ul>
            <p className="text-[var(--text-secondary)] mb-4">
              These third parties have access to your Personal Data only to perform specific tasks on our behalf and are obligated not to disclose or use it for any other purpose.
            </p>

            <h3 className="text-xl font-semibold text-[var(--foreground)] mb-3">Legal Requirements</h3>
            <p className="text-[var(--text-secondary)] mb-4">
              We may disclose your information where we believe it is necessary to:
            </p>
            <ul className="list-disc pl-6 text-[var(--text-secondary)] mb-4 space-y-2">
              <li>Comply with a legal obligation</li>
              <li>Protect and defend the rights or property of Aesthetic Runs</li>
              <li>Prevent or investigate possible wrongdoing in connection with the Service</li>
              <li>Protect the personal safety of users of the Service or the public</li>
              <li>Protect against legal liability</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">5. Data Security</h2>
            <p className="text-[var(--text-secondary)] mb-4">
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure.
            </p>
            <p className="text-[var(--text-secondary)] mb-4">
              Our security measures include:
            </p>
            <ul className="list-disc pl-6 text-[var(--text-secondary)] mb-4 space-y-2">
              <li>SSL/TLS encryption for data in transit</li>
              <li>Encrypted password storage using industry-standard hashing</li>
              <li>Secure authentication through Supabase Auth</li>
              <li>Regular security reviews and updates</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">6. Data Retention</h2>
            <p className="text-[var(--text-secondary)] mb-4">
              We retain your personal information for as long as necessary to provide our Service and fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.
            </p>
            <p className="text-[var(--text-secondary)] mb-4">
              When you delete your account, we will:
            </p>
            <ul className="list-disc pl-6 text-[var(--text-secondary)] mb-4 space-y-2">
              <li>Immediately deactivate your account</li>
              <li>Secure your account data and remove it from public view</li>
              <li>Delete your personal information from our servers within a reasonable period (typically 30 days)</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">7. Your Rights</h2>
            <p className="text-[var(--text-secondary)] mb-4">
              Depending on your location, you may have the following rights regarding your personal information:
            </p>
            <ul className="list-disc pl-6 text-[var(--text-secondary)] mb-4 space-y-2">
              <li><strong>Access:</strong> Request a copy of your personal information</li>
              <li><strong>Correction:</strong> Request correction of inaccurate information</li>
              <li><strong>Deletion:</strong> Request deletion of your personal information</li>
              <li><strong>Portability:</strong> Request transfer of your data to another service</li>
              <li><strong>Objection:</strong> Object to processing of your personal information</li>
              <li><strong>Restriction:</strong> Request restriction of processing your personal information</li>
              <li><strong>Withdraw Consent:</strong> Withdraw consent at any time where processing is based on consent</li>
            </ul>
            <p className="text-[var(--text-secondary)] mb-4">
              To exercise these rights, please contact us at hello@matthewapuya.com.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">8. Children&apos;s Privacy</h2>
            <p className="text-[var(--text-secondary)] mb-4">
              Our Service is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
            </p>
            <p className="text-[var(--text-secondary)] mb-4">
              If we become aware that we have collected personal information from a child under 13 without parental consent, we will take steps to remove that information from our servers.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">9. International Data Transfers</h2>
            <p className="text-[var(--text-secondary)] mb-4">
              Your information may be transferred to and maintained on computers located outside of your state, province, country, or other governmental jurisdiction where data protection laws may differ.
            </p>
            <p className="text-[var(--text-secondary)] mb-4">
              We take reasonable steps to ensure your data remains protected in accordance with this Privacy Policy, including using appropriate safeguards and ensuring our service providers maintain adequate protection.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">10. Changes to This Privacy Policy</h2>
            <p className="text-[var(--text-secondary)] mb-4">
              We may update our Privacy Policy from time to time. We will notify you of any changes by:
            </p>
            <ul className="list-disc pl-6 text-[var(--text-secondary)] mb-4 space-y-2">
              <li>Posting the new Privacy Policy on this page</li>
              <li>Sending you an email notification</li>
              <li>Displaying a prominent notice within our Service</li>
            </ul>
            <p className="text-[var(--text-secondary)] mb-4">
              You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">11. Contact Us</h2>
            <p className="text-[var(--text-secondary)] mb-4">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p className="text-[var(--text-secondary)]">
              <strong>Email:</strong> hello@matthewapuya.com
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
