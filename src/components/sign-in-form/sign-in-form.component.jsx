import { useState } from 'react';
import Button from '../button/button.component';
import FormInput from '../form-input/form-input.component';
import './sign-in-form.styles.scss';

import { signInWithSiteAccount, signInWithGooglePopup } from '../../utils/firebase/firebase.utils';

const defaultFormFields = {
    email: "",
    password: ""
};

const SignInForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields)
    const { email, password } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const handleChange = (event) => {
        const { name, value} = event.target;

        setFormFields({...formFields, [name]: value});

    };

    const signInUser = async (event) => {
        event.preventDefault();
        let signedInUser = null;
        switch(event.target.name){
            case "site-sign-in-button":
                if(!email || !password){
                    alert ("Please enter a valid email and password.");
                    return;
                }
                else {
                    // Sign In
                    signedInUser = await signInWithSiteAccount(email, password);
                }
            break;
            case "google-sign-in-button":
                // Sign In
                signedInUser = await signInWithGooglePopup();
            break;
            default: 
            return;
        }
        if(signedInUser){
            resetFormFields();
            // Go to Home
            console.log(signedInUser);
        }
        else {
            resetFormFields();
            alert("Error signing in");
        }
    };

    return (
      <div className='sign-in-form-container'>
        <form>
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>
            <FormInput
                label="email"
                type="email"
                onChange={handleChange}
                name="email"
                value={email}
                />
            <FormInput
                label="password"
                type="password"
                onChange={handleChange}
                name="password"
                value={password}
                />
            <div className='sign-in-form-container--button-container'>
            <Button
                style={{ marginRight: "20px" }}
                name="site-sign-in-button"
                onClick={signInUser}
            >
                SIGN IN
            </Button>
            <Button buttonType="google"
                name="google-sign-in-button"
                onClick={signInUser}
            >
                SIGN IN WITH GOOGLE
            </Button>
            </div>
        </form>
      </div>
    );
};

export default SignInForm;