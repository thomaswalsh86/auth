import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { PublicClientApplication, EventType } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react'; 
import { msalConfig } from './auth-config';


const msalInstance = new PublicClientApplication(msalConfig);

//if no account is active on page load default to first account
if (!msalInstance.getActiveAccount() && msalInstance.getAllAccounts().length > 0) {
    msalInstance.setActiveAccount(msalInstance.getAllAccounts()[0]);
}

//event callback to handle login success
msalInstance.addEventCallback(event => {
    if (event.eventType === EventType.LOGIN_SUCCESS) {
        console.log("Login successful:", event);
    }
});

async function login() {
    const loginRequest = {
        scopes: ["user.read"],
    };

    try {
        await msalInstance.loginRedirect(loginRequest);
    } catch (error) {
        console.error("Error during login:", error);
    }
}

login();
// Render app to the DOM
const rootElement = document.getElementById('root');

if(!rootElement){
  throw new Error("Failed to find the root element");
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <MsalProvider instance={msalInstance}>
      <App />
    </MsalProvider>
  </React.StrictMode>
);