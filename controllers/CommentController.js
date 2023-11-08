
// import model
const Post = require("../models/postModel");
const Comment = require("../models/commentModel");

// business logic
exports.createComment = async(req , res) => {

    try{

        // fetch data from req body
        const {post, user, body} = req.body;

        // create comment object
        const comment = new Comment({
            post,user,body
        });
        console.log(comment);

        // save the new comment into the database
        const savedComment = await comment.save();
        console.log(savedComment);

        // add the comment to the post
        // find the post by ID, add the new comment to its comments array
        const updatedPost = await Post.findByIdAndUpdate( post , {$push: {comments: savedComment._id}} , {new: true} )
        .populate("comments") //populates comments array with comment documents 
        .exec();
        console.log(updatedPost);

        res.json({
            post:updatedPost,
        });

    }
    catch(err){

        console.log(err);
        return res.status(500).json({
            error:"Error while Creating"
        });
    }
};