let Sequalize = require('sequelize');
let sequalize = new Sequalize(undefined, undefined, undefined, {
    'dialect': 'sqlite',
    'storage': __dirname + '/todo-database.sqlite'
});

const user = sequalize.define('user', {
    id: { 
        type: Sequalize.INTEGER,
        primaryKey: true,
        autoIncrement: true 
    },
    name:{
        type: Sequalize.STRING,
        allowNull: false
    }
});


const todo = sequalize.define('todo', {
    id: { 
        type: Sequalize.INTEGER,
        primaryKey: true,
        autoIncrement: true 
    },
    name:{
        type: Sequalize.STRING,
        allowNull: false
    },
    description: {
        type: Sequalize.STRING,
        allowNull: false
    },
    complete: {
        type: Sequalize.BOOLEAN,
        allowNull: false
    }
});

todo.hasMany(todo, {as: 'parentTodoId'});
user.hasMany(todo, {as: 'todos'});

sequalize.sync({force: true}).then(()=> {
    console.log("todo database is synced and ready");
    user.create({
        name: 'Nick'
    }).then((nick) => {

        todo.create({
            name: "Fix the House",
            description: "remodel the house",
            complete: false,
            userId: nick.id
        }).then((houseTodo)=> {
            todo.create({
                name: "Kitchen",
                description: "remodel the kitchen",
                complete: false,
                todoId: houseTodo.id,
                userId: nick.id
            });
            todo.create({
                name: "Yard",
                description: "landscape the yard",
                complete: false,
                todoId: houseTodo.id,
                userId: nick.id
            });
        })
    });

    user.create({
        name: 'Jess'
    }).then((jess) => {

        todo.create({
            name: "Clean the closet out",
            description: "throw away junk in closet",
            complete: false,
            userId: jess.id
        }).then((closetTodo)=> {
            todo.create({
                name: "shoes",
                description: "give away old shoes",
                complete: false,
                todoId: closetTodo.id,
                userId: jess.id
            });
            todo.create({
                name: "coats",
                description: "give away old coats",
                complete: false,
                todoId: closetTodo.id,
                userId: jess.id
            });
        })
    });





});