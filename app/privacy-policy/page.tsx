import Image from 'next/image'

export const metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for Big Feels Botanical',
}

export default function PrivacyPolicyPage() {
  return (
    <div className="space-y-8">
      <section aria-labelledby="privacy-heading">
        <h1 id="privacy-heading">Privacy Policy</h1>

        <div className="my-8">
          <Image
            src="/images/square-logo.svg"
            alt="Big Feels Botanical logo"
            width={200}
            height={200}
            className="mx-auto"
            priority
          />
        </div>

        <div className="prose dark:prose-invert max-w-none space-y-6">
          <p className="text-lg">
            Last updated:{' '}
            {new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>

          <section aria-labelledby="introduction-heading">
            <h2 id="introduction-heading">Introduction</h2>
            <p>
              Welcome to Big Feels Botanical. We respect your privacy and are
              committed to protecting your personal information. This privacy
              policy explains how we collect, use, and safeguard your
              information when you visit our website or use our services.
            </p>
          </section>

          <section aria-labelledby="information-collection-heading">
            <h2 id="information-collection-heading">Information We Collect</h2>
            <p>
              When you contact us via email or use our services, we may collect:
            </p>
            <ul>
              <li>Your name and email address</li>
              <li>Information about your floral arrangement preferences</li>
              <li>Communication history with our team</li>
            </ul>
          </section>

          <section aria-labelledby="information-use-heading">
            <h2 id="information-use-heading">How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Respond to your inquiries and provide our services</li>
              <li>Communicate with you about your orders and arrangements</li>
              <li>Improve our website and services</li>
              <li>
                Send you updates and promotional materials (with your consent)
              </li>
            </ul>
          </section>

          <section aria-labelledby="information-protection-heading">
            <h2 id="information-protection-heading">
              How We Protect Your Information
            </h2>
            <p>
              We implement appropriate security measures to protect your
              personal information. However, no method of transmission over the
              internet is 100% secure, and we cannot guarantee absolute
              security.
            </p>
          </section>

          <section aria-labelledby="third-party-heading">
            <h2 id="third-party-heading">Third-Party Services</h2>
            <p>
              Our website may use third-party services for analytics and
              performance monitoring. These services may collect information
              about your visit to our website. We do not sell or share your
              personal information with third parties for marketing purposes.
            </p>
          </section>

          <section aria-labelledby="cookies-heading">
            <h2 id="cookies-heading">Cookies</h2>
            <p>
              Our website may use cookies to enhance your browsing experience.
              You can choose to disable cookies through your browser settings,
              though this may affect certain features of our website.
            </p>
          </section>

          <section aria-labelledby="rights-heading">
            <h2 id="rights-heading">Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your personal information</li>
              <li>Opt out of marketing communications</li>
            </ul>
          </section>

          <section aria-labelledby="contact-heading">
            <h2 id="contact-heading">Contact Us</h2>
            <p>
              If you have any questions about this privacy policy or how we
              handle your personal information, please contact us at:
            </p>
            <p>
              <a
                href="mailto:hello@bigfeelsbotanical.com"
                className="underline hover:no-underline"
              >
                hello@bigfeelsbotanical.com
              </a>
            </p>
          </section>
        </div>
      </section>
    </div>
  )
}
