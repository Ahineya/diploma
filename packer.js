const fs = require('fs');
const util = require('util');

const data = {
    "lessons": []
};

const lessons = fs.readdirSync('./src/lessons');

function toHumanReadable(text) {
    return text.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

// Foreach lesson create json
data.lessons = lessons.map(lesson => ({
    id: lesson,
    name: toHumanReadable(lesson),
    description: fs.readFileSync(`./src/lessons/${lesson}/description.txt`, 'utf-8') || lesson,
    categories: fs.readdirSync(`./src/lessons/${lesson}`).filter(f => f !== 'description.txt').map(category => ({
        id: category,
        name: toHumanReadable(category),
        topics: fs.readdirSync(`./src/lessons/${lesson}/${category}`).map(topic => ({
            id: topic,
            name: toHumanReadable(topic),
            theory: fs.readFileSync(`./src/lessons/${lesson}/${category}/${topic}/theory.md`, 'utf-8') || topic,
            sandbox: {
                code: fs.readFileSync(`./src/lessons/${lesson}/${category}/${topic}/sandbox.js`, 'utf-8') || 'alert("It works");'
            },
            presentation: {
                slides: fs.readdirSync(`./src/lessons/${lesson}/${category}/${topic}/presentation`).map(slide => ({
                    type: slide.split('.')[1] === 'md' ? 'text' : 'image',
                    content: slide.split('.')[1] === 'md' ? fs.readFileSync(`./src/lessons/${lesson}/${category}/${topic}/presentation/${slide}`, 'utf-8') : new Buffer(fs.readFileSync(`./src/lessons/${lesson}/${category}/${topic}/presentation/${slide}`)).toString('base64')
                }))
            }
        }))
    }))
}));

// console.log(util.inspect(data, false, null));

console.log(JSON.stringify(data));