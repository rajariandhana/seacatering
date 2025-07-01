Technical Challenge
SEA Catering

					(image generated with FLUX)

SEA Catering has recently gained a lot of attention for providing customizable healthy meals that can be delivered to cities across Indonesia. What started as a small business has now gone viral, leading to a huge increase in orders from customers all over the country. To keep up with this rapid growth and ensure our customers have a better experience, we’ve decided to invest in a web or mobile app. 

The app will help streamline the ordering process, allow customers to customize their meals, see detailed nutritional information, and improve delivery logistics. We’re looking for someone to help bring this idea to life, a platform that will not only support our growing business but also make eating healthy more accessible for everyone in Indonesia.

Your task will be divided into five progressive levels. The higher the level, the more points you can earn. Note that each level builds on the previous one, so you must complete the earlier levels before proceeding to the higher ones.

Level Overview
Level 1: Welcome to SEA Catering! (10 pts)
Level 2: Making It Interactive (20 pts)
Level 3: Building a Subscription System  (25 pts)
Level 4: Securing SEA (25 pts)
Level 5: User & Admin Dashboard (20 pts)

## Level 1: Welcome to SEA Catering! (10 pts)
Congratulations! You’ve just accepted an internship as the newest member of the SEA Catering development team. We’re excited to have you join us and look forward to the fresh ideas you’ll bring as we continue to grow.

SEA Catering has seen rapid growth since we began offering customizable healthy meal plans delivered across Indonesia. What started as a small business has quickly become a nationwide sensation, and we’re working hard to meet the rising demand.

As an intern, your mission is to help us build a professional platform, a web or mobile app that will transform how customers interact with SEA Catering.

To get things rolling, we’re assigning you your first task:

Create a Homepage for SEA Catering
Your role is to develop an eye-catching Homepage for SEA Catering’s app. This page will help us make a great first impression and introduce visitors to who we are and what we do. For now, this page will include only static content (dynamic functionality will come later).

Here’s what we need the homepage to showcase:
- Business Name: SEA Catering
- Slogan: “Healthy Meals, Anytime, Anywhere”
- Content to include:
  A welcoming section introducing SEA Catering as a customizable healthy meal service with delivery all across Indonesia.
  A list of our key features or services (e.g., meal customization, delivery to major cities, detailed nutritional information).
- Contact Details:
  Manager: Brian
  Phone Number: 08123456789


That’s it for your first challenge. Once you complete this task, we’ll move on to the next stage of the project when you’re ready. Good luck, you’ve got this!



## Level 2: Making It Interactive (20 pts)
Congratulations on successfully creating the SEA Catering homepage! Now, it’s time to enhance the user experience by making the application interactive. At this level, we will focus on adding essential functionalities to improve user engagement and navigation.

### 1) Interactive Navigation (5 pts)
The SEA Catering app needs an intuitive and user-friendly navigation system. Your task is to implement a responsive navigation bar that allows users to navigate between pages seamlessly.
Requirements:
Implement a navigation bar that includes links to:
Home (Landing Page)
Menu / Meal Plans (Showcase the available meal plans)
Subscription (A page for customers to subscribe to a plan)
Contact Us (Display business contact details)
The navigation bar should be responsive and work well on both desktop and mobile devices.
Highlight the current active page in the navigation bar.

### 2) Interactive Meal Plan Display (10 pts)
Customers should be able to explore available meal plans through an intuitive and interactive display.
Requirements:
Create a Menu / Meal Plans page that displays the different meal plans using interactive components (e.g., cards, collapsible sections, or modal pop-ups).
Each meal plan should show:
Plan Name
Meal Plan Price
Description
Image (optional)
Implement a "See More Details" button that opens a modal/pop-up showing additional plan information.

### 3) Testimonials Section (5 pts)
Add an interactive testimonial section to your app, allowing customers to share their experiences directly.
Requirements:
Create a form for submitting new testimonials. The form must include:
Customer Name
Review Message
Rating (e.g., stars or a numerical rating out of 5)
Add a testimonial slider or carousel showcasing customer reviews.
For now, you can use sample testimonials for the testimonials display, as the database is not integrated yet.

## Level 3: Building A Subscription System (25 pts)
As the business continues to grow, managing orders manually has become inefficient and unsustainable. To address this, we’re taking the next step by implementing a proper subscription system. This new feature will automate the ordering process, allowing customers to easily sign up for their preferred meal plans and receive their orders without any hassle. 

### 1) Create a Subscription Form (12 pts)
Your first task is to build a subscription form that allows users to input their details and customize their meal plans. 

The subscription form should include the following fields:
*Name: Full name of the user.
*Active Phone Number: A valid contact number for payment and order updates
*Plan Selection:
Diet Plan – Rp30.000,00 per meal
Protein Plan – Rp40.000,00 per meal
Royal Plan – Rp60.000,00 per meal
*Meal Type:
Users can select one or more meal options: Breakfast, Lunch, Dinner.
At least one meal type must be selected. (e.g., only Breakfast, Lunch + Dinner, or all three).
*Delivery Days:
Users can choose the days for meal delivery.
They can select any combination of days (e.g., Monday + Tuesday, or all 7 days of the week).
Allergies: Users can list any allergies or dietary restrictions.
Note: Fields marked with (*) are required and must be filled in before submitting the form. 

