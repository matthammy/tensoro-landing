import { Resend } from 'resend';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Initialize Resend with API key from environment variable
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    // Extract and validate form data
    const { firstName, lastName, email, companyWebsite, question } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !question) {
      return res.status(400).json({
        error: 'Missing required fields. firstName, lastName, email, and question are required.'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Validate URL format if provided
    if (companyWebsite && companyWebsite.trim() !== '') {
      try {
        new URL(companyWebsite);
      } catch (error) {
        return res.status(400).json({ error: 'Invalid company website URL format' });
      }
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Tensoro Contact Form <noreply@tensorolabs.com>',
      to: ['matt@tensorolabs.com'],
      subject: `New Contact Form Submission from ${firstName} ${lastName}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company Website:</strong> ${companyWebsite || 'Not provided'}</p>
        <p><strong>Question:</strong></p>
        <p>${question.replace(/\n/g, '<br>')}</p>
      `,
      text: `
New Contact Form Submission

Name: ${firstName} ${lastName}
Email: ${email}
Company Website: ${companyWebsite || 'Not provided'}
Question: ${question}
      `
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({ error: 'Failed to send email', details: error });
    }

    return res.status(200).json({
      success: true,
      message: 'Email sent successfully',
      emailId: data.id
    });

  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
}
