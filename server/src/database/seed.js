import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function seedDatabase(client = prisma) {
  console.log('Seeding MySQL database...')

  // Roles
  const roles = [
    { id: 'role-admin', name: 'Administrator', description: 'Full workspace access and management' },
    { id: 'role-agent', name: 'Agent', description: 'Handle and resolve customer tickets' },
    { id: 'role-manager', name: 'Manager', description: 'Oversee queues, SLA, and workloads' },
    { id: 'role-customer', name: 'Customer', description: 'Submit tickets and view own updates' },
  ]
  for (const role of roles) {
    await client.role.upsert({
      where: { name: role.name },
      update: {},
      create: role,
    })
  }

  // Users
  const users = [
    { id: 'user-admin', name: 'Workspace administrator', email: 'admin@supportdesk.io', passwordHash: 'demo-hash', status: 'ACTIVE' },
    { id: 'user-kiran', name: 'Kiran Shah', email: 'kiran.shah@supportdesk.io', passwordHash: 'demo-hash', status: 'ACTIVE' },
    { id: 'user-ahmed', name: 'Ahmed Khan', email: 'ahmed.khan@supportdesk.io', passwordHash: 'demo-hash', status: 'ACTIVE' },
    { id: 'user-sara', name: 'Sara Davis', email: 'sara.davis@supportdesk.io', passwordHash: 'demo-hash', status: 'ACTIVE' },
    { id: 'user-maya', name: 'Maya Patel', email: 'maya.patel@supportdesk.io', passwordHash: 'demo-hash', status: 'ACTIVE' },
    { id: 'user-elena', name: 'Elena Rostova', email: 'elena.rostova@supportdesk.io', passwordHash: 'demo-hash', status: 'ACTIVE' },
    { id: 'user-marcus', name: 'Marcus Vance', email: 'marcus.vance@supportdesk.io', passwordHash: 'demo-hash', status: 'ACTIVE' },
    { id: 'user-liam', name: 'Liam O\'Connor', email: 'liam.oconnor@supportdesk.io', passwordHash: 'demo-hash', status: 'ACTIVE' },
    { id: 'user-aisha', name: 'Aisha Al-Mansoor', email: 'aisha.almansoor@supportdesk.io', passwordHash: 'demo-hash', status: 'ACTIVE' },
    { id: 'user-chen', name: 'Chen Wei', email: 'chen.wei@supportdesk.io', passwordHash: 'demo-hash', status: 'ACTIVE' },
    { id: 'user-sofia', name: 'Sofia Rodriguez', email: 'sofia.rodriguez@supportdesk.io', passwordHash: 'demo-hash', status: 'ACTIVE' },
    { id: 'user-david', name: 'David Kim', email: 'david.kim@supportdesk.io', passwordHash: 'demo-hash', status: 'ACTIVE' },
  ]
  for (const user of users) {
    await client.user.upsert({
      where: { email: user.email },
      update: {},
      create: user,
    })
  }

  // Assign Admin & Agent roles to users
  const adminRole = await client.role.findUnique({ where: { name: 'Administrator' } })
  const agentRole = await client.role.findUnique({ where: { name: 'Agent' } })
  if (adminRole) {
    await client.userRole.upsert({
      where: { userId_roleId: { userId: 'user-admin', roleId: adminRole.id } },
      update: {},
      create: { userId: 'user-admin', roleId: adminRole.id }
    }).catch(() => {})
    await client.userRole.upsert({
      where: { userId_roleId: { userId: 'user-kiran', roleId: adminRole.id } },
      update: {},
      create: { userId: 'user-kiran', roleId: adminRole.id }
    }).catch(() => {})
  }
  if (agentRole) {
    for (const u of users) {
      if (u.id !== 'user-admin') {
        await client.userRole.upsert({
          where: { userId_roleId: { userId: u.id, roleId: agentRole.id } },
          update: {},
          create: { userId: u.id, roleId: agentRole.id }
        }).catch(() => {})
      }
    }
  }

  // Departments
  const departments = [
    { id: 'dept-core', name: 'Core support', description: 'General support questions, triage, and onboarding' },
    { id: 'dept-finance', name: 'Finance support', description: 'Billing, enterprise invoices, and tax exemptions' },
    { id: 'dept-enterprise', name: 'Enterprise', description: 'SSO, compliance, dedicated accounts, and SLA oversight' },
    { id: 'dept-data', name: 'Data support', description: 'Analytics, data sync, BigQuery pipelines, and reports' },
    { id: 'dept-security', name: 'Security & Compliance', description: 'Access control, SSO, audit trails, and privacy' },
    { id: 'dept-technical', name: 'Technical Operations', description: 'Webhooks, API reliability, and cloud infrastructure' },
    { id: 'dept-mobile', name: 'Product Engineering', description: 'Mobile applications and client SDK integrations' },
  ]
  for (const dept of departments) {
    await client.department.upsert({
      where: { name: dept.name },
      update: {},
      create: dept,
    })
  }

  // Teams
  const teams = [
    { id: 'team-core', name: 'Core support', description: 'Tier 1 Support Desk & General Triage', departmentId: 'dept-core' },
    { id: 'team-enterprise', name: 'Enterprise', description: 'High-Touch Desk for Dedicated & Enterprise Accounts', departmentId: 'dept-enterprise' },
    { id: 'team-billing', name: 'Billing Operations', description: 'Invoicing, Tax Exemptions, Disputes & Upgrades', departmentId: 'dept-finance' },
    { id: 'team-data', name: 'Data support', description: 'Analytics Ingestion, Telemetry & BigQuery Pipelines', departmentId: 'dept-data' },
    { id: 'team-security', name: 'Security & Trust', description: 'SAML/SSO Integrations, SOC2 Compliance & Access Audits', departmentId: 'dept-security' },
    { id: 'team-mobile', name: 'Mobile Specialists', description: 'iOS, Android & Native SDK Diagnostics', departmentId: 'dept-mobile' },
    { id: 'team-devops', name: 'Cloud Infrastructure', description: 'API Rate Limits, Webhooks & Service Reliability', departmentId: 'dept-technical' },
    { id: 'team-leadership', name: 'Leadership & Escalations', description: 'Incident Escalations, QA & Workforce Management', departmentId: 'dept-core' },
  ]
  for (const team of teams) {
    await client.team.upsert({
      where: { name: team.name },
      update: {},
      create: team,
    })
  }

  // Agents
  const agents = [
    { id: 'agent-kiran', userId: 'user-kiran', teamId: 'team-leadership', departmentId: 'dept-core', title: 'Head of Customer Experience' },
    { id: 'agent-ahmed', userId: 'user-ahmed', teamId: 'team-core', departmentId: 'dept-core', title: 'Senior Technical Support Engineer' },
    { id: 'agent-sara', userId: 'user-sara', teamId: 'team-enterprise', departmentId: 'dept-enterprise', title: 'Enterprise Account Specialist' },
    { id: 'agent-maya', userId: 'user-maya', teamId: 'team-leadership', departmentId: 'dept-core', title: 'Support Operations Manager' },
    { id: 'agent-elena', userId: 'user-elena', teamId: 'team-billing', departmentId: 'dept-finance', title: 'Senior Billing & Finance Lead' },
    { id: 'agent-marcus', userId: 'user-marcus', teamId: 'team-devops', departmentId: 'dept-technical', title: 'DevOps & Infrastructure Specialist' },
    { id: 'agent-liam', userId: 'user-liam', teamId: 'team-data', departmentId: 'dept-data', title: 'Data Pipeline & BigQuery Specialist' },
    { id: 'agent-aisha', userId: 'user-aisha', teamId: 'team-security', departmentId: 'dept-security', title: 'Identity & Security Engineer' },
    { id: 'agent-chen', userId: 'user-chen', teamId: 'team-mobile', departmentId: 'dept-mobile', title: 'Mobile SDK & API Specialist' },
    { id: 'agent-sofia', userId: 'user-sofia', teamId: 'team-enterprise', departmentId: 'dept-enterprise', title: 'Customer Success Specialist' },
    { id: 'agent-david', userId: 'user-david', teamId: 'team-core', departmentId: 'dept-core', title: 'Tier 1 Support Specialist' },
  ]
  for (const agent of agents) {
    await client.agent.upsert({
      where: { id: agent.id },
      update: {},
      create: agent,
    })
  }

  // Customers
  const customers = [
    { id: 'cust-maya', name: 'Maya Chen', email: 'maya.chen@acme.co', company: 'Acme Corp', phone: '+1 (415) 555-0192' },
    { id: 'cust-theo', name: 'Theo Martin', email: 'theo.martin@northwind.io', company: 'Northwind Logistics', phone: '+1 (206) 555-0144' },
    { id: 'cust-priya', name: 'Priya Nair', email: 'priya.nair@contoso.com', company: 'Contoso Health Systems', phone: '+44 20 7946 0912' },
    { id: 'cust-jon', name: 'Jon Bell', email: 'jon.bell@globex.com', company: 'Globex Fintech Inc', phone: '+1 (312) 555-0188' },
    { id: 'cust-owen', name: 'Owen Wilson', email: 'owen.wilson@example.com', company: 'Example Inc', phone: '+1 (503) 555-0167' },
    { id: 'cust-aris', name: 'Dr. Aris Thorne', email: 'a.thorne@biovance.org', company: 'BioVance Therapeutics', phone: '+1 (617) 555-0129' },
    { id: 'cust-camila', name: 'Camila Duarte', email: 'camila.duarte@nuveopay.io', company: 'Nuveo Payments LatAm', phone: '+55 11 98765-4321' },
    { id: 'cust-lukas', name: 'Lukas Schneider', email: 'l.schneider@apexcloud.de', company: 'Apex Cloud Systems GmbH', phone: '+49 89 1234 5678' },
    { id: 'cust-samantha', name: 'Samantha Sterling', email: 'samantha@sterlingcroft.co.uk', company: 'Sterling & Croft Media', phone: '+44 161 496 0178' },
    { id: 'cust-hiroshi', name: 'Hiroshi Tanaka', email: 'h.tanaka@mirairobotics.jp', company: 'Mirai Robotics Ltd', phone: '+81 3 5555 0143' },
    { id: 'cust-chloe', name: 'Chloe Bennett', email: 'chloe@hyperionretail.com', company: 'Hyperion Retail Analytics', phone: '+1 (404) 555-0176' },
    { id: 'cust-zackary', name: 'Zackary Ross', email: 'zack@nomadgear.shop', company: 'Nomad Travel Gear', phone: '+1 (303) 555-0111' },
    { id: 'cust-fatima', name: 'Fatima Zahra', email: 'fatima.z@atlasbank.ae', company: 'Atlas Digital Banking', phone: '+971 4 321 9876' },
    { id: 'cust-gareth', name: 'Gareth Edwards', email: 'gareth.e@orbitalsat.co.uk', company: 'Orbital Satellites UK', phone: '+44 117 496 0982' },
    { id: 'cust-nadia', name: 'Nadia Petrov', email: 'nadia@cloudnordic.se', company: 'CloudNordic Security AB', phone: '+46 8 123 4567' },
  ]
  for (const cust of customers) {
    await client.customer.upsert({
      where: { id: cust.id },
      update: {},
      create: cust,
    })
  }

  // Articles
  const articles = [
    { 
      id: 'article-sso', 
      title: 'Configure SSO & SAML 2.0 for your workspace', 
      category: 'Security', 
      body: 'Single Sign-On (SSO) allows enterprise users to authenticate seamlessly using Okta, Azure AD, or Google Workspace. Configure SAML metadata, ACS URL, and X.509 certificates in workspace settings.', 
      reads: 482 
    },
    { 
      id: 'article-members', 
      title: 'Invite and manage workspace members & role-based permissions', 
      category: 'Workspace', 
      body: 'Manage team access levels, invite collaborators, and assign roles: Administrator, Support Agent, Manager, or Customer with granular permissions.', 
      reads: 319 
    },
    { 
      id: 'article-invoices', 
      title: 'Understanding invoice export formats, VAT, and billing cycles', 
      category: 'Billing', 
      body: 'Learn how to export invoices as PDF, CSV, and UBL XML, update EU VAT registration numbers for reverse-charge taxation, and manage annual licenses.', 
      reads: 275 
    },
    {
      id: 'article-webhooks',
      title: 'Webhook delivery failure troubleshooting & retry policies',
      category: 'Developer',
      body: 'Troubleshoot HTTP 504 timeouts and HMAC signature verification. RelayDesk implements exponential retries over a 4-hour window with dead-letter storage.',
      reads: 198
    },
    {
      id: 'article-mfa',
      title: 'Setting up Multi-Factor Authentication (MFA / 2FA)',
      category: 'Security',
      body: 'Secure account credentials using Google Authenticator, 1Password, or hardware FIDO2 YubiKeys, and manage emergency recovery codes.',
      reads: 240
    },
    {
      id: 'article-ratelimits',
      title: 'REST API rate limits, headers, and pagination best practices',
      category: 'Developer',
      body: 'Detailed documentation of X-RateLimit-Limit, X-RateLimit-Remaining, and X-RateLimit-Reset headers, pagination, and 429 exponential backoff handling.',
      reads: 165
    },
    {
      id: 'article-domains',
      title: 'Custom domain setup with automatic SSL/TLS certificate provisioning',
      category: 'Infrastructure',
      body: 'Configure CNAME records for branded portals (support.yourcompany.com) with automated zero-config Let\'s Encrypt SSL/TLS issuance and renewal.',
      reads: 142
    },
    {
      id: 'article-sla',
      title: 'Automated ticket routing & SLA escalation policies',
      category: 'Support Ops',
      body: 'Define first response and resolution targets by priority: Critical (15m), High (1h), Medium (4h), and Low (12h). Automate escalations to managers.',
      reads: 288
    },
    {
      id: 'article-email',
      title: 'Email integration, inbound ticket piping, and SPF/DKIM verification',
      category: 'Integration',
      body: 'Convert inbound emails to trackable tickets. Configure SPF and DKIM DNS records to ensure outbound replies pass customer spam filters reliably.',
      reads: 215
    },
    {
      id: 'article-gdpr',
      title: 'Exporting workspace data for GDPR, SOC2 & privacy compliance',
      category: 'Compliance',
      body: 'Fulfill customer Subject Access Requests (SAR) and Right-to-Erasure requests with one-click anonymization and machine-readable data exports.',
      reads: 110
    },
    {
      id: 'article-mobile-push',
      title: 'Mobile app push notification troubleshooting (iOS & Android)',
      category: 'Mobile',
      body: 'Fix notification latency on iOS and Android devices, override vendor battery optimization profiles, and synchronize APNS badge counts.',
      reads: 134
    },
    {
      id: 'article-audit-logs',
      title: 'Security audit logs and external SIEM telemetry streaming',
      category: 'Security',
      body: 'Stream authentication, permission changes, and ticket audit events to external SIEM platforms like Splunk, Datadog, or AWS CloudWatch.',
      reads: 96
    }
  ]
  for (const art of articles) {
    await client.article.upsert({
      where: { id: art.id },
      update: {},
      create: art,
    })
  }

  // Settings
  await client.setting.upsert({
    where: { key: 'workspace_settings' },
    update: {},
    create: {
      key: 'workspace_settings',
      value: JSON.stringify({ email: true, realtime: true, sla: true, omnichannel: true }),
    },
  })

  // Automation Rules
  const rules = [
    { id: 'rule-escalate', name: 'Escalate critical tickets', triggerType: 'priority-critical', actionType: 'assign-manager', active: true, conditions: {}, action: { label: 'Assign to Support Manager + notify' } },
    { id: 'rule-sla', name: 'SLA risk alert', triggerType: 'sla-under-hour', actionType: 'notify-assignee', active: true, conditions: {}, action: { label: 'Notify assignee + manager' } },
    { id: 'rule-close', name: 'Close resolved tickets', triggerType: 'resolved-seven-days', actionType: 'archive-ticket', active: false, conditions: {}, action: { label: 'Archive ticket' } },
  ]
  for (const r of rules) {
    await client.automationRule.upsert({
      where: { id: r.id },
      update: {},
      create: r,
    })
  }

  // Tags
  const tagNames = [
    'SLA risk', 'Invoice', 'Invite', 'Workspace', 'SSO', 'Enterprise', 'Data', 
    'Analytics', 'Incident', 'How-to', 'Webhook', 'P0', 'Developer', 'VAT', 
    'Identity', 'Azure AD', 'Security', 'Email', 'Attachment', 'iOS', 'Mobile', 
    'Crash', 'SSL', 'Domains', 'DNS', 'Infrastructure', 'API', 'Rate Limit', 
    'Resolved', 'Compliance', 'SOC2', 'BigQuery', 'Data Pipeline', 'Refund', 
    'Billing', 'WhatsApp', 'Omnichannel', 'Communication', 'Automation', 'Routing', 
    'Workforce', 'Audit', 'Reporting', 'Export'
  ]
  for (const name of tagNames) {
    await client.tag.upsert({
      where: { name },
      update: {},
      create: { name },
    })
  }

  // Tickets
  const ticketCount = await client.ticket.count()
  if (ticketCount === 0) {
    const ticketFixtures = [
      {
        id: 1042,
        subject: 'Invoice export returns a blank PDF',
        customerId: 'cust-maya',
        description: 'The finance team receives a completely blank PDF when exporting the monthly enterprise invoice report for October. Line items and payment receipts are not rendering.',
        module: 'Billing',
        category: 'Billing & Account',
        priority: 'CRITICAL',
        status: 'OPEN',
        assigneeAgentId: 'agent-elena',
        assigneeLabel: 'Elena Rostova',
        departmentId: 'dept-finance',
        departmentLabel: 'Finance support',
        teamId: 'team-billing',
        teamLabel: 'Billing Operations',
        channel: 'EMAIL',
        sla: '00:42 left',
        tags: ['SLA risk', 'Invoice', 'Billing'],
        comments: [{ body: 'We have escalated this to our billing PDF renderer service team to regenerate your invoice assets.', visibility: 'PUBLIC' }],
        activities: ['Ticket created via email', 'Priority raised to Critical', 'Assigned to Elena Rostova'],
      },
      {
        id: 1041,
        subject: 'Cannot invite a new workspace member to Enterprise desk',
        customerId: 'cust-theo',
        description: 'When clicking the "+ Invite Member" button, the modal spins indefinitely and browser console displays a 403 Forbidden on the member provision endpoint.',
        module: 'Workspace',
        category: 'Technical Issue',
        priority: 'HIGH',
        status: 'PENDING',
        assigneeAgentId: 'agent-ahmed',
        assigneeLabel: 'Ahmed Khan',
        departmentId: 'dept-core',
        departmentLabel: 'Core support',
        teamId: 'team-core',
        teamLabel: 'Core support',
        channel: 'CHAT',
        sla: '02:18 left',
        tags: ['Invite', 'Workspace', 'Identity'],
        comments: [{ body: 'Requested a screen recording and browser console HAR export from the customer.', visibility: 'PUBLIC' }],
        activities: ['Ticket created via chat', 'Assigned to Ahmed Khan'],
      },
      {
        id: 1040,
        subject: 'SSO SAML 2.0 metadata setup questions for Okta integration',
        customerId: 'cust-priya',
        description: 'We are rolling out corporate SSO via Okta. Need assistance verifying our Entity ID, ACS URL, and setting up automated SCIM attribute mappings for departments.',
        module: 'Authentication',
        category: 'General Support',
        priority: 'MEDIUM',
        status: 'OPEN',
        assigneeAgentId: 'agent-sara',
        assigneeLabel: 'Sara Davis',
        departmentId: 'dept-enterprise',
        departmentLabel: 'Enterprise',
        teamId: 'team-enterprise',
        teamLabel: 'Enterprise',
        channel: 'EMAIL',
        sla: '05:40 left',
        tags: ['SSO', 'Enterprise', 'Security'],
        comments: [{ body: 'Sent Okta integration guide and verified ACS URL endpoint parameters with customer IT team.', visibility: 'PUBLIC' }],
        activities: ['Ticket created via email', 'Assigned to Sara Davis'],
      },
      {
        id: 1039,
        subject: 'Real-time telemetry dashboard data is delayed by over 60 minutes',
        customerId: 'cust-jon',
        description: 'Our customer support analytics dashboard is showing events lagging by approximately 65 minutes. Ticket throughput graphs are not updating in real time.',
        module: 'Analytics',
        category: 'Technical Issue',
        priority: 'HIGH',
        status: 'OPEN',
        assigneeAgentId: 'agent-liam',
        assigneeLabel: 'Liam O\'Connor',
        departmentId: 'dept-data',
        departmentLabel: 'Data support',
        teamId: 'team-data',
        teamLabel: 'Data support',
        channel: 'API',
        sla: '03:11 left',
        tags: ['Analytics', 'Incident', 'Data Pipeline'],
        comments: [],
        activities: ['Ticket created via API', 'Tagged as Incident', 'Assigned to Liam O\'Connor'],
      },
      {
        id: 1038,
        subject: 'How do I change my daily team notification digest preferences?',
        customerId: 'cust-owen',
        description: 'Customer asked where individual notification digest preferences and Slack broadcast channel alerts can be customized in the admin panel.',
        module: 'Account',
        category: 'General Support',
        priority: 'LOW',
        status: 'RESOLVED',
        assigneeAgentId: 'agent-david',
        assigneeLabel: 'David Kim',
        departmentId: 'dept-core',
        departmentLabel: 'Core support',
        teamId: 'team-core',
        teamLabel: 'Core support',
        channel: 'WEB',
        sla: 'Closed',
        resolvedAt: new Date(),
        tags: ['How-to', 'Resolved'],
        comments: [{ body: 'Provided direct walkthrough link to Settings > Notifications Digest preferences.', visibility: 'PUBLIC' }],
        activities: ['Ticket created via web form', 'Resolved by David Kim'],
      },
      {
        id: 1037,
        subject: 'Critical: Production Webhook endpoints dropping payloads under high concurrency',
        customerId: 'cust-jon',
        description: 'During our flash transaction peak, our webhook endpoint started returning HTTP 504. Are webhooks queued with exponential retry or are payloads discarded?',
        module: 'Developer',
        category: 'Technical Issue',
        priority: 'CRITICAL',
        status: 'OPEN',
        assigneeAgentId: 'agent-marcus',
        assigneeLabel: 'Marcus Vance',
        departmentId: 'dept-technical',
        departmentLabel: 'Technical Operations',
        teamId: 'team-devops',
        teamLabel: 'Cloud Infrastructure',
        channel: 'API',
        sla: '00:28 left',
        tags: ['Webhook', 'P0', 'SLA risk', 'Developer'],
        comments: [{ body: 'All failed webhooks are automatically queued in our RabbitMQ dead-letter exchange with 4 retry attempts over 4 hours.', visibility: 'PUBLIC' }],
        activities: ['Ticket created via API', 'Priority set to Critical', 'Assigned to Marcus Vance'],
      },
      {
        id: 1036,
        subject: 'EU VAT registration number reverse-charge validation failing at checkout',
        customerId: 'cust-camila',
        description: 'We are attempting to upgrade to Enterprise Annual. When entering our validated European VIES VAT ID, the system throws an validation error block.',
        module: 'Billing',
        category: 'Billing & Account',
        priority: 'HIGH',
        status: 'PENDING',
        assigneeAgentId: 'agent-elena',
        assigneeLabel: 'Elena Rostova',
        departmentId: 'dept-finance',
        departmentLabel: 'Finance support',
        teamId: 'team-billing',
        teamLabel: 'Billing Operations',
        channel: 'WEB',
        sla: '01:50 left',
        tags: ['VAT', 'Billing', 'Enterprise'],
        comments: [{ body: 'European VIES registry had a temporary maintenance window. We have manually verified your certificate and generated your pro-forma invoice.', visibility: 'PUBLIC' }],
        activities: ['Ticket created via web form', 'Assigned to Elena Rostova'],
      },
      {
        id: 1035,
        subject: 'SAML JIT provisioning is creating duplicate accounts for alias domains',
        customerId: 'cust-aris',
        description: 'Our organization has both @biovance.org and @biovancetherapeutics.com domains. When staff log in through Azure AD, the system creates parallel accounts instead of linking them.',
        module: 'Authentication',
        category: 'Technical Issue',
        priority: 'HIGH',
        status: 'OPEN',
        assigneeAgentId: 'agent-aisha',
        assigneeLabel: 'Aisha Al-Mansoor',
        departmentId: 'dept-security',
        departmentLabel: 'Security & Compliance',
        teamId: 'team-security',
        teamLabel: 'Security & Trust',
        channel: 'EMAIL',
        sla: '02:45 left',
        tags: ['SSO', 'Identity', 'Azure AD', 'Security'],
        comments: [],
        activities: ['Ticket created via email', 'Assigned to Aisha Al-Mansoor'],
      },
      {
        id: 1034,
        subject: 'Inbound email-to-ticket piping failing for PDF attachments larger than 15MB',
        customerId: 'cust-samantha',
        description: 'Clients sending architectural blueprint submissions with 20MB attachments are receiving bounce-back notices from the inbound mail listener daemon.',
        module: 'Core',
        category: 'General Support',
        priority: 'MEDIUM',
        status: 'OPEN',
        assigneeAgentId: 'agent-ahmed',
        assigneeLabel: 'Ahmed Khan',
        departmentId: 'dept-core',
        departmentLabel: 'Core support',
        teamId: 'team-core',
        teamLabel: 'Core support',
        channel: 'EMAIL',
        sla: '04:15 left',
        tags: ['Email', 'Attachment', 'Mailbox'],
        comments: [{ body: 'Our default inbound IMAP stream limit was capped at 15MB. We are updating the attachment buffer limit.', visibility: 'PUBLIC' }],
        activities: ['Ticket created via email', 'Assigned to Ahmed Khan'],
      },
      {
        id: 1033,
        subject: 'Mobile App iOS crash on startup after updating to release v2.4.1',
        customerId: 'cust-hiroshi',
        description: 'Five of our field engineering managers report instant app crash on iOS 17.5 immediately upon tapping the app icon. Android builds are operating normally.',
        module: 'Mobile',
        category: 'Technical Issue',
        priority: 'CRITICAL',
        status: 'OPEN',
        assigneeAgentId: 'agent-chen',
        assigneeLabel: 'Chen Wei',
        departmentId: 'dept-mobile',
        departmentLabel: 'Product Engineering',
        teamId: 'team-mobile',
        teamLabel: 'Mobile Specialists',
        channel: 'CHAT',
        sla: '01:10 left',
        tags: ['iOS', 'Mobile', 'Crash', 'P0', 'SLA risk'],
        comments: [{ body: 'We have identified a null pointer exception in the biometric FaceID initialization module. Hotfix build v2.4.2 is being submitted to TestFlight.', visibility: 'PUBLIC' }],
        activities: ['Ticket created via chat', 'Priority set to Critical', 'Assigned to Chen Wei'],
      },
      {
        id: 1032,
        subject: 'Custom domain SSL certificate renewal stuck in verification state',
        customerId: 'cust-lukas',
        description: 'Our custom support portal support.apexcloud.de displays "Certificate Expiring Soon". CNAME records have been active for 48 hours but Let\'s Encrypt challenge has not completed.',
        module: 'Infrastructure',
        category: 'Technical Issue',
        priority: 'HIGH',
        status: 'PENDING',
        assigneeAgentId: 'agent-marcus',
        assigneeLabel: 'Marcus Vance',
        departmentId: 'dept-technical',
        departmentLabel: 'Technical Operations',
        teamId: 'team-devops',
        teamLabel: 'Cloud Infrastructure',
        channel: 'WEB',
        sla: '02:30 left',
        tags: ['SSL', 'Domains', 'DNS', 'Infrastructure'],
        comments: [{ body: 'Found an existing CAA record on your apex domain restricting certificates to DigiCert only. Please add "letsencrypt.org" to your CAA DNS record.', visibility: 'PUBLIC' }],
        activities: ['Ticket created via web form', 'Assigned to Marcus Vance'],
      },
      {
        id: 1031,
        subject: 'API 429 Too Many Requests response spike despite staying within 1800 rpm',
        customerId: 'cust-chloe',
        description: 'Our automated warehouse sync script triggered multiple 429 errors today. Our metrics indicate average traffic was 1,200 rpm, well below our 1,800 limit.',
        module: 'Developer',
        category: 'Technical Issue',
        priority: 'MEDIUM',
        status: 'RESOLVED',
        assigneeAgentId: 'agent-liam',
        assigneeLabel: 'Liam O\'Connor',
        departmentId: 'dept-data',
        departmentLabel: 'Data support',
        teamId: 'team-data',
        teamLabel: 'Data support',
        channel: 'API',
        sla: 'Closed',
        resolvedAt: new Date(),
        tags: ['API', 'Rate Limit', 'Resolved'],
        comments: [{ body: 'Audit revealed micro-bursts of 80 requests in a 500ms window which triggered the per-second burst limiter. Implemented client-side token bucket algorithm.', visibility: 'PUBLIC' }],
        activities: ['Ticket created via API', 'Assigned to Liam O\'Connor', 'Resolved by Liam O\'Connor'],
      },
      {
        id: 1030,
        subject: 'Request for latest SOC2 Type II audit compliance report and signed DPA',
        customerId: 'cust-fatima',
        description: 'Our central compliance committee requires your latest annual SOC2 Type II report, ISO 27001 certificate, and our standard enterprise Data Processing Addendum.',
        module: 'Account',
        category: 'General Support',
        priority: 'LOW',
        status: 'RESOLVED',
        assigneeAgentId: 'agent-sara',
        assigneeLabel: 'Sara Davis',
        departmentId: 'dept-enterprise',
        departmentLabel: 'Enterprise',
        teamId: 'team-enterprise',
        teamLabel: 'Enterprise',
        channel: 'EMAIL',
        sla: 'Closed',
        resolvedAt: new Date(),
        tags: ['SOC2', 'Compliance', 'Security', 'Enterprise'],
        comments: [{ body: 'Countersigned DPA and secure link to our Trust Portal with SOC2 Type II package dispatched to your legal team.', visibility: 'PUBLIC' }],
        activities: ['Ticket created via email', 'Assigned to Sara Davis', 'Resolved by Sara Davis'],
      },
      {
        id: 1029,
        subject: 'BigQuery data sync pipeline timeout on daily partition export',
        customerId: 'cust-gareth',
        description: 'Our night batch ingestion job failed at 03:00 UTC with "BigQuery streaming insert quota exceeded". Need assistance reviewing our partitioned dataset settings.',
        module: 'Analytics',
        category: 'Technical Issue',
        priority: 'HIGH',
        status: 'OPEN',
        assigneeAgentId: 'agent-liam',
        assigneeLabel: 'Liam O\'Connor',
        departmentId: 'dept-data',
        departmentLabel: 'Data support',
        teamId: 'team-data',
        teamLabel: 'Data support',
        channel: 'API',
        sla: '03:40 left',
        tags: ['BigQuery', 'Data Pipeline', 'Analytics'],
        comments: [],
        activities: ['Ticket created via API', 'Assigned to Liam O\'Connor'],
      },
      {
        id: 1028,
        subject: 'Refund request for accidental duplicate seat add-on during checkout',
        customerId: 'cust-zackary',
        description: 'While modifying our subscription last night, I accidentally selected 10 additional seats instead of 2. Can we please adjust our license count and credit the difference?',
        module: 'Billing',
        category: 'Billing & Account',
        priority: 'MEDIUM',
        status: 'RESOLVED',
        assigneeAgentId: 'agent-elena',
        assigneeLabel: 'Elena Rostova',
        departmentId: 'dept-finance',
        departmentLabel: 'Finance support',
        teamId: 'team-billing',
        teamLabel: 'Billing Operations',
        channel: 'WEB',
        sla: 'Closed',
        resolvedAt: new Date(),
        tags: ['Billing', 'Refund', 'Resolved'],
        comments: [{ body: 'Adjusted seat count back to 5 seats and credited $480.00 to your original payment method.', visibility: 'PUBLIC' }],
        activities: ['Ticket created via web form', 'Assigned to Elena Rostova', 'Resolved by Elena Rostova'],
      },
      {
        id: 1027,
        subject: 'WhatsApp business integration not delivering automated ticket receipt confirmation',
        customerId: 'cust-nadia',
        description: 'Customers messaging our WhatsApp hotline are not receiving the automated "Ticket # created" greeting message, although tickets do populate in the queue.',
        module: 'Core',
        category: 'General Support',
        priority: 'MEDIUM',
        status: 'OPEN',
        assigneeAgentId: 'agent-ahmed',
        assigneeLabel: 'Ahmed Khan',
        departmentId: 'dept-core',
        departmentLabel: 'Core support',
        teamId: 'team-core',
        teamLabel: 'Core support',
        channel: 'CHAT',
        sla: '04:50 left',
        tags: ['WhatsApp', 'Omnichannel', 'Communication'],
        comments: [{ body: 'Checking Meta WhatsApp Business webhook callback tokens and rate limits.', visibility: 'PUBLIC' }],
        activities: ['Ticket created via chat', 'Assigned to Ahmed Khan'],
      },
      {
        id: 1026,
        subject: 'Assistance setting up Round-Robin ticket assignment across timezone teams',
        customerId: 'cust-theo',
        description: 'We have support reps in London, Singapore, and New York. How can we configure automated business hours routing so tickets automatically route to reps on active shift?',
        module: 'Workspace',
        category: 'General Support',
        priority: 'LOW',
        status: 'RESOLVED',
        assigneeAgentId: 'agent-maya',
        assigneeLabel: 'Maya Patel',
        departmentId: 'dept-core',
        departmentLabel: 'Core support',
        teamId: 'team-leadership',
        teamLabel: 'Leadership & Escalations',
        channel: 'WEB',
        sla: 'Closed',
        resolvedAt: new Date(),
        tags: ['Automation', 'Routing', 'Workforce'],
        comments: [{ body: 'Configured 3 automated shift rules in Automation Rules panel mapping tickets based on UTC receipt timestamp.', visibility: 'PUBLIC' }],
        activities: ['Ticket created via web form', 'Assigned to Maya Patel', 'Resolved by Maya Patel'],
      },
      {
        id: 1025,
        subject: 'Export full ticket conversation history in CSV/JSON format for internal audit',
        customerId: 'cust-maya',
        description: 'Our internal audit department requires a complete raw export of all ticket discussions and resolution timestamps from Q3 for our ISO compliance record.',
        module: 'Account',
        category: 'General Support',
        priority: 'LOW',
        status: 'RESOLVED',
        assigneeAgentId: 'agent-kiran',
        assigneeLabel: 'Kiran Shah',
        departmentId: 'dept-core',
        departmentLabel: 'Core support',
        teamId: 'team-leadership',
        teamLabel: 'Leadership & Escalations',
        channel: 'EMAIL',
        sla: 'Closed',
        resolvedAt: new Date(),
        tags: ['Reporting', 'Export', 'Audit'],
        comments: [{ body: 'Generated encrypted export archive and dispatched secure download token to verified administrator email.', visibility: 'PUBLIC' }],
        activities: ['Ticket created via email', 'Assigned to Kiran Shah', 'Resolved by Kiran Shah'],
      }
    ]

    for (const fixture of ticketFixtures) {
      const { tags, comments, activities, ...ticketData } = fixture
      const createdTicket = await client.ticket.create({
        data: ticketData,
      })

      // Link tags
      for (const tagName of tags) {
        const tag = await client.tag.findUnique({ where: { name: tagName } })
        if (tag) {
          await client.ticketTag.create({
            data: { ticketId: createdTicket.id, tagId: tag.id },
          }).catch(() => {})
        }
      }

      // Add comments
      for (const comm of comments) {
        await client.ticketComment.create({
          data: {
            ticketId: createdTicket.id,
            body: comm.body,
            visibility: comm.visibility || 'PUBLIC',
          },
        })
      }

      // Add activities
      for (const action of activities) {
        await client.ticketActivity.create({
          data: {
            ticketId: createdTicket.id,
            action,
          },
        })
      }
    }
  }

  console.log('Seeding completed successfully!')
}

if (process.argv[1]?.endsWith('seed.js')) {
  seedDatabase()
    .catch((error) => {
      console.error('Error seeding MySQL database:', error)
      process.exit(1)
    })
    .finally(() => prisma.$disconnect())
}
