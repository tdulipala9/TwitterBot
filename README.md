By Tanay Dulipala, Cathy Lin, Rachel Ann Young, Rachel Weng

The purpose of our twitterbot was to spread positivity to those who visit our page through cute pictures of cats. To do this, we gave our bot the ability to tweet random cat-related puns, jokes, images, and captions, such as “Meow’s it goin’?” and “What is a cat’s favorite kind of sports car? A furr-ari!”. These cat puns are pre-generated from an array. Through the Math.random() function, we were able to randomly choose items from the array storing the puns. We tried to generate as many of these lines as possible to reduce repeated tweets, while still making sure they all retained relevance to our bot’s overall theme. The amount of times the bot retweets or tweets is determined through the setInterval() method. We decided to not make the bot retweet or tweet too often so we set the setInterval to an hour.

We also have a function that retweets a popular tweet using a different hashtag, #kittens.  This was done by selecting a tweet that has a decent amount of likes.  

The bot also follows any account that mentions it to generate interaction on the page.  The bot’s account has currently been mentioned by a user and it started following them immediately after.  

As an additional functionality, our bot will occasionally tweet a random image with a pre-generated caption.  We created an array with several images for the bot to choose from so that it does not just simply tweet the same image over and over.

The bot will also like a tweet with the #cats hashtag every time the program is run as well as every hour.  

