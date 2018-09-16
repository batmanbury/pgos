Local setup
===========
The frontend and backend are completely separate projects, and attempted work bundled together in a docker container for easier setup.

Unfortunately I ran into some issues with Docker and Selenium Web Driver not playing well together. So you'll have to run commands manually from within each project directory, and from several terminal windows. :cry:

Clone this repo, and navigate into the project directory.

```shell
$ git clone https://github.com/batmanbury/pgos.git && cd pgos
```

### Backend
```shell
$ cd pgos_api
$ bundle install
$ rails db:create db:migrate db:seed
```

```shell
# Run RSpec tests
$ bundle exec rspec
# Run the server
$ rails s -p 4000
```

### Frontend
```shell
# In another terminal window
$ cd pgos_frontend
$ npm install && npm start
```
You can now visit http://localhost:3000 in your browser and use the app.

To run frontend tests:
```shell
# In another terminal window
$ cd pgos_frontend
$ npm run webdriver-update
$ npm run webdriver-start
# In another terminal window
$ cd pgos_frontend
# You should have Chrome installed, and have
# both frontend and backend running
$ npm run build && npm test
```

Architecture
============
I opted for a GraphQL-driven Rails 5 API-only backend, serving a React frontend powered by ApolloClient to interface with the GQL server. Projects are completely separated, and I chose not to integrate the UI into a full-stack Rails app, avoiding the Asset Pipeline and Turbolinks altogether, and getting more benefits from the JS ecosystem (hot-reloading, etc.)

Oh, and no Redux (blasphemy! More about that in Tradeoffs.)

I went with RSpec for GraphQL API unit tests on the Rails side. And for the frontend, a combination of Protractor - Cucumber - Typescript for full end-to-end testing from the client side. This frontend testing stack is usually associated with Angular projects, but it's all Javascript in the end, and I've found success with it before, so I used it here, and it worked well.

### Backend
There is a single model - WorkOrder - with some basic model validations. I thought of splitting "coffees" and creating an association, but decided not to (see Tradeoffs). The meat is all in `app/graphql` where you'll find a Work Order Query Type and Mutation Type. Query all work orders or a specific one by ID. If you're new to GraphQL you'll see there's no pagination done here, as that can all be handled client-side through ApolloClient. There is a `createWorkOrder` mutation and `updateWorkOrder` mutation and RSpec tests for both. But the app only uses `createWorkOrder`. For a quick idea of its E2E testing, see:
* `test/features/create-work-order.feature`
* `test/stepdefinitions/shared-step-defs.ts`

### Frontend
In the `/src` directory are `/components` and `/graphql`. There is a basic folder structure that with more time I'd have expanded to help refactor components into proper containers with presentational/smart components. As of now, the major components in plain English are:
* Work orders table (using `'react-table'`)
* Table cell
* Table column header
* View work order modal
* Create work order modal
* App header

When you load the app the table calls for all work orders to populate the table. And if you view a single work order, that order is fetched again to populate the modal. We don't want to use stale data from when the whole table was populated to fill the modal too. Creating a new work order from the modal calls the mutation `createWorkOrder`.

There are HTML5 validations on the create-work-order-modal. When you submit new work order, the only indication that it succeeded is that the modal should disappear. A failure should result in the form clearing, but with the modal staying open. After a successful new work order, you can immediately find it in the table. Sort by Order number, descending to find it at the top.

Tradeoffs
==========
The first, and most obvious tradeoff made for the project is function/architecture over styling. Wanting to respect the 8 hours of time given, I knew I should keep all styling until the end. After building out the GraphQL-driven Rails API, React UI, and both frontend/backend tests, I could only make some sparse style updates so the UI would be at least tolerable. The difference from the mockups I would say is misleading, and that there isn't a huge amount of styling work to do -- HOWEVER, I know how tedious it can be. I've found that holding off styling as long as possible makes it much easier though, once functionality is established and all elements have "found their places."

Concerning the domain model, I thought about giving coffees their own database table, and seeing if this is one of those rare instances where a `has_one` association would actually make sense (e.g. `WorkOrders has_one CoffeeBlend`), and using has_enumerated/acts_as_enumerated, etc. But with no other info on what might need to be tracked in a coffees table, I decided to leave it as a string on WorkOrders. A separate table, tracking with enumeration can be better as coffee types hypothetically grow, but in the end, it's the string that matters to a human reader, and for that reason simpler code -- for faster queries -- wins on this occasion. (HOWEVER, in production this would not fly -- please see Production Readiness.)

Specs for both projects only follow the happy paths. Again, with more time I would have written out some failing tests to expose errors and cover them with more validations, and also written some for "successful" predictable failures.

The frontend only scratches the surface of ApolloClient's capabilities. I'd have liked to take advantage of Apollo's `InMemoryCache` more (some functions are available by default), and create a more robust client-side pagination system. Pagination is usually a time-sink in any project, so I went with ReactTable which provides "fake" pagination out-of-the-box. I'd have liked to get a proper system in place, using caching and GraphQL cursors.

Side note about Redux: when I first started React development and understood the need for state management, I couldn't imagine _not_ using Redux (and still feel that way a bit). But after learning GraphQL, now I can't see using Redux unless _absolutely necessary_ (maybe app complexity warrants it). I can see why some have said it "replaces" Redux. GraphQL with ApolloClient offloads so much of the burden of the client side to track state, by virtue of simply how GraphQL works, and of Apollo's query caching working together (as opposed to how REST works). I must say it's nice not having to deal with the request/success/failure pattern of Redux (and _sagas_ :thumbsdown:)


Deployment/Production Readiness
===============================
I've heard it said about software projects that when you're 90% done, you're halfway there. "Production readiness" has degrees, and in the state the app is in now -- it's not production-ready. However, I could argue it's just nicked the beginning of the "polishing" phase. I say that while comparing it to the mockup as an ideal. But what the app "wants to be" (the production version of the real Perfectly Ground Ordering System) is indeed far and away.

I think having the project split into back- and front-ends would make things easier on developers potentially collaborating on it. Regardless, there's no reason you couldn't throw it in a docker container (I did) and host on Heroku. Now that serverless architecture is all the rage, you could decouple services through AWS. Some relevant services could be DynamoDB, Lambda, SQS/SNS (for queues/notifications), and Step Functions (for integrating human tasks into a work flow).

Concerning the domain modeling, coffee types definitely would need their own table with some association to WorkOrders. One reason is that the create-work-order-modal form is currently hardcoded with dropdown options for coffees, brew methods, and packets. These options should be fetched from the server and then populated when the modal opens. Then as new coffees are added, simply add them to the database and the frontend is already taken care of. This can be done with a single GraphQL request (e.g. `createWorkOrderOptions` which builds a hash of all current coffees [or _active_ coffees], with their available brew methods [maybe different coffees have different methods of their own], and the packet sizes available.)
