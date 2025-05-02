# Evolution API Commands

This document contains the curl commands for interacting with the Evolution API.

## Instance Management

### Create a WhatsApp Instance with Webhook

```bash
curl -X POST http://localhost:8080/instance/create \
  -H 'apikey: evolution_chronus_key_2024' \
  -H 'Content-Type: application/json' \
  -d '{
    "instanceName": "my-instance",
    "token": "my-token",
    "qrcode": true,
    "number": "5511999999999",
    "integration": "WHATSAPP-BAILEYS",
    "always_online": true,
    "read_messages": true,
    "read_status": true,
    "webhook": "https://your-webhook-url.com/webhook",
    "webhook_by_events": true,
    "events": [
      "MESSAGES_UPSERT",
      "MESSAGES_UPDATE",
      "MESSAGES_DELETE",
      "SEND_MESSAGE",
      "CONNECTION_UPDATE",
      "PRESENCE_UPDATE",
      "CHATS_UPSERT",
      "CHATS_UPDATE",
      "CHATS_DELETE",
      "CONTACTS_UPSERT",
      "CONTACTS_UPDATE",
      "GROUPS_UPSERT",
      "GROUPS_UPDATE",
      "GROUPS_PARTICIPANTS_UPDATE"
    ]
  }'
```

### Set Webhook for an Existing Instance

```bash
curl -X POST http://localhost:8080/webhook/set \
  -H 'apikey: evolution_chronus_key_2024' \
  -H 'Content-Type: application/json' \
  -d '{
    "instance": "my-instance",
    "webhook": "https://your-webhook-url.com/webhook",
    "webhook_by_events": true,
    "events": [
      "MESSAGES_UPSERT",
      "MESSAGES_UPDATE",
      "MESSAGES_DELETE",
      "SEND_MESSAGE",
      "CONNECTION_UPDATE",
      "PRESENCE_UPDATE",
      "CHATS_UPSERT",
      "CHATS_UPDATE",
      "CHATS_DELETE",
      "CONTACTS_UPSERT",
      "CONTACTS_UPDATE",
      "GROUPS_UPSERT",
      "GROUPS_UPDATE",
      "GROUPS_PARTICIPANTS_UPDATE"
    ]
  }'
```

### Check Instance Connection State

```bash
curl -X GET http://localhost:8080/instance/connectionState/my-instance \
  -H 'apikey: evolution_chronus_key_2024'
```

### Fetch All Instances

```bash
curl -X GET http://localhost:8080/instance/fetchInstances \
  -H 'apikey: evolution_chronus_key_2024'
```

## Messaging

### Send a Text Message

```bash
curl -X POST http://localhost:8080/message/sendText/my-instance \
  -H 'apikey: evolution_chronus_key_2024' \
  -H 'Content-Type: application/json' \
  -d '{
    "number": "5511999999999",
    "text": "Hello from Evolution API!"
  }'
```

## Webhook Events

When a webhook is configured, you'll receive POST requests to your webhook URL with the following event structure:

```json
{
  "event": "MESSAGES_UPSERT",
  "instance": "my-instance",
  "data": {
    "key": {
      "remoteJid": "5511999999999@s.whatsapp.net",
      "fromMe": false,
      "id": "message_id"
    },
    "message": {
      "conversation": "Hello, this is a message"
    },
    "messageTimestamp": "1234567890",
    "status": "PENDING"
  }
}
```

### Common Webhook Events

1. `MESSAGES_UPSERT`: Triggered when a new message is received or sent
2. `MESSAGES_UPDATE`: Triggered when a message status is updated (delivered, read, etc.)
3. `CONNECTION_UPDATE`: Triggered when the connection state changes
4. `CHATS_UPSERT`: Triggered when a new chat is created
5. `CONTACTS_UPSERT`: Triggered when a new contact is added

## Notes

1. Replace `evolution_chronus_key_2024` with your actual API key
2. Replace `5511999999999` with the actual phone number (including country code)
3. Replace `my-instance` with your instance name
4. Replace `https://your-webhook-url.com/webhook` with your actual webhook URL
5. Make sure to scan the QR code after creating the instance before trying to send messages
6. Your webhook endpoint should be publicly accessible and able to handle POST requests
7. The webhook will receive events in real-time as they occur in your WhatsApp instance