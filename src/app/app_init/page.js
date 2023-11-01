import React from 'react';

const Init = () => {
    const jsonData = {
        "data": {
            "publicKey": process.env.PUBLIC_KEY,
            "defaultLanguage": process.env.DEFAULT_LANGUAGE || "EN",
            "minAndroidAppVersion": process.env.MIN_ANDROID_APP_VERSION || "",
            "minIOSAppVersion": process.env.MIN_IOS_APP_VERSION || "",
            "appInitSignature": "random_uuid"
        },
        "statusCode": 200,
        "message": "Success",
        "succeeded": true
    };

    return <pre>{JSON.stringify(jsonData, null, 2)}</pre>;
};

export default Init;
