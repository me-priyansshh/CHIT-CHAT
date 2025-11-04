import jwt from 'jsonwebtoken';

//Check If user is authenticated
const isAuthenticated = async (req, res, next) => {
    try {
        //getting token from cookie
        const token = req.cookies.token;

        if(!token){
            return res.status(401).json({
                message: "Token not found",
            })
        }

        //verify token
        const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);

        if(!decoded){
            return res.status(401).json({
                message: "Invalid token",
            })
        }

        req.userId = decoded.userId;
        /* console.log(req.userId);
        console.log(decoded.userId); */

        next();

    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Error in isAuthenticated",
            error: error.message,
        })
    }
}

export default isAuthenticated;