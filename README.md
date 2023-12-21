# Temper Frontend Engineer Assignment 

- Vue 3
- TypeScript
- Tests

## Business requirements
The left side component (post list) should load its initial state from https://jsonplaceholder.typicode.com/posts, allow the user to update the state via manipulating the UI, and emit the list of actions committed on the right side component (list of actions committed). 

### Functional requirements
- Only the first 5 posts should be displayed.
- Cell titles should be named as `Post id`, where `id` is set by the `id` of a post on https://jsonplaceholder.typicode.com/posts, e.g. `Post 1`.
- The order of the posts can be changed by clicking the up/down arrows.
- When a user changes the order of the posts, the action should be added to the top of the “List of actions committed” component on the right.
    - e.g. When a user moves the `Post 1` below `Post 2`, then an action card saying “Moved `Post 1` from `index 0` to `index 1`” should be added to the top of the list.
- Users can can click on the “Time Travel” button on one of the action cards, which rewinds the order of the posts as it was before that action was taken. This action should also remove the clicked action card and the action cards above that.

### Non-functional requirements

#### Usability

It should be evident to the user how to operate the component. We are here to help the user to understand what are their options and guide them. This also includes pleasant and useful animations. 

#### Testability

It is strongly recommended to write automated tests (unit or integration) to verify and document the business logic. We leave it up to you to decide which parts of the implementation should be covered by automated tests given the time constraints.

## How to run it
```sh
yarn
```

### Compile and Hot-Reload for Development

```sh
yarn dev
```

### Type-Check, Compile and Minify for Production

```sh
yarn build
```

### Lint with [ESLint](https://eslint.org/)

```sh
yarn lint
```

### Run tests

```sh
yarn test
```
