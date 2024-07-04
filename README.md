# KryptoniteApp API

The API for KryptoniteApp which handles registration, authentication, and file uploads.

## Group Authentication

### Register a New Kryptonian [POST /auth/register]

+ Request (application/json)
    + Body
        {
            "email": "kryptonian@example.com"
        }

+ Response 201 (application/json)
    + Body
        {
            "message": "Registration successful! Please check your email for confirmation."
        }

### Confirm Email [GET /auth/confirm/{token}]

+ Parameters
    + token: `abc123` (string) - Email confirmation token

+ Response 200 (application/json)
    + Body
        {
            "message": "Email confirmed successfully!"
        }

### Request OTP [POST /auth/request-otp]

+ Request (application/json)
    + Body
        {
            "email": "kryptonian@example.com"
        }

+ Response 200 (application/json)
    + Body
        {
            "message": "OTP sent to your email."
        }

### Verify OTP and Get Token [POST /auth/verify-otp]

+ Request (application/json)
    + Body
        {
            "email": "kryptonian@example.com",
            "otp": "123456"
        }

+ Response 200 (application/json)
    + Body
        {
            "token": "your-jwt-token"
        }

## Group API Key Management

### Generate API Key [POST /apikey/generate]

+ Request (application/json)
    + Body
        {
            "email": "kryptonian@example.com",
            "password": "password123"
        }

+ Response 201 (application/json)
    + Body
        {
            "apiKey": "generated-api-key"
        }

### Invalidate API Key [POST /apikey/invalidate]

+ Request (application/json)
    + Body
        {
            "apiKey": "generated-api-key"
        }

+ Response 200 (application/json)
    + Body
        {
            "message": "API key invalidated."
        }

## Group File Uploads

### Upload an Image [POST /files/upload]

+ Request (multipart/form-data)
    + Headers

            Authorization: API_KEY your-api-key

    + Body
        + file (file) - The image file to be uploaded

+ Response 201 (application/json)
    + Body
        {
            "message": "File uploaded successfully!",
            "fileUrl": "url-to-access-file"
        }

## Group Image Access

### Get All Images [GET /files/images]

+ Response 200 (application/json)
    + Body
        [
            {
                "id": "image1",
                "url": "url-to-access-image1"
            },
            {
                "id": "image2",
                "url": "url-to-access-image2"
            }
        ]

### Get Single Image [GET /files/images/{id}]

+ Parameters
    + id: `image1` (string) - The ID of the image

+ Response 200 (application/json)
    + Body
        {
            "id": "image1",
            "url": "url-to-access-image1"
        }



How to Use KrypotoniteApp API
Register a New Kryptonian: The /auth/register endpoint allows a new user to register by providing their email. They will receive a confirmation email.
Confirm Email: The /auth/confirm/{token} endpoint is used to confirm the email address with a token sent in the registration email.
Request OTP: The /auth/request-otp endpoint sends a One-Time Password (OTP) to the user's email for 2FA.
Verify OTP and Get Token: The /auth/verify-otp endpoint verifies the OTP and returns a JWT token for authenticated requests.
Generate API Key: The /apikey/generate endpoint generates an API key for the user.
Invalidate API Key: The /apikey/invalidate endpoint invalidates an existing API key.
Upload an Image: The /files/upload endpoint allows a user to upload an image file using their API key.
Get All Images: The /files/images endpoint retrieves a list of all images accessible without authentication.
Get Single Image: The /files/images/{id} endpoint retrieves a specific image by its ID.

