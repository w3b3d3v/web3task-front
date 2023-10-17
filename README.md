# Web3Task-Front

This project is the front end of the [web3task-contracts](https://github.com/w3b3d3v/web3task-contracts) protocol.

web3task aims to solve the problem of monetized contributions by splitting the work and requirements, just like GitHub problems, where the company creates the problems and offers a bounty for users to solve them according to the company's terms.

## Current Status

The project is currently in the MVP stage.
If you're a programmer and want to contribute, we have a [backlog](https://github.com/orgs/w3b3d3v/projects/6/views/2) where you can see what you can help with.

## Disputes

We recognize that disputes are common in this type of service, so we are not primarily working on a solution to this problem, as many people have tried and failed. Instead, our solution is a gamified approach for both task creators and task assignees. Delivering before the deadline will give the assignee a better score, while completing the created tasks will also give the task creator a profile score. This score is used to rank users on the platform, and the higher the score, the more trustworthy the user. Starting a dispute is considered a risky and unworthy move by both sides, as disputes will drastically reduce the score of both sides or the side that is wrong, according to the DAO's Final Saying.

## Bounties

The task creator can create a task and set a bounty for it, and the task assignee can start the task and submit it for review. If the task creator approves the task, the bounty will be sent to the task assignee, otherwise the task creator can cancel the task and get the bounty back.

## Ranking

The ranking system is based on the user's score, which is calculated based on the following factors

- Delivery time before the deadline
- Amount of the bounty
- Disputes during the execution of the task

The points are only applied after the task has been completed.

## Features

The following features are currently implemented

- Create a task
- View all created tasks
- Viewing tasks for a specific user
- Perform task filtering

## Installation

```bash
yarn
```

You must manualy add the typescript package to the project in case the module failes to install using yarn.

```bash
yarn add typescript
```

## Usage

To run the frontend, you need to run a local node. To do this, you need to set up the [web3task-contracts](https://github.com/w3b3d3v/web3task-contracts) project on your machine.

```bash
yarn start
```

## Nonces

You might encounter trouble due to the nonces of metamask or local wallet session. To fix that, please access you browser wallet and clear activity data. Thus resolving any nonce issues.

## Contact

Advisor: 0xneves (@ownerlessinc)

This project is licensed under the MIT License, feel free to use and contribute. If you have any questions, please contact us via our [discord](https://discord.gg/web3dev) in the `pod-labs` channel.
