import React from 'react';
import './App.css';
import { useState } from "react";
import {Amplify} from 'aws-amplify';
import { withAuthenticator} from '@aws-amplify/ui-react';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

Amplify.configure(awsExports);

function App() {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [aliasValue, setaliasValue] = useState("");
  const [valuePassport, setvaluePassport] = useState(""); 
  const [DOB, setvalueDOB] = useState(new Date());
  const [externalIdProfile, setvalueexternalIdProfile] = useState(""); 
  const [issuer, setvalueissuer] = useState(""); 
  const [message, setMessage] = useState("");
  const [consentInterm, setvalueconsentInterm] = useState("option1");
  
  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
       let res = await fetch("http://127.0.01:5000/aliasCreate", {
      //  let res = await fetch("http://34.224.168.191:5000/aliasCreate", {
        method: "POST",
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          mobileNumber: mobileNumber,
          aliasValue: aliasValue,
          valuePassport: valuePassport,
          DOB: DOB,
          externalIdProfile: externalIdProfile,
          externalIdCard: externalIdProfile,
          issuer: issuer,
          consentInterm: consentInterm,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      // const data = await res.json();

      if (res.status === 200) {
        setfirstName("");
        setlastName("");
        setMobileNumber("");
        setMessage("User created successfully");
        //return data;
      } else {
        setMessage("Some error occured");
        //return data;
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (  
          <Authenticator>
            {({ signOut, user }) => (
              <main>
                <div className="App">
                  <header className="App-header">
                  
                   {/* Session Cognito starts off from this point*/}

                     <div className="AppForm">
                      <form onSubmit={handleSubmit}> 
                        <input
                          type="text"
                          value={firstName}
                          placeholder="First Name"
                          onChange={(e) => setfirstName(e.target.value)}
                        />
                        <div>
                        <input
                          type="text"
                          value={lastName}
                          placeholder="Last Name"
                          onChange={(e) => setlastName(e.target.value)}
                        />
                        </div>
                        <div>
                        <DatePicker selected={DOB} onChange={(DOB) => setvalueDOB(DOB)} />
                        </div>
                        <div>
                        <input
                          type="text"
                          value={mobileNumber}
                          placeholder="Mobile Number"
                          onChange={(e) => setMobileNumber(e.target.value)}
                        />
                       </div>
                       <div></div>
                        <input
                          type="text"
                          value={aliasValue}
                          placeholder="Alias Value (74958889979)"
                          onChange={(e) => setaliasValue(e.target.value)}
                        />
                        <div>
                        <input
                          type="text"
                          value={valuePassport}
                          placeholder="Passport (A123456)"
                          onChange={(e) => setvaluePassport(e.target.value)}
                        />
                        </div>
                        <div>
                        <input
                          type="text"
                          value={externalIdProfile}
                          placeholder="Exernal Id Profile"
                          onChange={(e) => setvalueexternalIdProfile(e.target.value)}
                        />
                         </div>
                         <div>
                        <input
                          type="text"
                          value={issuer}
                          placeholder="Issuer Name"
                          onChange={(e) => setvalueissuer(e.target.value)}
                        />
                         </div>


                         <div>
                            <select  value={consentInterm} onChange={setvalueconsentInterm}>
                            <option  value="Oxfam">Oxfam</option>
                            <option  value="ICR">ICR</option>
                          </select>

                      </div>

                        <hr />
                        <button type="submit">Register</button> <button onClick={signOut}>Sign out</button>
                        <div className="message">{message ? <p>{message}</p> : null}</div>
                      </form>
                    </div>
                   <div>
                   
                   </div>
                  </header>
                </div>
              </main>
            )}
          </Authenticator>
          
  );
}
export default withAuthenticator(App)


  
