import Footer from '@/components/Footer';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-[var(--foreground)] mb-6 tracking-tight">
            Terms and Conditions
          </h1>
          <p className="text-lg text-[var(--text-secondary)]">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">1. Introduction</h2>
            <p className="text-[var(--text-secondary)] mb-4">
              Welcome to Aesthetic Runs (&ldquo;the Service&rdquo;). By accessing or using our Service, you agree to be bound by these Terms and Conditions (&ldquo;Terms&rdquo;). If you disagree with any part of these Terms, you may not access the Service.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">2. Acceptance of Terms</h2>
            <p className="text-[var(--text-secondary)] mb-4">
              By creating an account or using our Service, you acknowledge that you have read, understood, and agree to be bound by these Terms. These Terms apply to all users of the Service, including without limitation users who are browsers, vendors, customers, merchants, and/or contributors of content.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">3. Use License</h2>
            <p className="text-[var(--text-secondary)] mb-4">
              Permission is granted to temporarily download one copy of the materials on Aesthetic Runs for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc pl-6 text-[var(--text-secondary)] mb-4 space-y-2">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose or for any public display</li>
              <li>Attempt to reverse engineer any software contained on the Service</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">4. User Accounts</h2>
            <p className="text-[var(--text-secondary)] mb-4">
              When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
            </p>
            <p className="text-[var(--text-secondary)] mb-4">
              You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password, whether your password is with our Service or a third-party service.
            </p>
            <p className="text-[var(--text-secondary)] mb-4">
              You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">5. User Content</h2>
            <p className="text-[var(--text-secondary)] mb-4">
              The Service allows you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material (&ldquo;User Content&rdquo;). You are responsible for the User Content that you post on or through the Service.
            </p>
            <p className="text-[var(--text-secondary)] mb-4">
              By posting User Content on or through the Service, you represent and warrant that:
            </p>
            <ul className="list-disc pl-6 text-[var(--text-secondary)] mb-4 space-y-2">
              <li>You own or have the necessary licenses, rights, consents, and permissions to use and authorize us to use all patent, trademark, trade secret, copyright, and other proprietary rights in and to the User Content to enable inclusion and use of the User Content in the manner contemplated by the Service and these Terms</li>
              <li>You have the written consent, release, and/or permission of each and every identifiable individual person in the User Content to use the name or likeness of each and every such identifiable individual person to enable inclusion and use of the User Content in the manner contemplated by the Service and these Terms</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">6. Route Safety</h2>
            <p className="text-[var(--text-secondary)] mb-4">
              Aesthetic Runs provides running route information and navigation assistance for informational purposes only. The routes, directions, and information provided by the Service may not be accurate, complete, or up-to-date.
            </p>
            <p className="text-[var(--text-secondary)] mb-4">
              You acknowledge that running involves inherent risks, including but not limited to: traffic, weather conditions, uneven surfaces, wildlife, and other hazards. You are solely responsible for your own safety while using the Service and following any routes or directions provided.
            </p>
            <p className="text-[var(--text-secondary)] mb-4">
              Aesthetic Runs shall not be liable for any injuries, damages, or losses arising from your use of the Service or following any routes or directions.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">7. Disclaimer of Warranties</h2>
            <p className="text-[var(--text-secondary)] mb-4">
              The Service is provided on an &ldquo;AS IS&rdquo; and &ldquo;AS AVAILABLE&rdquo; basis. To the fullest extent permitted by law, we disclaim all warranties, whether express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, and non-infringement.
            </p>
            <p className="text-[var(--text-secondary)] mb-4">
              We do not warrant that the Service will be uninterrupted, timely, secure, or error-free. We do not warrant that the results that may be obtained from the use of the Service will be accurate or reliable.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">8. Limitation of Liability</h2>
            <p className="text-[var(--text-secondary)] mb-4">
              In no event shall Aesthetic Runs, its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
            </p>
            <ul className="list-disc pl-6 text-[var(--text-secondary)] mb-4 space-y-2">
              <li>Your access to or use of or inability to access or use the Service</li>
              <li>Any conduct or content of any third party on the Service</li>
              <li>Any content obtained from the Service</li>
              <li>Unauthorized access, use, or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence), or any other legal theory</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">9. Termination</h2>
            <p className="text-[var(--text-secondary)] mb-4">
              We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever, including without limitation if you breach the Terms.
            </p>
            <p className="text-[var(--text-secondary)] mb-4">
              Upon termination, your right to use the Service will immediately cease. If you wish to terminate your account, you may simply discontinue using the Service.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">10. Governing Law</h2>
            <p className="text-[var(--text-secondary)] mb-4">
              These Terms shall be governed and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.
            </p>
            <p className="text-[var(--text-secondary)] mb-4">
              Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">11. Changes to Terms</h2>
            <p className="text-[var(--text-secondary)] mb-4">
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.
            </p>
            <p className="text-[var(--text-secondary)] mb-4">
              What constitutes a material change will be determined at our sole discretion. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">12. Contact Information</h2>
            <p className="text-[var(--text-secondary)] mb-4">
              If you have any questions about these Terms, please contact us at:
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
