-- =========================================================
-- RelayDesk Support Desk: Comprehensive Demo Dataset
-- Compatible with MySQL 8.0+ / MariaDB
-- =========================================================

SET FOREIGN_KEY_CHECKS = 0;

-- 1. Departments
INSERT INTO `department` (`id`, `name`, `description`, `createdAt`, `updatedAt`) VALUES
('dept-core', 'Core support', 'General platform inquiries and first-line support', NOW(), NOW()),
('dept-finance', 'Finance support', 'Billing, enterprise invoicing, and refund disputes', NOW(), NOW()),
('dept-enterprise', 'Enterprise', 'Dedicated enterprise accounts and SLA oversight', NOW(), NOW()),
('dept-data', 'Data support', 'Data analytics, exports, and warehouse synchronization', NOW(), NOW()),
('dept-security', 'Security & Compliance', 'Access control, SSO, audit trails, and privacy', NOW(), NOW()),
('dept-technical', 'Technical Operations', 'Webhooks, API reliability, and cloud infrastructure', NOW(), NOW()),
('dept-mobile', 'Product Engineering', 'Mobile applications and client SDK integrations', NOW(), NOW())
ON DUPLICATE KEY UPDATE `description` = VALUES(`description`);

-- 2. Teams
INSERT INTO `team` (`id`, `name`, `description`, `departmentId`, `createdAt`, `updatedAt`) VALUES
('team-core', 'Core support', 'Tier 1 Support Desk & General Triage', 'dept-core', NOW(), NOW()),
('team-enterprise', 'Enterprise', 'High-Touch Desk for Dedicated & Enterprise Accounts', 'dept-enterprise', NOW(), NOW()),
('team-billing', 'Billing Operations', 'Invoicing, Tax Exemptions, Disputes & Upgrades', 'dept-finance', NOW(), NOW()),
('team-data', 'Data support', 'Analytics Ingestion, Telemetry & BigQuery Pipelines', 'dept-data', NOW(), NOW()),
('team-security', 'Security & Trust', 'SAML/SSO Integrations, SOC2 Compliance & Access Audits', 'dept-security', NOW(), NOW()),
('team-mobile', 'Mobile Specialists', 'iOS, Android & Native SDK Diagnostics', 'dept-mobile', NOW(), NOW()),
('team-devops', 'Cloud Infrastructure', 'API Rate Limits, Webhooks & Service Reliability', 'dept-technical', NOW(), NOW()),
('team-leadership', 'Leadership & Escalations', 'Incident Escalations, QA & Workforce Management', 'dept-core', NOW(), NOW())
ON DUPLICATE KEY UPDATE `description` = VALUES(`description`);

-- 3. Roles
INSERT INTO `role` (`id`, `name`, `description`, `createdAt`) VALUES
('role-admin', 'Administrator', 'Full workspace access and management', NOW()),
('role-agent', 'Agent', 'Handle and resolve customer tickets', NOW()),
('role-manager', 'Manager', 'Oversee queues, SLA, and workloads', NOW()),
('role-customer', 'Customer', 'Submit tickets and view own updates', NOW())
ON DUPLICATE KEY UPDATE `description` = VALUES(`description`);

