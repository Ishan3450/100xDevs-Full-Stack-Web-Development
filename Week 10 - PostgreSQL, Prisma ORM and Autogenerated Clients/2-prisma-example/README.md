# Steps to setup

```
1
npm init -y

2
npm install prisma typescript ts-node @types/node --save-dev

2.1 
npm install dotenv

3
npx tsc --init
Change `rootDit` to `src`
Change `outDir` to `dist`

4
npx prisma init
```

Generate Migrations in Prisma
```
npx prisma migrate dev --name Initialize the schema
```

Autogenerated clients
```
npx prisma generate
```

To explore the models and all (UI)
```
npx prisma studio
```
* After generation of the client the file in which we are using the client make sure to use dotenv.config() thing