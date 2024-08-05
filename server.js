const express = require('express');
const app = express();

const data=require('./data.json');

app.use(express.json());


const port=8000;

app.get('/api/task',(req,res)=>{
   res.json(data);
});

app.get('api/task/seconds',(req,res)=>{
  var obj=JSON.parse(JSON.stringify(data))
  res.json(obj.data.seconds);
  console.log(obj.data.seconds);
})

app.post('/api/task',(req,res)=>{
  let newTask={
    id:data.length+1,
    name:req.body.name,
    seconds:req.body.seconds,
    
 
    

  }
  data.push(newTask);
  res.status(201).json(newTask);
});

app.put('/api/task/:id', (req, res) => {
  let TaskId = parseInt(req.params.id, 10); // Convert itemId to integer
  let updatedTask = req.body;
  let index = data.findIndex(task => task.id ===TaskId );

  if (index !== -1) {
      data[index] = { id: TaskId, name: updatedTask.name,seconds:updatedTask.seconds };
      res.json(updatedTask);
  } else {
      res.status(404).json({ message: 'not found' });
  }
});


app.delete('/api/task/:id', (req, res) => {
  let taskId = parseInt(req.params.id, 10); // Convert itemId to integer
  let index = data.findIndex(task => task.id === taskId);

  if (index !== -1) {
      let deletedTask = data.splice(index, 1);
      res.json(deletedTask[0]);
  } else {
      res.status(404).json({ message: 'not found' });
  }
});


app.listen(process.env.PORT||port,()=>{
  console.log(`working`);
})
 

