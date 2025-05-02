-- Enable RLS on all tables
ALTER TABLE "Company" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "WAInstance" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "WebhookEvent" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "OutgoingMessage" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "FailedDispatch" ENABLE ROW LEVEL SECURITY;

-- Company policies
CREATE POLICY "Companies are viewable by their owners"
ON "Company" FOR SELECT
USING (auth.uid() IN (
  SELECT user_id FROM "CompanyUser" WHERE company_id = id
));

CREATE POLICY "Companies are insertable by authenticated users"
ON "Company" FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

-- WAInstance policies
CREATE POLICY "WAInstances are viewable by company members"
ON "WAInstance" FOR SELECT
USING (auth.uid() IN (
  SELECT user_id FROM "CompanyUser" WHERE company_id = company_id
));

CREATE POLICY "WAInstances are insertable by company members"
ON "WAInstance" FOR INSERT
WITH CHECK (auth.uid() IN (
  SELECT user_id FROM "CompanyUser" WHERE company_id = company_id
));

-- WebhookEvent policies
CREATE POLICY "WebhookEvents are viewable by company members"
ON "WebhookEvent" FOR SELECT
USING (auth.uid() IN (
  SELECT user_id FROM "CompanyUser" WHERE company_id = company_id
));

CREATE POLICY "WebhookEvents are insertable by company members"
ON "WebhookEvent" FOR INSERT
WITH CHECK (auth.uid() IN (
  SELECT user_id FROM "CompanyUser" WHERE company_id = company_id
));

-- OutgoingMessage policies
CREATE POLICY "OutgoingMessages are viewable by company members"
ON "OutgoingMessage" FOR SELECT
USING (auth.uid() IN (
  SELECT user_id FROM "CompanyUser" WHERE company_id = company_id
));

CREATE POLICY "OutgoingMessages are insertable by company members"
ON "OutgoingMessage" FOR INSERT
WITH CHECK (auth.uid() IN (
  SELECT user_id FROM "CompanyUser" WHERE company_id = company_id
));

-- FailedDispatch policies
CREATE POLICY "FailedDispatches are viewable by company members"
ON "FailedDispatch" FOR SELECT
USING (auth.uid() IN (
  SELECT user_id FROM "CompanyUser" WHERE company_id = company_id
));

CREATE POLICY "FailedDispatches are insertable by company members"
ON "FailedDispatch" FOR INSERT
WITH CHECK (auth.uid() IN (
  SELECT user_id FROM "CompanyUser" WHERE company_id = company_id
));