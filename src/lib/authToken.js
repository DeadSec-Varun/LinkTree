import jwt from 'jsonwebtoken';

export const authenticateUser = async (token) => {
    try {

        if (!token) {
            return null;
        }
        const {id} = jwt.verify(token, process.env.JWT_SECRET);        
        return id;
    } catch (error) {
        console.error(error);
        return null;
    }
}