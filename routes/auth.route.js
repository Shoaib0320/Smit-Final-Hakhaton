import express from "express"
import { getAllUsers, SignUpNewUser,LoginNewUser } from "../controllers/auth.controllers.js";
import jwt from "jsonwebtoken";
import User from "../models/user.models.js";


let authRouter = express.Router();

authRouter.post("/signup", SignUpNewUser)
authRouter.post("/login" , LoginNewUser)
authRouter.get("/allUsers", getAllUsers)

authRouter.get("/profile", async (req, res) => {
    try {
        const authHeader = req.headers.authorization; // Get the Authorization header

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ msg: "Authorization token missing or invalid" });
        }

        const token = authHeader.split(" ")[1]; // Extract the token part (after "Bearer ")
        // console.log('token in profile  ', token)
        // Verify the token (using JWT or your chosen library)
        // console.log('jwtseceret', process.env.JWT_SECRET)
        jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
            if (err) {
                console.log(err)
                return res.status(403).json({ msg: "Invalid or expired token" });
            }

            // Token is valid, proceed with the request
            req.user = user; // Attach the decoded user data to the request object
            const singleUser = await UserModal.findOne({ email: user.email })
            // console.log('singe user', singleUser)
            // console.log('user in profile', user)
            res.status(200).json({ msg: "Token is valid", user: singleUser });
        });

    } catch (error) {
        console.error("Error: ", error.message);
        res.status(500).json({ msg: "Error fetching user data", error: error.message });
    }
});


export default authRouter