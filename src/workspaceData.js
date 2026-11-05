export const initialAgents = [
  { id: 'agent-kiran', name: 'Kiran Shah', detail: 'Head of Customer Experience · Leadership', department: 'Leadership' },
  { id: 'agent-ahmed', name: 'Ahmed Khan', detail: 'Senior Technical Support Engineer · Core support', department: 'Core support' },
  { id: 'agent-sara', name: 'Sara Davis', detail: 'Enterprise Account Specialist · Enterprise', department: 'Enterprise' },
  { id: 'agent-maya', name: 'Maya Patel', detail: 'Support Operations Manager · Leadership', department: 'Leadership' },
  { id: 'agent-elena', name: 'Elena Rostova', detail: 'Senior Billing & Finance Lead · Finance support', department: 'Finance support' },
  { id: 'agent-marcus', name: 'Marcus Vance', detail: 'DevOps & Infrastructure Specialist · Technical Operations', department: 'Technical Operations' },
  { id: 'agent-liam', name: 'Liam O\'Connor', detail: 'Data Pipeline & BigQuery Specialist · Data support', department: 'Data support' },
  { id: 'agent-aisha', name: 'Aisha Al-Mansoor', detail: 'Identity & Security Engineer · Security & Compliance', department: 'Security & Compliance' },
  { id: 'agent-chen', name: 'Chen Wei', detail: 'Mobile SDK & API Specialist · Product Engineering', department: 'Product Engineering' },
  { id: 'agent-sofia', name: 'Sofia Rodriguez', detail: 'Customer Success Specialist · Enterprise', department: 'Enterprise' },
  { id: 'agent-david', name: 'David Kim', detail: 'Tier 1 Support Specialist · Core support', department: 'Core support' }
]

export const initialTeams = [
  { id: 'team-core', name: 'Core support', detail: 'Tier 1 Support Desk & General Triage' },
  { id: 'team-enterprise', name: 'Enterprise', detail: 'High-Touch Desk for Dedicated & Enterprise Accounts' },
  { id: 'team-billing', name: 'Billing Operations', detail: 'Invoicing, Tax Exemptions, Disputes & Upgrades' },
  { id: 'team-data', name: 'Data support', detail: 'Analytics Ingestion, Telemetry & BigQuery Pipelines' },
  { id: 'team-security', name: 'Security & Trust', detail: 'SAML/SSO Integrations, SOC2 Compliance & Access Audits' },
  { id: 'team-mobile', name: 'Mobile Specialists', detail: 'iOS, Android & Native SDK Diagnostics' },
  { id: 'team-devops', name: 'Cloud Infrastructure', detail: 'API Rate Limits, Webhooks & Service Reliability' },
  { id: 'team-leadership', name: 'Leadership & Escalations', detail: 'Incident Escalations, QA & Workforce Management' }
]

export const initialDepartments = [
  { id: 'dept-core', name: 'Core support', detail: 'General platform inquiries and first-line support' },
  { id: 'dept-finance', name: 'Finance support', detail: 'Billing, enterprise invoicing, and refund disputes' },
  { id: 'dept-enterprise', name: 'Enterprise', detail: 'Dedicated enterprise accounts and SLA oversight' },
  { id: 'dept-data', name: 'Data support', detail: 'Data analytics, exports, and warehouse synchronization' },
  { id: 'dept-security', name: 'Security & Compliance', detail: 'Access control, SSO, audit trails, and privacy' },
  { id: 'dept-technical', name: 'Technical Operations', detail: 'Webhooks, API reliability, and cloud infrastructure' },
  { id: 'dept-mobile', name: 'Product Engineering', detail: 'Mobile applications and client SDK integrations' }
]

