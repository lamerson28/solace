# Solace Advocates 

## Next Steps
- Testing that is not extremely rudimentary
  - API testing
  - Loading states

- Accessibility
  - ARIA roles and labels
  - Labeling for search input
  - Pagination

- Data fetching
  - React Query or similar for caching, error handling, loading state (instead of fetching in useEffect)
  - Rate limiting, security

- Improve type contract between backend and frontend.
  - Ideal flow: Types on the frontend, which are generated from API types (Swagger/OpenAPI), which are generated from Drizzle

- UX
  - Infinite scroll for pagination
  - Search on specialty, years of experience, or phone number
  - Sorting on YoE
  - Filtering by location relative to the user
  - Phone number formatting