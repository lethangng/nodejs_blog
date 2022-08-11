const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
//
const path = require('path');
const { engine } = require('express-handlebars');
const { query } = require('express');
//
const app = express();
const port = 3000;

const SortMiddleware = require('./app/middlewares/SortMiddleware');

const route = require('./routes');
const db = require('./config/db');

// Connect to db
db.connect();

app.use(express.static(path.join(__dirname, 'public')));

// Xử lý dữ liệu từ form submit lên
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

app.use(methodOverride('_method'));

// Custom middlewares
app.use(SortMiddleware);

// Middleware
app.get('/middleware',
    function(req, res, next) {
        if (['vethuong', 'vevip'].includes(req.body.ve)) {
            req.face = 'Gach gach gach!!!';
            return next();
        }
        res.status(403).json({
            message: 'Access denied'
        });
    },
    function(req, res, next) {
        res.json({
            message: 'Successfully!',
            face: req.face
        });
    }
);


// HTTP Logger
// app.use(morgan('combined'));

// Template Engine
app.engine(
    'hbs',
    engine({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
            sortable: (field, sort) => {
                const sortType = field === sort.column ? sort.type : 'default';

                const icons = {
                    default: 'oi oi-elevator',
                    asc: 'oi oi-sort-ascending',
                    desc: 'oi oi-sort-descending'
                };
                const types = {
                    default: 'desc',
                    asc: 'desc',
                    desc: 'asc'
                };

                const icon = icons[sortType];
                const type = types[sortType];

                return `<a href="?_sort&column=${field}&type=${type}">
                            <span class="${icon}"></span>
                        </a>`
            }
        }
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// Routes init
route(app);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
