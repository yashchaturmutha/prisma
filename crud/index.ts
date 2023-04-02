import express,{Request, Response} from 'express';
import { PrismaClient } from '@prisma/client'

const app=express();
app.use(express.json());
const prisma = new PrismaClient();

app.get('/',async (req:Request ,res:Response)=>{

    const users = await prisma.user.findMany({
        include: {
            cars:true
        },
    });
    res.json(users);
});

app.get('/getId/:id',async (req:Request ,res:Response)=>{

    const id =req.params.id;
    const result = await prisma.user.findUnique({
        where: {
        id: Number(id),
        }
    });
    res.json(result);
})

app.post('/',async (req:Request ,res:Response)=>{

    const {username,password}=req.body;

    const user = await prisma.user.create({
        data: {
          username: username,
          password: password
        },
      });
    res.json(user);
});

app.post('/createMany',async (req:Request ,res:Response)=>{

    const usersList=req.body;

      const users = await prisma.user.createMany({
        data: usersList,
      })
    res.json(users);
});

app.post('/createManyCars',async (req:Request ,res:Response)=>{

    const carsList=req.body;

    const cars = await prisma.car.createMany({
    data: carsList,
    });

    res.json(cars);;
});

app.delete('/:id',async (req:Request ,res:Response)=>{

    const { id } = req.params

    const post = await prisma.user.delete({
      where: {
        id: Number(id),
      },
    });
    res.json(post)
});

app.put('/:id',async (req:Request ,res:Response)=>{

    const { id } = req.params;

    const post = await prisma.user.update({
      where: { id: Number(id) },
      data: { username: "abc" },
    })
    res.json(post)
});

app.listen(3001,()=>{
console.log("Server Listening");
})