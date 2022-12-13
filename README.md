# CS 5610 Project: Book Rating Website 2.0

![visitor badge](https://visitor-badge.glitch.me/badge?page_id=suiboli314.bookratings)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

###### Author: Qishu Dong & Chenjie Wu

###### Page: [bookratings](https://bookratings.vercel.app/)

# Porject Objective

A book rating page that allows user to rate a book in 0-5 by their choice. Also, user could leave a book review post, delete his own post and see other’s posts. At the home page, show the most favorites books list with ranking that was collected from users’ rating. User is able to sign up an account with email address, username and password, then sign in and sign out. This project applies the concepts learned in class by building a MERN stack application with React, Nodejs, Express, JavaScript, MongoDB, HTML5 and Tailwind.

Install and Run Instruction
Node+Express runs on http://localhost:4000
React dev server runs http://localhost:3000
**You need to add your `.env` file and config to MongoDB**

## Run it

Clone it, then

```bash
yarn install && cd front && yarn install && yarn build && cd .. && yarn start
```

And check your http://localhost:4000

## Alternative

For development start the two servers

```bash
yarn install && yarn dev
```

And the backend will run on http://localhost:4000

```bash
cd front && yarn install && yarn start
```

And the frontend will run on http://localhost:3000

---

###### [Desgin Document](https://github.com/suiboli314/bookratings/blob/main/P3%20DesignDoc.pdf)

###### [Prensentation](https://docs.google.com/presentation/d/1SjvqLXE5dCg12O8ymdcFfNvqwww9lNicMr55SGN1DdI/edit?usp=sharing)

###### [60% milestone on Nov 15](https://github.com/suiboli314/bookratings/releases/tag/60%25)

###### [80% milestone on Nov 22](https://github.com/suiboli314/bookratings/releases/tag/80%25)

###### [100% Complete on Nov 28](https://github.com/suiboli314/bookratings/releases/tag/100%25)

---

## Tech Used

1. HTML5
2. react
3. JavaScript
4. Node.js
5. Express
6. MongoDB
7. Tailwind CSS

## Project Screenshot

<img width="1490" alt="image" src="https://user-images.githubusercontent.com/105243848/207230738-7b592d45-6d12-47de-b662-8adf68c25f2e.png">
<img width="1488" alt="image" src="https://user-images.githubusercontent.com/105243848/207230837-a11548e8-c171-41ba-be81-79bd29fb14b7.png">
<img width="1641" alt="image" src="https://user-images.githubusercontent.com/105243848/207436765-7aa9a1d3-a8a1-47eb-a2e1-3ec9de130d23.png">



# Thanks

Thanks to prof. [John Guerra](https://johnguerra.co/classes/webDevelopment_fall_2022/)


## Feedback by Taohan Zhu
Nice and clean UI and amazing work. I tried the website and most functions were clear and easy to use. However, I would like to provide feedback on the following items.
1. Unused files. I noticed that the website was deployed to render.com, but you still have `vercel.json` in the dir. It would be better to remove it if it's no longer in use.
2. Signup. After signup, the user remain in the sign up page instead of redirecting to the main page. It'd be much better if we could direct to home page instead.
3. Delete Account. That's a very powerful and useful feature to have. However, it would be much better to have a pop-up alert after an user click on it. As I accidentally delete my account while touring around, it was an unpleasant user experience.
4. Leave a Review. In my understanding, that's the main function of your website. While trying to use it, I encountered a form with 3 inputs, but I have no idea what the second input (number) is for. It'd be great to have explanation on the side.
5. Misc. 
  5.1 User session is not maintained. I discovered that I got 404 whenever I refreshed any of the pages and that I have to log in again.
  5.2 User's review. I submitted one review. But I was not able to find my review anyhow. It would be great if users could search or have their reviews shown in their own home page.


