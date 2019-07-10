import express, {json} from 'express';
import morgan from 'morgan';
import routerStore from './routes/store.routes';


const app = express()
var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}
//middlewares
app.use(morgan('dev'))
app.use(json())
app.use(allowCrossDomain)

//routes
app.use('/store', routerStore)

app.use(function(err, req, res, next) {
    res.status(err.status || 500)
    res.send(err.message)
  })

export default app  