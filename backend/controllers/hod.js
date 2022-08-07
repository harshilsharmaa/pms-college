const User = require('../models/User');
const Publication = require('../models/Publication');

exports.getAllPublications = async(req,res)=>{
    try {

        const publications = await Publication.find({}).populate("author");

        res.status(200).json({
            message: "All publications",
            publications,
        });
        
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        })
    }
}

exports.getPublicationsByYear = async(req,res)=>{
    try {

        if(!req.query.year){
            return res.status(400).json({
                message: "Please provide year",
                success: false
            })
        }


        const publications = await Publication.find({yearOfPublication:req.query.year});

        res.status(200).json({
            message: "Publications by year",
            publications,
        });
        
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        })
    }
}

exports.getPublicationsByFaculty = async(req,res)=>{
    try {

        if(!req.params.id){
            return res.status(400).json({
                message: "Please provide faculty name",
                success: false
            })
        }

        const publications = await Publication.find({author:req.params.id}).populate("author");
        if(!publications){
            return res.status(400).json({
                message: "Faculty not found",
                success: false
            })
        }

        res.status(200).json({
            message: "Publications by faculty",
            publications,
        });
        
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        })
    }
}

exports.getPublicationByFacultyAndYear = async(req,res)=>{
    try {

        if(!req.query.year || !req.query.faculty){
            return res.status(400).json({
                message: "Please provide year and faculty",
                success: false
            })
        }

        const publications = await Publication.find({yearOfPublication:req.query.year, author:req.query.faculty}).populate("author");

        res.status(200).json({
            message: "Publications by year and department",
            publications,
        });
        
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        })
    }
}

exports.getAllFaculty = async(req,res)=>{
    try {

        const faculty = await User.find({isHod:false});

        res.status(200).json({
            message: "All faculty",
            faculty,
        });
        
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        })
    }
}