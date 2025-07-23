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

---

- **User Authentication**: Sign up/sign in with Google or email/password using NextAuth.js.
- **Property Listings**: Users can list properties (villas/houses) with details.
- **Reservations**: Bookings for properties with date and guest management.
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
