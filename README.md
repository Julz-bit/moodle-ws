## Description

Moodle Web Services (Core Api's) wrapper for nodejs.

## Installation

```bash
$ npm i moodle-ws
```

## Environment/Setup
1. Create .env file in your root folder.
2. Add configuration and credentials

   ```bash
    MWS_URL=""
    MWS_USER=""
    MWS_PASS=""
    ```
    Sample configuration
    ```bash
    MWS_URL="https://yourlms.com"
    MWS_USER="username"
    MWS_PASS="password"
    ```

## Usage
- Import via ES6 syntax


    ```typescript
        const mws = new MwsService();
    ```

- createUser Service (create an object that contains required params example below)


    ```typescript
        const user = {
            username: 'jlzcrn3',
            password: 'samplepass',
            firstname: 'Julz',
            lastname: 'Crn',
            email: 'jlzcrn3@gmail.com',
            country: 'PH',
            lang: 'en'
        }
        //expected return { "id": 1, "username": "jlzcrn3" }
        return await mws.createUser(user)
    ```

- getUser Service (will return specific user using (key, value))


    ```typescript
        //key = 'email' && value = 'jlzcrn3@gmail.com', Note: you can use other key like username etc..
        return await mws.getUser('email', 'jlzcrn3@gmail.com')
    ```

- updateUser Service (create an object that contains required params example below)


    ```typescript
        const user = {
            id: 1,
            username: 'jlzcrn3',
            password: 'newpassword',
            firstname: 'New Name',
            lastname: 'New Last Name',
            email: 'jlzcrn3@gmail.com'
        }
        //expected return { warnings: [] }
        //if warnings are empty means moodle udpate rules are satisfied and user succesfully updated
        return await updateUser(user)
    ```

- createCategory Service 


    ```typescript
        const category = {
            name: 'MWS Category',
            parent: 0, // Note: if you want to put your category in top level use 0 as value but if it's under sub category pass the value of parent category id.
            description: 'Moodle Web Services Category'
        }
        //expected return [{ "id": 17, "name": "MWS Category"}]
        return await mws.createCategory(category)
    ```

- createCourse Service (create Course under course category)


    ```typescript
        const course = {
            fullname: 'MWS Course', // course name
            categoryid: 17, // parent category id
            shortname: 'MWSC', //shortname
            summary: 'MWS Course' // description here
        }
        //expected return [{ "id": 18, "shortname": "MWSC"}]
        return await mws.createCourse(course)
    ```

- enrollUser Service


    ```typescript
        const enrollment = {
            roleId: 5, // Note: roleid depends on your moodle roles
            moodleId: 1, // pass the moodle Id of the user, This is the moodle user id in your app 
            courseId: 18 // pass the course id
        }
        //expected return is 200 if the enrollment was success
        return await mws.enrollUser(enrollment)
    ```

- unEnrollUser Service


    ```typescript
        const unenroll = {
            roleId: 5, // in our Moodle the value of 5 is student
            moodleId: 1, // pass the moodle Id of the user, This is the moodle user id in your app 
            courseId: 18 // pass the course id
        }
        //expected return is 200 if the unenrollment was success
        return await mws.unEnrollUser(unenroll)
    ```

## Stay in touch

- Author - Jlz/Rdgjr/Lnnn/Tphr/Frn/Rnld