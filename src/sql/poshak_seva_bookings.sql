
create table poshak_seva_bookings (
  id uuid default uuid_generate_v4() primary key,
  full_name text not null,
  email text not null,
  mobile_number text not null,
  seva_date date not null,
  poshak_type text not null,
  occasion text,
  additional_notes text,
  created_at timestamp with time zone default now()
);
