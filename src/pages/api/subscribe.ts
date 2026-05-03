import type { APIRoute } from 'astro';
import fs from 'fs/promises';
import path from 'path';

// Endpoint to handle newsletter subscriptions
export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const email = data.email;

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return new Response(JSON.stringify({ error: 'Invalid email address' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Path to our mock database file
    const dbPath = path.resolve(process.cwd(), 'subscribers.json');

    // Read existing subscribers
    let subscribers = [];
    try {
      const fileContent = await fs.readFile(dbPath, 'utf-8');
      subscribers = JSON.parse(fileContent);
    } catch (e) {
      // File doesn't exist yet, we'll create it
    }

    // Check if email already exists
    if (subscribers.find((sub: any) => sub.email === email)) {
      return new Response(JSON.stringify({ error: 'Email already subscribed' }), {
        status: 409,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Add new subscriber
    subscribers.push({
      email,
      subscribedAt: new Date().toISOString(),
      status: 'active'
    });

    // Write back to file (Local Database representation)
    await fs.writeFile(dbPath, JSON.stringify(subscribers, null, 2));

    // =========================================================================
    // 🔗 SYNC WITH MAILCHIMP / LOOPS HERE
    // =========================================================================
    // Example: Sending the email to Loops.so
    // await fetch('https://app.loops.so/api/v1/contacts/create', {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${process.env.LOOPS_API_KEY}`,
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({ email })
    // });
    // =========================================================================

    // Return success response
    return new Response(JSON.stringify({ success: true, message: 'Successfully subscribed!' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: 'Server error processing request' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
