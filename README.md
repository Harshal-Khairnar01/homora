## HOMORA

### Overview

**HOMORA** is a modern accommodation booking platform inspired by Airbnb, built with Next.js, React, Prisma, and MongoDB. It features user authentication (Google and credentials), property listings, reservations, and a clean, component-driven UI.

### Searching Functionality

HOMORA provides a flexible and interactive search experience for users to find properties based on various criteria.

**Key Features:**

- **Category Filtering:**  
  The `CategoryHandler` component displays available property categories. Users can select a category, which updates the URL query parameter (`cat`) and filters the displayed listings accordingly.

- **Location, Date, and People Count:**  
  The search bar in the `Navbar` allows users to filter properties by location, date, and guest count.

  - Location selection is handled via a country picker.
  - Date selection uses a calendar input (`CalenderInput`).
  - Guest and room counts are managed with counter inputs.

- **URL-based Filtering:**  
  Search parameters are managed using Next.js's `useSearchParams` and `useRouter` hooks, enabling deep linking and browser navigation.

- **Component-driven UI:**

  - `CategoryHandler`: Handles category selection and updates search parameters.
  - `CalenderInput`: Allows users to pick date ranges for their stay.
  - Counter inputs for specifying guest and room counts.

- **Extensible Search:**  
  The search system is modular, allowing for easy addition of new filters or search criteria.

**How to Use:**

1. Use the category bar to filter by property type.
2. Use the search bar to specify location, date, and guest details.
3. The page updates to show matching properties based on selected filters.

**Extending:**

- Add new filters by updating the search bar and query parameter handling.
- Integrate backend search APIs for advanced filtering and sorting.

### Single Listing Page

The **Single Listing Page** displays detailed information about a specific property, allowing users to view all relevant details and make a reservation.

**Key Features:**

- **Property Details:**  
  Shows the title, location, images, host information, guest/room/child counts, and category.
- **Host Info:**  
  Displays the host's name and profile image.
- **Category Highlight:**  
  Shows the property's category and its unique features.
- **Description:**  
  Full property description, formatted for readability.
- **Homora Shield:**  
  Information about booking protection and support.
- **Reservation:**  
  Integrated `ReservationComponent` allows users to select dates for booking using a calendar input.
- **Pricing:**  
  Clearly displays the nightly price.

**How to Use:**

1. Navigate to `/listings/[id]` for any property.
2. Review all property details.
3. Select your desired dates and proceed with reservation.

**Extending:**

- Add more property attributes or booking options.
- Integrate reviews, ratings, or additional host details.
- Enhance reservation logic for availability and pricing.

### Reservation Functionality

HOMORA enables users to reserve/book properties directly from the single listing page, with a user-friendly and robust reservation system.

**Key Features:**

- **Date Selection:**

  - The `ReservationComponent` provides a calendar input for users to select their desired date range for booking.
  - Booked/unavailable dates are blocked based on existing reservations, preventing double bookings.

- **Dynamic Pricing:**

  - The nightly price is displayed, and the total cost can be calculated based on the selected date range.

- **Reservation Submission:**

  - When a user selects dates and confirms, a reservation is created for the listing.
  - The system checks for conflicts and only allows valid bookings.

- **Integration:**
  - The reservation component receives the listing ID, price per day, and existing reservations as props, ensuring accurate availability and pricing.

**How to Use:**

1. On the single listing page, select your desired check-in and check-out dates using the calendar.
2. Review the price and details.
3. Confirm your reservation to book the property.

**Extending:**

- Add payment integration for paid bookings.
- Show a summary of all user reservations in their profile.
- Add cancellation and modification options for reservations.

### My Properties

The **My Properties** page displays all properties listed by the currently authenticated user.

**Key Features:**

- Shows a grid of all properties owned by the user.
- If no properties exist, prompts the user to add a new property via the "Become a Host" page.
- Each property is rendered using the `PropertyBox` component.

**How to Use:**

1. Navigate to `/mypages/properties` after signing in.
2. View, manage, or add new properties.

**Extending:**

- Add property management actions (edit, delete).
- Show property statistics or booking history.

---

### My Bookings

The **My Bookings** page lists all reservations made by the user.

**Key Features:**

- Displays a grid of all bookings using the `BookedCard` component.
- If no bookings exist, prompts the user to make a reservation.
- Only accessible to authenticated users.

