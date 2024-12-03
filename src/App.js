import React, { useState } from 'react';

const App = () => {
  const [tenantInfo, setTenantInfo] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  const baseTenant = 'base_tenant';
  const baseQlikApp = 'base_qlik_app';
  const hardcodedUser = 'user';
  const hardcodedPass = 'pass';

  const login  = () => { 
    console.log('Logging in...');
    // Simulate API call and response
    //get username from field:
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const h = username !== 'user1';

    if (username !== 'user1' || password !== 'password1') {
      console.error('Invalid username or password');
      return;
    }
    const response = { "username": username, "password": password };
    
    // Set user info
    setUserInfo(response);
    
  }
  const createTenant = () => {
    console.log(`Creating tenant based on ${baseTenant} and ${baseQlikApp}`);
    // Simulate API call and response
    
    const response = {
      tenant_Url: 'https://tenant.example.com',
      tenant_appId: 'sample_app_id',
      tenant_webIntegrationId: 'sample_web_integration_id',
      
      private_key: 'sample_pki',
      public_key: 'sample_pki',
    };
    
    setTenantInfo(response);
    console.log('Tenant created:', response);
  };

  const createUser = () => {
    if (!tenantInfo) {
      console.error('Tenant must be created first');
      return;
    }
    console.log(`Creating user with ${hardcodedUser}/${hardcodedPass}`);
    // Simulate API call and response
    const response = {
      userId: 'sample_user_id',
      userName: hardcodedUser
    };
    setUserInfo(response);
    console.log('User created:', response);
  };

  const browseIframe = () => {
    if (!tenantInfo || !userInfo) {
      console.error('Tenant and user must be created first');
      return;
    }
    console.log('Browsing IFRAME with tenant URL and App ID');
    // Simulate browsing
    const iframeSrc = `${tenantInfo.tenantUrl}/app/${tenantInfo.appId}`;
    console.log('IFRAME source:', iframeSrc);
  };

  return (
    <div>
      <h1>Qlik Tenant App</h1>
      <h2>LOGIN</h2>
      <div>
        <input type="text" id="username" placeholder="Username" />
        <input type="password" id="password" placeholder="Password" />
        <button onClick={login}>Login</button>
      </div>
      
      {userInfo && (
        <div>
          <button onClick={() => setUserInfo(null)}>Logout</button>
        </div>
      )}

      <button onClick={createTenant}>Create New Tenant</button>
      <button onClick={createUser}>Create User</button>
      <button onClick={browseIframe}>Browse</button>
      <div>
        <iframe title="Qlik Iframe" src={tenantInfo ? `${tenantInfo.tenantUrl}/app/${tenantInfo.appId}` : ''} width="600" height="400"></iframe>
      </div>
    </div>
  );
};

export default App;