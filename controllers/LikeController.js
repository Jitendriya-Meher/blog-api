
const Like = require("../models/likeModel");
const Post = require("../models/postModel");

// like post

exports.likePost = async(req , res) => {

    try{
        const {post, user} = req.body;

        const like = new Like({
            post,user
        });

        const savedLike = await like.save();

        // update the post collection
        const updatedPost = await Post.findByIdAndUpdate(post , {$push: {likes:savedLike._id}}, {new: true})
        .populate("likes")
        .exec();

        res.json({
            post: updatedPost
        });

    }
    catch(err){

        return res.status(500).json({
            error:"Error while likeing"
        });

    }
}

// unlike post

exports.unlikePost = async(req , res) => {

    try{
        const {post, like} = req.body;

        // find and delete the like collection 
        const deletedLike = await Like.findOneAndDelete({post:post, _id:like});
        console.log(deletedLike);

        // update the post collection
        const updatedPost = await Post.findByIdAndUpdate(post, {$pull: {likes: deletedLike._id}}, {new: true});
        console.log(updatedPost);
       

        res.json({
            post: updatedPost,
            deleteLike: deletedLike
        });

    }
    catch(err){

        console.log(err);
        return res.status(500).json({
            error:"Error while UNlikeing"
        });

    }
}