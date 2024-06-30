```
npm init -y
tsc --init
```

- change tsconfig.json as per your preferences
- change name in package.json as "your_npmjs_username/package_name"
- if outDir is changed in tsconfig then change the main in package.json as per the path
- when publishing packages it is generally a good practice to only publish .js files rather than .ts files
- also put "declaration": true in tsconfig.json file (necessary while using this package)
  
- To publish the package:
```
npm publish --access=public
```
or
```
npm publish
```

- Just like .gitignore we can create .npmignore file to filter files which will be published on our package