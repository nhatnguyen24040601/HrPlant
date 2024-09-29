import SNSMobileSDK from '@sumsub/react-native-mobilesdk-module';

// ...

export const launchSNSMobileSDK = async () => {
    // From your backend get an access token for the applicant to be verified.
    // The token must be generated with `levelName` and `userId`,
    // where `levelName` is the name of a level configured in your dashboard.
    //
    // The sdk will work in the production or in the sandbox environment
    // depend on which one the `accessToken` has been generated on.
    //

    const accessToken =
        '_act-sbx-jwt-eyJhbGciOiJub25lIn0.eyJqdGkiOiJfYWN0LXNieC1iNmE4YWE1OC00ODhmLTQ2NTQtOTU2NS03YTAyY2Q1MDE0MmMtdjIiLCJ1cmwiOiJodHRwczovL2FwaS5zdW1zdWIuY29tIn0.-v2';

    const snsMobileSDK = SNSMobileSDK.init(accessToken, () => {
        // this is a token expiration handler, will be called if the provided token is invalid or got expired
        // call your backend to fetch a new access token (this is just an example)
        return fetch('http://example.org/', {
            method: 'GET',
        }).then((resp) => {
            // return a fresh token from here
            return 'new_access_token';
        });
    })
        .withHandlers({
            // Optional callbacks you can use to get notified of the corresponding events
            onStatusChanged: (event) => {
                console.log('onStatusChanged: [' + event.prevStatus + '] => [' + event.newStatus + ']');
            },
            onLog: (event) => {
                console.log('onLog: [Idensic] ' + event.message);
            },
        })
        .withDebug(true)
        .withLocale('en') // Optional, for cases when you need to override the system locale
        .build();

    snsMobileSDK
        .launch()
        .then((result) => {
            console.log('SumSub SDK State: ' + JSON.stringify(result));
        })
        .catch((err) => {
            console.log('SumSub SDK Error: ' + JSON.stringify(err));
        });
};
