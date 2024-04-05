import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';
import { createRoot } from 'react-dom/client';


const root = createRoot(document.getElementById('root'));

root.render(
  <Auth0Provider
    domain="dev-q6sl7tm1jcbjck1h.eu.auth0.com"
    clientId="SEPkv7BoWWIUjthLLoT9KxYjj9b9E1TH"
    authorizationParams={{
      redirect_uri: 'http://localhost:5137/callback',
      audience: "https://smartfoxhome.com/api",
      response_type: "code",
      scope: "openid profile email",
    }}
  >
    <App />
  </Auth0Provider>
);

