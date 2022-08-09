const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  author: { // here we make it compulsary to have author property
    type:authorSchema,
    required: true
  } 
}));

async function createCourse(name, author) {
  const course = new Course({
    name, 
    author
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}

async function updateAuthor(courseId) { // is function ko banaye h taki id dalke course ka name change kr ske
    const course = await Course.updateOne({_id : courseId},{
        $unset: {
            'author': ''
        }
    })
    // course.author.name = 'Mosh Hamedani' // isko hataye qki upar directly name change kr rhe h
    // course.save();
}

// createCourse('Node Course', new Author({ name: 'Mosh' }));

updateAuthor('62f2508af4f97ff0bbe14714')