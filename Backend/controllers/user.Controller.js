import User from "../models/userModel.js";
import colors from 'colors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import redisClient from "../config/redis.js";


//To Create A New User
export const registerController = async (req, res) => {
    try {
        
      //get params through body
      const { fullName, userName, password, gender, confirmPassword } = req.body;

      //check if all fields are filled
      if(!fullName || !userName || !password || !gender || !confirmPassword) {
        return res.status(400).json({
            message: "All fields are required",
        })
      }

      //Check password is same in both inputs
      if(password !== confirmPassword){
        return res.status(400).json({
            message: "Password does not match",
        })
      }

      //check if user already exists
      const user = await User.findOne({userName});  
       if(user){
        return res.status(400).json({
            message: "User already exists",
        })
      }

      //hash password 10 rounds
      const hashedPassword = await bcrypt.hash(password, 10);

      //Avatar Pic
      const maleAvatar = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
      const femaleAvatar = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

       const newUser = await User.create({
        fullName,
        userName,
        password: hashedPassword,
        profilePic: gender === 'male' ? maleAvatar : femaleAvatar,
        gender,
       });

       res.status(201).json({
        message: "User created successfully",
        newUser,
       });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Error in Registration",
            error: error.message,
        })
    }
};

//Login User 
export const loginController = async (req, res) => {
    try {
        
        //get params through body
        const { userName, password } = req.body;
    
        //check if all fields are filled
        if(!userName || !password) {
            return res.status(400).json({
              message: "All fields are required",
          })
        }

        //check if user exists
        const user = await User.findOne({userName}).select("+password");

        if(!user){
            return res.status(400).json({
                message: "User does not exist",
            })
        }


        //check if password is correct
        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if(!isPasswordCorrect){
            return res.status(400).json({
                message: "Password is incorrect",
            })
        }

        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET_KEY, {expiresIn: '1d'});

        // console.log(`so the following token is ${token}`.yellow);

       return res.status(200).cookie('token', token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24, sameSite: 'strict', secure: true}).json({
        message: "User logged in successfully",
        user,
       });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Error in Login Controller",
            error: error.message,
        })
    }
}

//Logout User
export const logoutController = (req, res) => {
    try {
        //It will make token 0 so it is basically logout
        return res.status(200).cookie('token', '', { httpOnly: true, maxAge: 0, sameSite: 'strict', secure: true}).json({
            message: "User logged out successfully",
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Error in Logout Controller",
            error: error.message,
        })
    }
}

//GET ALL USER 
export const getAllUsersController = async (req, res) => {
    try {
        
        const loggedIn = req.userId;

        const cache = `users-${loggedIn}`;

        const cachedUsers = await redisClient.get(cache);
        if(cachedUsers){
            return res.status(200).json({
                message: "All users fetched successfully",
                otherUsers: JSON.parse(cachedUsers),
            });
        };

        const otherUsers = await User.find({_id: {$ne: loggedIn}}).select("-password");

        await redisClient.set(cache, JSON.stringify(otherUsers));

        return res.status(200).json({
            message: "All users fetched successfully",
            otherUsers,
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Error in Get All Users Controller",
            error: error.message,
        })
    }
}