-- 4. Users
INSERT INTO `user` (`id`, `name`, `email`, `passwordHash`, `status`, `createdAt`, `updatedAt`) VALUES
('user-admin', 'Workspace administrator', 'admin@supportdesk.io', 'demo-hash', 'ACTIVE', NOW(), NOW()),
('user-kiran', 'Kiran Shah', 'kiran.shah@supportdesk.io', 'demo-hash', 'ACTIVE', NOW(), NOW()),
('user-ahmed', 'Ahmed Khan', 'ahmed.khan@supportdesk.io', 'demo-hash', 'ACTIVE', NOW(), NOW()),
('user-sara', 'Sara Davis', 'sara.davis@supportdesk.io', 'demo-hash', 'ACTIVE', NOW(), NOW()),
('user-maya', 'Maya Patel', 'maya.patel@supportdesk.io', 'demo-hash', 'ACTIVE', NOW(), NOW()),
('user-elena', 'Elena Rostova', 'elena.rostova@supportdesk.io', 'demo-hash', 'ACTIVE', NOW(), NOW()),
('user-marcus', 'Marcus Vance', 'marcus.vance@supportdesk.io', 'demo-hash', 'ACTIVE', NOW(), NOW()),
('user-liam', 'Liam O\'Connor', 'liam.oconnor@supportdesk.io', 'demo-hash', 'ACTIVE', NOW(), NOW()),
('user-aisha', 'Aisha Al-Mansoor', 'aisha.almansoor@supportdesk.io', 'demo-hash', 'ACTIVE', NOW(), NOW()),
('user-chen', 'Chen Wei', 'chen.wei@supportdesk.io', 'demo-hash', 'ACTIVE', NOW(), NOW()),
('user-sofia', 'Sofia Rodriguez', 'sofia.rodriguez@supportdesk.io', 'demo-hash', 'ACTIVE', NOW(), NOW()),
('user-david', 'David Kim', 'david.kim@supportdesk.io', 'demo-hash', 'ACTIVE', NOW(), NOW())
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`);

-- 5. Agents
INSERT INTO `agent` (`id`, `userId`, `teamId`, `departmentId`, `title`, `active`, `createdAt`, `updatedAt`) VALUES
('agent-kiran', 'user-kiran', 'team-leadership', 'dept-core', 'Head of Customer Experience', 1, NOW(), NOW()),
('agent-ahmed', 'user-ahmed', 'team-core', 'dept-core', 'Senior Technical Support Engineer', 1, NOW(), NOW()),
('agent-sara', 'user-sara', 'team-enterprise', 'dept-enterprise', 'Enterprise Account Specialist', 1, NOW(), NOW()),
('agent-maya', 'user-maya', 'team-leadership', 'dept-core', 'Support Operations Manager', 1, NOW(), NOW()),
('agent-elena', 'user-elena', 'team-billing', 'dept-finance', 'Senior Billing & Finance Lead', 1, NOW(), NOW()),
('agent-marcus', 'user-marcus', 'team-devops', 'dept-technical', 'DevOps & Infrastructure Specialist', 1, NOW(), NOW()),
('agent-liam', 'user-liam', 'team-data', 'dept-data', 'Data Pipeline & BigQuery Specialist', 1, NOW(), NOW()),
('agent-aisha', 'user-aisha', 'team-security', 'dept-security', 'Identity & Security Engineer', 1, NOW(), NOW()),
('agent-chen', 'user-chen', 'team-mobile', 'dept-mobile', 'Mobile SDK & API Specialist', 1, NOW(), NOW()),
('agent-sofia', 'user-sofia', 'team-enterprise', 'dept-enterprise', 'Customer Success Specialist', 1, NOW(), NOW()),
('agent-david', 'user-david', 'team-core', 'dept-core', 'Tier 1 Support Specialist', 1, NOW(), NOW())
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`);

