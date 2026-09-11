# ThirdDegree

## PostgreSQL database

The database schema is in [`database/schema.sql`](database/schema.sql).
It supports two roles:

- **Farm owner**: owns farms, solar/wind assets, sensor readings, and AI analyses.
- **Technician**: has a searchable profile with location, specialization, experience, and charges.

The shared `users` table stores authentication and common identity fields. Farms,
assets, sensor readings, AI analyses, and technician profiles reference users.

Create a database and apply the schema with:

```bash
createdb thirddegree
psql -d thirddegree -f database/schema.sql
```

The MVP stores technician contact information for external contact; it does not
add in-app chat, payments, or appointment booking.