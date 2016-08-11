# HackHubAPIServer
## A solution for the hectic Hackathon

HackHub is a platform for organizing communication at a hackathon event. Hackers, recruiters, and organizers can all find HackHub useful. Hackers can form teams and create messaging groups, keep track of the schedule at the Hackathon, and explore recruiters’ opportunities. Recruiters can promote their job opportunities and explore talent, and organizers can keep track of sponsors and run their event smoothly. HackHub’s dynamic nature in serving all of these users will streamline the hectic nature of a hackathon for all involved.

#### Organizer Interface
<img src="img/mockups/organizer_interface_schedule.jpg" width="300">
<img src="img/mockups/organizer_interface_announcements.jpg" width="300">
<img src="img/mockups/organizer_interface_companies.jpg" width="300">
<img src="img/mockups/organizer_interface_company_profile.jpg" width="300">
<img src="img/mockups/organizer_interface_organizers.jpg" width="300">
<img src="img/mockups/organizer_interface_help.jpg" width="300">

#### Hacker Interface
<img src="img/mockups/hacker_interface_schedule.jpg" width="300">
<img src="img/mockups/hacker_interface_announcements.jpg" width="300">
<img src="img/mockups/hacker_interface_companies.jpg" width="300">
<img src="img/mockups/hacker_interface_hackers.jpg" width="300">
<img src="img/mockups/hacker_profile.jpg" width="300">
<img src="img/mockups/hacker_interface_help.jpg" width="300">

#### Sitemap
<img src="img/mockups/sitemap.jpg" width="950">

## Architecture

TODO:  descriptions of code organization and tools and libraries used

## Setup

TODO: how to get the project dev environment up and running, npm install etc

## Deployment

How to Deploy the Project:

Currently, the project is set up to run on a local server. So, first set up the server with mongod. For instance, create any directory to store data and then run

`mongod --dbpath <path to data directory>`

Then, while mongod is still running, go to the directory of HackHubAPIServer. There, run

`npm run dev`

This should set up the local server on localhost:9090. The current project is set up to use this server, so it should run correctly.

To test the project, run

`npm start`

and go to localhost:8080.

## Authors
Erin Connolly, Emma Oberstein, Sophia Jiang, Robert Sayegh, Jean Zhou

## Acknowledgments