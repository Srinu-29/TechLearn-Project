const mongoose =  require("mongoose");

const ProgressSchema= new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
    },
    courseId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course",
        require:true,
    },
    completedTopics:[{
        topicTitle:String,
        completedAt:{
            type:Date,
            default:Date.now
        }

    }],
    isCompleted:{
        type:Boolean,
        default:false
    },
    progressPercentage:{
        type:Number,
        default:0,
        min:0,
        max:100,
    },
    lastAccessed:{
        type:Date,
        default:Date.now,
    }


},{timestamps:true});
module.exports = mongoose.model('Progress', ProgressSchema);