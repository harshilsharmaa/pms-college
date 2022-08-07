const User = require('../models/User');
const Publication = require('../models/Publication');

exports.register = async (req, res) => {
    try {

        const { name, email, password, department } = req.body;

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                success:false,
                message: "Email already exists"
            });
        }

        user = await User.create({
            name,
            email,
            password,
            department,
            createdAt: Date.now()
        })

        const token = await user.generateToken();

        const options = {
            expiresIn: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
            httpOnly: true
        };

        res.status(200)
        .cookie("token", token, options)
        .json({
            success: true,
            message: "user Successfully registered",
            user
        })

        
    } catch (error) {
        res.status(500).json({
            success:false,
            message: error.message
        })
    }
}


exports.login = async(req,res)=>{
    try {

        const {email, password} = req.body;

        const user = await User.findOne({email}).select("+password");

        if(!user){
            return res.status(400).json({
                message: "Email is not registered with us",
                success: false
            })
        }

        const isMatch = await user.matchPassword(password);

        if(!isMatch){
            return res.status(400).json({
                message: "Incorrect password",
                success: false
            })
        }

        const token = await user.generateToken();

        const options = {
            expiresIn: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
            httpOnly: true
        };

        res.status(200)
        .cookie("token", token, options)
        .json({
            success: true,
            message: "Login successful",
            user,
        })


        
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        })
    }
}



exports.logout = async(req,res)=>{
    try {
        
        res.status(200).cookie("token", null, {expires:new Date(Date.now()), httpOnly:true}).json({
            message: "Logout successful",
            success: true
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        })
    }
}


exports.updatePassword = async(req,res)=>{
    
    try {

        const user = await User.findById(req.user._id).select("+password");


        const {oldPassword, newPassword} = req.body;

        if(!oldPassword || !newPassword){  
            return res.status(400).json({
                message: "Please provide both old and new password",
                success: false
            })
        }

        const isMatch = await user.matchPassword(oldPassword);

        if(!isMatch){
            return res.status(400).json({
                message: "Incorrect password",
                success: false
            })
        }

        user.password = newPassword;
        await user.save();

        res.status(200).json({
            message: "Password successfully updated",
            success: true
        })
        
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        })
    }
}

exports.updateProfile = async(req,res)=>{
    try {

        const user = await User.findById(req.user._id);

        const {name, email, department} = req.body;

        if(name){
            user.name = name;
        }
        if(email){
            user.email = email;
        }
        if(department){
            user.department = department;
        }

        await user.save();

        res.status(200).json({
            message: "Profile successfully updated",
            success: true
        })        

    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        })
    }
}


exports.myProfile = async(req,res)=>{

    try {

        const user = await User.findById(req.user._id).select("+isHod");

        res.status(200).json({
            message: "User profile",
            user,
        });
        
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        })
    }
}

exports.deleteAccount = async(req,res)=>{
    try {

        const user = await User.findById(req.user._id);

        const publications = await Publication.find({author:req.user._id});
        publications.forEach(async(publication)=>{
            await Publication.findByIdAndDelete(publication._id);
        })

        await user.remove();

        res.cookie("token", null, {expires:new Date(Date.now()), httpOnly:true});

        res.status(200).json({
            message: "Account successfully deleted",
            success: true
        })
        
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        })
    }
}


// ----------------------------------------------------------------------------------------------------------------------------

exports.addpublication = async(req,res)=>{
    try {

        const user = await User.findById(req.user._id);


        const {title, journalName, yearOfPublication, issnNumber, journalLink, articalLink} = req.body;


        let author = req.user._id;

        let createdAt = Date.now();

        const publication = await Publication.create({
            title,
            journalName,
            yearOfPublication,
            issnNumber,
            author,
            articalLink,
            journalLink,
            createdAt
        });

        user.publications.push(publication);

        await user.save();

        res.status(200).json({
            message: "publication successfully added",
            success: true,
            publication
        })
        
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        })
    }
}

exports.myPublications = async(req,res)=>{
    try {

        const publications = await Publication.find({author:req.user._id}).populate("author").sort({createdAt:-1});
        

        res.status(200).json({
            success: true,
            message: "my publications",
            publications,
        });
        
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        })
    }
}

exports.getPublicationById = async(req,res)=>{
    try {

        const publication = await Publication.findById(req.params.id).populate("author");
        

        res.status(200).json({
            success: true,
            message: "publication",
            publication,
        });
        
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        })
    }
}

exports.editPublication = async(req,res)=>{
    try {

        if(!req.params.id){
            return res.status(400).json({
                message: "Please provide publication id in params",
                success: false
            })
        }

        const publication = await Publication.findById(req.params.id);

        if(!publication){
            return res.status(400).json({
                message: "Publication not found",
                success: false
            })
        }

        if( toString(req.user._id) != toString( publication.authors)){
            return res.status(400).json({
                message: "You are not authorized to edit this publication",
                success: false
            })
        }

        const {title, journalName, yearOfPublication, issnNumber, jouralLink, articalLink, listedInUGC} = req.body;

        if(title){
            publication.title = title;
        }
        if(yearOfPublication){
            publication.yearOfPublication = yearOfPublication;
        }
        if(journalName){
            publication.journalName = journalName;
        }
        if(issnNumber){
            publication.issnNumber = issnNumber;
        }
        if(jouralLink){
            publication.jouralLink = jouralLink;
        }
        if(articalLink){
            publication.articalLink = articalLink;
        }
        if(listedInUGC){
            publication.listedInUGC = listedInUGC;
        }

        await publication.save();

        res.status(200).json({
            message: "publication successfully updated",
            success: true,
            publication
        })
        
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        })
    }
}

exports.deletePublication = async(req,res)=>{
    try {

        const user = await User.findById(req.user._id);

        if(!req.params.id){
            return res.status(400).json({
                message: "Please provide publication id in params",
                success: false
            })
        }

        const publicationId = req.params.id;

        const publication = await Publication.findById(publicationId);

        if(!publication){
            return res.status(400).json({
                message: "Publication not found",
                success: false
            })
        }

        user.publications.pull(publication);

        await user.save();

        await publication.remove();

        res.status(200).json({
            message: "publication successfully deleted",
            success: true
        })
        
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        })
    }
}




// For development only
exports.deleteAllData = async(req,res)=>{
    try {

        // delete all data
        await User.deleteMany();
        await Publication.deleteMany();


        res.status(200).json({
            message: "All data successfully deleted",
            success: true
        })
        
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        })
    }
}