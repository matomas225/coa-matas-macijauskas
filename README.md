# CodeAcadey | MATAS MACIJAUSKAS

## How to run the project.

1. install the packages
   `npm install`
2. run the project
   `npm run dev`

## The Stack.

- `React`
- `TypeScript`
- `Vite`
- `Jest`
- `SCSS (SASS)`
- `Redux`
- `React-Router`
- `Eslint`

## Project Plan

1. **Build Music Player UI.**
2. **Build Back end with:**

- `NodeJs and Express`
- `MongoDb`
- `JWT auth`

3. **Integrate Music API** `YouTube API`.

<sub>NOTE: for youtube API maybe need to to use OAuth 2.0</sub>

[Youtube DOCS](https://developers.google.com/youtube/v3/quickstart/js)

4. **Also Have Local Music Files**

5. **Login/Register functionality.**
6. **User can make playlists.**
7. **User can like the music.**
8. **Admin can manage users, songs, everything basicly.**
9. **Impliment graphs for music overwiev (needs more thinking).**
10. **Add more stuff with time.**

notes:

1. refactor button/label and other elements from value to children.
2. reusable input/label combined element component.
3. element folder for all small elements.
4. src/elements folder without scss files and folders.
5. file structure: 
src/
   render
      /elements/
                /Login
      /components/
                /Login
                      /Login.tsx
                      /utils.ts
                      /LoginForm.tsx 
                /WrapperBlock.tsx
   tests
      /elements/
            /Login
      /components/
                /Login
                      /Login.spec.tsx
                      /utils.spec.ts
                /WrapperBlock.spec.tsx
   styles
      /components/
                /Login
                    /login.scss
                    /_loginBlocks.scss
                /WrapperBlock
                    /_index.scss
                    /_utils.scss
            components.scss
