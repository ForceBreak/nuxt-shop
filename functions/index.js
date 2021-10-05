const functions = require('firebase-functions');
const admin = require('firebase-admin');
const getProductsByCategory = require('./getProductsByCategory')


admin.initializeApp({
  credential: admin.credential.cert({
    "type": "service_account",
    "project_id": "nuxt-shop-93181",
    "private_key_id": "35da6d259d7fce37072ff752119e6f4812906560",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDFIupze69ygq0L\ntkTpF/kSoQZ2cpR94RWrhIbBEH4MjfWxglbaf/JwGrlSgD3sfn1InDiStiA7u7c1\nY0fkvsQeXJej6BEinRGz6iN80JDrHF6LcMedBLK+qLuSQCPPnl3BYj7W/z6cQjWq\n+qy9fFF9KS/RzMl8Jm8rq8qn9hPShGKpb6t1bG//DnblEWR7gAih8CQzSbdGxCEw\nEy+uRSoY4im0m5e4c0gMQD39NRkfN52YIap3ekx+6lAQqKlJcJj6sFi06U6NvTKJ\nZOwHGm4Ts029CcIoVnZ9VJGuI+3KygxrNB7B2teASv4WOAEaCrXsthZfpxcQU1hz\nYkve1gtRAgMBAAECggEACdLABWwGcaWhtTeieo3AcmFiIL78B6OCnJzOiPJvIIWm\npn8y4CGP6W6IeWwk4crqB+cqccOX6rgTdJpnUcaAf+2P3BnXWD7ky979AJZFQWT1\nEFxY4wnx1Pq0GZEfA7SN0hII5PZcNqW9NkFWYB0Qs7ScopcCe4BwCdheMWVLhrHt\n7PndBRanY6e1dmFJvmd1gDpoJ8c2iACjLllkBlKITFTNcq9eksdB9e96ZTN8PgH3\nwYCsQhQLFmMGlOqRuLm85qhasvFB68Wt8XZmL+H88OJ4u5C2Y/zE1UCUqxXHRv7/\nddu7TneU/LrVdWE1GHHR593jfEH0jxb1R7R7+e83AQKBgQD8Z6MWGOS3OUWCacW6\nv0wWt8YcGeksVRdq8RbvHcLeiu3LxcWnPoHZxtFnI0vTOWPE+usqugpi4uitjFod\nW50fHE1jxCFrKnjHWqPSvZ4N2ohDHMZCOk4FzXA9f+rQ9GuPM1SKGIgEtYhlkWoZ\nzW03+OGYqF/Du3kjgqkXMvSxAQKBgQDH8b/OWbgObfhBMd4n8Gy6HDlWNz6ayp9v\nTGi4gWADob2HvaFfbA6BO0gABFC5V/F3jwtflb9tU4Ft17y1j5L109eyaFXNEs0N\nPpyEibVhPNg7YxvBDpPBOiQTnNn4vcqlvO1Ae8SA5e1CiqQnDGtzgIX/x4Uco/jN\n27fusIAKUQKBgA0HcIS4fj3zB+KGgT11mIDntaNHtyCht9a+YTewqpmARGwrZluO\nv3c1ayPOz6A0qzDE3xTSi6y1F9u1jgVL8F1lwZzvx+XXSGrKBADh5uHCMRx9xMIw\nbkygYTXbf4yPwWmf9bI3N/Y+RK8xhW+VihjEkSinMGJTMBqkKQRYjgcBAoGBAJkd\nFSAlbqCGMEVktdZp9Ck1cecHGUcagauOnOcmE+vUETsAybI0IotuZT22EEdPBFfl\nT/VbzKMg/o2qVxXGo+ji2FwEMCiCDErnNp78gcy79m7L/7YAvr+LEZN/WyBz3tq6\n6gimfx2ideWuG/TXOvXRZ0wvc00yeFbUum7r9LFxAoGBAKO7TTI3G8ZDIfyiWIz0\nmEYH0Ycv1fx7Xr0p/0zXD0qbobuqRWK2YWGfkY2I8ocBE2TxN9RmjtLUeTTmG4+9\nGK9a+2UoKNYYZL0fBhuOCI7U/8cm125TWreWZ8nuVIQvk77bYr75/ZIRxOxAKp4E\nnwqqs8OAXoQdYaMGYluwojR+\n-----END PRIVATE KEY-----\n",
    "client_email": "nuxt-shop-93181@appspot.gserviceaccount.com",
    "client_id": "102029895572922882970",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/nuxt-shop-93181%40appspot.gserviceaccount.com"
  }),
  databaseURL: 'https://nuxt-shop-93181.firebaseio.com'
})
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

exports.getProductsByCategory = functions.https.onRequest(
  getProductsByCategory
)