export const initialArticles = [
  { 
    id: 'article-sso', 
    title: 'Configure SSO & SAML 2.0 for your workspace', 
    category: 'Security', 
    body: '## Overview\nSingle Sign-On (SSO) allows enterprise users to authenticate seamlessly using their existing Identity Provider (IdP) such as Okta, Microsoft Entra ID (Azure AD), Google Workspace, or PingFederate.\n\n### Step-by-Step Configuration\n1. Navigate to **Workspace Settings > Security & Authentication**.\n2. Under **SAML 2.0 Configuration**, copy the **ACS URL** (Assertion Consumer Service) and **Entity ID / Audience URI** into your IdP application settings.\n3. Upload your IdP’s Public X.509 Certificate and specify your Identity Provider Sign-in URL.\n4. Enable **Just-In-Time (JIT) Provisioning** if you would like new employees to have accounts created automatically upon first login.\n5. Click **Test SAML Handshake** to verify claims before enforcing SSO company-wide.\n\n> Note: Only workspace Administrators can modify security policies.', 
    reads: 482 
  },
  { 
    id: 'article-members', 
    title: 'Invite and manage workspace members & role-based permissions', 
    category: 'Workspace', 
    body: '## Member Management & Roles\nManage staff and collaborator access levels across teams and departments.\n\n### Available Roles\n- **Administrator**: Full privileges over billing, integrations, security, and team queues.\n- **Support Agent**: Can view, assign, reply to, and resolve customer tickets within their assigned department.\n- **Manager**: Queue oversight, SLA monitoring, routing reassignment, and reports access.\n- **Customer**: Access restricted strictly to tickets they have submitted or been CC\'d on.\n\n### Inviting Teammates\n1. Head to **Admin Console > Members**.\n2. Click **+ Invite Member** and supply their work email and primary department.\n3. An automated magic invite link will be dispatched with a 48-hour expiration.\n4. To revoke access or trigger a password reset, use the action menu on the member list row.', 
    reads: 319 
  },
  { 
    id: 'article-invoices', 
    title: 'Understanding invoice export formats, VAT, and billing cycles', 
    category: 'Billing', 
    body: '## Invoice & Billing Documentation\nLearn how billing intervals, multi-currency support, and tax exemptions operate.\n\n### Export Formats\n- **Standard PDF**: High-resolution print-ready invoice including tax breakdown, payment method identifier, and line-item descriptions.\n- **CSV / Spreadsheet**: Raw transactional export designed for enterprise ERP systems (NetSuite, QuickBooks, SAP).\n- **UBL XML**: European e-invoicing compliant machine-readable format.\n\n### Updating Tax / VAT Numbers\nTo apply reverse-charge VAT (applicable for EU/UK registered businesses):\n1. Visit **Settings > Billing Details**.\n2. Enter your validated VAT registration number or Tax ID.\n3. Our system runs an instant VIES validation. Once approved, subsequent invoices will be marked as VAT exempt.', 
    reads: 275 
  },
  {
    id: 'article-webhooks',
    title: 'Webhook delivery failure troubleshooting & retry policies',
    category: 'Developer',
    body: '## Troubleshooting Webhook Notifications\nWhen event-driven webhooks fail to reach your server, RelayDesk implements an exponential backoff retry mechanism.\n\n### Delivery Flow & Retries\n- Initial attempt: Real-time on event trigger.\n- Retry 1: 30 seconds after initial failure.\n- Retry 2: 5 minutes later.\n- Retry 3: 30 minutes later.\n- Final Retry: 4 hours later.\n\n### Verifying HMAC Signatures\nAll webhook requests include the header `X-RelayDesk-Signature`. Verify payloads using your endpoint signing secret with SHA-256 HMAC:\n```javascript\nconst crypto = require("crypto");\nconst hash = crypto.createHmac("sha256", webhookSecret).update(rawBody).digest("hex");\nconst isValid = crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(hash));\n```\n\n### Common HTTP Errors\n- **HTTP 401/403**: Invalid signing secret or firewall rule blocking RelayDesk IP ranges.\n- **HTTP 504 Gateway Timeout**: Endpoint took longer than 10 seconds to acknowledge with HTTP 200.',
    reads: 198
  },
  {
    id: 'article-mfa',
    title: 'Setting up Multi-Factor Authentication (MFA / 2FA)',
    category: 'Security',
    body: '## Securing Your Account with MFA\nProtecting client confidential information is paramount. Follow these steps to configure 2-Factor Authentication.\n\n### Supported Authenticators\n- **Software TOTP**: Google Authenticator, 1Password, Authy, Microsoft Authenticator.\n- **FIDO2 / Hardware Security Keys**: YubiKey 5 Series, Feitian keys.\n\n### Setup Steps\n1. Open your Profile menu by clicking your avatar in the upper right.\n2. Select **Account Security > Two-Factor Authentication**.\n3. Scan the QR code with your authenticator app and enter the 6-digit verification code.\n4. **Critical**: Download and save your 10 emergency recovery codes in a secure vault. Recovery codes can be used if your mobile device is lost.',
    reads: 240
  },
  {
    id: 'article-ratelimits',
    title: 'REST API rate limits, headers, and pagination best practices',
    category: 'Developer',
    body: '## API Quotas & Rate Limits\nOur API enforces rate limits to maintain optimal performance and quality of service for all tenants.\n\n### Default Quotas\n- **Standard Plan**: 600 requests per minute.\n- **Pro Plan**: 1,800 requests per minute.\n- **Enterprise Dedicated**: 10,000 requests per minute with burst capability.\n\n### Response Headers\nEvery response includes rate-limit telemetry:\n- `X-RateLimit-Limit`: Maximum requests permitted in current 60s window.\n- `X-RateLimit-Remaining`: Remaining request allowance.\n- `X-RateLimit-Reset`: UTC epoch timestamp indicating when the current window resets.\n\nIf you receive `HTTP 429 Too Many Requests`, inspect the `Retry-After` header and implement exponential jitter backoff.',
    reads: 165
  },
  {
    id: 'article-domains',
    title: 'Custom domain setup with automatic SSL/TLS certificate provisioning',
    category: 'Infrastructure',
    body: '## Using Your Company Domain\nBrand your support center with a custom domain (e.g., `support.yourcompany.com`).\n\n### Configuration Checklist\n1. In your DNS provider (Cloudflare, AWS Route 53, GoDaddy), create a **CNAME** record:\n   - **Host / Name**: `support` (or subdomain of choice)\n   - **Target / Value**: `cname.relaydesk.io`\n   - **TTL**: Auto or 300 seconds\n2. In RelayDesk, go to **Settings > Custom Domain** and enter your fully qualified domain name.\n3. Our edge infrastructure will verify DNS resolution and automatically issue a zero-config Let\'s Encrypt SSL/TLS certificate within 3-5 minutes.\n4. Enable **Enforce HTTPS** to redirect any legacy HTTP traffic.',
    reads: 142
  },
  {
    id: 'article-sla',
    title: 'Automated ticket routing & SLA escalation policies',
    category: 'Support Ops',
    body: '## SLA Policies & Response Targets\nService Level Agreements guarantee prompt attention for critical incidents and standard questions.\n\n### Default SLA Targets\n- **Critical (P0)**: 15-minute First Response | 2-hour Resolution Target\n- **High (P1)**: 1-hour First Response | 8-hour Resolution Target\n- **Medium (P2)**: 4-hour First Response | 24-hour Resolution Target\n- **Low (P3)**: 12-hour First Response | 72-hour Resolution Target\n\n### Automated Escalations\nIf a ticket is within 30 minutes of breaching its SLA target without an agent response:\n1. The ticket priority is visually flagged with an amber/red SLA timer badge.\n2. An automated notification alert is triggered to the department team manager.\n3. The ticket can optionally be auto-reassigned via round-robin to an on-duty backup agent.',
    reads: 288
  },
  {
    id: 'article-email',
    title: 'Email integration, inbound ticket piping, and SPF/DKIM verification',
    category: 'Integration',
    body: '## Setting Up Support Mailboxes\nConvert incoming emails into trackable support tickets automatically.\n\n### How It Works\n1. Forward your existing email address (e.g. `support@acme.com`) to your dedicated RelayDesk mailbox alias.\n2. To ensure emails sent from RelayDesk pass customer spam filters without warnings, add RelayDesk to your domain\'s DNS records:\n   - **SPF Record**: Include `include:_spf.relaydesk.io`\n   - **DKIM Key**: Create 2 CNAME records with selectors `relay1._domainkey` and `relay2._domainkey` provided in your admin console.\n   - **DMARC**: Align with `p=quarantine` or `p=reject` for maximum deliverability.',
    reads: 215
  },
  {
    id: 'article-gdpr',
    title: 'Exporting workspace data for GDPR, SOC2 & privacy compliance',
    category: 'Compliance',
    body: '## Data Sovereignty & GDPR Rights\nRelayDesk provides complete tools to fulfill customer Subject Access Requests (SAR) and Right-to-Erasure requests.\n\n### Customer Data Erasure (Right to be Forgotten)\n1. Open the Customer profile in **Workspace > Customers**.\n2. Click the action button and select **Execute GDPR Purge**.\n3. This permanently anonymizes personal identifiers (name, email, phone, IP address) across all ticket histories while preserving numeric ticket records for financial and statistical audit accuracy.',
    reads: 110
  },
  {
    id: 'article-mobile-push',
    title: 'Mobile app push notification troubleshooting (iOS & Android)',
    category: 'Mobile',
    body: '## Push Notification Delivery Guide\nEnsure your support agents never miss a critical ticket alert on mobile devices.\n\n### Common Issues & Resolutions\n- **iOS Notifications Delayed**: Check **Settings > RelayDesk > Background App Refresh** is toggled ON. Ensure \'Low Power Mode\' is disabled.\n- **Android Battery Optimization**: Devices running Samsung OneUI or Xiaomi MIUI aggressively kill background tasks. Navigate to **Battery > App Power Management > Unrestricted**.\n- **Badge Count Not Syncing**: Open the app and pull-to-refresh on the Tickets Queue to force an APNS badge re-sync.',
    reads: 134
  },
  {
    id: 'article-audit-logs',
    title: 'Security audit logs and external SIEM telemetry streaming',
    category: 'Security',
    body: '## Enterprise Audit Logging\nMonitor compliance, security events, and administrative activities across your organization.\n\n### Logged Events\n- User authentication, password modifications, and MFA resets\n- Role promotions, privilege changes, and API key generations\n- Ticket deletions, bulk exports, and customer record purges\n\n### SIEM Streaming\nStream audit events in real time to Splunk, Datadog, or AWS CloudWatch by configuring an Audit Log Webhook in **Admin Console > Security Integrations**.',
    reads: 96
  }
]
