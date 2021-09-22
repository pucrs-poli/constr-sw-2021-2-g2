module.exports = {
    env: 'production',
    secret: process.env.SECRET,
    databaseURI: process.env.DATABASE_URI,
    apiName: 'students-enrolls',
    apiPort: 3000,
    apiURL: process.env.API_URL,
    classURL: process.env.CLASS_URL,
    classUsername: process.env.CLASS_USERNAME,
    classPassword: process.env.CLASS_PASSWORD
}