**How to Use:**

1. Navigate to `/mypages/bookings` after signing in.
2. View all your reservations.

**Extending:**

- Add booking cancellation or modification options.
- Show booking details and payment status.

---

### My Favorites

The **My Favorites** page shows all properties the user has marked as favorites.

**Key Features:**

- Displays a grid of favorite listings using the `ListingCard` component.
- If no favorites exist, prompts the user to add favorites.
- Only accessible to authenticated users.

**How to Use:**

1. Navigate to `/mypages/favorites` after signing in.
2. View and manage your favorite properties.

**Extending:**

- Allow users to remove favorites.
- Add sorting or filtering options.

---

**Other User Pages:**  
If you have additional user-centric pages (e.g., profile, dashboard), document their purpose and features similarly.

---

- **Favorites**: Users can favorite properties.
- **Responsive UI**: Built with Tailwind CSS and Radix UI components.
- **API Routes**: RESTful endpoints for authentication and registration.

---

### Architecture

- **Frontend**: Next.js (App Router), React, Tailwind CSS.
- **Backend**: Next.js API routes, Prisma ORM.
- **Database**: MongoDB (via Prisma).
- **Authentication**: NextAuth.js with Google and credentials providers.
- **Component Structure**: Modular, reusable components (Navbar, LoginForm, UI elements).

---

### Key Components

- `Navbar`: Main navigation bar with search and user menu.
- `LoginForm`: Handles both sign-in and sign-up, supports Google OAuth.
- `DropdownMenu`, `Button`, `Input`: Custom UI components using Radix UI and Tailwind.
- `Icons`: SVG icons for branding and Google login.

---

### Database Models (`prisma/schema.prisma`)

- **User**: Stores user info, hashed password, favorites, and relations to accounts, listings, and reservations.
- **Listing**: Represents a property with details like title, description, category, location, price, and owner.
- **Reservation**: Booking details for a user and listing, including dates and total price.
- **Account**: OAuth account details for NextAuth.

---

### Authentication Flow

- **Sign Up**: `/sign-up` page, handled by `LoginForm`, posts to `/api/auth/register` (hashes password, creates user).
- **Sign In**: `/sign-in` page, handled by `LoginForm`, uses NextAuth credentials or Google.
- **Session Management**: JWT-based, with user info attached to session and token.

---

### API Endpoints

- `POST /api/auth/register`: Registers a new user with hashed password.
- `GET/POST /api/auth/[...nextauth]`: NextAuth.js handler for authentication.

---

### Setup & Usage

1. **Install dependencies**:  
   `npm install`

2. **Configure environment variables**:

   - `DATABASE_URL` (MongoDB connection string)
   - `GOOGLE_CLIENT_ID`, `GOOGLE_SECRET` (Google OAuth)
   - `NEXTAUTH_SECRET` (NextAuth secret)

3. **Run Prisma migrations**:  
   `npx prisma generate`

4. **Start development server**:  
   `npm run dev`

---

### File Structure Highlights

- `src/app/`: Next.js app directory (pages, API routes, layouts).
- `src/components/`: UI and functional components.
- `src/utils/`: Auth and Prisma utilities.
- `prisma/schema.prisma`: Database schema.

---

### Extending the App

- Add new property types or booking features by extending the `Listing` and `Reservation` models.
- Customize authentication providers in `src/utils/auth.js`.
- Enhance UI with more Radix UI or custom components.

---

### Become a Host

The **Become a Host** page allows authenticated users to list their own properties on HOMORA. This multi-step form guides hosts through the process of adding a new property, including:

- **Category Selection**: Choose the type of property (e.g., villa, house).
- **Location**: Select the property's country/location.
- **Details**: Specify room, guest, and child counts.
- **Images**: Upload property images.
- **Description**: Add a title and description for the listing.
- **Pricing**: Set the nightly price.

**Access**:

- Only authenticated users can access this page. Unauthenticated users are prompted to sign in.

**Component**:

- The form is implemented in `BecomeAHostComponent`, which manages step navigation, validation, and submission.

**How to Use**:

1. Navigate to `/become-a-host` after signing in.
2. Complete each step of the form.
3. Submit to list your property.

**Extending**:

- Add more steps or fields by updating `BecomeAHostComponent`.
- Customize categories and validations as needed.

---

---
