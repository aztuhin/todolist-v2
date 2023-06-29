import express from 'express';
const app = express();
app.use (express.static('public'));
app.set('view engine', 'ejs');
import https from 'https';
import path from 'path';
const __dirname = path.resolve();
import bodyParser from "body-parser";
app.use(bodyParser.urlencoded({extended: true}));
import mongoose, { model } from 'mongoose';
const { Schema } = mongoose;
import _ from 'lodash';
import {fullDay,weekday,dayMonth,onlyday} from './Date.js'; // connectto local Date file
import { log } from 'console';

async function main() {  
    //await mongoose.connect('mongodb://127.0.0.1:27017/todolistDB');
    await mongoose.connect('mongodb+srv://user1:user123@cluster0.bwopotf.mongodb.net/todolistDB',{useNewUrlParser: true});
    
    const itemSchema = ({   //new mongoose.Schema
      name: String
    });
    const Item = mongoose.model('item', itemSchema);

    const item1 = new Item ({
        name: 'Welcome'
    });
    const item2= new Item ({
        name: 'Hit the + to add new Item'
    });
    const item3 = new Item ({
        name: '<-- Hit this to delete Item'
    });
    const defaultItem = [item1, item2, item3] ;

    const listSchema = ({
        name: String,
        item:  [itemSchema]
    });
    const List = mongoose.model('list',listSchema); 
   
    app.get('/' , async (req,res) => {
        const findResult = await Item.find({});
        if (findResult.length === 0) {
            await Item.insertMany(defaultItem);
            res.redirect ('/');
        }   else {       
                res.render("list", {ListTitle: onlyday(), newListItems: findResult}) ;
                }
    });

    app.post('/', async (req,res) => {
        const inptDt = req.body.frmIptDt;
        const listName = req.body.btnList

        const item = new Item({     //mongoose.model('item', itemSchema);
            name: inptDt
        });
        if (listName === onlyday()) {
            item.save();
            res.redirect('/');
        } else {
            const foundList = await List.findOne({name: listName});
            foundList.item.push(item);
            foundList.save();
            res.redirect('/'+listName);
        }
    });
    app.post('/delet', async (req,res) => {        
        const itemId = req.body.check;
        const listName = req.body.listName;
        if (listName === onlyday()) {
            await Item.findByIdAndRemove(itemId);
            res.redirect('/');
        } else {
            await List.findOneAndUpdate({name: listName}, {$pull: {item: {_id: itemId}}});
            res.redirect('/'+ listName);
        }       
    });
    app.get('/:customListNameRout', async (req,res) => {
        const customListName = _.capitalize(req.params.customListNameRout);           
        const foundList = await List.findOne({name: customListName});
    
        const list = new List({
            name: customListName,
            item: defaultItem
            }); 
            
        if (foundList === null) {                       
            list.save();
            res.redirect('/'+customListName);
          }
          else if (foundList.item.length === 0){
            foundList.item.push(item1);
            foundList.save();        
            res.redirect('/'+customListName);
          } else {
                 res.render('list', {ListTitle: foundList.name, newListItems: foundList.item}); 
                }       
    });
    
    app.get('/about',(req,res) => {
        res.render('about');
    });
 
};
main().catch(err => console.log(err));
    app.listen(3000, () => {
        console.log("The server is running at port 300");
    });

/*finally {
    // Ensures that the connection will close when you finish/error
await mongoose.connection.close();
};*/
 