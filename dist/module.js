// link below gives insight on how to do this
// https://github.com/aws-amplify/amplify-js/blob/main/packages/amazon-cognito-identity-js/src/Client.js
let $149c1bd638913645$var$REACT_APP_COGNITO_CLIENT_ID;
const $149c1bd638913645$var$REACT_APP_COGNITO_URL = "";
const $149c1bd638913645$export$8d21e34596265fa2 = (clientId)=>{
    $149c1bd638913645$var$REACT_APP_COGNITO_CLIENT_ID = clientId;
};
const $149c1bd638913645$export$838e2a576d4d6ff6 = {
    "X-Amz-User-Agent": "Chrome",
    "Content-Type": "application/x-amz-json-1.1"
};
let $149c1bd638913645$export$b925888f05fd1fd;
(function(AuthTarget) {
    AuthTarget["SignUp"] = "AWSCognitoIdentityProviderService.SignUp";
    AuthTarget["ConfirmSignUp"] = "AWSCognitoIdentityProviderService.ConfirmSignUp";
    AuthTarget["ResendConfirmationCode"] = "AWSCognitoIdentityProviderService.ResendConfirmationCode";
    AuthTarget["InitiateAuth"] = "AWSCognitoIdentityProviderService.InitiateAuth";
})($149c1bd638913645$export$b925888f05fd1fd || ($149c1bd638913645$export$b925888f05fd1fd = {}));
let $149c1bd638913645$export$5c63b62ccf18ff3a;
(function(CognitoException) {
    CognitoException[// sign up exceptions
    "UsernameExistsException"] = "UsernameExistsException";
    CognitoException[// confirm sign up exceptions
    "ExpiredCodeException"] = "ExpiredCodeException";
    CognitoException["CodeMismatchException"] = "CodeMismatchException";
    CognitoException["TooManyFailedAttemptsException"] = "TooManyFailedAttemptsException";
    CognitoException[// resend verification exceptions
    "TooManyRequestsException"] = "TooManyRequestsException";
    CognitoException[// default error
    "DefaultError"] = "DefaultError";
})($149c1bd638913645$export$5c63b62ccf18ff3a || ($149c1bd638913645$export$5c63b62ccf18ff3a = {}));
const $149c1bd638913645$export$b5fe3f66a567bec0 = async (post)=>{
    try {
        const response = await post();
        const data = await response.json();
        if (response.ok) return data;
        if ("__type" in data) throw new $149c1bd638913645$export$36ba3035496698f9("response-error", data.__type);
        throw new Error("default error");
    } catch (error) {
        if (error instanceof $149c1bd638913645$export$36ba3035496698f9) throw error;
        throw new $149c1bd638913645$export$36ba3035496698f9("aws-cognito-error", $149c1bd638913645$export$5c63b62ccf18ff3a.DefaultError);
    }
};
const $149c1bd638913645$export$b813e82ac49a13e9 = (target, body)=>{
    return {
        headers: {
            ...$149c1bd638913645$export$838e2a576d4d6ff6,
            "X-Amz-Target": target
        },
        method: "POST",
        body: JSON.stringify({
            ClientId: $149c1bd638913645$var$REACT_APP_COGNITO_CLIENT_ID,
            ...body
        })
    };
};
const $149c1bd638913645$export$cf64224bcd829024 = async (email, password)=>{
    const requestInit = $149c1bd638913645$export$b813e82ac49a13e9($149c1bd638913645$export$b925888f05fd1fd.SignUp, {
        Password: password,
        UserAttributes: [
            {
                Name: "email",
                Value: email
            }
        ],
        Username: email
    });
    const post = $149c1bd638913645$var$createRequestFunction(requestInit);
    return await $149c1bd638913645$export$b5fe3f66a567bec0(post);
};
const $149c1bd638913645$export$9670d83f11d4b64a = async (email, password)=>{
    const requestInit = $149c1bd638913645$export$b813e82ac49a13e9($149c1bd638913645$export$b925888f05fd1fd.InitiateAuth, {
        AuthFlow: "USER_PASSWORD_AUTH",
        AuthParameters: {
            USERNAME: email,
            PASSWORD: password
        }
    });
    const post = $149c1bd638913645$var$createRequestFunction(requestInit);
    return await $149c1bd638913645$export$b5fe3f66a567bec0(post);
};
const $149c1bd638913645$export$2ce39ab6662e8c24 = async (email, confirmationCode)=>{
    const requestInit = $149c1bd638913645$export$b813e82ac49a13e9($149c1bd638913645$export$b925888f05fd1fd.ConfirmSignUp, {
        ConfirmationCode: confirmationCode,
        Username: email
    });
    const post = $149c1bd638913645$var$createRequestFunction(requestInit);
    return await $149c1bd638913645$export$b5fe3f66a567bec0(post);
};
const $149c1bd638913645$export$f24137cafeaef1a1 = async (email)=>{
    const requestInit = $149c1bd638913645$export$b813e82ac49a13e9($149c1bd638913645$export$b925888f05fd1fd.ResendConfirmationCode, {
        Username: email
    });
    const post = $149c1bd638913645$var$createRequestFunction(requestInit);
    return await $149c1bd638913645$export$b5fe3f66a567bec0(post);
};
const $149c1bd638913645$var$createRequestFunction = (requestInit)=>{
    return async ()=>fetch($149c1bd638913645$var$REACT_APP_COGNITO_URL, requestInit);
};
class $149c1bd638913645$export$36ba3035496698f9 extends Error {
    constructor(message, exception){
        super(message);
        this.message = message;
        this.exception = exception;
    }
}


export {$149c1bd638913645$export$8d21e34596265fa2 as configure, $149c1bd638913645$export$838e2a576d4d6ff6 as headers, $149c1bd638913645$export$b925888f05fd1fd as AuthTarget, $149c1bd638913645$export$5c63b62ccf18ff3a as CognitoException, $149c1bd638913645$export$b5fe3f66a567bec0 as request, $149c1bd638913645$export$36ba3035496698f9 as CognitoError, $149c1bd638913645$export$b813e82ac49a13e9 as generateRequestShape, $149c1bd638913645$export$cf64224bcd829024 as signUp, $149c1bd638913645$export$9670d83f11d4b64a as signIn, $149c1bd638913645$export$2ce39ab6662e8c24 as confirmSignUp, $149c1bd638913645$export$f24137cafeaef1a1 as resendConfirmationCode};
//# sourceMappingURL=module.js.map
