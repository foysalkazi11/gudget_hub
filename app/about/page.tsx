export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">About GadgetHub</h1>
        
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-lg mb-6">
            Welcome to GadgetHub, your premier destination for high-quality smartphone accessories and gadgets. 
            We understand that your smartphone is an essential part of your daily life, which is why we&apos;re 
            committed to providing you with the best accessories to enhance your mobile experience.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Our Story</h2>
          <p className="mb-6">
            Founded in 2025, GadgetHub was born from a simple idea: to make premium smartphone accessories 
            accessible to everyone. We noticed that finding reliable, high-quality accessories often meant 
            paying premium prices or settling for subpar alternatives. We decided to bridge this gap by 
            offering carefully curated products that meet our strict quality standards while remaining 
            affordable.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Our Mission</h2>
          <p className="mb-6">
            Our mission is to enhance your smartphone experience through carefully selected accessories 
            that combine quality, functionality, and style. We believe that great technology should be 
            accessible to everyone, which is why we offer competitive prices and convenient payment 
            options like Cash on Delivery.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Why Choose GadgetHub?</h2>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Curated Selection: Every product in our catalog is carefully selected and tested for quality.</li>
            <li>Genuine Products: We only work with reliable suppliers and authorized distributors.</li>
            <li>Competitive Pricing: Quality doesn&apos;t have to be expensive.</li>
            <li>Cash on Delivery: Pay only when you receive your order.</li>
            <li>Customer Support: Our team is always ready to help with any questions or concerns.</li>
            <li>Fast Delivery: Quick processing and reliable shipping partners.</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Our Commitment</h2>
          <p className="mb-6">
            At GadgetHub, we&apos;re committed to:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Quality: We never compromise on the quality of our products.</li>
            <li>Customer Satisfaction: Your satisfaction is our top priority.</li>
            <li>Transparency: Clear pricing, no hidden fees.</li>
            <li>Innovation: Constantly updating our catalog with the latest accessories.</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
          <p>
            Have questions or suggestions? We&apos;d love to hear from you! Visit our Contact page or reach 
            out to us through WhatsApp for immediate assistance.
          </p>
        </div>
      </div>
    </div>
  );
}