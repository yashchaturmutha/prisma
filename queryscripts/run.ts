import { PrismaClient } from '@prisma/client';
// import executeInsert from './execute/executeInsert';
// import executeUpdate from './execute/executeUpdate';
// import logger from "./utils/logger";
const prisma = new PrismaClient();

interface LooseObject {
  [key: string]: string
}

const stringToObject=(str:string)=>{

  var obj:LooseObject={};

  var properties = str.split(', ');
  console.log(properties);

  properties.forEach(function(property) {
      console.log(property);
      var tup = property.split('=');
      console.log(tup);
      console.log(tup[0]);
      console.log(tup[1]);
      obj[tup[0]] = tup[1].replace(/['"]+/g, '');
  });
  return obj;
}

const run=async (query:string,tx:any,logger:any,file:any)=>{

    console.log("run");
    console.log(query);
    // console.log(typeof(query));

    const Query=query.substring(0,query.indexOf(' '));

    console.log(Query);

    if(Query.toLowerCase()=='create' || Query.toLowerCase()=='insert')
    {
      // executeInsert(query,tx);
      try{
        console.log("In try Create/Insert");

        const pos=query.indexOf('VALUES');
        const now=new Date();

        const comma1=query.indexOf(',',pos);
        console.log(comma1);
        const comma2=query.indexOf(',',comma1+1);
        console.log(comma2);
        const comma3=query.indexOf(',',comma2+1);
        const comma4=query.indexOf(',',comma3+1);
        const comma5=query.indexOf(',',comma4+1);

        const name=query.substring(query.indexOf("'",pos)+1,comma1-1);
        const value=query.substring(comma1+3,comma2-1);
        const created_on=now;
        const updated_on=now;
        const created_by=query.substring(comma4+2,comma5);
        const updated_by=query.substring(comma5+2,query.lastIndexOf(')'));

        const tableName=query.substring(query.indexOf('INTO')+5,query.indexOf('(')-1);
        console.log(tableName);

        console.log(name);
        console.log(typeof(name));
        console.log(value);
        console.log(created_on);
        console.log(updated_on);
        console.log(created_by);
        console.log(updated_by);


        const user=await tx[tableName].create({
          data: {
            name: name,
            value: value,
            created_on:created_on,
            updated_on:updated_on,
            created_by:created_by,
            updated_by:updated_by
          },
        });

        logger.info(user);
        console.log(user);
        return user;
      }
      catch(err)
      {
        console.log("In catch Create/Insert");
        logger.error(err);
        file.write(query + '\n');
      }
    }
    else if(Query.toLowerCase()=='update')
    {
      try {
        console.log("In try Update");
        const whereValues=query.substring(query.lastIndexOf("WHERE")+6,query.indexOf(";"));
        const setValues=query.substring(query.indexOf('SET')+4,query.indexOf('WHERE')-1);

        const tableName=query.substring(query.indexOf('UPDATE')+7,query.indexOf('SET')-1);
        console.log(tableName);

        console.log(whereValues);
        console.log(setValues);

        var setObj: LooseObject = stringToObject(setValues);
        var whereObj: LooseObject = stringToObject(whereValues);

        console.log(setObj);
        console.log(whereObj);

        console.log(typeof(whereObj.created_by));
        console.log(typeof(whereObj.updated_by));

        const user = await tx[tableName].updateMany({
          where: whereObj,
          data: setObj,
        });

        console.log(user);
        console.log(user.count);

        if(user.count==0){
        logger.error(user);
        file.write(query + '\n');
        }
        else
        logger.info(user);

      }
      catch(err)
      {
        console.log("In catch Update");
        logger.error(err);
        file.write(query + '\n');
      }
    }
    else if(Query.toLowerCase()=='delete')
    {
      try{
      console.log("In try delete");
      // const Name=query.substring(query.indexOf("=")+2,query.lastIndexOf("'"));
      // console.log(Name);
      const whereValues=query.substring(query.lastIndexOf("WHERE")+6,query.indexOf(";"));
      console.log(whereValues);
      var whereObj: LooseObject = stringToObject(whereValues);
      console.log(whereObj);

      const tableName=query.substring(query.indexOf('FROM')+5,query.indexOf('WHERE')-1);
      console.log(tableName);

      // const post = await tx.master_settings.deleteMany({
      //     where: whereObj,
      // });
      // console.log(post);

      const post = await tx[tableName].deleteMany({
          where: whereObj,
      });
      console.log(post);

      if(post.count==0){
      logger.error(post);
      file.write(query + '\n');
      }
      else
      logger.info(post);
    }
    catch(err)
    {
      console.log("In catch delete");
      logger.error(err);
      file.write(query + '\n');
    }
  }

  else {
    console.log("Invalid SQL Query");
    logger.error("Invalid SQL Query");
    file.write(query + '\n');
  }

}

export default run;