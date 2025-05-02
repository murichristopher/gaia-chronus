# Gaia Evolution API Integration Plan

## Overview

This document outlines the integration plan between Gaia and Evolution API to handle multiple companies' WhatsApp communications. The integration will allow each company to have their own WhatsApp instance with proper webhook configuration for message handling.

## Architecture

```
Gaia Platform
├── Company Management
│   ├── Company Profiles
│   ├── WhatsApp Instance Management
│   └── Webhook Configuration
├── Message Processing
│   ├── Incoming Messages
│   ├── Outgoing Messages
│   └── Message History
└── Integration Layer
    ├── Evolution API Client
    ├── Webhook Handler
    └── Database Storage
```

## Database Schema

### Companies Table

## API Routes

### Company Management

### WhatsApp Instance Management

#### Create Instance
```http
POST /api/companies/:companyId/instances
Content-Type: application/json

{
    "instanceName": "company-instance",
    "phoneNumber": "5511999999999",
    "webhookUrl": "https://gaia-api.com/webhook/company/:companyId"
}
```

#### Get Instance Status
```http
GET /api/companies/:companyId/instances/:instanceId/status
```

#### Configure Webhook
```http
POST /api/companies/:companyId/instances/:instanceId/webhook
Content-Type: application/json

{
    "webhookUrl": "https://gaia-api.com/webhook/company/:companyId",
    "events": [
        "MESSAGES_UPSERT",
        "MESSAGES_UPDATE",
        "CONNECTION_UPDATE"
    ]
}
```

### Message Management

#### Send Message
```http
POST /api/companies/:companyId/instances/:instanceId/messages
Content-Type: application/json

{
    "to": "5511999999999",
    "message": "Hello from Gaia!"
}
```

#### Get Message History
```http
GET /api/companies/:companyId/instances/:instanceId/messages
```

## Webhook Implementation

### Webhook Endpoint
```http
POST /webhook/company/:companyId
Content-Type: application/json

{
    "event": "MESSAGES_UPSERT",
    "instance": "instance-name",
    "data": {
        "key": {
            "remoteJid": "5511999999999@s.whatsapp.net",
            "fromMe": false,
            "id": "message_id"
        },
        "message": {
            "conversation": "Hello, this is a message"
        }
    }
}
```

### Webhook Handler Logic
1. Validate webhook signature
2. Identify company and instance
3. Store message in database
4. Process message based on business rules
5. Send automated response if needed

## Implementation Steps

1. **Setup Phase**
   - Create database tables
   - Implement company management
   - Set up Evolution API client

2. **Instance Management**
   - Implement instance creation flow
   - Handle QR code generation and scanning
   - Manage instance status

3. **Webhook Integration**
   - Set up webhook endpoints
   - Implement message processing
   - Handle different event types

4. **Message Management**
   - Implement message sending
   - Store message history
   - Handle message status updates

5. **Testing Phase**
   - Test instance creation
   - Test message sending/receiving
   - Test webhook handling
   - Test multi-company scenarios

## Security Considerations

1. API Key Management
   - Secure storage of Evolution API keys
   - Key rotation policies
   - Access control

2. Webhook Security
   - Webhook signature verification
   - Rate limiting
   - IP whitelisting

3. Data Protection
   - Message encryption
   - Secure storage
   - Access logging

## Monitoring and Maintenance

1. Instance Health
   - Connection status monitoring
   - Automatic reconnection
   - Error handling

2. Message Delivery
   - Delivery status tracking
   - Failed message handling
   - Retry mechanisms

3. Performance
   - Response time monitoring
   - Resource usage tracking
   - Scaling considerations

## Error Handling

1. Instance Errors
   - Connection failures
   - Authentication issues
   - Rate limiting

2. Message Errors
   - Failed deliveries
   - Invalid numbers
   - Content restrictions

3. Webhook Errors
   - Timeout handling
   - Retry mechanisms
   - Error logging

## Future Enhancements

1. Message Templates
   - Template management
   - Dynamic content
   - Multi-language support

2. Analytics
   - Message statistics
   - Response times
   - User engagement

3. Integration Features
   - CRM integration
   - Ticket system integration
   - Custom automation rules