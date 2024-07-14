import User from "../models/user.mjs";

async function getallUsers(req,res){
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
        
    }
}


export default getallUsers