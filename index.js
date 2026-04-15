import e from "express";

const app = e()

const users = []

app.use(e.json())
app.get("/", (req, res) => {
    return res.json({message: "runnning"})
})

app.post("/signup", (req, res) => {
    const {username, email, password} = req.body
    if (!username || !email || !password){
        return res.status(400).json({message: "bad request"})
    }

    const user = {
        username,
        email,
        password
    }

    users.push(user)
    return res.json({message: "signup success"})
})


app.post("/login", (req, res) => {
    const {email, password} = req.body
    if (!email || !password){
        return res.status(400).json({message: "bad request"})
    } 
    let user;   

    for (const usr of users){
        if (usr.email == email){
            user = usr
        }
    }
    if (!user){
        return res.json({message: "user not found"})
    }
    if (user.password == password){
        return res.json({message: 'loin success'})
    }else{
        return res.json({message: "invalid password"})
    }
})


app.get("/users", (req, res) => {
    if (users.length == 0){
        return res.json({message: "no user found"})
    }
    return res.json({users: users})
})

app.listen(3000)
