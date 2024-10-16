const Bookmark = require('../models/Bookmarks');
const Job = require('../models/Job');
const User = require('../models/User');


// Function to handle adding a job to user bookmarks

exports.addBookmark = async (req, res) => {
    try {
        const {jobId} = req.body;
        const {email} = req.params;
    
        const user = await User.findOne({email: email});
        const job = await Job.findById(jobId);
        if(!user){
            return res.status(400).json({error: 'User not found'});
        }
        if(!job){
            return res.status(400).json({error: 'Job not found'});
        }
        let bookmarks = await Bookmark.findOne({bookmarkedBy: user._id});
        if(!bookmarks){
            const newBookmark = await Bookmark.create({
                jobs: [jobId],
                bookmarkedBy: user._id
            })
            return res.status(201).json({message: 'Job added to bookmarks', newBookmark});
        }
        else{
            if(!bookmarks.jobs.includes(jobId)){
                bookmarks.jobs.push(jobId);
                await bookmarks.save();
                return res.status(201).json({message: 'Job added to bookmarks', bookmarks});
            }else{
                return res.status(400).json({message: 'Job already in bookmarks'});
            }
        }
    } catch (error) {
        return res.status(500).json({error: 'Internal server error'});
    }

}


// Function to handle removing a job from user bookmarks
exports.removeJobFromBookmark = async (req, res) => {
    try {
        const {jobId} = req.body;
        const {email} = req.params;
        const user = await User.findOne({email: email});
        const job = await Job.findById(jobId);
        if(!user){
            return res.status(400).json({error: 'User not found'});
        }
        if(!job){
            return res.status(400).json({error: 'Job not found'});
        }
        await Bookmark.findOneAndUpdate(
            {
                bookmarkedBy: user._id
            },
            {
                $pull: {jobs: jobId}
            },
            {new: true}
        )
        return res.status(200).json({message: 'Job removed from bookmarks'});
    } catch (error) {
        return res.status(500).json({error: 'Internal server error'});
    }
}

// Function to handle retrieving all user bookmarks
exports.getAllUserBookmarks = async (req, res) => {
    try {
        const {email} = req.params;
        const user = User.findOne({email: email});
        const bookmarks = await Bookmark.findOne({bookmarkedBy: user._id }).populate('jobs').populate('bookmarkedBy');
        if(!bookmarks){
            return res.status(404).json({message: 'No bookmarks found'});
        }
        return res.status(200).json({message: 'Bookmarks retrieved successfully', bookmarks});

    } catch (error) {
        return res.status(500).json({error: 'Internal server error'});
    }
}

// 