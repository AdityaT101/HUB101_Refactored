# Hub101_aws_git
Clicks Caching System

I have attempted to create a "Caching System" using Node.js, Redis, Express, Mongo, Ajax, AWS EC2, Mlab and Elastic Cache.

Where the user can create new counters – with multiple counters at a time.

Each counter has a button – pushing the button will increment a counter by +1.

In addition to the button, there should be a way for user to see the number of clicks in the last hour, 3 hours, 6 hours, 12 hours, 24 hours, all time.

There should be a way to retrieve the value of the counter across a custom period.

Closing an individual counter will archive the counter – the button will no longer allow increments and the archived counter should be pushed to Mongo
