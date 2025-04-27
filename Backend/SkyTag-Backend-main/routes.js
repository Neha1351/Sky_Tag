const express=require('express')
const passenger=require('./passenger/passengerController')
const staff=require('./staff/staffController')
const admin=require('./admin/adminController')
const flight=require('./flights/flightController')
const ticket=require('./tickets/ticketController')
const luggageConroller=require('./luggages/luggageController')
const airport=require('./Airport/airportController')


const router=express.Router()

router.post('/addpassenger',passenger.addPassenger)
router.post('/getpassenger/:id',passenger.getPassenger)
router.post('/editpassenger/:id',passenger.editPassenger)
router.post('/deletepassenger/:id',passenger.delPassenger)
router.post('/loginPassenger',passenger.login)
router.post('/passengerforgotpwd',passenger.forgotPwd)



//staff
router.post('/editstaff',staff.editStaff)
router.post('/stafflogin',staff.loginStaff)
router.post('/staffforgotpwd',staff.forgotPwd)
router.post('/deleteStaff/:id',staff.deleteStaff)

//admin
router.post('/addstaff/:id',admin.addStaff)
//router.post('/admin/editstaff',admin.editStaff)
router.post('/admin/getstaffById',admin.getStaff)
router.post('/admin/viewAllStaffs',staff.viewStaffs)

router.post('/viewStaffByAaid/:id',staff.viewStaffByAaid)

router.post('/admin/flyerdeletebyticket/:id',admin.flyerDeleteByTicket)
router.post('/admin/showpassengers',admin.showpassengers)
router.post('/admin/editpassengers',admin.editPassenger)
router.post('/admin/addflight',admin.addFlight)
router.post('/admin/showflights',admin.showFlights)


router.post('/searchflights',flight.searchFlights)
router.post('/checkseats/:flightcode',flight.checkSeatAvailability)
router.post('/showboardings',flight.showboarding)
router.post('/showdestinations',flight.showdestinations)
router.post('/bookticket',flight.bookTicket)
router.post('/showflightById/:id',flight.viewFlightById)
router.post('/deleteFlight/:id',flight.deleteFlight)



router.post('/ticketdata',ticket.ticketdata)
router.post('/cancelticket',ticket.cancelTicket)
router.post('/cancelticketbyid/:id',ticket.cancelTicketById)
router.post('/viewTicketByPid/:id',ticket.viewTicketByPid)
router.post('/viewTicketById/:id',ticket.viewTicketById)
router.post('/viewallticketsbooked', ticket.viewAllTicketsBooked)
// router.post('/viewticketsByPassengerId/:id',ticket.viewticketsByPassengerId)


router.post('/addluggage',luggageConroller.addLuggage)
router.post('/updateLuggageLoc',luggageConroller.updateLuggageLoc)
router.post('/viewLuggageById/:id',luggageConroller.viewLuggageById)
router.post('/viewLuggageByTicketId/:id',luggageConroller.viewLuggageByTicketId)
router.post('/viewLuggageByPid/:id',luggageConroller.viewLuggageByPid)


//airport routes
router.post('/addairport',airport.addAirport)
router.post('/getairport/:id',airport.viewAirportById)
router.post('/editairport/:id',airport.editAirportById)
router.post('/deleteairport/:id',airport.deleteAirportById)
router.post('/loginairport',airport.loginAirport)
router.post('/viewApprovedAirports',airport.viewAirports)
router.post('/forgotpwdairport',airport.forgotPwd)
router.post('/viewAirportReqs',airport.viewAirportReqs)
router.post('/approveAirport/:id',airport.approveAirport)
router.post('/viewAirportNames',airport.viewAirportNames)
router.post('/viewAirportFlights/:id',airport.viewAirportFlights)
router.post('/viewPassengersByAid/:id',airport.viewPassengersByAid)

router.post('/viewArrivalOfPassengersByAid/:id',airport.viewArrivalOfPassengersByAid)
router.post('/viewdepartueOfPassengersByAid/:id',airport.viewdepartueOfPassengersByAid)

module.exports=router