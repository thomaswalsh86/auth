// auth.js

import { PublicClientApplication, Configuration, LogLevel, AuthenticationResult } from '@azure/msal-node';
import { msalConfig } from './auth-config';

// Configure the MSAL application (Public Client Application)

const pca = new PublicClientApplication(msalConfig);

// Function to get the authorization URL (for initiating login)
async function getAuthCodeUrl():Promise<string>{
    const authCodeUrlParameters = {
        scopes: ['user.read'],  // Scopes to request during authentication
        redirectUri: msalConfig.auth.redirectUri,
    };

    try {
        const authCodeUrl = await pca.getAuthCodeUrl(authCodeUrlParameters);
        return authCodeUrl;  // Return the URL where the user should be redirected
    } catch (error) {
        console.error('Error getting auth code URL:', error);
        throw error;
    }
}

//gets a token using the authorization code
async function acquireTokenByCode(code: string):Promise<string> {
    const tokenRequest = {
        code: code,  // The authorization code returned by Azure AD
        scopes: ['user.read'],  // Scopes to request during token exchange
        redirectUri: msalConfig.auth.redirectUri,
    };

    try {
        const response = await pca.acquireTokenByCode(tokenRequest);  // Exchange the code for a token
        return response.accessToken;  // Return the access token
    } catch (error) {
        console.error('Error acquiring token by code:', error);
        throw error;  // Propagate the error
    }
}

// Export the functions and MSAL client for use in other parts of the application
export {
    pca,
    getAuthCodeUrl,
    acquireTokenByCode,
};