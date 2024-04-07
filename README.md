# Live Score Display App

This live score display app is built using [Create React App](https://github.com/facebook/create-react-app) and
showcases real-time sports game scores.

## Table of Contents
- [Live Score Display App](#live-score-display-app)
    - [Developer's note](#developers-note)
    - [Project Overview](#project-overview)
        - [Features](#features)
        - [Technology Stack](#technology-stack)
    - [Getting Started](#getting-started)
    - [Testing](#testing)
        - [Unit testing](#unit-testing)
        - [Mutation testing](#mutation-testing)
    - [Build for deployment](#build-for-deployment)
    - [Learn More](#learn-more)

## Developer's note

This is my first time using React for a project from scratch, so there's bound to be mistakes. Likely there are
dependencies installed that aren't even used in the project.

## Project Overview

The Live Score Display App showcases real-time scores of sports matches in a user-friendly interface. It's perfect for
sports enthusiasts who want to stay updated on their favorite teams and matches without missing a beat.

![image](https://github.com/mathmul/LiveScore/assets/25301301/32449ef3-a96b-454e-b636-fdc66b242e81)

### Features

- Real-Time Updates: Scores are updated in real-time, ensuring you have the latest information.
- Multiple Sports Support: While initially focusing on football (soccer), the architecture allows for easy expansion to other sports.
- Accessibility Enhanced: Designed with accessibility in mind, ensuring all users can navigate and understand the score updates effectively.
- Responsive Design: Works seamlessly across devices, providing a consistent experience whether you're on a desktop or mobile.

### Technology Stack

- React: Utilizes React for efficient UI rendering and state management.
- TypeScript: Ensures type safety across the app, enhancing code quality and maintainability.
- Styled Components: Leverages styled-components for scoped styling and theme management.
- React Testing Library: For robust unit and integration tests, ensuring reliability.
- Stryker Mutator: Employs mutation testing to assess the resilience of the test suite, further ensuring code quality and robustness.

## Getting Started

To run the app locally:

```shell
yarn install          # Install dependencies
yarn start            # Run the app in development mode
```

## Testing

Our testing strategy encompasses both unit testing with Jest and advanced mutation testing with Stryker, ensuring
comprehensive coverage and code quality. This approach not only verifies that our code behaves as expected under
a variety of scenarios but also challenges our tests to catch any unintended changes, reinforcing the
reliability of our application.

### Unit testing

Execute unit tests using the following command to verify individual parts of the application work as intended:

```shell
yarn test             # Run the test suite
```

### Mutation Testing

Beyond unit testing, we employ mutation testing with Stryker to evaluate the strength of our test suite. By deliberately
introducing mutations to our code, we can identify any deficiencies in our tests, providing a unique opportunity to
enhance test effectiveness and coverage.

Run mutation testing and review the resilience of your test suite with:

```shell
yarn test:mutation    # Run mutation tests with Stryker
```

A detailed report is generated in reports/stryker-mutation.html, offering valuable insights into test suite performance
against code mutations. Utilizing mutation testing is key to uncovering potential areas for improvement and achieving
a higher standard of code quality.

## Build for deployment

```shell
yarn build            # Build an optimized version for deployment
```

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
