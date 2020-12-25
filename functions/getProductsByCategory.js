const admin = require('firebase-admin')
const Cors = require('cors')({ origin: true })

module.exports = async function getProductsByCategory(req, res) {
  Cors(req, res, async () => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    const { id } = req.body.data
    // console.log(req, 'req.options')
    const categories = await admin.firestore().collection('categories').doc(id).get()

    // console.log(categories, 'categories')

    res.json({status: 'OK', data: categories.data()})
  })
}