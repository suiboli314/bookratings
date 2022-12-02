# CS 5610 Project: Book Rating Website

![visitor badge](https://visitor-badge.glitch.me/badge?page_id=suiboli314.bookratings)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

###### Author: Qishu Dong & Chenjie Wu

###### Page: [bookratings](https://bookratings5610.onrender.com/)


# Porject Objective
A book rating page that allows user to rate a book in 1-10 by their choice. Also, user could leave a book review post, delete his own post and see other’s posts. At the home page, show the most favorites books list with ranking that was collected from users’ rating. User is able to sign up an account with email address, username and password, then sign in and sign out. This project applies the concepts learned in class by building a MERN stack application with React, Nodejs, Express, JavaScript, MongoDB, HTML5 and Tailwind. 


Install and Run Instruction
Node+Express runs on http://localhost:4000
React dev server runs http://localhost:3000

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
###### [Prensentation](https://github.com/suiboli314/bookratings/blob/main/P3Slides.pdf)

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
<img width="991" alt="image" src="https://user-images.githubusercontent.com/105243848/204412979-de5eb54f-1d65-404a-9c00-91f71d6c23b4.png">
<img width="1846" alt="image" src="https://user-images.githubusercontent.com/105243848/204414714-e2367045-542b-4d35-a572-495650c28782.png">


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


