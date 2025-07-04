-- Enable RLS for multi-tenant tables
ALTER TABLE salons ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE reminder_queue ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Policy: Only allow access to rows where user is owner or client
CREATE POLICY "Salon owners can access their salons" ON salons
  FOR ALL USING (owner_id = auth.uid());

CREATE POLICY "Salon owners can access their appointments" ON appointments
  FOR ALL USING (
  salon_id IN (SELECT id FROM salons WHERE owner_id = auth.uid())
);

CREATE POLICY "Salon owners can access their services" ON services
  FOR ALL USING (
  salon_id IN (SELECT id FROM salons WHERE owner_id = auth.uid())
);

CREATE POLICY "Salon owners can access their products" ON products
  FOR ALL USING (
  salon_id IN (SELECT id FROM salons WHERE owner_id = auth.uid())
);

-- Policy: Clients can access their own appointments
CREATE POLICY "Clients can access their own appointments" ON appointments
  FOR ALL USING (client_id = auth.uid());

-- Policy: Platform admin (role = 'admin') can access everything
-- (Assumes a custom claim or metadata for admin role)
CREATE POLICY "Platform admin can access all" ON salons
  FOR ALL USING (auth.role() = 'admin');
CREATE POLICY "Platform admin can access all" ON appointments
  FOR ALL USING (auth.role() = 'admin');
CREATE POLICY "Platform admin can access all" ON services
  FOR ALL USING (auth.role() = 'admin');
CREATE POLICY "Platform admin can access all" ON products
  FOR ALL USING (auth.role() = 'admin');

-- Grant insert/update for owners and staff on their own salon's data
CREATE POLICY "Owner or staff can insert/update services" ON services
  FOR INSERT, UPDATE USING (
    salon_id IN (SELECT salon_id FROM profiles WHERE id = auth.uid() AND role IN ('owner', 'staff'))
  );

CREATE POLICY "Owner or staff can insert/update appointments" ON appointments
  FOR INSERT, UPDATE USING (
    salon_id IN (SELECT salon_id FROM profiles WHERE id = auth.uid() AND role IN ('owner', 'staff'))
  );

CREATE POLICY "Clients can book appointments" ON appointments
  FOR INSERT USING (
    salon_id IN (SELECT salon_id FROM profiles WHERE id = auth.uid())
  );

-- Allow users to read their own orders
CREATE POLICY "User can read own orders" ON orders
  FOR SELECT USING (user_id = auth.uid());

-- Allow salon owners to manage orders for their salon
CREATE POLICY "Owner can manage salon orders" ON orders
  FOR ALL USING (
    salon_id IN (SELECT id FROM salons WHERE owner_id = auth.uid())
  );

-- You may need to adjust policies for other tables as needed.
