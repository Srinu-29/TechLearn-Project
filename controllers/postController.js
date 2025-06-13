const posts = [
    {
        id: "1",
        username: "Srinivas",
        title: "Introduction to JavaScript",
        content: "JavaScript is a programming language...",
        category: "Programming",
        difficulty: "Beginner",
        duration: "30 mins",
        createdAt: "2025-06-07T10:00:00Z",
        likes: 0,
        comments: []
    },
    {
        id: "2",
        username: "Test User",
        title: "React Fundamentals",
        content: "React is a JavaScript library...",
        category: "Web Development",
        difficulty: "Intermediate",
        duration: "45 mins",
        createdAt: "2025-06-07T11:00:00Z",
        likes: 0,
        comments: []
    }
];

const getAllPosts = async (req, res) => {
    try {
        const { category, difficulty } = req.query;
        let filteredPosts = posts.filter(post => post.username === req.user.name);
        
        if (category) {
            filteredPosts = filteredPosts.filter(post => post.category === category);
        }
        
        if (difficulty) {
            filteredPosts = filteredPosts.filter(post => post.difficulty === difficulty);
        }
        
        res.json(filteredPosts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllPosts
};