const User = require('../models/User');

module.exports = {

    async index(req, res){
        const users = await User.find();

        return res.json(users);
    },

    async store (req, res){
        const { name, email, latitude, longitude} = req.body;

        let user = await User.findOne({ email });

        if(!user){
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            }
        
         user = await User.create({
                name,
                email,
                location
            })
        }   
        return res.json(user);
    },

    async update(req, res){
        
        const { email } = req.params;
        const { name, latitude, longitude} = req.body;
        console.log(email)

        const location = {
            type: 'Point',
            coordinates: [longitude, latitude]
        }

        const filter = { email: email}
        const update = {name, location}

        const userUpdate = await User.findOneAndUpdate(filter, update);

        
        return res.json(update);

    },

    async delete(req, res){
        const { email } = req.params;
        
        await User.deleteOne({"email": email})

        return res.status(204).send();

    }
}