const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

function generateReference (prefix) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let ref = prefix + '-'
  for (let i = 0; i < 8; i++) {
    ref += chars[Math.floor(Math.random() * chars.length)]
  }
  return ref
}

router.get('/', function (req, res) {
  res.redirect('/start')
})

router.get('/travel-date', function (req, res) {
  res.render('travel-date')
})

router.post('/travel-date', function (req, res) {
  const answer = req.session.data['travel-date']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'travel-date': 'Select when you need to travel.' }
    return res.render('travel-date')
  }
  if (answer === 'within-2-weeks') {
    return res.redirect('/current-passport')
  } else if (answer === '3-to-6-weeks') {
    return res.redirect('/current-passport')
  } else if (answer === 'more-than-6-weeks') {
    return res.redirect('/ineligible-travel-date')
  }
  res.redirect('/current-passport')
})

router.get('/ineligible-travel-date', function (req, res) {
  res.render('ineligible-travel-date')
})

router.get('/current-passport', function (req, res) {
  res.render('current-passport')
})

router.post('/current-passport', function (req, res) {
  const answer = req.session.data['current-passport']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'current-passport': 'Select whether you have your current passport.' }
    return res.render('current-passport')
  }
  if (answer === 'yes') {
    return res.redirect('/passport-condition')
  } else if (answer === 'can-get-it') {
    return res.redirect('/passport-condition')
  } else if (answer === 'lost-or-stolen') {
    return res.redirect('/ineligible-current-passport')
  }
  res.redirect('/passport-condition')
})

router.get('/ineligible-current-passport', function (req, res) {
  res.render('ineligible-current-passport')
})

router.get('/passport-condition', function (req, res) {
  res.render('passport-condition')
})

router.post('/passport-condition', function (req, res) {
  const answer = req.session.data['passport-condition']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'passport-condition': 'Select whether your passport is damaged.' }
    return res.render('passport-condition')
  }
  if (answer === 'good-condition') {
    return res.redirect('/your-location')
  } else if (answer === 'damaged') {
    return res.redirect('/ineligible-passport-condition')
  }
  res.redirect('/your-location')
})

router.get('/ineligible-passport-condition', function (req, res) {
  res.render('ineligible-passport-condition')
})

router.get('/your-location', function (req, res) {
  res.render('your-location')
})

router.post('/your-location', function (req, res) {
  const answer = req.session.data['your-location']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'your-location': 'Select your location.' }
    return res.render('your-location')
  }
  if (answer === 'london-south-east') {
    return res.redirect('/contact-details')
  } else if (answer === 'north-england') {
    return res.redirect('/contact-details')
  } else if (answer === 'wales-south-west') {
    return res.redirect('/contact-details')
  } else if (answer === 'scotland') {
    return res.redirect('/contact-details')
  } else if (answer === 'northern-ireland') {
    return res.redirect('/contact-details')
  }
  res.redirect('/contact-details')
})

router.get('/contact-details', function (req, res) {
  res.render('contact-details')
})

router.post('/contact-details', function (req, res) {
  const answer = req.session.data['contact-details']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'contact-details': 'Enter your phone number.' }
    return res.render('contact-details')
  }
  res.redirect('/check-answers')
})

router.get('/check-answers', function (req, res) {
  res.render('check-answers')
})

router.post('/check-answers', function (req, res) {
  if (!req.session.data['reference']) {
    req.session.data['reference'] = generateReference('UPA')
  }
  res.redirect('/confirmation')
})

router.get('/confirmation', function (req, res) {
  res.render('confirmation')
})

module.exports = router