-- 6. Customers
INSERT INTO `customer` (`id`, `name`, `email`, `company`, `phone`, `createdAt`, `updatedAt`) VALUES
('cust-maya', 'Maya Chen', 'maya.chen@acme.co', 'Acme Corp', '+1 (415) 555-0192', NOW(), NOW()),
('cust-theo', 'Theo Martin', 'theo.martin@northwind.io', 'Northwind Logistics', '+1 (206) 555-0144', NOW(), NOW()),
('cust-priya', 'Priya Nair', 'priya.nair@contoso.com', 'Contoso Health Systems', '+44 20 7946 0912', NOW(), NOW()),
('cust-jon', 'Jon Bell', 'jon.bell@globex.com', 'Globex Fintech Inc', '+1 (312) 555-0188', NOW(), NOW()),
('cust-owen', 'Owen Wilson', 'owen.wilson@example.com', 'Example Inc', '+1 (503) 555-0167', NOW(), NOW()),
('cust-aris', 'Dr. Aris Thorne', 'a.thorne@biovance.org', 'BioVance Therapeutics', '+1 (617) 555-0129', NOW(), NOW()),
('cust-camila', 'Camila Duarte', 'camila.duarte@nuveopay.io', 'Nuveo Payments LatAm', '+55 11 98765-4321', NOW(), NOW()),
('cust-lukas', 'Lukas Schneider', 'l.schneider@apexcloud.de', 'Apex Cloud Systems GmbH', '+49 89 1234 5678', NOW(), NOW()),
('cust-samantha', 'Samantha Sterling', 'samantha@sterlingcroft.co.uk', 'Sterling & Croft Media', '+44 161 496 0178', NOW(), NOW()),
('cust-hiroshi', 'Hiroshi Tanaka', 'h.tanaka@mirairobotics.jp', 'Mirai Robotics Ltd', '+81 3 5555 0143', NOW(), NOW()),
('cust-chloe', 'Chloe Bennett', 'chloe@hyperionretail.com', 'Hyperion Retail Analytics', '+1 (404) 555-0176', NOW(), NOW()),
('cust-zackary', 'Zackary Ross', 'zack@nomadgear.shop', 'Nomad Travel Gear', '+1 (303) 555-0111', NOW(), NOW()),
('cust-fatima', 'Fatima Zahra', 'fatima.z@atlasbank.ae', 'Atlas Digital Banking', '+971 4 321 9876', NOW(), NOW()),
('cust-gareth', 'Gareth Edwards', 'gareth.e@orbitalsat.co.uk', 'Orbital Satellites UK', '+44 117 496 0982', NOW(), NOW()),
('cust-nadia', 'Nadia Petrov', 'nadia@cloudnordic.se', 'CloudNordic Security AB', '+46 8 123 4567', NOW(), NOW())
ON DUPLICATE KEY UPDATE `company` = VALUES(`company`);

-- 7. Knowledge Base Articles
INSERT INTO `article` (`id`, `title`, `category`, `body`, `reads`, `createdAt`, `updatedAt`) VALUES
('article-sso', 'Configure SSO & SAML 2.0 for your workspace', 'Security', 'Single Sign-On (SSO) allows enterprise users to authenticate seamlessly using Okta, Azure AD, or Google Workspace. Configure SAML metadata, ACS URL, and X.509 certificates in workspace settings.', 482, NOW(), NOW()),
('article-members', 'Invite and manage workspace members & role-based permissions', 'Workspace', 'Manage team access levels, invite collaborators, and assign roles: Administrator, Support Agent, Manager, or Customer with granular permissions.', 319, NOW(), NOW()),
('article-invoices', 'Understanding invoice export formats, VAT, and billing cycles', 'Billing', 'Learn how to export invoices as PDF, CSV, and UBL XML, update EU VAT registration numbers for reverse-charge taxation, and manage annual licenses.', 275, NOW(), NOW()),
('article-webhooks', 'Webhook delivery failure troubleshooting & retry policies', 'Developer', 'Troubleshoot HTTP 504 timeouts and HMAC signature verification. RelayDesk implements exponential retries over a 4-hour window with dead-letter storage.', 198, NOW(), NOW()),
('article-mfa', 'Setting up Multi-Factor Authentication (MFA / 2FA)', 'Security', 'Secure account credentials using Google Authenticator, 1Password, or hardware FIDO2 YubiKeys, and manage emergency recovery codes.', 240, NOW(), NOW()),
('article-ratelimits', 'REST API rate limits, headers, and pagination best practices', 'Developer', 'Detailed documentation of X-RateLimit-Limit, X-RateLimit-Remaining, and X-RateLimit-Reset headers, pagination, and 429 exponential backoff handling.', 165, NOW(), NOW()),
('article-domains', 'Custom domain setup with automatic SSL/TLS certificate provisioning', 'Infrastructure', 'Configure CNAME records for branded portals (support.yourcompany.com) with automated zero-config Let\'s Encrypt SSL/TLS issuance and renewal.', 142, NOW(), NOW()),
('article-sla', 'Automated ticket routing & SLA escalation policies', 'Support Ops', 'Define first response and resolution targets by priority: Critical (15m), High (1h), Medium (4h), and Low (12h). Automate escalations to managers.', 288, NOW(), NOW()),
('article-email', 'Email integration, inbound ticket piping, and SPF/DKIM verification', 'Integration', 'Convert inbound emails to trackable tickets. Configure SPF and DKIM DNS records to ensure outbound replies pass customer spam filters reliably.', 215, NOW(), NOW()),
('article-gdpr', 'Exporting workspace data for GDPR, SOC2 & privacy compliance', 'Compliance', 'Fulfill customer Subject Access Requests (SAR) and Right-to-Erasure requests with one-click anonymization and machine-readable data exports.', 110, NOW(), NOW()),
('article-mobile-push', 'Mobile app push notification troubleshooting (iOS & Android)', 'Mobile', 'Fix notification latency on iOS and Android devices, override vendor battery optimization profiles, and synchronize APNS badge counts.', 134, NOW(), NOW()),
('article-audit-logs', 'Security audit logs and external SIEM telemetry streaming', 'Security', 'Stream authentication, permission changes, and ticket audit events to external SIEM platforms like Splunk, Datadog, or AWS CloudWatch.', 96, NOW(), NOW())
ON DUPLICATE KEY UPDATE `body` = VALUES(`body`), `reads` = VALUES(`reads`);

