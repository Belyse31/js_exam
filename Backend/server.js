const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./model/UserSchema');
const Contact = require('./model/contactSchema');
const app = express()


app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/Exam')
    .then(() => {
        console.log('Connected to DB');
    })
    .catch((err) => {
        console.log("failed to connect to the database", err);
    })


app.post('/user', (req, res) => {
    const { title, firstName, lastName, Position, company, businessArena, employees } = req.body;
    const newUser = new User({
        title: title,
        firstName: firstName,
        lastName: lastName,
        Position: Position,
        company: company,
        businessArena: businessArena,
        employees: employees,
    })


    if (newUser) {
        newUser.save()
            .then(() => {
                res.status(200).json("User saved successfully")
            })
            .catch((err) => {
                res.status(500).json({ message: "failed to save the user" })
            })
    } else {
        res.status(404).json("No content")
    }
})

app.get('/all', (req, res) => {
    User.find()
        .select('-__v')
        .then((data) => {
            res.status(200).json(data)
        })
        .catch((err) => {
            res.status(500).json({ message: 'User not found' })
        })
})


app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
    }
    User.findByIdAndDelete(id)
        .then((data) => {
            if (!data) {
                return res.status(404).json({ message: "No record matching with the id." })
            }
            res.status(200).json({ message: "Record deleted successful", data })
        })
        .catch((err) => {
            res.status(500).json(err)
        })
})
app.get("/getUser/:id", (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid user Id" })
    }

    User.findById(id)
        .then((user) => {
            if (!user) {
                return res.status.status(400).json({ message: "User not found" })
            }
            res.status(200).json(user)
        })
        .catch((err) => {
            res.status(500).json(err)
        })
})

app.put("/update/:id", (req, res) => {
    const id = req.params.id
    const { title, firstName, lastName, Position, company, businessArena, employees } = req.body;

    User.findByIdAndUpdate(id,
        { title: title, firstName: firstName, lastName: lastName, Position: Position, company: company, businessArena: businessArena, employees: employees },
        { new: true })
        .then((user) => {
            res.status(200).json(user)
        })
        .catch((err) => {
            res.status(500).json(err)
        })
})


app.post('/contact', (req, res) => {
    const { streetNumber, additionalInfo, zipCode, place, country, code, phoneNumber, email } = req.body;
    const newContact = new Contact({
        streetNumber: streetNumber,
        additionalInfo: additionalInfo,
        zipCode: zipCode,
        place: place,
        country: country,
        code: code,
        phoneNumber: phoneNumber,
        email: email,
    })


    if (newContact) {
        newContact.save()
            .then(() => {
                res.status(200).json("Contact saved successfully")
            })
            .catch((err) => {
                res.status(500).json({ message: "failed to save the contact" })
            })
    } else {
        res.status(404).json("No content")
    }
})


const port = 5500;
app.listen(port, () => {
    console.log('App listening on port', port);
})