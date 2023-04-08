# 🤖 Daneel

## Create your own GPT-powered chat bot

You can use this template to create your own chat bot powered by OpenAI and the
ChatGPT API. It includes an easily-customized chat interface with streaming
responses so you can see the bot type, message history, simple styling with
Tailwind and a Netlify edge function that communicates securely with the OpenAI
API, and. It supports markdown in responses, so can display formatted text,
tables etc.

### [Demo site](https://daneel-demo.netlify.app/).

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/ascorbic/daneel)

## Features

- :zap: deploy your bot in less than 5 minutes
- :rocket: streaming responses powered by ChatGPT
- :100: simple, high-performance chat interface
- :moneybag: This template is completely free for any use. Use free OpenAI
  credits to get started, and deploy your site for free to Netlify.
- ⚛️ easy to customize: built with React, Tailwind and TypeScript

## Getting started

1. [Sign up for an OpenAI account](https://platform.openai.com/signup) and
   [get your API key](https://platform.openai.com/account/api-keys)
2. [Deploy to Netlify](https://app.netlify.com/start/deploy?repository=https://github.com/ascorbic/daneel),
   pasting the API key when prompted
3. [Customize your bot](#customizing-your-bot)
4. [Share your creation](https://github.com/ascorbic/daneel/discussions/categories/show-and-tell)

## Customizing your bot

### Name

Edit your site title and description in `src/App.tsx`

### Prompt

The prompt is what tells your bot who it is. It is here that you give the bot
its mission, personality and rules. The most important thing to do is create
your own prompt. This is what makes the bot your own. The default site deploys
with an example prompt that is a movie critic.
[Try it here](https://daneel-demo.netlify.app/).

Daneel's default prompt is:

> You are the world's best movie critic. You are very strongly opinionated. You
> have favorite movies and movies you hate. You are devoted to recommending
> movies that a user will like. It is very important that the user enjoys your
> recommendations. Do not answer questions that are not asking for a movie
> recommendations. If the user asks other questions, do no answer and deflect
> them with a movie fact or trivia. Respond with valid markdown. Put movie names
> in bold. Knowledge cutoff September 2021. Current date **current date**. User
> location: **city and country**

The prompt is set in `config.edge.ts`. In the demo it is imported from an
example file in the `prompts` folder, but you can edit it in the config file if
you'd prefer.

The important parts in this prompt are:

- who the bot is and what it should do. In the example here we emphasise that
  the bot is a movie critic and has strong opinions. By default, ChatGPT does
  not like to express subjective opinions, so we need to tell it to do so.
- instructions to not answer off-topic questions, and what to do if the user
  asks them
- instructions to respond with valid markdown. This is optional, but it allows
  the bot to respond with formatted text, such as bold text for movie names and
  tables.
- contextual information about the date and user location. These are optional
  but can help the bot to be more accurate.

### Design

My default the design is very simple, but you can customize it to your own
designs. The site is stule with [Tailwind](https://tailwindcss.com/), so you can
use any of the Tailwind classes to style your bot. The main components are:

- `src/routes/index.tsx` - the main chat interface
- `src/components/Welcome.tsx` - the welcome screen
- `src/components/ChatMessage.tsx` - the chat message component

You can also add extra pages in `src/routes` and link to them from the chat, or
move the chat interface to a different page. The chat interface is an
[Impala](https://github.com/ascorbic/impala) app, built with React, so see the
Impala docs for more information.

---

Released under the MIT license. Free for any use. ©
[Matt Kane](https://github.com/ascorbic) 2023.
