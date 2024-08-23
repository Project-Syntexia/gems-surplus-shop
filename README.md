# Gem's Surplus Consumer Goods Trading

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## Tech-stack used:

- [Next.js](https://nextjs.org)
- [Clerk](https://clerk.com/)
- [Prisma](https://prisma.io)
- [MongoDB](https://www.mongodb.com/)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Test for MongoDB

```
   const database = client.db("myTestDb");
   const myPizzaCollection = database.collection("MyPizza");
   const doc = { name: "Neapolitan pizza", shape: "round" };
   try {
     /* READ */
     const finddocument = await myPizzaCollection.findOne(doc);
     if (finddocument !== null) {
       const pizza = finddocument as WithId<typeof doc>;
       console.log(`${pizza._id} ${pizza.name} ${pizza.shape}`);
     }

     /* WRITE */
      const result = await myPizzaCollection.insertOne(doc);
      console.log(
        `Succesfully inserted ${result.insertedId}/${result.acknowledged}`,
      );
   } catch (err) {
     console.log(err);
   }
```