Price Calculation Formula:
The total price of the subscription must be calculated based on the following formula:
Total Price = (Plan Price) × (Number of Meal Types Selected) × (Number of Delivery Days Selected) × 4.3
Example Calculation:
If a user selects:
Plan: Protein Plan (Rp40.000 per meal)
Meal Types: Breakfast + Dinner (2 meal types)
Delivery Days: Monday to Friday (5 days)
The total price will be:
Rp40.000 × 2 × 5 × 4,3 = Rp1.720.000,00

### 2) Build and Integrate the Database (13 pts)
Your task is to build and integrate a backend database that supports the subscription form, meal plans, and testimonials form implemented previously. This database will serve as the backbone of the SEA Catering app, storing subscription details, meal plans, and users’ testimonials.


## Level 4: Securing SEA (25 pts)
With SEA Catering gaining more users daily, security is now a top priority. At this stage, you will protect the application against common security threats and ensure customer data remains safe. Your task is to implement authentication, authorization, and data protection mechanisms while ensuring best security practices are followed.

### 1) User Authentication & Authorization (15 pts)
The SEA Catering app must allow only registered users to subscribe and manage their meal plans.
Authentication Requirements:
Implement user registration with the following fields:
Full Name
Email (used for login)
Password (minimum 8 characters, must include uppercase, lowercase, number, and special character)
Implement user login and logout.
Use hashed passwords (do not store passwords in plain text).
Authorization Requirements:
Only authenticated users can subscribe, view, or modify their subscriptions.
Admins should have additional privileges to manage users and subscriptions.

### 2) Input Validation & Sanitization (10 pts)
To protect the system from malicious attacks, ensure all form inputs are properly validated and sanitized.
Sanitization Requirements:
Prevent XSS (Cross-Site Scripting):
Escape user input before rendering it on the page.
Test by inputting <script>alert("XSS Attack!")</script> into any field. If an alert pops up, it is vulnerable.
Prevent SQL Injection:
Use parameterized queries instead of directly injecting user input into database queries.
Test using '; DROP TABLE users; -- in input fields to check if the database is secure.
Prevent CSRF (Cross-Site Request Forgery):
Implement CSRF tokens for all forms that modify data.
Validate all form fields:
Ensure fields like email and phone numbers are properly formatted.
Reject empty or invalid inputs before storing them in the database.



## Level 5: User & Admin Dashboard (20 pts)
SEA Catering’s app has grown beyond our expectations. Congratulations! With thousands of customers subscribing to our services and hundreds of sales each day, we need comprehensive dashboards for both users and administrators. These dashboards will not only give customers full control over their meal subscriptions but also provide SEA Catering’s management with invaluable business insights and data-driven decision-making tools.

### 1) User Dashboard (8 pts)
Your task is to create a user-friendly dashboard where customers can manage their subscriptions. This personalized space will give users full control over their SEA Catering experience.
The User Dashboard should contains:
View Active Subscriptions: Display details of the user’s current subscriptions, including plan name, meal types, delivery days, total price, and subscription status.
Pause Subscriptions: Allow users to temporarily pause their subscription by selecting a specific date range. During the pause period, no charges will be applied.
Cancel Subscriptions: Enable users to permanently cancel their subscription with a simple and clear confirmation process.

### 2) Admin Dashboard (12 pts)
Your task is to build an admin dashboard that provides key subscription metrics to help the SEA Catering team easily monitor business performance.
The Admin Dashboard should contains:
Date Range Selector: Allow filtering data within a chosen date range.
New Subscriptions: Show the total number of new subscriptions during the selected period.
Monthly Recurring Revenue (MRR): Display the total revenue from active subscriptions during the selected period.
Reactivations: Show the number of subscriptions that were cancelled and then restarted during the selected period.
Subscription Growth: Present the overall number of active subscriptions.

Finalizing!
You've wrapped up an impressive project with SEA Catering that really shows your growth as a software engineer. When Brian's congratulations landed in your inbox after finishing the app, you felt genuine pride in what you accomplished. As this project adds to your career, you now wait to hear if you will be invited to interview for a full-time position. You are ready for whatever comes next. Thank you!

Assessment Components:
Completeness of the criterias on each level
Clean code
Clean project architecture
Responsive layout
Readme documentation

Additional Bonus Points (25 pts):
Good, creative and intuitive UI (10 pts)
Deployment (15 pts): You have the freedom to choose any deployment method you prefer.

Delivery:
Works on Any Machine: Make sure your project can run on any machine, not just yours!
Repository Hosting: Push your project to a repository hosting service, such as GitHub or GitLab. Make sure your project visibility is set to public for access and review.
README: Include a detailed README in your project root explaining how to set up and run your application, also include any environment variables that are needed to run the application. If you implemented an admin functionality, please include instructions in your README on how to create an admin account (e.g., through initial setup like a database script).
Git Commit History: Please commit step by step as you progress through your project. Do not squash all your changes into a single commit. We want to see your development process and progress through your commit history.
Errors in program assessment due to unclear instructions are beyond our responsibility.


Additional Notes:
Feel free to use any kind of website or mobile framework. There are no limitations on what technologies you use to build your application.
Be creative with your application! The criterias provided functions as a blueprint for your application. Feel free to add more features you think fit well with your application.

Examples:
https://www.hellofresh.com/


Contact Person
Rusydan
WhatsApp: 081282813338

Rae
ID Line: ratihpri79