-- 8. Tickets
INSERT INTO `ticket` (`id`, `publicId`, `subject`, `description`, `module`, `category`, `status`, `priority`, `channel`, `sla`, `customerId`, `assigneeAgentId`, `assigneeLabel`, `departmentId`, `departmentLabel`, `teamId`, `teamLabel`, `createdAt`, `updatedAt`) VALUES
(1042, 'tkt-1042-pub', 'Invoice export returns a blank PDF', 'The finance team receives a completely blank PDF when exporting the monthly enterprise invoice report for October. Line items and payment receipts are not rendering.', 'Billing', 'Billing & Account', 'OPEN', 'CRITICAL', 'EMAIL', '00:42 left', 'cust-maya', 'agent-elena', 'Elena Rostova', 'dept-finance', 'Finance support', 'team-billing', 'Billing Operations', NOW() - INTERVAL 14 MINUTE, NOW()),
(1041, 'tkt-1041-pub', 'Cannot invite a new workspace member to Enterprise desk', 'When clicking the "+ Invite Member" button, the modal spins indefinitely and browser console displays a 403 Forbidden on the member provision endpoint.', 'Workspace', 'Technical Issue', 'PENDING', 'HIGH', 'CHAT', '02:18 left', 'cust-theo', 'agent-ahmed', 'Ahmed Khan', 'dept-core', 'Core support', 'team-core', 'Core support', NOW() - INTERVAL 42 MINUTE, NOW()),
(1040, 'tkt-1040-pub', 'SSO SAML 2.0 metadata setup questions for Okta integration', 'We are rolling out corporate SSO via Okta. Need assistance verifying our Entity ID, ACS URL, and setting up automated SCIM attribute mappings for departments.', 'Authentication', 'General Support', 'OPEN', 'MEDIUM', 'EMAIL', '05:40 left', 'cust-priya', 'agent-sara', 'Sara Davis', 'dept-enterprise', 'Enterprise', 'team-enterprise', 'Enterprise', NOW() - INTERVAL 1 HOUR, NOW()),
(1039, 'tkt-1039-pub', 'Real-time telemetry dashboard data is delayed by over 60 minutes', 'Our customer support analytics dashboard is showing events lagging by approximately 65 minutes. Ticket throughput graphs are not updating in real time.', 'Analytics', 'Technical Issue', 'OPEN', 'HIGH', 'API', '03:11 left', 'cust-jon', 'agent-liam', 'Liam O\'Connor', 'dept-data', 'Data support', 'team-data', 'Data support', NOW() - INTERVAL 2 HOUR, NOW()),
(1038, 'tkt-1038-pub', 'How do I change my daily team notification digest preferences?', 'Customer asked where individual notification digest preferences and Slack broadcast channel alerts can be customized in the admin panel.', 'Account', 'General Support', 'RESOLVED', 'LOW', 'WEB', 'Closed', 'cust-owen', 'agent-david', 'David Kim', 'dept-core', 'Core support', 'team-core', 'Core support', NOW() - INTERVAL 1 DAY, NOW()),
(1037, 'tkt-1037-pub', 'Critical: Production Webhook endpoints dropping payloads under high concurrency', 'During our flash transaction peak, our webhook endpoint started returning HTTP 504. Are webhooks queued with exponential retry or are payloads discarded?', 'Developer', 'Technical Issue', 'OPEN', 'CRITICAL', 'API', '00:28 left', 'cust-jon', 'agent-marcus', 'Marcus Vance', 'dept-technical', 'Technical Operations', 'team-devops', 'Cloud Infrastructure', NOW() - INTERVAL 25 MINUTE, NOW()),
(1036, 'tkt-1036-pub', 'EU VAT registration number reverse-charge validation failing at checkout', 'We are attempting to upgrade to Enterprise Annual. When entering our validated European VIES VAT ID, the system throws an validation error block.', 'Billing', 'Billing & Account', 'PENDING', 'HIGH', 'WEB', '01:50 left', 'cust-camila', 'agent-elena', 'Elena Rostova', 'dept-finance', 'Finance support', 'team-billing', 'Billing Operations', NOW() - INTERVAL 1 HOUR, NOW()),
(1035, 'tkt-1035-pub', 'SAML JIT provisioning is creating duplicate accounts for alias domains', 'Our organization has both @biovance.org and @biovancetherapeutics.com domains. When staff log in through Azure AD, the system creates parallel accounts instead of linking them.', 'Authentication', 'Technical Issue', 'OPEN', 'HIGH', 'EMAIL', '02:45 left', 'cust-aris', 'agent-aisha', 'Aisha Al-Mansoor', 'dept-security', 'Security & Compliance', 'team-security', 'Security & Trust', NOW() - INTERVAL 2 HOUR, NOW()),
(1034, 'tkt-1034-pub', 'Inbound email-to-ticket piping failing for PDF attachments larger than 15MB', 'Clients sending architectural blueprint submissions with 20MB attachments are receiving bounce-back notices from the inbound mail listener daemon.', 'Core', 'General Support', 'OPEN', 'MEDIUM', 'EMAIL', '04:15 left', 'cust-samantha', 'agent-ahmed', 'Ahmed Khan', 'dept-core', 'Core support', 'team-core', 'Core support', NOW() - INTERVAL 3 HOUR, NOW()),
(1033, 'tkt-1033-pub', 'Mobile App iOS crash on startup after updating to release v2.4.1', 'Five of our field engineering managers report instant app crash on iOS 17.5 immediately upon tapping the app icon. Android builds are operating normally.', 'Mobile', 'Technical Issue', 'OPEN', 'CRITICAL', 'CHAT', '01:10 left', 'cust-hiroshi', 'agent-chen', 'Chen Wei', 'dept-mobile', 'Product Engineering', 'team-mobile', 'Mobile Specialists', NOW() - INTERVAL 45 MINUTE, NOW()),
(1032, 'tkt-1032-pub', 'Custom domain SSL certificate renewal stuck in verification state', 'Our custom support portal support.apexcloud.de displays "Certificate Expiring Soon". CNAME records have been active for 48 hours but Let\'s Encrypt challenge has not completed.', 'Infrastructure', 'Technical Issue', 'PENDING', 'HIGH', 'WEB', '02:30 left', 'cust-lukas', 'agent-marcus', 'Marcus Vance', 'dept-technical', 'Technical Operations', 'team-devops', 'Cloud Infrastructure', NOW() - INTERVAL 4 HOUR, NOW()),
(1031, 'tkt-1031-pub', 'API 429 Too Many Requests response spike despite staying within 1800 rpm', 'Our automated warehouse sync script triggered multiple 429 errors today. Our metrics indicate average traffic was 1,200 rpm, well below our 1,800 limit.', 'Developer', 'Technical Issue', 'RESOLVED', 'MEDIUM', 'API', 'Closed', 'cust-chloe', 'agent-liam', 'Liam O\'Connor', 'dept-data', 'Data support', 'team-data', 'Data support', NOW() - INTERVAL 2 DAY, NOW()),
(1030, 'tkt-1030-pub', 'Request for latest SOC2 Type II audit compliance report and signed DPA', 'Our central compliance committee requires your latest annual SOC2 Type II report, ISO 27001 certificate, and our standard enterprise Data Processing Addendum.', 'Account', 'General Support', 'RESOLVED', 'LOW', 'EMAIL', 'Closed', 'cust-fatima', 'agent-sara', 'Sara Davis', 'dept-enterprise', 'Enterprise', 'team-enterprise', 'Enterprise', NOW() - INTERVAL 3 DAY, NOW()),
(1029, 'tkt-1029-pub', 'BigQuery data sync pipeline timeout on daily partition export', 'Our night batch ingestion job failed at 03:00 UTC with "BigQuery streaming insert quota exceeded". Need assistance reviewing our partitioned dataset settings.', 'Analytics', 'Technical Issue', 'OPEN', 'HIGH', 'API', '03:40 left', 'cust-gareth', 'agent-liam', 'Liam O\'Connor', 'dept-data', 'Data support', 'team-data', 'Data support', NOW() - INTERVAL 3 HOUR, NOW()),
(1028, 'tkt-1028-pub', 'Refund request for accidental duplicate seat add-on during checkout', 'While modifying our subscription last night, I accidentally selected 10 additional seats instead of 2. Can we please adjust our license count and credit the difference?', 'Billing', 'Billing & Account', 'RESOLVED', 'MEDIUM', 'WEB', 'Closed', 'cust-zackary', 'agent-elena', 'Elena Rostova', 'dept-finance', 'Finance support', 'team-billing', 'Billing Operations', NOW() - INTERVAL 1 DAY, NOW()),
(1027, 'tkt-1027-pub', 'WhatsApp business integration not delivering automated ticket receipt confirmation', 'Customers messaging our WhatsApp hotline are not receiving the automated "Ticket # created" greeting message, although tickets do populate in the queue.', 'Core', 'General Support', 'OPEN', 'MEDIUM', 'CHAT', '04:50 left', 'cust-nadia', 'agent-ahmed', 'Ahmed Khan', 'dept-core', 'Core support', 'team-core', 'Core support', NOW() - INTERVAL 2 HOUR, NOW()),
(1026, 'tkt-1026-pub', 'Assistance setting up Round-Robin ticket assignment across timezone teams', 'We have support reps in London, Singapore, and New York. How can we configure automated business hours routing so tickets automatically route to reps on active shift?', 'Workspace', 'General Support', 'RESOLVED', 'LOW', 'WEB', 'Closed', 'cust-theo', 'agent-maya', 'Maya Patel', 'dept-core', 'Core support', 'team-leadership', 'Leadership & Escalations', NOW() - INTERVAL 4 DAY, NOW()),
(1025, 'tkt-1025-pub', 'Export full ticket conversation history in CSV/JSON format for internal audit', 'Our internal audit department requires a complete raw export of all ticket discussions and resolution timestamps from Q3 for our ISO compliance record.', 'Account', 'General Support', 'RESOLVED', 'LOW', 'EMAIL', 'Closed', 'cust-maya', 'agent-kiran', 'Kiran Shah', 'dept-core', 'Core support', 'team-leadership', 'Leadership & Escalations', NOW() - INTERVAL 5 DAY, NOW())
ON DUPLICATE KEY UPDATE `status` = VALUES(`status`), `priority` = VALUES(`priority`);

SET FOREIGN_KEY_CHECKS = 1;
