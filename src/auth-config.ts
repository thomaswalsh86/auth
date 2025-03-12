// auth-config.ts
export const msalConfig = {
    auth: {
        clientId: 'YOUR_CLIENT_ID', // Replace with your Azure app client ID
        authority: 'https://login.microsoftonline.com/YOUR_TENANT_ID', // Replace with your Azure AD tenant ID
        redirectUri: 'http://localhost:3000',
    },
};