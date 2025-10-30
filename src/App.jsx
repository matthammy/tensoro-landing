import { useState } from 'react'
import { supabase } from './supabaseClient'

function App() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    companyWebsite: '',
    question: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const services = [
    {
      title: 'AI Strategy and Transformation',
      description: 'Develop comprehensive AI roadmaps aligned with your business objectives and guide organizational transformation.'
    },
    {
      title: 'MVP Ideation and Rapid Prototyping',
      description: 'Turn concepts into working prototypes quickly, validating ideas before full-scale development.'
    },
    {
      title: 'Product Management and Delivery',
      description: 'Expert product leadership to take AI initiatives from conception through successful delivery.'
    },
    {
      title: 'Intelligent Application Development',
      description: 'Build sophisticated AI-powered applications tailored to your specific business needs.'
    },
    {
      title: 'AI Integration and Process Automation',
      description: 'Seamlessly integrate AI capabilities into existing workflows and automate key business processes.'
    },
    {
      title: 'Managed AI Operations',
      description: 'Ongoing support and optimization of your AI systems to ensure peak performance and ROI.'
    }
  ]

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      // Submit to Supabase
      const { error } = await supabase
        .from('contact_submissions')
        .insert([
          {
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            company_website: formData.companyWebsite,
            question: formData.question,
            created_at: new Date().toISOString()
          }
        ])

      if (error) throw error

      // Send email (in production, you'd use a backend service or Supabase Edge Function)
      const emailBody = `
New Contact Form Submission

First Name: ${formData.firstName}
Last Name: ${formData.lastName}
Email: ${formData.email}
Company Website: ${formData.companyWebsite}
Question: ${formData.question}
      `

      console.log('Email to matt@tensorolabs.com:', emailBody)

      setSubmitStatus('success')
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        companyWebsite: '',
        question: ''
      })
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-midnight-900 via-midnight-800 to-black">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <img
            src="/Tensoro_Logo.png"
            alt="Tensoro Logo"
            className="h-40 w-auto object-contain"
          />
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Transform Your Business with{' '}
            <span className="bg-gradient-to-r from-electric-cyan to-blue-400 bg-clip-text text-transparent">
              AI-Powered Innovation
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
            An AI-forward consultancy that helps organizations leverage artificial intelligence
            to compete, automate, and future-proof operations.
          </p>
          <div className="flex justify-center my-8">
            <a
              href="#contact"
              className="inline-block bg-gradient-to-r from-electric-cyan to-blue-500 text-midnight-900 font-semibold px-8 py-4 rounded-lg hover:shadow-lg hover:shadow-electric-cyan/50 transition-all duration-300 transform hover:scale-105"
            >
              Get Started
            </a>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="container mx-auto px-4 py-20" id="services">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">
            Our Services
          </h2>
          <p className="text-gray-400 text-center mb-16 text-lg">
            Comprehensive AI solutions to accelerate your digital transformation
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-midnight-800/80 to-midnight-900/80 backdrop-blur-sm border border-electric-cyan/20 rounded-xl p-6 hover:border-electric-cyan/50 transition-all duration-300 hover:transform hover:scale-105"
              >
                <h3 className="text-xl font-semibold text-electric-cyan mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="container mx-auto px-4 py-20" id="contact">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">
            Let's Talk
          </h2>
          <p className="text-gray-400 text-center mb-12 text-lg">
            Ready to transform your business with AI? Get in touch with us.
          </p>

          <form onSubmit={handleSubmit} className="bg-gradient-to-br from-midnight-800/80 to-midnight-900/80 backdrop-blur-sm border border-electric-cyan/20 rounded-xl p-8">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="firstName" className="block text-gray-300 mb-2 font-medium">
                  First Name *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-midnight-900/50 border border-electric-cyan/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-electric-cyan focus:ring-1 focus:ring-electric-cyan transition-colors"
                  placeholder="John"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-gray-300 mb-2 font-medium">
                  Last Name *
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-midnight-900/50 border border-electric-cyan/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-electric-cyan focus:ring-1 focus:ring-electric-cyan transition-colors"
                  placeholder="Doe"
                />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="email" className="block text-gray-300 mb-2 font-medium">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-midnight-900/50 border border-electric-cyan/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-electric-cyan focus:ring-1 focus:ring-electric-cyan transition-colors"
                placeholder="john.doe@company.com"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="companyWebsite" className="block text-gray-300 mb-2 font-medium">
                Company Website
              </label>
              <input
                type="url"
                id="companyWebsite"
                name="companyWebsite"
                value={formData.companyWebsite}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-midnight-900/50 border border-electric-cyan/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-electric-cyan focus:ring-1 focus:ring-electric-cyan transition-colors"
                placeholder="https://www.company.com"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="question" className="block text-gray-300 mb-2 font-medium">
                Question *
              </label>
              <textarea
                id="question"
                name="question"
                value={formData.question}
                onChange={handleChange}
                required
                rows="5"
                className="w-full px-4 py-3 bg-midnight-900/50 border border-electric-cyan/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-electric-cyan focus:ring-1 focus:ring-electric-cyan transition-colors resize-none"
                placeholder="Tell us about your project or question..."
              />
            </div>

            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-300">
                Thank you for your message! We'll get back to you soon.
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300">
                There was an error submitting your form. Please try again.
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-electric-cyan to-blue-500 text-midnight-900 font-semibold px-8 py-4 rounded-lg hover:shadow-lg hover:shadow-electric-cyan/50 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? 'Submitting...' : 'Send Message'}
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-12 border-t border-electric-cyan/20">
        <div className="text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Tensoro. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
