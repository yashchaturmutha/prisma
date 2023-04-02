async function executeInsert(query:string,tx:any)
{
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

    console.log(name);
    console.log(typeof(name));
    console.log(value);
    console.log(created_on);
    console.log(updated_on);
    console.log(created_by);
    console.log(updated_by);


    const user=await tx.master_settings.create({
      data: {
        name: name,
        value: value,
        created_on:created_on,
        updated_on:updated_on,
        created_by:created_by,
        updated_by:updated_by
      },
    });

    console.log(user);
    return user;
}

export default executeInsert;