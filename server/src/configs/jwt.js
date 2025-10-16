import jwt from 'jsonwebtoken';

const genAuthToken = (user_id, res) =>{
    const token =  jwt.sign(
        {id : user_id},
        process.env.JWT_SECRET,
        {expiresIn : '21d'}
    );
    res.cookie('token',token, {
        httpOnly : true,
        secure : process.env.NODE_ENV === 'production',
        sameSite : 'strict',
        maxAge : 21 * 24 * 60 * 60 * 1000, 
    });
}
export default genAuthToken;