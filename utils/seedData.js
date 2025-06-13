const Course = require('../models/course');
const Notes = require('../models/Notes');

const sampleCourses = [
    {
        title: "JavaScript Fundamentals",
        description: "A comprehensive introduction to JavaScript programming language",
        duration: "6 weeks",
        difficulty: "Beginner",
        topics: [
            {
                title: "Variables and Data Types",
                content: "Learn about variables, primitives, and complex data types in JavaScript",
                duration: "2 hours"
            },
            {
                title: "Functions and Scope",
                content: "Understanding function declarations, expressions, and variable scope",
                duration: "3 hours"
            }
        ]
    },
    {
        title: "React Basics",
        description: "Learn the fundamentals of React.js library",
        duration: "4 weeks",
        difficulty: "Intermediate",
        topics: [
            {
                title: "Components and Props",
                content: "Understanding React components, props, and component lifecycle",
                duration: "2.5 hours"
            },
            {
                title: "State Management",
                content: "Working with React state, hooks, and context API",
                duration: "3 hours"
            }
        ]
    },
    {
        title: "Node.js Advanced",
        description: "Advanced concepts in Node.js development",
        duration: "8 weeks",
        difficulty: "Advanced",
        topics: [
            {
                title: "Asynchronous Programming",
                content: "Deep dive into promises, async/await, and event loop",
                duration: "4 hours"
            },
            {
                title: "REST API Development",
                content: "Building scalable REST APIs with Express.js",
                duration: "5 hours"
            }
        ]
    }
];

const sampleNotes = [
    {
        title: "JavaScript Variables and Scope",
        content: `
# Variables in JavaScript

## Let vs Const vs Var
- let: Block-scoped, can be reassigned
- const: Block-scoped, cannot be reassigned
- var: Function-scoped, should be avoided

## Examples:
\`\`\`javascript
let count = 0;  // Mutable
const PI = 3.14; // Immutable
\`\`\`

## Best Practices:
1. Use const by default
2. Use let when reassignment is needed
3. Avoid var
        `,
        courseId: null,  // Will be set during seeding
          
    },
    {
        title: "React Components Overview",
        content: `
# React Components

## Types of Components
1. Function Components
2. Class Components

## Example Function Component:
\`\`\`jsx
function Welcome(props) {
    return <h1>Hello, {props.name}</h1>;
}
\`\`\`

## Key Concepts:
- Props are read-only
- State can change
- Components must be pure
        `,
        courseId: null,
       
    },
    {
        title: "Node.js Async Programming",
        content: `
# Asynchronous Programming in Node.js

## Key Concepts:
1. Promises
2. Async/Await
3. Event Loop

## Example:
\`\`\`javascript
async function getData() {
    try {
        const result = await fetch('/api/data');
        return await result.json();
    } catch (error) {
        console.error('Error:', error);
    }
}
\`\`\`

## Best Practices:
- Always handle errors
- Avoid callback hell
- Use try/catch with async/await
        `,
        courseId: null,
        
    }
];


async function uploadSampleData() {
    try {
        // Clear existing data
        console.log('Clearing existing data...');
        await Course.deleteMany({});
        await Notes.deleteMany({});

        // Upload courses
        console.log('Uploading courses...');
        const courses = await Course.insertMany(sampleCourses);
        console.log('✅ Courses uploaded successfully');

        // Add courseId to notes
        console.log('Uploading notes...');
        const notesWithCourseId = sampleNotes.map((note, index) => ({
            ...note,
            courseId: courses[index]._id
        }));

        // Upload notes
        await Notes.insertMany(notesWithCourseId);
        console.log('✅ Notes uploaded successfully');

    } catch (error) {
        console.error('❌ Error uploading sample data:', error.message);
        throw error;
    }
}

module.exports = uploadSampleData;